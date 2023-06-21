//----------------------------------------------
//
//      moteurs.hpp
//
//----------------------------------------------

#include <Arduino.h>

#ifndef __MOTEURS__
#define __MOTEURS__
    #include <AccelStepper.h>

    // On some step motors direction may be inverted
    #define INVERT_DIRECTION
    // define this symbol to invert the motors direction
    #define MAX_COMMANDS 512
    #define MAX_LOOPS 10

    // motor pins
    #define motorPin1  16      // IN1 on the ULN2003 driver 1
    #define motorPin2  4       // IN2 on the ULN2003 driver 1
    #define motorPin3  2       // IN3 on the ULN2003 driver 1
    #define motorPin4  15      // IN4 on the ULN2003 driver 1

    #define motorPin5  19      // IN1 on the ULN2003 driver 2
    #define motorPin6  18      // IN2 on the ULN2003 driver 2
    #define motorPin7  5       // IN3 on the ULN2003 driver 2
    #define motorPin8  17      // IN4 on the ULN2003 driver 2


    #define MAX_STEPPER_SPEED 900
    #define MIN_STEPPER_SPEED 200
    #define WHEEL_SPACING_MM 132

    #define MAX_CONSECUTIVE_NUMBERS 3

    extern void stepperInit();
    
#endif