#include <Arduino.h>
#include "buttons.h"

int LONG_CLICK_DELAY = 800;
int DEBOUNCING_DELAY = 400;
int lastButtonId = -1;
unsigned long lastRawPressed = 0;
int b_index = 0;
int READ_DELAY = 10;
unsigned long lastRead = 0;

void setupButtons()
{
  pinMode(KEYS_PIN, INPUT);
}

int maxRaw = 0;

int getPressedButton() {
  int b = -1;
  int retainedRaw = 0;

  if (lastRead + READ_DELAY < millis()) {
    int raw = analogRead(KEYS_PIN);
    if (raw != 0) {
      b_index++;
      if (raw > maxRaw) {
        maxRaw = raw;
      }
      if (b_index >= 8) {
        //int sumRaw = 0;
        retainedRaw = maxRaw;
        b_index = 0;
      }
    } else {
      maxRaw = 0;
      lastButtonId = -1;
      lastRawPressed = millis();
    }
    lastRead = millis();
  }
  if (retainedRaw != 0) {
    if (retainedRaw  >= 500 && retainedRaw  <= 520) {
      b = 0;
    } else if (retainedRaw  >= 1000) {
      b = 1;
    } else if (retainedRaw  >= 920 && retainedRaw  <= 940) {
      b = 2;
    } else if (retainedRaw  >= 840 && retainedRaw  <= 860) {
      b = 3;
    } else if (retainedRaw  >= 780 && retainedRaw  <= 790) {
      b = 4;
    } else if (retainedRaw  >= 720 && retainedRaw  <= 750) {
      b = 5;
    } else if (retainedRaw  >= 670 && retainedRaw  <= 700) {
      b = 6;
    } else if (retainedRaw  >= 620 && retainedRaw  <= 670) {
      b = 7;
    } else if (retainedRaw  >= 600 && retainedRaw  <= 610) {
      b = 8;
    } else if (retainedRaw  >= 560 && retainedRaw  <= 590) {
      b = 9;
    } else if (retainedRaw  >= 520 && retainedRaw  <= 550) {
      b = 10;
    } else  if (retainedRaw  >= 470 && retainedRaw  <= 500) {
      b = 11;
    }
    if (lastRawPressed + LONG_CLICK_DELAY < millis() || lastButtonId>12) {
      b = b + 12;
      return b;
    }
    if (lastButtonId != b) {
      lastRawPressed = millis();
      lastButtonId = b;
      return b;
    }
  }

  return -1;
}
