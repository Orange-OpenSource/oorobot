/*
   OoRoBoT code

*/
#include <EEPROM.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <AccelStepper.h>
#include "charset.h"
#include "buttons.h"


#define OOROBOT_VERSION "1.00"

#define SCREEN_TIMEOUT 25

// On some step motors direction may be inverted
// define this symbol to invert the motors direction
/* #define INVERT_DIRECTION */
#define MAX_COMMANDS 512
#define MAX_LOOPS 10

// define this symbol to add bluetooth support
#define HAVE_BLUETOOTH

#ifdef HAVE_BLUETOOTH
# include <SoftwareSerial.h>
# define RxD 12
# define TxD 13
SoftwareSerial BTSerie(RxD, TxD);
#endif

// motor pins
#define motorPin1  4     // IN1 on the ULN2003 driver 1
#define motorPin2  5     // IN2 on the ULN2003 driver 1
#define motorPin3  6     // IN3 on the ULN2003 driver 1
#define motorPin4  7     // IN4 on the ULN2003 driver 1

#define motorPin5  8     // IN1 on the ULN2003 driver 2
#define motorPin6  9     // IN2 on the ULN2003 driver 2
#define motorPin7  10    // IN3 on the ULN2003 driver 2
#define motorPin8  11    // IN4 on the ULN2003 driver 2

// Menu index
#define START_MENU 0
#define SETTINGS_MENU 1
#define CTRL_MENU 2
#define RUNNING_MENU 3
#define OFF_MENU 4

// Initialize with pin sequence IN1-IN3-IN2-IN4 for using the AccelStepper with 28BYJ-48
AccelStepper stepper1(AccelStepper::HALF4WIRE, motorPin1, motorPin3, motorPin2, motorPin4);
AccelStepper stepper2(AccelStepper::HALF4WIRE, motorPin5, motorPin7, motorPin6, motorPin8);

// The I2C LCD object
LiquidCrystal_I2C lcd(0x27, 16, 2);

struct Params {
  int stepCm;
  int turnSteps;
};

int lineStepsCM = 145; // number of steps to do 1cm
int stepDelay = 800;
int stepperSpeed = 900; //speed of the stepper (steps per second)
int steps1 = 0; // keep track of the step count for motor 1
int steps2 = 0; // keep track of the step count for motor 2
int isMoving = false;

char buttonsMap[] = {
  'L', 'G', 's', 'C', 0, 'R', 0, 'U', 'P', 'D', 0, 0,
  '-',  0, 'S', 'A', 0, '+', 0,  0,   0,   0,  0, 0
};

Params params = {140, 1220};
int previousMenu = CTRL_MENU;
int selectedMenu = START_MENU;
char cmd[MAX_COMMANDS + 1] = {};
int loopCounter[MAX_LOOPS] = {};
int loopPointer[MAX_LOOPS] = {};
int loopIndex=0;

unsigned char cmd_l = 0;
int changeDisplay = 1;
long lastChangeDisplay = 0;
int selectedLine = 0;
short commandLaunched = 0;
short consecutive_numbers = 0;
#define MAX_CONSECUTIVE_NUMBERS 3
short num_of_cmd = 0;
short max_num_cmd = 0;


void setup() {
  Serial.begin(9600);
  loadParams();
  setupButtons();

  // This is the I2C LCD object initialization.
  lcd.init();
  lcd.backlight();
  lcd.createChar(1, up);
  lcd.createChar(2, down);
  lcd.createChar(4, right);
  lcd.createChar(3, left);
  lcd.createChar(5, pause);
  lcd.createChar(6, bullet);
  lcd.createChar(7, agrave);

  // stepper motors init
  stepper1.setMaxSpeed(2000.0);
  stepper1.move(1);
  stepper1.setSpeed(stepperSpeed);
  stepper2.setMaxSpeed(2000.0);
  stepper2.move(-1);
  stepper2.setSpeed(stepperSpeed);

  // Bluetooth module init
#ifdef HAVE_BLUETOOTH
  pinMode(RxD, INPUT);
  pinMode(TxD, OUTPUT);
  BTSerie.begin(38400);
#endif
}

