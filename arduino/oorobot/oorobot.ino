#include <AccelStepper.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <EEPROM.h>
#include <SoftwareSerial.h>  //Software Serial Port

// Bluetooth HC-06
#define RxD 12    //Pin 10 pour RX (pin0=serial) vert
#define TxD 13    //Pin 11 pour TX, on peut changer noir
#define HAVE_BLUETOOTH 0
#if HAVE_BLUETOOTH
SoftwareSerial BTSerie(RxD,TxD);
#endif

#if defined(ARDUINO) && ARDUINO >= 100
#define printByte(args)  write(args);
#else
#define printByte(args)  print(args,BYTE);
#endif

#define I2C_ADDR    0x27 // <<----- Add your address here.  Find it from I2C Scanner
#define BACKLIGHT_PIN     3
#define En_pin  2
#define Rw_pin  1
#define Rs_pin  0
#define D4_pin  4
#define D5_pin  5b
#define D6_pin  6
#define D7_pin  7
//LiquidCrystal_I2C lcd(I2C_ADDR,En_pin,Rw_pin,Rs_pin,D4_pin,D5_pin,D6_pin,D7_pin);
LiquidCrystal_I2C lcd(0x27, 20, 4);

// Rotary encoder
#define CLK  3 
#define DT   2 
#define BUTTON A1

#define KEYS_PIN A0

#define HALFSTEP 8
// motor pins
#define motorPin1  4     // IN1 on the ULN2003 driver 1
#define motorPin2  5     // IN2 on the ULN2003 driver 1
#define motorPin3  6     // IN3 on the ULN2003 driver 1
#define motorPin4  7     // IN4 on the ULN2003 driver 1

#define motorPin5  8     // IN1 on the ULN2003 driver 2
#define motorPin6  9     // IN2 on the ULN2003 driver 2
#define motorPin7  10    // IN3 on the ULN2003 driver 2
#define motorPin8  11    // IN4 on the ULN2003 driver 2

// Initialize with pin sequence IN1-IN3-IN2-IN4 for using the AccelStepper with 28BYJ-48
AccelStepper stepper1(HALFSTEP, motorPin1, motorPin3, motorPin2, motorPin4);
AccelStepper stepper2(HALFSTEP, motorPin5, motorPin7, motorPin6, motorPin8);

byte up[8] = {
  0b00000,
  0b00100,
  0b01110,
  0b10101,
  0b00100,
  0b00100,
  0b00100,
  0b00000
};

byte down[8] = {
  0b00000,
  0b00100,
  0b00100,
  0b00100,
  0b10101,
  0b01110,
  0b00100,
  0b00000
};

byte right[8] = {
  0b00000,
  0b00100,
  0b00010,
  0b11111,
  0b10010,
  0b10100,
  0b10000,
  0b00000
};

byte left[8]  = {
  0b00000,
  0b00100,
  0b01000,
  0b11111,
  0b01001,
  0b00101,
  0b00001,
  0b00000
};

byte pause[8] = {
  0b00000,
  0b00000,
  0b00000,
  0b00000,
  0b00000,
  0b10001,
  0b11111,
  0b00000
};

int upArrow = 0;
int downArrow = 1;
int rightArrow = 3;
int leftArrow = 2;
int pauseState = 4;

// Stepper motors setup
int turnSteps = 1240; // number of steps for a 90 degree turn. 8,6cm wheels
int lineStepsCM = 145; // number of steps to do 1cm
int pauseDelay = 3000; // delay for pause state
int stepDelay = 800; // delay between 2 movements
int stepperSpeed = 900; //speed of the stepper (steps per second)
int steps1 = 0; // keep track of the step count for motor 1
int steps2 = 0; // keep track of the step count for motor 2

int stepLength = 0;
int newStepLength = 20;
boolean stepLengthChanged = false;
int rotation = 0;

