//----------------------------------------------
//
//      afficheur.cpp
//
//----------------------------------------------


#include <Arduino.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#include "charset.h"

#define I2C_SDA 21
#define I2C_SCL 22

#define NB_LIGNES   2
#define NB_COLONNES 16

#define i2cDisplayPort 0x27
//#define i2cDisplayPort 0x3F

LiquidCrystal_I2C lcd(i2cDisplayPort,16,2);
char bufferLigne[NB_COLONNES + 1];
bool scanI2C = false;

//----------------------------------------------
//
//      ecritAfficheur
//
//----------------------------------------------
void ecritAfficheur(int ligne, int colonne, char *texte){
    for (int i = 0 ; i < NB_COLONNES ; i ++){
        if (i < (int)strlen(texte)){
            bufferLigne [i] = texte[i];
        } else {
            bufferLigne [i] = ' ';
        }
    }
    bufferLigne[NB_COLONNES] = '\0'; 
    lcd.setCursor(colonne,ligne);
    lcd.print(bufferLigne);
}

//----------------------------------------------
//
//      initAfficheur
//
//----------------------------------------------
void initAfficheur(void){
    Serial.println("======================");
    Serial.println("     Init Afficheur   ");
    Serial.println("----------------------");

    if (scanI2C){
        Wire.begin();
        //Wire.begin(I2C_SDA, I2C_SCL);

        byte error, address;
        int nDevices;
        Serial.println("initAfficheur => Scanning...");
        nDevices = 0;
        for(address = 1; address < 127; address++ ) {
            Wire.beginTransmission(address);
            error = Wire.endTransmission();
            if (error == 0) {
            Serial.print("initAfficheur => I2C device found at address 0x");
            if (address<16) {
                Serial.print("0");
            }
            Serial.println(address,HEX);
            nDevices++;
            }
            else if (error==4) {
            Serial.print("initAfficheur => Unknow error at address 0x");
            if (address<16) {
                Serial.print("0");
            }
            Serial.println(address,HEX);
            }    
        }
        if (nDevices == 0) {
            Serial.println("initAfficheur => No I2C devices found\n");
        }
        else {
            Serial.println("initAfficheur => done\n");
        }
        lcd=LiquidCrystal_I2C(address, 16, 2);
        delay(500);          
    }

    Serial.println("initAfficheur => initialisation LCD");
    lcd.init(); // initialize the lcd
    Serial.println("initAfficheur => lcd initialise");    
    lcd.setBacklight(HIGH); 
    lcd.createChar(1, up);
    lcd.createChar(2, down);
    lcd.createChar(4, right);
    lcd.createChar(3, left);
    lcd.createChar(5, myPause);
    lcd.createChar(6, bullet);
    lcd.createChar(7, agrave);
    ecritAfficheur(0, 0, (char *)"OoRoBoT");

    Serial.println("fin init afficheur");
    Serial.println("----------------------------");

}