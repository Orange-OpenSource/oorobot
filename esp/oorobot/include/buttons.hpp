//----------------------------------------------
//
//      buttons.hpp
//
//----------------------------------------------

#ifndef __BUTTONS__
#define __BUTTONS__

    #define KEYS_PIN A0

    extern int getPressedButton();
    extern void setupButtons();
    extern char getButtonMap(int buttonId);

#endif