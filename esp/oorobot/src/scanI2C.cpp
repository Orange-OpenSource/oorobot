//----------------------------------------------
//
//      scanI2C.cpp
//
//----------------------------------------------

#include <Arduino.h>
#include <Wire.h>

//----------------------------------------------
//
//      scanI2C
//
//----------------------------------------------
void scanI2C(void){
    int address, error;
    char addressHexa[10];
    int addressfound[100], idx=0;

    Serial.println("============================");
    Serial.println("          scanI2C           ");
    Serial.println("----------------------------");
    Wire.begin();
    // Scan I2C bus to find LCD address
    for (address = 1; address < 127; address++ ) {
        sprintf(addressHexa, "0x%02x", address);
        //Serial.print ("test I2C sur port : "); Serial.print(addressHexa);
        Wire.beginTransmission(address);
        //delay(10);
        error = Wire.endTransmission();
        if (error == 0) {
            addressfound[idx++] = address;
            //Serial.println(" => ok");
        } else {
            //Serial.println();
        }
    }
    if (idx > 0){
        Serial.print(F("I2C found : "));
        for (int i = 0 ; i < idx ; i++){
            sprintf(addressHexa, "0x%02x", addressfound[i]);
            Serial.print(addressHexa);
            Serial.print(", ");
        }
        Serial.println();
    } else {
        Serial.println(F("erreur : I2C not found "));
    }
    Serial.println("fin scan I2C");
    Serial.println("----------------------------");
}