// Movements storage and read
const int maxOrders = 32;
int orders[maxOrders];
int orderCount = 0;
int orderSaved = 0;
int orderLaunched = 0;
boolean isMoving = false;
int col = 0;
int row = 0;

String btOrders[] = {"", "/\\ ", "\\/ ", "<- ", "-> ", "_ "};

  /*
   * 0 : go
   * 1 : up
   * 2 : down
   * 3 : right
   * 4 : left
   * 5 : pause
   * 6 : clear
   * 7 : clear all
   * -1 : nothing
  */
int buttonsMap[]= {
   3, 0,-1, 6,-1, 4,-1, 1, 5, 2,-1,-1,
  -1,-1,-1, 7,-1,-1,-1,-1,-1,-1,-1,-1
  };
  
int LONG_CLICK_DELAY = 500;
int DEBOUNCING_DELAY = 200;
int lastButton = -1;
unsigned long lastClick = 0;  
int getPressedButton() {
  int raw = analogRead(KEYS_PIN);
  int b = -1;
  if (raw>=472) {
    if (raw>=981) {
      b=1;      
    } else if (raw>=894 && raw<=966) {
      b=2;
    } else if (raw>=823 && raw<877) {
      b=3;
    } else if (raw>=763 && raw<=817) {
      b=4;
    } else if (raw>=707 && raw<=753) {
      b=5;
    } else if (raw>=662 && raw<=698) {
      b=6;
    } else if (raw>=622 && raw<=698) {
      b=7;
    } else if (raw>=586 && raw<=614) {
      b=8;
    } else if (raw>=556 && raw<=584) {
      b=9;
    } else if (raw>=526 && raw<=554) {
      b=10;
    } else if (raw>=501 && raw<=519) {
      b=0;
    } else if (raw>=472 && raw<=508) {
      b=11;
    }
        
    unsigned long currentClick=millis();
    if (lastButton != b) {
      if (currentClick > lastClick + DEBOUNCING_DELAY) {
        lastClick = currentClick;
        lastButton = b;
      } else {
        b = -1;
      }
    } else {
      if (currentClick > lastClick + LONG_CLICK_DELAY) {
        lastButton = b;
        b = b+12;
        lastClick = currentClick;
      } else {
        b = -1;
      }
    }
  } else {
    lastButton=-1;
  }
  
  return b;
}

int loadStepLength() {
  Serial.println(F("loadStepLength"));
  return EEPROM.read(0);
}

void saveStepLength(int stepLength) {
  Serial.println(F("saveStepLength"));
  EEPROM.write(0, stepLength);
}

int lastLedHight=0;

void setup() {
  Serial.begin(9600);
  pinMode (KEYS_PIN, INPUT);

  // Rotary encoder init
  pinMode (CLK, INPUT);
  pinMode (DT, INPUT);
  pinMode (BUTTON , INPUT);
  digitalWrite(BUTTON, HIGH);      
   
  // Bluetooth module init
  #if HAVE_BLUETOOTH
  pinMode(RxD, INPUT);
  pinMode(TxD, OUTPUT);
  BTSerie.begin(9600);  //57600
  #endif
  
  rotation = digitalRead(CLK);

  // LCD init
  //lcd.begin();
  lcd.init();
  lcd.createChar(upArrow, up);
  lcd.createChar(downArrow, down);
  lcd.createChar(rightArrow, right);
  lcd.createChar(leftArrow, left);
  lcd.createChar(pauseState, pause);
  //lcd.setBacklightPin(BACKLIGHT_PIN,POSITIVE);
  lcd.setBacklight(LOW);
  lcd.clear(); // go home

  // stepper motors init
  stepper1.setMaxSpeed(2000.0);
  stepper1.move(1);  // I found this necessary
  stepper1.setSpeed(stepperSpeed);
  stepper2.setMaxSpeed(2000.0);
  stepper2.move(-1);  // I found this necessary
  stepper2.setSpeed(stepperSpeed);

  stepLength = loadStepLength();
  if (stepLength > 50 || stepLength < 5) {
    stepLength = 20;
  }
  newStepLength = stepLength;
  Serial.println(stepLength);
  lastLedHight=millis();

  displayStepLength();
}