void loop() {
  long currentTime = millis();
  int buttonId = getPressedButton();
  char button = 0;
  if (buttonId >= 0) {
    button = buttonsMap[buttonId];
    if (button != 0) {
      actionButtonForScreen(button);
    }
  } else {
#ifdef HAVE_BLUETOOTH
    while (BTSerie.available()) {
      button = BTSerie.read();
      //Serial.println(button);
      if (button != 0) {
        actionButtonForScreen(button);
      }
    }
#endif
    while (Serial.available()) {
      button = Serial.read();
      //Serial.println(button);
      if (button != 0) {
        actionButtonForScreen(button);
      }
    }
  }


  if (isMoving) {
    if (isCommandTerminated()) {
      Serial.println(F("step delay"));
      if (! launchNextCommand()) {
        Serial.println(F("program terminated"));
        isMoving = false;
        disableMotors();
        lcd.clear();
        lcd.setBacklight(HIGH);
        lcd.print("fin !");
#ifdef HAVE_BLUETOOTH
        BTSerie.println("fin !");
#endif
        delay(1000);
        selectedMenu = CTRL_MENU;
        changeDisplay = 1;
      }
    }
  }
  updateScreen();

  // Screen off after 4s
  if (currentTime > lastChangeDisplay + SCREEN_TIMEOUT * 1000) {
    if (selectedMenu != OFF_MENU) {
      previousMenu = selectedMenu;
      selectedMenu = OFF_MENU;
      changeDisplay = 1;
    }
  }

}



void actionButtonForScreen(char button) {

  if (selectedMenu == START_MENU) {
    selectedMenu = CTRL_MENU;
    changeDisplay = 1;
  } else if (selectedMenu == CTRL_MENU) {
    changeDisplay = 1;
    if ( button > 47  && button < 58) // it's a number
    {
      consecutive_numbers++;
      if (consecutive_numbers > MAX_CONSECUTIVE_NUMBERS)
      {
        Serial.println("number too hight");
        return;
      }
      else
      {
        cmd[cmd_l++] = button;
        return;
      }
    }
    else
    {

      switch (button) {
        case 'S':
          selectedMenu = SETTINGS_MENU;
          changeDisplay = 1;
          break;
        case 'G':
          selectedMenu = RUNNING_MENU;
          isMoving = true;
          commandLaunched = 0;

          max_num_cmd = num_of_cmd;
          num_of_cmd = 0;
          launchNextCommand();

          break;
        case 'A':
          cmd_l = 0;
          commandLaunched = 0;
          num_of_cmd = 0;
          break;
        case 'C':
          while (cmd_l > 0  &&  cmd[cmd_l - 1] > 47  && cmd[cmd_l - 1]  < 58)
          {
            cmd_l--;  //remove all number;
          }
          if (cmd_l > 0) {
            cmd_l--;
            num_of_cmd--;
          }
          break;
        case 'B' :
        case 'E' :
        case 'U' :
        case 'D' :
        case 'L' :
        case 'R' :
        case 'P' :
          if (cmd_l < MAX_COMMANDS) {
            cmd[cmd_l++] = button;
            num_of_cmd++;
          } else {
            Serial.println("too many commands");
          }
          break;
        case 0 :
        case '+' :
        case '-' :
        case 's' :
          changeDisplay = 0;
          break;
        default:
          Serial.println("Unknown Command");
#ifdef HAVE_BLUETOOTH
          BTSerie.println("Unknown Command");
#endif
          break;
      }
      consecutive_numbers = 0;
    }
  } else if (selectedMenu == SETTINGS_MENU) {
    actionButtonForSettingsScreen(button);
  } else if (selectedMenu == RUNNING_MENU) {
    disableMotors();
    isMoving = false;
    lcd.clear();
    lcd.setBacklight(HIGH);
    lcd.print("Arret!");
    delay(1000);
    selectedMenu = CTRL_MENU;
    changeDisplay = 1;
  } else if (selectedMenu == OFF_MENU) {
    selectedMenu = previousMenu;
    changeDisplay = 1;
  }
}

