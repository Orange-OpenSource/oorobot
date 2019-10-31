#include <Arduino.h>
#include "buttons.h"

int LONG_CLICK_DELAY = 700;
int DEBOUNCING_DELAY = 600;
int lastButtonId = -1;
unsigned long lastClick = 0;
unsigned long lastRawPressed = 0;


void setupButtons()
{
      pinMode(KEYS_PIN, INPUT);
}




int getPressedButton() {
 
  int raw = analogRead(KEYS_PIN);
  int b = -1;
  if (raw >= 472) {
    lastRawPressed = millis();
    if (raw >= 981) {
      b = 1;
    } else if (raw >= 894 && raw <= 966) {
      b = 2;
    } else if (raw >= 823 && raw < 877) {
      b = 3;
    } else if (raw >= 763 && raw <= 817) {
      b = 4;
    } else if (raw >= 707 && raw <= 753) {
      b = 5;
    } else if (raw >= 662 && raw <= 698) {
      b = 6;
    } else if (raw >= 622 && raw <= 698) {
      b = 7;
    } else if (raw >= 586 && raw <= 614) {
      b = 8;
    } else if (raw >= 556 && raw <= 584) {
      b = 9;
    } else if (raw >= 526 && raw <= 554) {
      b = 10;
    } else if (raw >= 501 && raw <= 519) {
      b = 0;
    } else if (raw >= 472 && raw <= 508) {
      b = 11;
    }
    unsigned long currentClick = millis();
    if (lastButtonId != b) {
      if (currentClick > lastClick + DEBOUNCING_DELAY) {
        lastClick = currentClick;
        lastButtonId = b;
      } else {
        b = -1;
      }
    } else {
      if (currentClick > lastClick + LONG_CLICK_DELAY) {
        lastButtonId = b;
        b = b + 12;
        lastClick = currentClick;
      } else {
        b = -1;
      }
    }
  } else {
    if (millis() - lastRawPressed > 200) {
      lastButtonId = -1;
    }
  }
  return b;
}
