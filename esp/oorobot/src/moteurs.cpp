//----------------------------------------------
//
//      moteurs.cpp
//
//----------------------------------------------

#include <Arduino.h>
#include <Servo.h>

#include "moteurs.hpp"
#include "params.hpp"

int stepperSpeed = MIN_STEPPER_SPEED;

// Initialize with pin sequence IN1-IN3-IN2-IN4 for using the AccelStepper with 28BYJ-48
AccelStepper stepper1(AccelStepper::HALF4WIRE, motorPin1, motorPin3, motorPin2, motorPin4);
AccelStepper stepper2(AccelStepper::HALF4WIRE, motorPin5, motorPin7, motorPin6, motorPin8);


int stepDelay = 800;
int steps1 = 0; // keep track of the step count for motor 1
int steps2 = 0; // keep track of the step count for motor 2
int isMoving = false;
long startMovement = 0;

//----------------------------------------------
//
//      stepperInit
//
//----------------------------------------------
void stepperInit(){
    Serial.println("======================");
    Serial.println("     Init Moteurs     ");
    Serial.println("----------------------");
  // stepper motors init
  stepper1.setMaxSpeed(2000);
  stepper1.move(1);

  stepper2.setMaxSpeed(2000);
  stepper2.move(-1);
}

//----------------------------------------------
//
//      getStepSize
//
//----------------------------------------------
short getStepSize(char* cmd,  short* commandLaunched)
{
  char command = cmd[*commandLaunched];
  int stepsize = 0;
  for (short i = 0; i < MAX_CONSECUTIVE_NUMBERS ; i++)
  {
    if (*commandLaunched + 1 < MAX_COMMANDS - 1 )
    {
      if (cmd[*commandLaunched + 1] > 47 && cmd[*commandLaunched + 1] < 58)
      {
        stepsize = stepsize * 10 + cmd[*commandLaunched + 1 ] - 48;
        *commandLaunched = *commandLaunched + 1;
      }
    }
  }

  if (stepsize == 0)
  {
    switch (command) {
      case 'W':
        stepsize = stepDelay;
        break;
      case 'U':
      case 'D':
        stepsize = params.stepCm; //10cm
        break;
      case 'L':
      case 'R':
        stepsize = 90;  // 90°;
        break;
      case 'P':
        stepsize = stepDelay * 2;
        break;
    }
  }

  return stepsize;

}

//----------------------------------------------
//
//      isCommandTerminated
//
//----------------------------------------------
boolean isCommandTerminated() {
  /*
    int diff = (millis() - startMovement);
    if (diff>=100) {
    startMovement=millis();
    stepperSpeed+=100;
    if (stepperSpeed>MAX_STEPPER_SPEED) {
      stepperSpeed=MAX_STEPPER_SPEED;
    } else {
      Serial.print(F("speed:"));
      Serial.println(stepperSpeed);
      stepper2.setSpeed(stepperSpeed);
      stepper1.setSpeed(stepperSpeed);
    }
    }
  */
  stepper2.setSpeed(MAX_STEPPER_SPEED);
  stepper1.setSpeed(MAX_STEPPER_SPEED);

  steps1 = stepper1.distanceToGo();
  steps2 = stepper2.distanceToGo();
  stepper1.runSpeedToPosition();
  stepper2.runSpeedToPosition();

  if (steps1 == 0 && steps2 == 0) {
    return true;
  } else {
    return false;
  }
}

//----------------------------------------------
//
//      enableMotors
//
//----------------------------------------------
void enableMotors() {
  stepper1.setCurrentPosition(0);
  stepper2.setCurrentPosition(0);
  stepper1.enableOutputs();
  stepper2.enableOutputs();
}

//----------------------------------------------
//
//      disableMotors
//
//----------------------------------------------
void disableMotors() {
  stepper1.stop();
  stepper2.stop();
  stepper1.disableOutputs();
  stepper2.disableOutputs();
}

//----------------------------------------------
//
//      doCircle
//
//----------------------------------------------
void doCircle(float radius, float angle, boolean reverseOrientation) {
  isMoving = true;
  startMovement = millis();
  //AAW10r1c50a90G
  //AAW10r0c200a45G
  float lenght_big_arc, lenght_small_arc;
  float steps_big_arc, steps_small_arc;
  float speed_big_arc, speed_small_arc;

  lenght_big_arc = 2 * PI * (radius + (WHEEL_SPACING_MM / 2)) * (angle / 360);
  steps_big_arc = round(lenght_big_arc * params.stepCm / 10);
  speed_big_arc = MAX_STEPPER_SPEED;

  lenght_small_arc = 2 * PI * (radius - (WHEEL_SPACING_MM / 2)) * (angle / 360);
  steps_small_arc = round(lenght_small_arc * params.stepCm / 10);
  speed_small_arc = abs((steps_small_arc * speed_big_arc) / steps_big_arc);

  if (reverseOrientation) {
    stepper2.move(-steps_big_arc);
    stepper2.setSpeed(speed_big_arc);
    stepper1.move(-steps_small_arc);
    stepper1.setSpeed(speed_small_arc);
  } else {
    stepper1.move(steps_big_arc);
    stepper1.setSpeed(speed_big_arc);
    stepper2.move(steps_small_arc);
    stepper2.setSpeed(speed_small_arc);
  }

}

//----------------------------------------------
//
//      stepForward
//
//----------------------------------------------
void stepForward(short distance) {
  isMoving = true;
  startMovement = millis();
  stepperSpeed = MIN_STEPPER_SPEED;

  int target = (int) ((float)distance * (float)params.lineSteps / 10.0f);
#ifdef INVERT_DIRECTION
  target = target * -1;
#endif
  stepper1.move(-target);
  stepper2.move(target);
}

//----------------------------------------------
//
//      stepBackward
//
//----------------------------------------------
void stepBackward(short distance) {
  isMoving = true;
  startMovement = millis();
  stepperSpeed = MIN_STEPPER_SPEED;

  int target = (int) ((float)distance * (float)params.lineSteps / 10.0f);
#ifdef INVERT_DIRECTION
  target = target * -1;
#endif
  stepper1.moveTo(target);
  stepper2.moveTo(-target);
}

//----------------------------------------------
//
//      turnLeft
//
//----------------------------------------------
void turnLeft(short angle) {
  isMoving = true;
  startMovement = millis();
  stepperSpeed = MIN_STEPPER_SPEED;

  int angleStep = (int)((float)angle / 90.0 * (float)params.turnSteps);
  stepper1.moveTo(angleStep);
  stepper2.moveTo(angleStep);
}

//----------------------------------------------
//
//      turnRight
//
//----------------------------------------------
void turnRight(short angle) {
  isMoving = true;
  startMovement = millis();
  stepperSpeed = MIN_STEPPER_SPEED;

  int angleStep = (int)((float)angle / 90.0 * (float)params.turnSteps);
  stepper1.moveTo(-angleStep);
  stepper2.moveTo(-angleStep);
}