void actionButtonForSettingsScreen(char button) {
  changeDisplay = 1;
  switch (button) {
    case 'U':
      selectedLine++;
      selectedLine = selectedLine % 2;
      break;
    case 'D':
      selectedLine--;
      selectedLine = selectedLine % 2;
      break;
    case 'R':
      if (selectedLine == 0) {
        params.stepCm++;
      } else {
        params.turnSteps++;
      }
    case '+':
      if (selectedLine == 0) {
        params.stepCm += 10;
      } else {
        params.turnSteps += 10;
      }
      break;
    case 'L':
      if (selectedLine == 0) {
        params.stepCm--;
      } else {
        params.turnSteps--;
      }
      break;
    case '-':
      if (selectedLine == 0) {
        params.stepCm -= 10;
      } else {
        params.turnSteps -= 10;
      }
      break;
    case 's':
    case 'G':
      saveParams();
      selectedMenu = CTRL_MENU;
      break;
    case 'C':
      loadParams();
      selectedMenu = CTRL_MENU;
      break;
  }
}

void updateScreen() {
  if (changeDisplay) {
    if (selectedMenu == START_MENU) {
      //lcd.setBacklight(HIGH);
      lcd.display();
      lcd.setCursor(0, 0);
      lcd.print("  OoRoBoT " OOROBOT_VERSION);
      lcd.setCursor(0, 1);
      lcd.print("Pret \7 demarrer!");
#ifdef HAVE_BLUETOOTH
      BTSerie.println("OoRoBoT " OOROBOT_VERSION);
      BTSerie.println("En attente de commandes");
#endif
      previousMenu = CTRL_MENU;
      selectedMenu = CTRL_MENU;
    } else if (selectedMenu == CTRL_MENU) {
      lcd.setBacklight(HIGH);
      cmd[cmd_l] = 0;
#ifdef HAVE_BLUETOOTH
      BTSerie.println(cmd);
#endif
      lcd.clear();
      lcd.setCursor(0, 0);
      for (char i = 0 ; i < cmd_l ; i++) {
        if (i == 16) {
          lcd.setCursor(0, 1);
        }
        lcd.print(commandToDisplay(cmd[i]));
      }
    } else if (selectedMenu == SETTINGS_MENU) {
      lcd.setBacklight(HIGH);
      lcd.clear();
      int cm = params.stepCm / 10;
      int mm = params.stepCm - 10 * cm;
      lcd.print(" Distance:");
      lcd.print(cm);
      lcd.print(".");
      lcd.print(mm);
      lcd.print("cm");
      lcd.setCursor(0, 1);
      lcd.print(" 1/4Tour:");
      lcd.print(params.turnSteps);
      lcd.print("pas");
      lcd.setCursor(0, selectedLine);
      lcd.print("\6");
#ifdef HAVE_BLUETOOTH
      if (selectedLine == 0) {
        BTSerie.print("Distance:");
        BTSerie.print(cm);
        BTSerie.print(".");
        BTSerie.print(mm);
        BTSerie.println("cm");
      } else {
        BTSerie.print("1/4Tour:");
        BTSerie.print(params.turnSteps);
        BTSerie.println("pas");
      }
#endif

    } else if (selectedMenu == CTRL_MENU) {
      lcd.setBacklight(HIGH);
    } else if (selectedMenu == OFF_MENU) {
      lcd.setBacklight(LOW);
    }
    lastChangeDisplay = millis();
  }
  changeDisplay = 0;
}

char commandToDisplay(char c) {
  switch (c) {
    case 'U':
      return 1;
      break;
    case 'D':
      return 2;
      break;
    case 'L':
      return 3;
      break;
    case 'R':
      return 4;
      break;
    case 'P':
      return 5;
      break;
    default:
      return c;
  }
}

int startLoop=-1;
int remainingLoop=0;

