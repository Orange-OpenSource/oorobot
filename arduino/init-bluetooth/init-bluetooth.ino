  //**********************************************
// bluetooth HC06 Module configuraiton
// based on http://nicolasz68.blogspot.fr/2012/09/module-bluetooth-jy-mcu-v104-pour.html
//
//
//***********************************************/
#include <SoftwareSerial.h>
#include <Servo.h>

#define RxD 12
#define TxD 13
SoftwareSerial BTSerie(RxD,TxD); 

String deviceSuffix="OoRoBoT-";
String pin = "0000";
Servo penServo;

/*
1 Sets the baud rate to 1200
2 Sets the baud rate to 2400
3 Sets the baud rate to 4800
4 Sets the baud rate to 9600
5 Sets the baud rate to 19200
6 Sets the baud rate to 38400
7 Sets the baud rate to 57600
8 Sets the baud rate to 115200
9 Sets the baud rate to 230400
A Sets the baud rate to 460800
B Sets the baud rate to 921600
C Sets the baud rate to 1382400    
*/
String baud = "4";

static const char s[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
int i=0;
String deviceName;

void setup() 
{ 
  randomSeed(analogRead(A1));
  deviceName=deviceSuffix+s[random(strlen(s)-1)]+s[random(strlen(s)-1)]+s[random(strlen(s)-1)]+s[random(strlen(s)-1)];
  
  Serial.begin(9600);
  delay(500); 
  penServo.attach(3);
  penServo.write(0);
  delay(500);
  penServo.detach();
  // Bluetooth module init
  pinMode(RxD, INPUT); 
  pinMode(TxD, OUTPUT); 
  BTSerie.begin(9600); // Change it after previous baud configuration
} 
void loop() 
{ 
  char recvChar;
  if (i==0) {
    Serial.println("Set name to "+deviceName);
    BTSerie.print("AT+NAME"+deviceName);
    delay(1000);
  } else if (i==1) {
    Serial.println("Set PIN Code to "+pin);
    BTSerie.print("AT+PIN"+pin);    
    delay(1000);
  } else if (i==2) {
    Serial.println("Set baud to "+baud);
    BTSerie.print("AT+BAUD"+baud);
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

