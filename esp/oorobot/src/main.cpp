#include <Arduino.h>

#include "scanI2C.hpp"
#include "afficheur.hpp"
#include "wifiTools.hpp"
#include "params.hpp"
#include "buttons.hpp"
#include "moteurs.hpp"

char wifiSsid[50] = WIFISSID;
char wifiPwd[50] = WIFIPWD;

//=================================================
//
//      setup
//
//=================================================
void setup() {
  // initialize serial communication
  Serial.begin(115200);
  int timeoutInitSerial = 100;
  while (timeoutInitSerial-- > 0)
  {
      if (Serial)
          break;
      delay(10);
  }
  delay(1000);
  Serial.print("Serial initialized at ");
  Serial.print(MONITORSPEED);
  Serial.println(" bauds");
  Serial.println("+-------------------------------+");
  Serial.println("+                               +");
  Serial.println("+       Projet OoRoBoT          +");
  Serial.println("+                               +");
  Serial.println("+-------------------------------+");
  Serial.println("+        debut setup            +");
  Serial.println("+                               +");
  Serial.println("+-------------------------------+");
  scanI2C();
  initAfficheur();
  loadParams();
  setupButtons();
  initWifi(wifiSsid, wifiPwd);
  stepperInit();
  Serial.print("Connectez vous en wifi sur le routeur ");
  Serial.print(wifiSsid);
  Serial.print(" puis tapez l'adresse : http://");
  Serial.print(getIpAdresse());
  Serial.println("/");
  Serial.println("+-------------------------------+");
  Serial.println("+        fin setup              +");
  Serial.println("+                               +");
  Serial.println("+-------------------------------+");
}

//=================================================
//
//      loop
//
//=================================================
void loop() {
  refreshWifi();  
  int buttonId = getPressedButton();
  char button = 0;
  if (buttonId >= 0) {
    button = getButtonMap(buttonId);
    if (button != 0) {
      //actionButtonForScreen(button);
    }
  }
}