void displayStepLength() {
  lcd.setBacklight(HIGH);
  lcd.clear();
  lcd.print(newStepLength);
  lcd.print(" cm");
  Serial.print(F("new stepLength="));
  Serial.print(newStepLength);
  Serial.println(F(" cm"));
}

void btDisplayOrders() {
  #if HAVE_BLUETOOTH
  for (int i=0;i<orderSaved; i++) {
    BTSerie.print(btOrders[orders[i]]);
  }
  BTSerie.println();
  #endif
}

int mode=0;

void loop() {
  //Serial.println(digitalRead(BUTTON));
  //delay(50);
  int buttonNotPressed= digitalRead(BUTTON);
  //Serial.println(buttonNotPressed);
  int value = digitalRead(CLK);
  if (value != rotation) { // we use the DT pin to find out which way we turning.
    if (digitalRead(DT) != value) {  // Clockwise
      newStepLength++;
      if (newStepLength > 50) {
        newStepLength = 50;
      }
    } else { //Counterclockwise
      newStepLength--;
      if (newStepLength < 5) {
        newStepLength = 5;
      }
    }
    lastLedHight=millis();

    Serial.print("Encoder RotPosition: ");
    Serial.println(newStepLength);
  }
  rotation = value;

  if (orderSaved == 0 && !isMoving && (stepLength == 0 || newStepLength != stepLength)) {
    stepLength = newStepLength;
    displayStepLength();
    stepLengthChanged = true;
  }

  int activeButton = getPressedButton();
 
  char recvChar;
  #if HAVE_BLUETOOTH
  if (BTSerie.available()) {
        recvChar = BTSerie.read();
        switch ( recvChar ) {
          case 'u' :
            activeButton=1;
            break;
          case 'd' :
            activeButton=2;
            break;
          case 'l' :
            activeButton=3;
            break;
          case 'r' :
            activeButton=4;
            break;
          case 'p' :
            activeButton=5;
            break;
          case 'g' :
            activeButton=0;
            break;
          case 'e' :
            activeButton=6;
            break;
        }
  }
  #endif
  if (activeButton >= 0) {
    activeButton=buttonsMap[activeButton];
    
    Serial.println(activeButton);
    switch (activeButton) {
      case 0:
        isMoving = true;
        orderLaunched = 0;
        lcd.clear();
        col = 0;
        lcd.setBacklight(LOW);
        launchNextOrder();
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        if (orderSaved == 0) {
          lcd.clear();
          if (stepLengthChanged) {
            saveStepLength(newStepLength);
            stepLengthChanged = false;
          }
        }
        col = orderSaved % 16;
        row = orderSaved / 16;
        lcd.setCursor(col, row);
        lcd.setBacklight(HIGH);
        if (orderSaved >= maxOrders) {
          #if HAVE_BLUETOOTH
          BTSerie.println("too many orders");
          #endif
          Serial.println(F("too many orders"));
        } else {
          lcd.printByte(activeButton - 1);
          orders[orderSaved] = activeButton;
          orderSaved++;
          btDisplayOrders();
        }
        lastLedHight=millis();
        break;
      case 6:
        Serial.println(F("clear"));
        lcd.setBacklight(HIGH);
        if (isMoving) {
          disableMotors();
          isMoving=false;
          lcd.clear();
          lcd.setBacklight(HIGH);
          lcd.print("arret !");
          #if HAVE_BLUETOOTH
          BTSerie.println("arret !");
          #endif
          delay(stepDelay * 2);
          displayLastOrders();
          btDisplayOrders();
          lastLedHight=millis();
        } else {
          orderSaved--;
          if (orderSaved < 0) {
            orderSaved = 0;
          }
          col = orderSaved % 16;
          row = orderSaved / 16;
          lcd.setCursor(col, row);
          lcd.print(" ");
          btDisplayOrders();
        }
        lastLedHight=millis();
        break;
      case 7:
        Serial.println(F("clear all"));
        lcd.setBacklight(HIGH);
        orderSaved = 0;
        lcd.clear();
        lcd.setCursor(col, row);
        col = 0;
        row = 0;
        lastLedHight=millis();
        disableMotors();
        break;
    }
  }
  if (isMoving) {
    if (isOrderTerminated()) {
      Serial.println(F("step delay"));
      if (! launchNextOrder()) {
        Serial.println(F("program terminated"));
        //orderSaved = 0;
        isMoving = false;
        disableMotors();
        lcd.clear();
        lcd.setBacklight(HIGH);
        lcd.print("fin !");
        #if HAVE_BLUETOOTH
        BTSerie.println("fin !");
        #endif
        delay(stepDelay * 2);
        displayLastOrders();
        btDisplayOrders();
        lastLedHight=millis();
        //lcd.setBacklight(LOW);
      } else {
      }
    }
  } else {
    if (orderSaved==0 && millis()>lastLedHight+3000) {
      lcd.setBacklight(LOW);  
    }
  }
}

