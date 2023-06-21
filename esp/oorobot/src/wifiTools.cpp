//----------------------------------------------
//
//      wifiTools.cpp
//
//----------------------------------------------

#include <Arduino.h>
#include <SPI.h>
#include <WiFi.h>
#include <WebServer.h>

#include "afficheur.hpp"

WebServer server(80);
int cptTryWifi = 0;
bool wifiConnected = false;
char ipLocale[50] = "";
char ipGateway[50] = "";
String webPageStyle = "";

//----------------------------------------------
//
//          deconnecteWifi
//
//----------------------------------------------
void deconnecteWifi(){
    //Serial.println("deconnecteWifi => debut");
    if (WiFi.status() == WL_CONNECTED){
        //Serial.println("deconnecteWifi => try");
        delay(100);
        WiFi.disconnect();
        //Serial.println("deconnecteWifi => OK");
    }
    //Serial.println("deconnecteWifi => fin");
    wifiConnected = false;
}

//----------------------------------------------
//
//      getIpAdresse
//
//----------------------------------------------
char *getIpAdresse(void)
{
    return ipLocale;
}

//----------------------------------------------
//
//      refreshWifi
//
//----------------------------------------------
void refreshWifi(void)
{
    // test si requete http reçue 
    //Serial.print("debut refreshWifi\n");
    server.handleClient();
    //Serial.print("fin refreshWifi\n");
}

//----------------------------------------------
//
//      wifiNotFound
//
//----------------------------------------------
void handlePageNotFound(void){
    Serial.println("handlePageNotFound");
    String page = "Page inexistante";
    page += "\n";
    page += "\n";
    Serial.println(page);
    server.send(404, "text/plain", page);
}

//----------------------------------------------
//
//      handleRoot
//
//----------------------------------------------
void handleRoot() {
    Serial.println("affichage page root");
    String page = "<!DOCTYPE html>\n";
    page += webPageStyle;

    page += "<html lang='fr'>\n";
    page += "<body>\n";
    page += "    <h1> Projet OoRoBoT </h1>\n";
    page += "</body>\n";
    page += "</html>\n";  // Fin de la page HTML

    server.setContentLength(page.length());  // Permet l'affichage plus rapide après chaque clic sur les boutons
    server.send(200, "text/html", page);
}

//=================================================
//
//      initWifi
//
//=================================================
bool initWifi(char *wifiSsid, char *wifiPwd){
    Serial.println("======================");
    Serial.println("     Init Wifi        ");
    Serial.println("----------------------");
    WiFi.mode(WIFI_STA);

    ecritAfficheur(1,0, (char *)"init wifi ....");

    WiFi.disconnect();
    delay(100);
    //Serial.println("initWifi => check wifi status");
    if (WiFi.status() == WL_NO_SHIELD){
        Serial.println("initWifi => ERROR : No shield detected !!");
        Serial.print("error code = ");
        Serial.println(WiFi.status());
        wifiConnected = false;
        return false;
    }
    Serial.println("initWifi => a shield is detected");
    delay(1000);
    deconnecteWifi();
    delay(1000);
    cptTryWifi = 0;
    // Connect to WiFi network
    Serial.print("initWifi => Connecting to ");
    Serial.print(wifiSsid);
    delay(100);
    WiFi.begin(wifiSsid, wifiPwd);
    int cpt=0;
    int cpt2=0;
    int connected = WiFi.status() != WL_CONNECTED;
    Serial.print(" ");
    while (connected) {  //Attente de la connexion
        delay(500);
        //sprintf(buffer,"ssid = %s, pwd = %s", mesDonneesCapteurs.liveboxSsid, mesDonneesCapteurs.liveboxPwd); Serial.println(buffer);
        //Serial.print("wifiStatus = "); Serial.println(connected);
        //WiFi.begin(mesDonneesCapteurs.liveboxSsid, mesDonneesCapteurs.liveboxPwd);
        Serial.print(".");   //Typiquement 5 à 10 points avant la connexion
        if (cpt++ >= 10){
            Serial.println();
            cpt=0;
        }
        if (cpt2++ > 20){
            break;
        }
        connected = WiFi.status() != WL_CONNECTED;
    }
    if (cpt2 > 20){
        // on a  fait 20 tentatives
        // imposible de se connecter au wifi !
        Serial.println("\ninitWifi => Wifi non connecte");
        wifiConnected = false;
        return false;
    } else {
        // on a reussit a se connecter au wifi
        Serial.println("");
        Serial.println("initWifi => WiFi connecte");
    }
    // Print the IP address
    Serial.print("initWifi => ip locale = ");
    IPAddress tmpIp = WiFi.localIP();
    sprintf(ipLocale,"%d.%d.%d.%d",tmpIp[0],tmpIp[1],tmpIp[2],tmpIp[3]); Serial.println(ipLocale);

    //IPAddress gatewayIp = WiFi.gatewayIP();
    tmpIp = WiFi.gatewayIP();
    sprintf(ipGateway,"initWifi => gateway = %d.%d.%d.%d",tmpIp[0],tmpIp[1],tmpIp[2],tmpIp[3]); Serial.println(ipGateway);
    Serial.println((String)"initWifi => RSSI = " + WiFi.RSSI() + " db");
    wifiConnected = true;

    server.begin();
    server.onNotFound(handlePageNotFound);
    server.on("/", handleRoot);

    ecritAfficheur(1,0,(char *)"Wifi OK");

    webPageStyle = "<style>";
    webPageStyle += "	table {";
    webPageStyle += "  		padding: 10px;";
    webPageStyle += "  		border: 1px solid black;";
    webPageStyle += "		border-collapse: collapse;";
	webPageStyle += "		width:100%;";
    webPageStyle += "		height:100%;";
	webPageStyle += "	}";
    webPageStyle += "	th, td {";
    webPageStyle += "  		padding: 10px;";
    webPageStyle += "  		border: 1px solid black;";
    webPageStyle += "		border-collapse: collapse;";
	webPageStyle += "	}";
    webPageStyle += "	html{";
	webPageStyle += "		margin-left:5%;";
    webPageStyle += "		margin-right:15%;";
    webPageStyle += "		margin-down:15%;";
	webPageStyle += "		width:100%;";
    webPageStyle += "		font-size:40px;";
    webPageStyle += "   }";
    webPageStyle += "	body{";
	webPageStyle += "		margin-left:5%;";
    webPageStyle += "		margin-right:5%;";
	webPageStyle += "		width:90%;";
    webPageStyle += "		height:100%;";
    webPageStyle += "   }";
	webPageStyle += "	div{";
	webPageStyle += "		width:100%;";
    webPageStyle += "		height:100%;";
    webPageStyle += "		margin-left:auto;";
    webPageStyle += "		margin-right:auto;";
    //webPageStyle += "		max-width:2000px;";
    webPageStyle += "	}";
    webPageStyle += "</style>";
    webPageStyle += "<head>";
    webPageStyle += "   <meta charset='utf8'>";
    webPageStyle += "</head>";

    return true;
}