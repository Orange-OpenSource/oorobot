#include <Arduino.h>
#include "buttons.h"

int LONG_CLICK_DELAY = 800;
int DEBOUNCING_DELAY = 200;
int lastButtonId = -1;
unsigned long lastRawPressed = 0;
int b_index = 0;
int READ_DELAY = 10;
unsigned long lastRead = 0;
byte analogKeypadFound=false;
char analogButtonsMap[] = {
  'L', 'G', 's', 'C', 0, 'R', '@', 'U', 'P', 'D', '|', '!',
  '-',  0, 'S', 'A', 0, '+', 0,  0,   0,   0,  0, 0
};
char buttonsMap[] = {
  'G',  0 , 'C', 0, 0, 'R', 0,  0, 'U', 'P', 'D', 0, '|', 'L', '!', 0,
  0,   'S', 'A', 0, 0, '+', 0,  0,  0 ,  0 ,  0 , 0,  0 , '-',  0 , 0
};

void setupButtons()
{
  pinMode(KEYS_PIN, INPUT);
  int raw = analogRead(KEYS_PIN);
  if (raw==0) {
    analogKeypadFound=true;
  }
  if (analogKeypadFound) {
    Serial.println("Analog keypad found, use it");
  } else {
    Serial.println("Analog keypad not found, use touch screen");
  }
  pinMode(KEYS_SCL_PIN, OUTPUT);
  pinMode(KEYS_SDO_PIN, INPUT);

}

int read_keypad() {
  int count;
  int key_state = 0;
  for (count = 1; count <= 16; count++) {
    digitalWrite(KEYS_SCL_PIN, LOW);
    if (!digitalRead(KEYS_SDO_PIN)) {
     key_state = count;
    }
    digitalWrite(KEYS_SCL_PIN, HIGH);
  }
  
  return key_state;
}


int maxRaw = 0;

char getPressedButton() {
  int b = -1;
  int retainedRaw = 0;

  if (analogKeypadFound) {
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
        return analogButtonsMap[b];
      }
      if (lastButtonId != b) {
        lastRawPressed = millis();
        lastButtonId = b;
        return analogButtonsMap[b];
      }
    }
  } else {
    if (lastRead + DEBOUNCING_DELAY < millis()) {
      int b = read_keypad();
      lastRead = millis();
      if (b>0) {

        if (lastButtonId != b) {
          lastRawPressed=millis();
        } else {
          if (lastRawPressed + LONG_CLICK_DELAY < millis()) { 
            b = b + 16;
            lastRawPressed=millis();
          }
        }
        lastButtonId = b;
        return buttonsMap[b-1];
      } else {
        lastButtonId = -1;
      }
    }
  }
  return 0;
}
