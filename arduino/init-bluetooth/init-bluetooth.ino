  //**********************************************
// bluetooth HC06 ZS-040 Module configuraiton
// You must connect the EN entry before power up the module bluetooth to send AT commands
// based on http://nicolasz68.blogspot.fr/2012/09/module-bluetooth-jy-mcu-v104-pour.html
//
//
//***********************************************/
#include <EEPROM.h>
#include <SoftwareSerial.h>
#include <Servo.h>
#include <LiquidCrystal_I2C.h>

struct Params {
  int stepCm;
  int turnSteps;
  int lineSteps;
  char btName[16];
};

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
bool btFound = false;

void setup() 
{ 
  randomSeed(analogRead(A1));
  deviceName=deviceSuffix+s[random(strlen(s)-1)]+s[random(strlen(s)-1)]+s[random(strlen(s)-1)]+s[random(strlen(s)-1)];
  
  //Pour choisir vous même le nom du robot, décommentez la ligne suivante (enlever les //) et changez le "OoRoBoT-MATT" par ce que vous voulez (ne pas depasser 16 caractères)
  //deviceName="OoRoBoT-MATT";

  lcd.init();
  lcd.backlight();

  Serial.begin(9600);
  delay(500); 
  penServo.attach(3);
  penServo.write(0);
  delay(500);
  penServo.detach();
  pinMode(RxD, INPUT); 
  pinMode(TxD, OUTPUT); 
  lcd.print("Recherche");
  lcd.setCursor(0, 1);
  lcd.print("Bluetooth: 9600");
  BTSerie.begin(9600); 
} 
void loop() 
{ 
  if (!btFound && millis() > 8000) {
    // Certain module bluetooth communique par défaut à 38400 bauds.
    // On essaye cette vitesse après 8s 
    lcd.clear();
    lcd.print("Recherche");
    lcd.setCursor(0, 1);
    lcd.print("Bluetooth: 38400");
    BTSerie.begin(38400);
  }
  if (!btFound && millis() > 16000) {
    // Si au bout de 16s on n'a toujours pas eu de retour du module bluetooth
    // On affiche une erreur : il faut surement faire un pont sur le module
    // entre les VCC (+5V) et EN pour qu'il soit prêt à recevoir des commandes de configuration
    lcd.clear();    
    lcd.print("Pb: Verifier");
    lcd.setCursor(0, 1);
    lcd.print("pont EN->VCC");
  }
  char recvChar;
  if (i==0) {
    delay(600);
    Serial.println("Try to set name to "+deviceName);
    BTSerie.print("AT+NAME="+deviceName+"\r\n");
    delay(1000);
  } else if (i==1) {
    Serial.println("Try to set PIN Code to "+pin);
    BTSerie.print("AT+PSWD=\""+pin+"\"\r\n");
    delay(1000);
  } else if (i==2) {
    Serial.println("Try to set baud rate to 9600");
    BTSerie.print("AT+UART=9600,0,0\r\n");
    delay(1000);
  } else if (i==3) {
    Serial.println("Ready for other AT commands"); 
    i++;
  } else if (i==4) {
    if (Serial.available()) { 
      recvChar = Serial.read(); 
      BTSerie.write(recvChar); 
    }         
  }
  char res[32] = {};
  int j=0;
  while (BTSerie.available()) {
    recvChar = BTSerie.read();
    //Serial.print(recvChar);
    if (recvChar>32 && recvChar < 128) {
      res[j]=recvChar;
      j++;
    }
  } 
  res[j]=0;
  if (strlen(res) > 0) {
    btFound=true;
    Serial.print("Res:");
    Serial.println(res);
    if (strcmp(res, "OK") == 0) {
      if (i==0) {
        lcd.clear();
        // Le nom du module a bien été modifié
        // On l'affiche sur l'écran LCD
        lcd.print("Nom="+deviceName);
      }
      if (i==2) {
        lcd.setCursor(0, 1);
        Serial.println("Conf OK");  
        char btName[16];
        deviceName.toCharArray(btName, 16);
        Params params = {140, 1430, 100};
        strcpy(params.btName, btName);
        EEPROM.put(0, params);
        lcd.print("Conf. OK");
      }      
      if (i<4) {
        i++;
      }
    }
  }
} 