void displayLastOrders() {
  lcd.clear();

  for (int i = 0; i < orderSaved; i++) {
    col = i % 16;
    row = i / 16;
    lcd.setCursor(col, row);
    lcd.printByte(orders[i] - 1);
  }
}

boolean launchNextOrder() {
  if (orderLaunched >= orderSaved) {
    return false;
  } else {
    disableMotors();
    lcd.clear();
    lcd.setBacklight(HIGH);
    lcd.print((orderLaunched + 1));
    lcd.print(" sur ");
    lcd.print(orderSaved);
    lcd.print(" : ");
    lcd.printByte(orders[orderLaunched] - 1);

    #if HAVE_BLUETOOTH
    BTSerie.print("etape ");
    BTSerie.print((orderLaunched + 1));
    BTSerie.print(" sur ");
    BTSerie.print(orderSaved);
    BTSerie.print(" : ");
    BTSerie.println(btOrders[orders[orderLaunched]]);
    #endif
    
    delay(stepDelay);
    lcd.setBacklight(LOW);

    enableMotors();

    switch (orders[orderLaunched]) {
      case 1:
        Serial.println(F("stepForward"));
        stepForward();
        break;
      case 2:
        Serial.println(F("stepBackward"));
        stepBackward();
        break;
      case 3:
        Serial.println(F("turnLeft"));
        turnLeft();
        break;
      case 4:
        Serial.println(F("turnRight"));
        turnRight();
        break;
      case 5:
        Serial.println(F("pause"));
        delay(pauseDelay);
        break;
    }
    orderLaunched++;
    return true;
  }
}

boolean isOrderTerminated() {
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


void stepForward() {
  isMoving = true;
  int target = stepLength * lineStepsCM;
  stepper1.move(-target);
  stepper1.setSpeed(stepperSpeed);
  stepper2.move(target);
  stepper2.setSpeed(stepperSpeed);
}

void stepBackward() {
  isMoving = true;
  int target = stepLength * lineStepsCM;
  stepper1.move(target);
  stepper1.setSpeed(stepperSpeed);
  stepper2.move(-target);
  stepper2.setSpeed(stepperSpeed);
}

void turnLeft() {
  isMoving = true;
  int target = turnSteps;
  stepper1.move(target);
  stepper1.setSpeed(stepperSpeed);
  stepper2.move(target);
  stepper2.setSpeed(stepperSpeed);
}

void turnRight() {
  isMoving = true;
  int target = turnSteps;
  stepper1.move(-target);
  stepper1.setSpeed(stepperSpeed);
  stepper2.move(-target);
  stepper2.setSpeed(stepperSpeed);
}