boolean launchNextCommand() {
  if (commandLaunched >= cmd_l) {
    return false;
  } else {
    disableMotors();
    lcd.clear();
    lcd.setBacklight(HIGH);
    lcd.print((num_of_cmd + 1));
    lcd.print(" sur ");
    lcd.print(max_num_cmd);
    lcd.print(" : ");
    lcd.print(commandToDisplay(cmd[commandLaunched]));
#ifdef HAVE_BLUETOOTH
    BTSerie.print("etape ");
    BTSerie.print((num_of_cmd + 1));
    BTSerie.print(" sur ");
    BTSerie.print(max_num_cmd);
    BTSerie.print(" : ");
    BTSerie.println(cmd[commandLaunched]);
#endif
    Serial.print("etape ");
    Serial.print((num_of_cmd + 1));
    Serial.print(" sur ");
    Serial.print(max_num_cmd);
    Serial.print(" : ");
    Serial.println(cmd[commandLaunched]);

    num_of_cmd++;
    delay(stepDelay);
    lcd.setBacklight(LOW);
    enableMotors();

    char command = cmd[commandLaunched];
    short stepSize = getStepSize(cmd, &commandLaunched);

    Serial.print("stepSize :");
    Serial.println(stepSize);
    switch (command) {
      case 'W':
        Serial.println(F("set wainting step delay"));
        stepDelay=stepSize;
        break;      
      case 'U':
        Serial.println(F("stepForward"));
        stepForward(stepSize);
        break;
      case 'D':
        Serial.println(F("stepBackward"));
        stepBackward(stepSize);
        break;
      case 'L':
        Serial.println(F("turnLeft"));
        turnLeft(stepSize);
        break;
      case 'R':
        Serial.println(F("turnRight"));
        turnRight(stepSize);
        break;
      case 'P':
        Serial.println(F("pause"));
        delay(stepSize);
        break;
      case 'B':
        Serial.println(F("begin loop"));
        if (loopIndex>=MAX_LOOPS) {
          Serial.println("too many loops included");
        } else {
          loopCounter[loopIndex] = stepSize;
          loopPointer[loopIndex] = commandLaunched;
          loopIndex++;
          startLoop=commandLaunched;
          remainingLoop=stepSize;
        }
        break;
      case 'E':
        Serial.println(F("end loop"));      
        if (loopCounter[loopIndex-1]>1) {
          commandLaunched=loopPointer[loopIndex-1];
          loopCounter[loopIndex-1]--;
        } else {
          if (loopIndex>0) {
            loopIndex--;
          }
        }
        break;
    }
    commandLaunched++;
    return true;
  }
}


short getStepSize(char* cmd,  short* commandLaunched)
{
  char command = cmd[*commandLaunched];
  short stepsize = 0;
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
        stepsize = 20; // step waiting delay
      case 'U':
      case 'D':
        stepsize = 140; //10cm
        break;
      case 'L':
      case 'R':
        stepsize = 90;  // 90°;
        break;
      case 'P':
        stepsize=stepDelay*2;
        break;
    }
  }

  return stepsize;

}

boolean isCommandTerminated() {
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

void enableMotors() {
  stepper1.enableOutputs();
  stepper2.enableOutputs();
}

void disableMotors() {
  stepper1.disableOutputs();
  stepper2.disableOutputs();
}

void stepForward(short distance) {
  isMoving = true;
  int target = (int)  (((float)params.stepCm / 10.0f) * ((float)distance * (float)lineStepsCM / 100.0f));

#ifdef INVERT_DIRECTION
  target = target * -1;
#endif
  stepper1.move(-target);
  stepper1.setSpeed(stepperSpeed);
  stepper2.move(target);
  stepper2.setSpeed(stepperSpeed);

}

void stepBackward(short distance) {
  isMoving = true;
  int target = (int)  (((float)params.stepCm / 10.0f) * ((float)distance * (float)lineStepsCM / 100.0f));
#ifdef INVERT_DIRECTION
  target = target * -1;
#endif
  stepper1.move(target);
  stepper1.setSpeed(stepperSpeed);
  stepper2.move(-target);
  stepper2.setSpeed(stepperSpeed);
}

void turnLeft(short angle) {
  isMoving = true;

  int angleStep = (int)((float)angle / 90.0 * (float)params.turnSteps);

  stepper1.move(angleStep);
  stepper1.setSpeed(stepperSpeed);
  stepper2.move(angleStep);
  stepper2.setSpeed(stepperSpeed);
}

void turnRight(short angle) {
  isMoving = true;
  int angleStep = (int)((float)angle / 90.0 * (float)params.turnSteps);
  stepper1.move(-angleStep);
  stepper1.setSpeed(stepperSpeed);
  stepper2.move(-angleStep);
  stepper2.setSpeed(stepperSpeed);
}

void saveParams() {
  EEPROM.put(0, params);
}

void loadParams() {
  Params savedParams;
  EEPROM.get(0, savedParams);
  if (savedParams.stepCm > 0 && savedParams.stepCm < 500) {
    params.stepCm = savedParams.stepCm;
  }
  if (savedParams.turnSteps > 0 && savedParams.turnSteps < 5000) {
    params.turnSteps = savedParams.turnSteps;
  }
}


