//----------------------------------------------
//
//      wifiTools.hpp
//
//----------------------------------------------


#include <WebServer.h>

#ifndef __WIFITOOLS__
#define __WIFITOOLS__

    extern WebServer server;
    extern String webPageStyle;
    extern bool initWifi(char *ssid, char *pwd);
    extern void refreshWifi(void);
    extern char *getIpAdresse(void);

#endif