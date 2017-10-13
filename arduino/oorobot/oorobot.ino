/*    
 * OoRoBoT code
 * 
*/
#include <EEPROM.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <LiquidMenu.h>
#include <AccelStepper.h>

#define OOROBOT_VERSION "0.99"
#define KEYS_PIN A0

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

byte bullet[8] = {
  0b00000,
  0b00100,
  0b00010,
  0b11111,
  0b00010,
  0b00100,
  0b00000,
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
  
int LONG_CLICK_DELAY = 500;
int DEBOUNCING_DELAY = 300;
int lastButtonId = -1;
unsigned long lastClick = 0;
unsigned long lastRawPressed=0;
int getPressedButton() {
  int raw = analogRead(KEYS_PIN);
  int b = -1;
  if (raw>=472) {
    lastRawPressed=millis();
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
        b = b+12;
        lastClick = currentClick;
      } else {
        b = -1;
      }
    }
  } else {
    if (millis()-lastRawPressed>100) {
      lastButtonId=-1;
    }
  }
  return b;
}


LiquidMenu menu(lcd);

struct Params {
  int stepCm;
  int turnSteps;
};

int lineStepsCM = 145; // number of steps to do 1cm
int stepDelay = 800;
int stepperSpeed = 900; //speed of the stepper (steps per second)
int steps1 = 0; // keep track of the step count for motor 1
int steps2 = 0; // keep track of the step count for motor 2
int isMoving=false;

String buttonsMap[]= {
  "L", "G","s", "C","", "R","", "U", "P", "D","","",
  "-",  "", "S","A","","+", "", "",  "",  "","",""
};

Params params = {140, 1280};
int previousMenu=CTRL_MENU;
int selectedMenu=START_MENU;
String commands="";
int changeDisplay=1;
long lastChangeDisplay=0;
int selectedLine=0;
int commandLaunched=0;

void setup() {
  Serial.begin(9600);
  loadParams();
  
  pinMode(KEYS_PIN, INPUT);

  // This is the I2C LCD object initialization.
  lcd.init();
  lcd.backlight();
  lcd.createChar(1, up);
  lcd.createChar(2, down);
  lcd.createChar(4, right);
  lcd.createChar(3, left);
  lcd.createChar(5, pause);
  lcd.createChar(6, bullet);

  // stepper motors init
  stepper1.setMaxSpeed(2000.0);
  stepper1.move(1);  
  stepper1.setSpeed(stepperSpeed);
  stepper2.setMaxSpeed(2000.0);
  stepper2.move(-1); 
  stepper2.setSpeed(stepperSpeed);
}

void loop() {
  long currentTime = millis();
  int buttonId=getPressedButton();
  String button="";
  // Screen off after 4s
  if (currentTime>lastChangeDisplay+4000L) {
    if (selectedMenu!=OFF_MENU) {
      previousMenu=selectedMenu;
      selectedMenu=OFF_MENU;
      changeDisplay=1;
    }
  }  
  if (buttonId>=0) {
    button = buttonsMap[buttonId];
    if (button!="") {
      actionButtonForScreen(button);
    }
  }
  if (isMoving) {
    if (isCommandTerminated()) {
      Serial.println(F("step delay"));
      if (! launchNextCommand()) {
        Serial.println(F("program terminated"));
        //orderSaved = 0;
        isMoving = false;
        disableMotors();
        lcd.clear();
        lcd.setBacklight(HIGH);
        lcd.print("fin !");
        delay(stepDelay * 2);
        selectedMenu=CTRL_MENU;
        changeDisplay=1;
      }
    }
  }
  updateScreen();
}

void actionButtonForScreen(String button) {
    if (selectedMenu==START_MENU) {
      selectedMenu=CTRL_MENU;
      changeDisplay=1;
    } else if (selectedMenu==CTRL_MENU) {
      changeDisplay=1;
      if (button == "S") {
        selectedMenu=SETTINGS_MENU;
        changeDisplay=1;
      } else if (button == "G") {
        selectedMenu=RUNNING_MENU;
        isMoving = true;
        commandLaunched=0;
        launchNextCommand();
      } else if (button == "A") {          
        commands="";
      } else if (button == "C") {
        commands.remove(commands.length()-1);
      } else if (button != "" && button != "+" && button != "-" && button != "s") {
        commands+=button;
      } else {
        changeDisplay=0;
      }
    } else if (selectedMenu==SETTINGS_MENU){
      actionButtonForSettingsScreen(button);
    } else if (selectedMenu==RUNNING_MENU){
      disableMotors();
      isMoving=false;
      lcd.clear();
      lcd.setBacklight(HIGH);
      lcd.print("Arret!");
      delay(stepDelay * 2);
      selectedMenu=CTRL_MENU;
      changeDisplay=1;
    } else if (selectedMenu==OFF_MENU){
      selectedMenu=previousMenu;
      changeDisplay=1;
    }  
}

