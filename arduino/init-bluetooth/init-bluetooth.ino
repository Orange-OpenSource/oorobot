  //**********************************************
// bluetooth HC06 ZS-040 Module configuraiton
// You must connect the EN entry before power up the module bluetooth to send AT commands
// based on http://nicolasz68.blogspot.fr/2012/09/module-bluetooth-jy-mcu-v104-pour.html
//
//
//***********************************************/
#include <SoftwareSerial.h>
#include <Servo.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

#define RxD 12
#define TxD 13
SoftwareSerial BTSerie(RxD,TxD); 

String deviceSuffix="OoRoBoT-";
String pin = "0000";
Servo penServo;

static const char s[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
int i=0;
String deviceName;

void setup() 
{ 
  randomSeed(analogRead(A1));
  deviceName=deviceSuffix+s[random(strlen(s)-1)]+s[random(strlen(s)-1)]+s[random(strlen(s)-1)]+s[random(strlen(s)-1)];
  lcd.init();
  lcd.backlight();

  Serial.begin(9600);
  delay(500); 
  penServo.attach(3);
  penServo.write(0);
  delay(500);
  penServo.detach();
  // Bluetooth module init
  pinMode(RxD, INPUT); 
  pinMode(TxD, OUTPUT); 
  BTSerie.begin(38400); // Change it after previous baud configuration
} 
void loop() 
{ 
  char recvChar;
  if (i==0) {
    delay(600);
    Serial.println("Set name to "+deviceName);
    BTSerie.print("AT+NAME="+deviceName+"\r\n");
    lcd.print("Nom="+deviceName);
    delay(1000);
  } else if (i==1) {
    Serial.println("Set PIN Code to "+pin);
    BTSerie.print("AT+PSWD=\""+pin+"\"\r\n");
    lcd.setCursor(0, 1);  
    lcd.print("Code="+pin);
    delay(1000);
  } else if (i==2) {
    Serial.println("Set baud rate to 9600");
    BTSerie.print("AT+UART=9600,0,0\r\n");
    delay(1000);
  } else if (i==3) {
    Serial.println("Pret pour d'autres commandes AT"); 
    i++;
  } else if (i==4) {
    if (Serial.available()) { 
      recvChar = Serial.read(); 
      BTSerie.write(recvChar); 
    }         
  }
          
  bool c=false;
  while (BTSerie.available()) {
    recvChar = BTSerie.read(); 
    Serial.print(recvChar);
    c=true;
  } 
  if (c) {
    if (i<4) {
      i++;
     }
    Serial.println("");
  }
} 

