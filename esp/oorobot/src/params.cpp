//----------------------------------------------
//
//      params.cpp
//
//----------------------------------------------

#include <Arduino.h>
#include <EEPROM.h>

#include "params.hpp"

Params params = {140, 1430, 100, ""};

//----------------------------------------------
//
//      saveParams
//
//----------------------------------------------
void saveParams() {
    EEPROM.put(0, params);
    Serial.println("======================");
    Serial.println("     saveParams       ");
    Serial.println("----------------------");
}

//----------------------------------------------
//
//      loadParams
//
//----------------------------------------------
void loadParams() {
    Params savedParams;

    Serial.println("======================");
    Serial.println("     LoadParams       ");
    Serial.println("----------------------");

    EEPROM.get(0, savedParams);

    if (savedParams.btName[0] >= 48) {
        strcpy(params.btName, savedParams.btName);
    } else {
        strcpy(params.btName, "");
    }

    if (savedParams.stepCm > 0 && savedParams.stepCm < 500) {
        params.stepCm = savedParams.stepCm;
    } else {
        params.stepCm = 140;
    }
    if (savedParams.turnSteps > 0 && savedParams.turnSteps < 5000) {
        params.turnSteps = savedParams.turnSteps;
    } else {
        params.turnSteps = 1250;
    }
    if (savedParams.lineSteps > 0 && savedParams.lineSteps < 500) {
        params.lineSteps = savedParams.lineSteps;
    } else {
        params.lineSteps = 140;
    }
}