void actionButtonForSettingsScreen(String button) {
  changeDisplay=1;
  if (button=="U") {
    selectedLine++;
    selectedLine=selectedLine%2;
  } else if (button=="D") {
    selectedLine--;
    selectedLine=selectedLine%2;
  } else if (button=="R") {
    if (selectedLine==0) {
      params.stepCm++;
    } else {
      params.turnSteps++;
    }
  } else if (button=="+") {
    if (selectedLine==0) {
      params.stepCm+=10;
    } else {
      params.turnSteps+=10;
    }
  } else if (button=="L") {
    if (selectedLine==0) {
      params.stepCm--;
    } else {
      params.turnSteps--;
    }
  } else if (button=="-") {
    if (selectedLine==0) {
      params.stepCm-=10;
    } else {
      params.turnSteps-=10;
    }
  } else {
    if (button=="s" || button=="G") {
      saveParams();
    } else if (button == "C") {
      loadParams(); 
    }
    selectedMenu=CTRL_MENU;
  }
}

void updateScreen() {
  if (changeDisplay) {
    if (selectedMenu==START_MENU) {
      //lcd.setBacklight(HIGH);
      lcd.display();
      lcd.setCursor(0, 0);
      lcd.print("  OoRoBoT "+String(OOROBOT_VERSION));
      previousMenu=CTRL_MENU;
      selectedMenu=CTRL_MENU;      
    } else if (selectedMenu==CTRL_MENU) {
      lcd.setBacklight(HIGH);
      String c = displayCommands(commands);
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print(c.substring(0, 16));
      lcd.setCursor(0, 1);
      lcd.print(c.substring(16, 32));
    } else if (selectedMenu==SETTINGS_MENU){
      lcd.setBacklight(HIGH);
      lcd.setCursor(0, 0);
      int cm=params.stepCm/10;
      int mm = params.stepCm-10*cm;
      lcd.print(" Distance:"+String(cm)+"."+String(mm)+"cm");
      lcd.setCursor(0, 1);
      lcd.print(" 1 Tour:"+String(params.turnSteps)+"pas");
      lcd.setCursor(0, selectedLine);
      lcd.print("\6");
    } else if (selectedMenu==CTRL_MENU){
      lcd.setBacklight(HIGH);
    } else if (selectedMenu==OFF_MENU){
      lcd.setBacklight(LOW);
    }
    lastChangeDisplay=millis();
  }
  changeDisplay=0;
}

String displayCommands(String commandsS) {
    String c = commandsS;
    c.replace("U", "\1");
    c.replace("D", "\2");
    c.replace("L", "\3");
    c.replace("R", "\4");
    c.replace("P", "\5");
    return c;
}

boolean launchNextCommand() {
  if (commandLaunched >= commands.length()) {
    return false;
  } else {
    disableMotors();
    lcd.clear();
    lcd.setBacklight(HIGH);
    lcd.print((commandLaunched + 1));
    lcd.print(" sur ");
    lcd.print(commands.length());
    lcd.print(" : ");
    lcd.print(displayCommands(String(commands[commandLaunched])));
    delay(stepDelay);
    lcd.setBacklight(LOW);
    enableMotors();
    char currentCommand=commands[commandLaunched];
    switch (currentCommand) {
      case 'U':
        Serial.println(F("stepForward"));
        stepForward();
        break;
      case 'D':
        Serial.println(F("stepBackward"));
        stepBackward();
        break;
      case 'L':
        Serial.println(F("turnLeft"));
        turnLeft();
        break;
      case 'R':
        Serial.println(F("turnRight"));
        turnRight();
        break;
      case 'P':
        Serial.println(F("pause"));
        delay(params.turnSteps*2);
        break;
    }
    commandLaunched++;
    return true;
  }
}

boolean isCommandTerminated() {
  steps1 = stepper1.distanceToGo();
  steps2 = stepper2.distanceToGo();
  //Serial.println(steps1);
  //Serial.println(steps2);  
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
  int target = params.stepCm / 10 * lineStepsCM;
  target = target * -1;
  stepper1.move(-target);
  stepper1.setSpeed(stepperSpeed);
  stepper2.move(target);
  stepper2.setSpeed(stepperSpeed);  

}

void stepBackward() {
  isMoving = true;
  int target = params.stepCm / 10 * lineStepsCM;
  target = target * -1;
  stepper1.move(target);
  stepper1.setSpeed(stepperSpeed);
  stepper2.move(-target);
  stepper2.setSpeed(stepperSpeed);
}

void turnLeft() {
  isMoving = true;
  stepper1.move(params.turnSteps);
  stepper1.setSpeed(stepperSpeed);
  stepper2.move(params.turnSteps);
  stepper2.setSpeed(stepperSpeed);
}

void turnRight() {
  isMoving = true;
  stepper1.move(-params.turnSteps);
  stepper1.setSpeed(stepperSpeed);
  stepper2.move(-params.turnSteps);
  stepper2.setSpeed(stepperSpeed);
}

void saveParams() {
  EEPROM.put(0, params);  
}

void loadParams() {
  Params savedParams;
  EEPROM.get(0, savedParams);
  if (savedParams.stepCm>0 && savedParams.stepCm<500) {
    params.stepCm=savedParams.stepCm;
  }
  if (savedParams.turnSteps>0 && savedParams.turnSteps<5000) {
    params.turnSteps=savedParams.turnSteps;
  }
}


