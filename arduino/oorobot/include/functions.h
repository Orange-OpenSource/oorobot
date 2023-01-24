#include <Arduino.h>

void actionButtonForScreen(char button);
void actionButtonForSettingsScreen(char button);
void updateScreen();
char commandToDisplay(char c);
boolean launchNextCommand();
short getStepSize(char* cmd,  short* commandLaunched);
boolean isCommandTerminated();
void enableMotors();
void disableMotors();
void doCircle(float radius, float angle, boolean reverseOrientation);
void stepForward(short distance);
void stepBackward(short distance);
void turnLeft(short angle);
void turnRight(short angle);
void saveParams();
void loadParams();
