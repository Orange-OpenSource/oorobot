
# Initiation à la programmation Arduino et ESP8266

---

## Avant de commencer

Il vous faudra télécharger l'environnement de développement (IDE) Arduino sur le site officiel : https://www.arduino.cc/en/Main/Software

Ceci n'est pas un cours d'électronique, nous passons sous silence un grand nombre de terminologie afin de pouvoir programmer rapidement un objet fonctionnel


![logo](https://pbs.twimg.com/profile_images/928655749605199872/ygogGX2j_400x400.jpg)

---

## Arduino

L'Arduino est une carte construite autour d'un microcontrôleur qui peut être programmé pour analyser et produire des signaux électriques de manière à effectuer des tâches très diverses comme la domotique (le contrôle des appareils domestiques - éclairage, chauffage…), le pilotage d'un robot, de l'informatique embarquée, etc.

![arduino](https://ae01.alicdn.com/kf/HTB11nPYOpXXXXbOapXXq6xXFXXXN/225552329/HTB11nPYOpXXXXbOapXXq6xXFXXXN.jpg?size=144900&height=1000&width=1000&hash=f5fd08d9de92dc32c720726cd0ea707a =50%x50%)

![arduino](https://ae01.alicdn.com/kf/HTB1EhFHb2NNTKJjSspeq6ySwpXaU.jpg =50%x50%)

Le plus simple est d'avoir un "shield" (bouclier) permettant d'avoir une alimentation (+5V, Ground) pour chaque broche afin de faciliter le câblage des composants.


---

## Branchement de l'Arduino

Pour programmer l'Arduino il suffit de le brancher sur un des ports USB de votre ordinateur. Vous devriez voir apparaître dans le menu "Outils/Port" une nouvelle entrée, sélectionnez là. Vérifiez ensuite que c'est bien un "Arduino Nano" qui est sélectionné dans le menu "Outils/Type de carte".

Tapez le programme suivant :
    
```C
void setup() {
  Serial.begin(9600);
  Serial.println("setup");
}
int i=0;
void loop() {
  Serial.print("loop ");
  Serial.println(i);
  i++;
  delay(1000);
}
```
Téléversez le programme sur l'Arduino (bouton en forme de fléche en haut de l'IDE).
Ouvrez le moniteur série (menu "Outils/Moniteur série" ou via le bouton en haut à droite de l'IDE), vous devriez voir apparaître toutes les secondes une nouvelle ligne.
 
---
## La structure d'un programme Arduino


Tous les programmes Arduino doivent respecter cette structure :
```C
// Vous pouvez déclarer les variables globales de votre script ici
int entier = 0;
void setup() {
  // Cette fonction sera lancée une seule fois au démarrage de l'Arduino
  // C'est ici que vous initialiserez les entrées et sorties de l'Arduino
  // Typiquement vous pouvez initialiser la liaison série
  // entre l'Arduino et votre ordinateur :
  Serial.begin(9600);
}


void loop() {

    // Cette fonction sera appelée continuellement après le setup

    // Pour déboguer la liaison série est pratique :

    Serial.println("Test");

    // La fonction "delay(X)" permet de mettre en pause

    // le programme pendant X ms

    delay(200);

}
```
A noter : quand vous utilsez la liaison série USB vous ne devez pas utiliser les broches 0 et 1.



---

## Allumer une DEL

La DEL (ou LED en anglais) est un composant simple s'allumant quand elle reçoit du courant. Nous allons commencer par brancher une DEL sur notre arduino. Pour cela prennez 2 fils.

Les DEL ont des tensions précises de fonctionnement (entre 2.2V et 3V selon leur couleur) mais les broches de l'Arduino fournissent du +5V, il faudra donc réduire l'alimentation des DEL en utilisant une résistance. Pour gagner du temps nous allons brancher directement nos DEL. Cela va réduire leur durée de vie mais dans le cadre de ce TP ça ne sera pas gếnant.


* Branchez un fil entre la patte courte de la DEL et la broche G du port 5 de l'Arduino
* Branchez un fil entre la patte longue de la DEL et la broche S du port 5 de l'Arduino

Téléversez le programme suivant. La DEL devrait clignoter!

Jouez avec la valeur inscrite dans les fonctions delay pour faire clignoter plus ou moins vite la DEL

```C
#define LED1 5

void setup() {
  pinMode(LED1, OUTPUT);
}
void loop() {
  digitalWrite(LED1, HIGH);
  delay(500);
  digitalWrite(LED1, LOW);
  delay(500);
}
```


---

## Utiliser un bouton


On va utiliser ici un bouton un peu particulier :

![bouton led](https://ae01.alicdn.com/kf/HTB1EpxhdRfM8KJjSZFhq6ARyFXad/Bouton-d-arcade-5-couleurs-lumi-re-LED-lampe-60-MM-45-MM-grand-rond-Arcade.jpg =50%x50%)

Ce bouton intégre en plus d'un contact on/off une DEL. N'hésitez pas à démonter le bouton pour voir la DEL intégrée.

Pour commencer on ne va n'utiliser que le bouton.

![vue eclatée](https://ae01.alicdn.com/kf/HTB1iuZ_j4HI8KJjy1zbq6yxdpXaS/Bouton-d-arcade-5-couleurs-lumi-re-LED-lampe-60-MM-45-MM-grand-rond-Arcade.jpg =50%x50%)

Récupérer les 2 fils venant de la partie centrale du bouton (le bloc rouge et noir sur la photo précédente) :
* Branchez le fil de la partie coudée sur la broche **G** du port 4
* Branchez l'autre fil sur la broche ***S*** du port 4

Téléversez le programme suivant et ouvrez le moniteur série :
    
```C
#define BUTTON_CLICK 4

void setup() {
  pinMode(BUTTON_CLICK, INPUT_PULLUP);  
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(BUTTON_CLICK)) {
    Serial.println("button appuye");

  } else {
    Serial.println("button appuye");
  }
  delay(400);
}
```
Quand vous appuyez sur le bouton, vous devriez voir apparaître l'état du bouton (appuyé ou relaché)

Vous remarquerez ici que l'on déclare le "port" en "INPUT_PULLUP", cela veut dire que l'Arduino va connecter une de ses résistances interne entre la broche V du port (reliée au 5V) et sa broche d'entrée (S). A compléter !!!!!!

On va maintenant utiliser la DEL intégrée. Débranchez la DEL précédemment branchée sur le port 5. Branchez ensuite le fil restant venant du bouton sur la broche **S** du port 5.

Téléverser le programme suivant :
```C
#define BUTTON_LED 5
#define BUTTON_CLICK 4

void setup() {
  pinMode(BUTTON_LED, OUTPUT);
  pinMode(BUTTON_CLICK, INPUT_PULLUP);
}

void loop() {
  // On allume la DEL quand on clique sur le bouton
  if (digitalRead(BUTTON_CLICK)) {
    digitalWrite(BUTTON_LED, HIGH);
  } else {
    digitalWrite(BUTTON_LED, LOW);
  }
}
```
Quand vous appuyerez sur le bouton la DEL devrait s'allumer.
    

---

## Utiliser un potentiomètre

Ce composant permet d'avoir une valeur analogique comprise entre 0 et 1023 selon la position du curseur. Il faut brancher ce type de composant analogique sur une des broches de A0 à A7.

![lcd](https://i2.cdscdn.com/pdt2/2/6/4/1/700x700/sou0712662893264/rw/commutateur-rotatif-sourcingmap-r-b10k-10k-ohm-si.jpg =50%x50%)


Détachez un groupe de 3 fils et positionnez le potentionmère comme sur la photo précédente :
* Branchez un fil entre la broche du millieu du potentiomètre et la broche ***S*** du port A6
* Branchez un fil entre la broche de droite du potentiomètre et la broche ***G*** du port A6
* Branchez un fil entre la broche de gauche du potentiomètre et la broche ***V*** du port A6

Téléversez le programme suivant et vérifiez que les valeurs s'affichent bien sur le moniteur série :
    
```C
#define POTAR A6

void setup() {
  pinMode(POTAR, INPUT);
  Serial.begin(9600);
}

void loop() {
  int val = analogRead(POTAR);
  Serial.print("val=");
  Serial.println(val);
  int percent = map(val, 0, 1023, 0, 100);
  Serial.print("percent=");
  Serial.println(percent);
  delay(400);
}
```


Proposition d'exercice : Faire varier le temps de clignotement d'une LED avec le potentiomètre

---

## Faire tourner un servomoteur

Un servomoteur est un petit moteur pouvant tourner précisément sur 180°.

![servo](https://ae01.alicdn.com/kf/HTB1QbQfmHSYBuNjSspfq6AZCpXaa.jpg =50%x50%)

Branchez directement la prise du servomoteur sur le port 8 de l'Arduino en faisant attention à ce que le fil marron soit sur la broche ***G*** du port 3, le fil rouge sur la broche ***V*** et le fil orange sur la broche ***S***

Téléversez le programme suivant : 
```C
#include <Servo.h>
#define SERVO 8

Servo myservo;
void setup() {
  myservo.attach(SERVO);
  myservo.write(0);
}

int deg = 0;
int inc = 1;
void loop() {
  myservo.write(deg);
  deg = deg + inc;
  if (deg > 180) {
    inc = -1;
    deg = 180;
  }
  if (deg < 0) {
    inc = 1;
    deg = 0;
  }
  delay(20);
}
```

La ligne *#include &lt;Servo.h&gt;* charge la bibliothèque permettant de piloter facilement un servomoteur. Cette bibliothèque est fournie avec l'IDE Arduino.


Exemple complémentaire : Faire tourner le servomoteur à partir de la valeur d'un potentiomètre (utilisation de la fonction [map](https://www.arduino.cc/reference/en/language/functions/math/map/) pour convertir les valeurs d'entrées du potentiomètre - de 0 à 1023 - en une valeur en degrée - de 0 à 180) :

```C
#include "Servo.h"
#define SERVO 8
#define POTAR A6

Servo myservo;

void setup() {
  pinMode(POTAR, INPUT);
  myservo.attach(SERVO);
  myservo.write(0);
}

void loop() {
  int val = analogRead(POTAR);
  Serial.print("val=");
  Serial.println(val);
  int deg = map(val, 0, 1023, 0, 180);
  myservo.write(deg);
  delay(10);
}
```

---

## Le Bus I²C

Le bus I²C permet de brancher plusieurs composants (esclaves) sur l'Arduino (maître). Vous trouverez plus d'informations sur  [la page Wikipédia sur le sujet](https://fr.wikipedia.org/wiki/I2C).

Il va nous permettre ici de brancher plusieurs composants supportant la norme I²C. Sur un Arduino Nano les ports I²C utilisent les ports A5 et A6, il ne faut donc pas brancher d'autres composants sur ces ports.

Comme vous aurez à brancher plusieurs composants I²C sur votre Arduino, nous vous avons fourni une rampe contenant 4 lignes. Chaque ligne contient 6 broches connectées entre elles (pont).

Prennez un groupe de 4 fils et branchez-les entre les broches **SCL**, **SDA**, **5V** et **GND** de l'Arduino et les 4 lignes de votre rampe. **A vous ensuite de faire en sorte de bien respecter le nom des broches lors du branchement des composants I²C**.

Pour cela le plus simple est de noter sur une feuille les couleurs des fils sortant des broches **SCL**, **SDA**, **5V** et **GND**  de votre Arduino :

* **SCL** : 
* **SDA** : 
* **5V** :
* **GND** :


---

## Afficher des informatios sur un écran LCD I²C

Les écrans LCD permettent d'afficher des informations facilement. La version présentée ici utilise une interface I²C .

Ces écrans nécessitent que l'on installe une bibliothèque nous permettant de les contrôler facilement. Pour cela dans l'IDE Arduino allez dans le menu "Croquis/Inclure une bibliothèque/Gérer les bibliothèques" puis cherchez et installez la bibliothèque suivante : **LiquidCrystal I2C v1.1.2 de Frank de Brabander**

![lcd](https://ae01.alicdn.com/kf/HTB1lQ0qu9BYBeNjy0Feq6znmFXas/10-pcs-SAMIORE-ROBOT-LCD1602-I2C-LCD-1602-module-cran-Bleu-IIC-I2C-pour-LCD1602-Adaptateur.jpg_640x640.jpg =50%x50%)

Détachez un groupe de 4 fils :
* Branchez un fil entre la broche ***SCL*** de l'écran et la broche ***SCL*** de votre rampe I²C
* Branchez un fil entre la broche ***SDA*** de l'écran et la broche ***SDA*** de votre rampe I²C
* Branchez un fil entre la broche ***GND*** de l'écran et la broche ***GND*** de votre rampe I²C
* Branchez un fil entre la broche ***VCC*** de l'écran et la broche ***5V*** de votre rampe I²C

Téléversez le programme suivant :
```C
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);
void setup() {
  lcd.init();
  lcd.setBacklight(HIGH); 
}
int index=0;
void loop() {
    lcd.clear();
    lcd.print("Ligne 1");
    lcd.setCursor(0, 1);
    lcd.print("Ligne 2 : ");
    lcd.print(index);
    if (index==10) {
      // On éteint le retroéclairage au bout de 10s
      lcd.setBacklight(LOW); 
    } else if (index==12) {
      // On allume le retroéclairage au bout de 12s
      lcd.setBacklight(HIGH); 
    }
    index++;
    delay(1000);
}
```



Vérifier le contraste de l'écran : ce dernier doit s'allumer au démarrage. Si vous ne voyez rien, pas de panique c'est peut-être tout simplement parce que le contraste est mal réglé. Pour changer ce paramètre il suffit de tourner le petit potentiomètre derrière l'écran avec un tournevis cruciforme jusqu'à obtenir un bon contraste entre l'affichage des caractères et le fond de l'écran


---


## Récupérer la pression atmosphérique et la température (I²C)

On va utiliser un composant I²C BMP280 afin de récupérer des informations sur la température et la pression atmosphérique.

Afin de gérer ce composant vous aurez besoin d'une nouvelle bibliothèque. Pour cela dans l'IDE Arduino allez dans le menu "Croquis/Inclure une bibliothèque/Gérer les bibliothèques" puis cherchez et installez la bibliothèque suivante : **BME280 by Tyler Glenn v2.3.0**

![bmc](https://ae01.alicdn.com/kf/HTB1_NQjkamWBuNjy1Xaq6xCbXXaY/10-pi-ces-SAMIORE-ROBOT-BMP280-Remplacer-BMP180-3-3-V-Num-rique-Capteur-De-Pression.jpg =50%x50%)

Détachez un groupe de 4 fils :
* Branchez un fil entre la broche ***SCL*** de l'écran et la broche ***SCL*** de votre rampe I²C
* Branchez un fil entre la broche ***SDA*** de l'écran et la broche ***SDA*** de votre rampe I²C
* Branchez un fil entre la broche ***GND*** de l'écran et la broche ***GND*** de votre rampe I²C
* Branchez un fil entre la broche ***VCC*** de l'écran et la broche ***5V*** de votre rampe I²C

Téléversez le programme suivant :
```C
#include <BME280I2C.h>
#include <Wire.h>

BME280I2C bme;

void setup() {
  Serial.begin(9600);
  Wire.begin();

  while (!bme.begin()) {
    Serial.println("Could not find BME280 sensor!");
    delay(1000);
  }

  // bme.chipID(); // Deprecated. See chipModel().
  switch (bme.chipModel()) {
    case BME280::ChipModel_BME280:
      Serial.println("Found BME280 sensor! Success.");
      break;
    case BME280::ChipModel_BMP280:
      Serial.println("Found BMP280 sensor! No Humidity available.");
      break;
    default:
      Serial.println("Found UNKNOWN sensor! Error!");
  }
}

void loop() {
  float temp(NAN), hum(NAN), pres(NAN);

  BME280::TempUnit tempUnit(BME280::TempUnit_Celsius);
  BME280::PresUnit presUnit(BME280::PresUnit_hPa);
  bme.read(pres, temp, hum, tempUnit, presUnit);
  Serial.print("temperature=");
  Serial.print(temp);
  Serial.println("°C");
  Serial.print("pression=");
  Serial.print(pres);
  Serial.println("hPa");

  delay(1000);
}
```

Proposition d'exercide : afficher sur l'écrab LCD la température (sur la première ligne) et la pression atmosphérique (sur la deuxième ligne) 

**A savoir :** La pression atmosphérique permet de connaître (à peu près) le temps qu'il fait. On vous invite à regarder [le site http://leguidemeteo.com/prevoir-le-temps-a-partir-de-son-barometre/) ](http://leguidemeteo.com/prevoir-le-temps-a-partir-de-son-barometre/) afin de voir comment faire une correspondance entre la valeur récupérée et la météo courante.

---

## Gérer une horloge interne (I²C)

**Explication à ajouter**

Une nouvelle fois, il va falloir ajouter une bibliothèque pour gérer notre horloge interne. Pour cela dans l'IDE Arduino allez dans le menu "Croquis/Inclure une bibliothèque/Gérer les bibliothèques" puis cherchez et installez la bibliothèque suivante : **RTCLib by Adafruit v1.2.0**


Détachez un groupe de 4 fils :
* Branchez un fil entre la broche ***SCL*** de l'écran et la broche ***SCL*** de votre rampe I²C
* Branchez un fil entre la broche ***SDA*** de l'écran et la broche ***SDA*** de votre rampe I²C
* Branchez un fil entre la broche ***GND*** de l'écran et la broche ***GND*** de votre rampe I²C
* Branchez un fil entre la broche ***VCC*** de l'écran et la broche ***5V*** de votre rampe I²C

Téléverser le programme suivant :
```C
#include <Wire.h>
#include <RTClib.h>

RTC_DS3231 rtc;

void setup() {
  Serial.begin(9600);
  Wire.begin();
  if (! rtc.begin()) {
    Serial.println("Couldn't find RTC");
    while (1);
  }
  if (rtc.lostPower()) {
    Serial.println("RTC lost power, lets set the time!");
    // les lignes suivantes permettente de configurer l'heure et la date quand l'horloge n'est pas encore configurée
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
    // cela utilise l'heure et la date du PC
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  DateTime now = rtc.now();
  Serial.print(now.day(), DEC);
  Serial.print('/');
  Serial.print(now.month(), DEC);
  Serial.print('/');
  Serial.print(now.year(), DEC);
  Serial.print(' ');
  Serial.print(now.hour(), DEC);
  Serial.print(':');
  Serial.print(now.minute(), DEC);
  Serial.print(':');
  Serial.print(now.second(), DEC);
  Serial.println();
  delay(1000);
}
```

Voici un exemple de programme qui va mettre à jour l'horloge si vous tapez la ligne 'horloge=AAAAMMJJhhmmss' dans le moniteur série (ou AAAA correspond à l'année sur 4 chiffres, MM le mois sur 2 chiffres, JJ le jour sur 2 chiffres, hh l'heure sur 2 chifres, mm les minutes sur 2 chiffres et ss les secondes sur 2 chiffres) :
```C
#include <Wire.h>
#include <RTClib.h>

RTC_DS3231 rtc;

DateTime strToDateTime(String readString) {
  int year = readString.substring(0, 4).toInt();
  int month = readString.substring(4, 6).toInt();
  int day = readString.substring(6, 8).toInt();
  int hour = readString.substring(8, 10).toInt();
  int minute = readString.substring(10, 12).toInt();
  int second = readString.substring(12, 14).toInt();
  return DateTime(year, month, day, hour, minute, second);
}


String getKey(String str) {
  return str.substring(0, str.indexOf('='));
}

String getValue(String str) {
  if (str.indexOf('=')) {
    return str.substring(str.indexOf('=') + 1);
  } else {
    return "";
  }
}

String line;

void setup() {
  Serial.begin(9600);
  Wire.begin();
  if (! rtc.begin()) {
    Serial.println("Couldn't find RTC");
    while (1);
  }
  if (rtc.lostPower()) {
    Serial.println("RTC lost power, lets set the time!");
    // les lignes suivantes permettente de configurer l'heure et la date quand l'horloge n'est pas encore configurée
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
    // cela utilise l'heure et la date du PC
  }
}

void loop() {
  DateTime now = rtc.now();
  Serial.print(now.day(), DEC);
  Serial.print('/');
  Serial.print(now.month(), DEC);
  Serial.print('/');
  Serial.print(now.year(), DEC);
  Serial.print(' ');
  Serial.print(now.hour(), DEC);
  Serial.print(':');
  Serial.print(now.minute(), DEC);
  Serial.print(':');
  Serial.print(now.second(), DEC);
  Serial.println();
  while (Serial.available()) {
    line = Serial.readStringUntil('\n');// On lit une ligne depuis le port série
    line.trim();
    if (line.startsWith("horloge=")) {
      Serial.println("reglage de l'horloge");
      String heure = getValue(line);
      rtc.adjust(strToDateTime(heure));
    }
  }
  // attente de 1s pour ne pas afficher trop d'information dans le moniteur série
  delay(1000);
}
```


---

## Récupérer le taux d'humidité et la température

Voici un nouveau composant (DHT11) qui va permettre de récupérer la température (comme le BMP280 précédemment vu) mais aussi le taux d'humidité de la pièce.

![dht11](https://ae01.alicdn.com/kf/HTB1WbV_ayLrK1Rjy1zdq6ynnpXa5/10-pi-ces-DHT22-AM2302-DHT11-DHT12-AM2320-Module-de-capteur-d-humidit-de-temp-rature.jpg =50%x50%)

Une nouvelle fois, il va falloir ajouter une bibliothèque pour gérer ce composant. Pour cela dans l'IDE Arduino allez dans le menu "Croquis/Inclure une bibliothèque/Gérer les bibliothèques" puis cherchez et installez la bibliothèque suivante : **SDHT by Helder Rodrigues v1.1.0**

Détachez un groupe de 3 fils :
* Branchez un fil entre la broche **DAT** du capteur et la broche **S** du port 9
* Branchez un fil entre la broche **VCC** du capteur et la broche **V** du port 9
* Branchez un fil entre la broche **GND** du capteur et la broche **G** du port 9

Téléversez le programme suivant :
    
```C
#include "SDHT.h"

#define DHT_PIN 9

SDHT dht;
void setup() {
  Serial.begin(9600);
}

void loop() {
  if (dht.broadcast(DHT11, DHT_PIN)) {
    Serial.print("Humidite=");
    Serial.println(String(dht.humidity, 1));
    Serial.print("Temperature=");
    Serial.println(String(dht.celsius, 2));
  }
  delay(1000);
}
```

---

## Afficher l'heure sur un écran 4*7 segments

Un afficheurs 4*7 segments permet d'afficher l'heure de façon claire (visible de loin).
![tm](https://ae01.alicdn.com/kf/HTB1N13if0fJ8KJjy0Feq6xKEXXaO/4-LED-num-rique-0-56-Tube-d-affichage-d-cimal-7-Segments-TM1637-horloge-Double.jpg =50%x50%)

Détachez un groupe de 3 fils :
* Brancher un fil entre la broche **CLK** de l'afficheur et la broche **S** du port 12
* Brancher un fil entre la broche **DIO** de l'afficheur et la broche **S** du port 13
* Brancher un fil entre la broche **GND** de l'afficheur et la broche **G** du port 13
* Brancher un fil entre la broche **5V** de l'afficheur et la broche **V** du port 13

Téléverser le programme suivant :
```C
#include <TM1637Display.h>
#define TM1637_CLK 12
#define TM1637_DIO 13

TM1637Display display(TM1637_CLK, TM1637_DIO);

void setup() {
  Serial.begin(9600);
  // Luminosité de l'afficheur de 0 à 15
  display.setBrightness(12);
}

int seconds=0;
void loop() {
  int sep = 0;
  if (seconds % 2 == 0) {
    // On affiche de séparateur ':' qu'une seconde sur 2
    sep = 64;
  }
  display.showNumberDecEx(seconds, sep, true, 4, 0);
  seconds++;
  delay(1000);
}
```

En combinant ce code avec celui de l'horloge interne on peut afficher l'heure courante :

```C
#include <Wire.h>
#include <RTClib.h>
#include <TM1637Display.h>
#define TM1637_CLK 12
#define TM1637_DIO 13

TM1637Display display(TM1637_CLK, TM1637_DIO);
RTC_DS3231 rtc;

DateTime strToDateTime(String readString) {
  int year = readString.substring(0, 4).toInt();
  int month = readString.substring(4, 6).toInt();
  int day = readString.substring(6, 8).toInt();
  int hour = readString.substring(8, 10).toInt();
  int minute = readString.substring(10, 12).toInt();
  int second = readString.substring(12, 14).toInt();
  return DateTime(year, month, day, hour, minute, second);
}


String getKey(String str) {
  return str.substring(0, str.indexOf('='));
}

String getValue(String str) {
  if (str.indexOf('=')) {
    return str.substring(str.indexOf('=') + 1);
  } else {
    return "";
  }
}

String line;

void setup() {
  Serial.begin(9600);
  Wire.begin();
  if (! rtc.begin()) {
    Serial.println("Couldn't find RTC");
    while (1);
  }
  if (rtc.lostPower()) {
    Serial.println("RTC lost power, lets set the time!");
    // les lignes suivantes permettente de configurer l'heure et la date quand l'horloge n'est pas encore configurée
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
    // cela utilise l'heure et la date du PC
  }
  display.setBrightness(12);

}

void loop() {
  DateTime now = rtc.now();
  Serial.print(now.day(), DEC);
  Serial.print('/');
  Serial.print(now.month(), DEC);
  Serial.print('/');
  Serial.print(now.year(), DEC);
  Serial.print(' ');
  Serial.print(now.hour(), DEC);
  Serial.print(':');
  Serial.print(now.minute(), DEC);
  Serial.print(':');
  Serial.print(now.second(), DEC);
  Serial.println();
  int sep = 0;
  if (now.second() % 2 == 0) {
    // On affiche de séparateur ':' qu'une seconde sur 2
    sep = 64;
  }
  display.showNumberDecEx(now.hour() * 100 + now.minute(), sep, true, 4, 0);

  while (Serial.available()) {
    line = Serial.readStringUntil('\n');// On lit une ligne depuis le port série
    line.trim();
    if (line.startsWith("horloge=")) {
      Serial.println("reglage de l'horloge");
      String heure = getValue(line);
      rtc.adjust(strToDateTime(heure));
    }
  }
  // attente de 1s pour ne pas afficher trop d'information dans le moniteur série
  delay(1000);
}
```



---

## Jouer de la musique (MP3)

Nous allons utiliser un module DFPLayer afin de lire des MP3 depuis une carte micro-SD.

![dfplayer](https://ae01.alicdn.com/kf/HTB1O54OFuySBuNjy1zdq6xPxFXaT/A14-10-pi-ces-SAMIORE-ROBOT-Mini-lecteur-MP3-Module-TF-carte-U-disque-Mini-lecteur.jpg =50%x50%)

Les chansons suivantes ont été installée sur la carte micro-SD :
    
Une nouvelle fois, il va falloir ajouter une bibliothèque pour gérer ce composant. Pour cela dans l'IDE Arduino allez dans le menu "Croquis/Inclure une bibliothèque/Gérer les bibliothèques" puis cherchez et installez la bibliothèque suivante : **DFRobotDFPlayerMini by DFRobot v1.0.5**


![dfplayer2](https://raw.githubusercontent.com/DFRobot/DFRobotMediaWikiImage/master/Image/miniplayer_pin_map.png =50%x50%)


Récupérez le cable avec la résistance intégrée et branchez le entre la broche **S** du port 11 et la broche **TX** du module.

Détachez un groupe de 3 fils :
* Branchez un fil entre la broche **S** du port 10 et la broche **RX** du module
* Branchez un fil entre la broche **G** du port 10 et la broche **GND**  du module
* Branchez un fil entre la broche **V** du port 10 et la broche **VCC**  du module

Pour les enceintes, détachez un groupe de 2 fils  :
* Branchez un fil entre une des broche côté enceinte et la broche **SPK_1** du module
* Branchez un fil entre l'autre broche côté enceinte et la broche **SPK_2** du module

Téléverser le programme suivant:

```C
#include "DFRobotDFPlayerMini.h"
#include <SoftwareSerial.h>

#define DFPLAYER_RX 10
#define DFPLAYER_TX 11

SoftwareSerial dfplayer(DFPLAYER_RX, DFPLAYER_TX); // RX, TX
DFRobotDFPlayerMini mp3;

String line;

String getKey(String str) {
  return str.substring(0, str.indexOf('='));
}

String getValue(String str) {
  if (str.indexOf('=')) {
    return str.substring(str.indexOf('=') + 1);
  } else {
    return "";
  }
}

void setup() {
  Serial.begin(9600);
  dfplayer.begin(9600);

  if (!mp3.begin(dfplayer)) {  //Use softwareSerial to communicate with mp3.
    Serial.println(F("Unable to begin:"));
    Serial.println(F("1.Please recheck the connection!"));
    Serial.println(F("2.Please insert the SD card!"));
    while (true) {
      delay(0); // Code to compatible with ESP8266 watch dog.
    }
  }
  Serial.println(F("DFPlayer Mini online."));

  mp3.volume(10);
}

void loop() {
  while (Serial.available()) {
    line = Serial.readStringUntil('\n');
    line.trim();
    Serial.println("received:<" + line + ">");
    if (line.startsWith("volume=")) {
      int volume = getValue(line).toInt();
      mp3.volume(volume);
    } else if (line == "suivante") {
      mp3.next();
    } else if (line == "precedente") {
      mp3.previous();
    } else if (line == "pause") {
      mp3.pause();
    } else if (line == "stop") {
      mp3.sleep();
    } else if (line == "reset") {
      mp3.reset();
      mp3.outputDevice(DFPLAYER_DEVICE_SD);
    } else if (line == "lecture") {
      mp3.play();
    }
  }
}    
```

Vous pouvez contrôler la lecture avec les commandes suivantes depuis le moniteur série :
* lecture: lance la première chanson
* pause: mets en pause/relance la chanson courante
* suivante: passe à la chanson suivante
* precedente: reviens à la chanson précédente
* volume=XX : régle le volume à la valeur XX (pouvant aller de 0 à 30)
* stop: arrête le module


---

## Utiliser une matrice à DEL

Vous pouvez utiliser la matrice à DEL (8*8) pour afficher des messages ou des icones.


![neopixel](https://ae01.alicdn.com/kf/HTB1c6WwmSMmBKNjSZTEq6ysKpXaG/10-pi-ces-WS2812-LED-5050-RVB-8x8-64-LED-Matrice.jpg =50%x50%)

Une nouvelle fois, il va falloir ajouter une bibliothèque pour gérer ce composant. Pour cela dans l'IDE Arduino allez dans le menu "Croquis/Inclure une bibliothèque/Gérer les bibliothèques" puis cherchez et installez la bibliothèque suivante : **Adafruit NeoPixel by Adafruit v1.2.2**


Détachez un groupe de 3 fils  :
* Branchez un fil entre la broche **DIN** de la matrice et la broche **S** du port 2
* Branchez un fil entre la broche **5V** de la matrice et la broche **V** du port 2
* Branchez un fil entre la broche **GND** de la matrice et la broche **G** du port 2

Téléversez le code suivant :

```C
#include <Wire.h>
#include <Adafruit_NeoPixel.h>
#include <avr/pgmspace.h>

static unsigned int width = 8;
static unsigned int height = 8;

#define HEADER_PIXEL(data,pixel) {\
    pixel[0] = ((((data)[0] - 33) << 2) | ((data[1] - 33) >> 4)); \
    pixel[1] = ((((data[1] - 33) & 0xF) << 4) | ((data[2] - 33) >> 2)); \
    pixel[2] = ((((data[2] - 33) & 0x3) << 6) | ((data[3] - 33))); \
    data += 4; \
  }

const char pluie[] PROGMEM = "!!!!!!!!!!!!QM0(QM0(QM0(!!!!!!!!!!!!!!!!QM0(QM0(QM0(QM0(QM0(!!!!!!!!!!!!QM0(QM0(QM0(QM0(QM0(!!!!QM0(QM0(QM0(QM0(QM0(QM0(QM0(QM0(!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!+;X`!!!!!!!!+;X`!!!!!!!!+;X`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!+;X`!!!!!!!!+;X`!!!!!!!!+;X`";
const char soleil[] PROGMEM = "`[-!`[-!!!!!`[-!`[-!!!!!`[-!`[-!`[-!!!!!``]H``]H``]H``]H!!!!`[-!!!!!``]H``]H``]H``]H``]H``]H!!!!`[-!``]H``]H``]H``]H``]H``]H`[-!`[-!``]H``]H``]H``]H``]H``]H`[-!!!!!``]H``]H``]H``]H``]H``]H!!!!`[-!!!!!``]H``]H``]H``]H!!!!`[-!`[-!`[-!!!!!`[-!`[-!!!!!`[-!`[-!";
const char nuit[] PROGMEM = "!!!!!!!!QM0(``(I``(I``(I!!!!!!!!!!!!QM0(``(IQM0(!!!!!!!!QM0(!!!!QM0(``(I``(I!!!!!!!!!!!!!!!!!!!!``(I``(I``(I!!!!!!!!!!!!!!!!!!!!``(I``(I``(I!!!!!!!!!!!!!!!!!!!!QM0(``(I``(IQM0(!!!!!!!!!!!!QM0(!!!!QM0(``(I``(I``(I``(IQM0(!!!!!!!!!!!!QM0(QM0(QM0(QM0(!!!!!!!!";
const char coeur[] PROGMEM = "!!!!`Q\".`Q\".!!!!!!!!`Q\".`Q\".!!!!``(I``(I`Q\".`Q\".`Q\".`Q\".`Q\".`Q\".``(I`Q\".`Q\".`Q\".`Q\".`Q\".`Q\".`Q\".`X?I`Q\".`Q\".`Q\".`Q\".`Q\".`Q\".`Q\".!!!!`X?I`Q\".`Q\".`Q\".`Q\".`Q\".!!!!!!!!!!!!`Q\".`Q\".`Q\".`Q\".!!!!!!!!!!!!!!!!!!!!`Q\".`Q\".!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
const char smiley[] PROGMEM = "!!!!!!!!``]H``]H``]H``]H!!!!!!!!!!!!``]H``]H``]H``]H``]H``]H!!!!``]H!!!!``]H``]H``]H``]H!!!!``]H``]H!!!!``]H``]H``]H``]H!!!!``]H``]H``]H``]H``]H``]H``]H``]H``]H``]H!!!!``]H``]H``]H``]H!!!!``]H!!!!``]H!!!!!!!!!!!!!!!!``]H!!!!!!!!!!!!``]H``]H``]H``]H!!!!!!!!";
const char nuage[] PROGMEM = "!!!!!!!!`[-!`[-!`[-!!!!!!!!!!!!!!!!!`[-!``]H``]H``]H`[-!!!!!!!!!`[-!``]H``]H``]HAX;=AX;=AX;=!!!!`[-!``]H``]HAX;=QM0(QM0(QM0(AX;=`[-!``]H``]HAX;=QM0(QM0(QM0(QM0(!!!!`[-!AX;=QM0(QM0(QM0(QM0(QM0(AX;=AX;=QM0(QM0(QM0(QM0(QM0(QM0(`[-!`[-!!!!!`[-!`[-!!!!!`[-!`[-!";

Adafruit_NeoPixel pixels(64, 2, NEO_GRB + NEO_KHZ800);
String line;

String getKey(String str) {
  return str.substring(0, str.indexOf('='));
}

String getValue(String str) {
  if (str.indexOf('=')) {
    return str.substring(str.indexOf('=') + 1);
  } else {
    return "";
  }
}

void displayImage(String imageName) {
  int p[3];
  char buffer[260];
  if (imageName == "pluie") {
    strcpy_P(buffer, pluie);
  } else if (imageName == "soleil") {
    strcpy_P(buffer, soleil);
  } else if (imageName == "nuit") {
    strcpy_P(buffer, nuit);
  } else if (imageName == "coeur") {
    strcpy_P(buffer, coeur);
  } else if (imageName == "smiley") {
    strcpy_P(buffer, smiley);
  } else if (imageName == "nuage") {
    strcpy_P(buffer, nuage);
  }
  char* buf = buffer;
  for (int i = 0; i < 8 * 8; i++)  {
    HEADER_PIXEL(buf, p);
    pixels.setPixelColor(i, pixels.Color(p[0], p[1], p[2]));
  }

  pixels.show();
}

void setup() {
  Serial.begin(9600);

  Wire.begin();
  pixels.begin();
  // Ne pas mettre trop fort (>50) les DEL au risque de "cramer" l'arduino
  pixels.setBrightness(30);
}


void loop() {
  while (Serial.available()) {
    line = Serial.readStringUntil('\n');// read the incoming data as string
    line.trim();
    if (line.startsWith("image=")) {
      String logo = getValue(line);
      if (logo == "") {
        // Si on envoie "image=" on éteint les DEL
        pixels.clear();
        pixels.show();
      } else {
        displayImage(logo);
      }
    }
  }
}
```

---

## Utiliser un buzzer

---

## Stocker des informations dans l'arduino

Par défaut, quand on arrête l'arduino on va perdre toutes les valeurs du programme. Dans certain cas, on aimerait garder une information après le redémarrage de l'arduino. 

Pour cela on peut utiliser la partie où est stocké le programme pour enregistrer des informations. Cette partie s'appelle l'EEPROM https://fr.wikipedia.org/wiki/Electrically-erasable_programmable_read-only_memory.

On va donc utiliser cette mémoire pour stocker des informations.

Téléversez le code suivant :
```C
#include <EEPROM.h>


String getKey(String str) {
  return str.substring(0, str.indexOf('='));
}

String getValue(String str) {
  if (str.indexOf('=')) {
    return str.substring(str.indexOf('=') + 1);
  } else {
    return "";
  }
}

String line;
byte alarmHour = 0;
byte alarmMinute = 0;
byte alarmState = 0;

void restoreAlarm() {
  alarmHour = EEPROM.read(0);
  alarmMinute = EEPROM.read(1);
  alarmState = EEPROM.read(2);
}

void saveAlarm() {
  EEPROM.write(0, alarmHour);
  EEPROM.write(1, alarmMinute);
  EEPROM.write(2, alarmState);
}

void displayAlarm() {
  Serial.print("alarme=");
  Serial.print(alarmHour);
  Serial.print(":");
  Serial.print(alarmMinute);
  Serial.print(" active=");
  Serial.println(alarmState);
}

void setup() {
  Serial.begin(9600);
  Serial.println("Demarrage");
  restoreAlarm();
}

void loop() {
  displayAlarm();
  while (Serial.available()) {
    line = Serial.readStringUntil('\n');
    line.trim();
    Serial.println("received:<" + line + ">");
    if (line.startsWith("alarme=")) {
      int alarmValue = getValue(line).toInt();
      alarmHour = alarmValue / 100;
      alarmMinute = alarmValue - alarmHour * 100;
      saveAlarm();
    } else if (line == "activer") {
      alarmState = 1;
      saveAlarm();
    } else if (line == "desactiver") {
      alarmState = 0;
      saveAlarm();
    } else {
      Serial.println("commande inconnue");
    }
  }
  delay(1000);
}
```

Ce code permet de stocker 3 informations simples (un *byte* correspond à un nombre ayant une valeur entre 0 et 255) dans l'EEPROM:
* alarmHour : l'heure d'une alarme
* alarmMinute: les minutes d'une alarme
* alarmState : l'état de l'alarme (0=désactivée, 1=activée)

On peut utiliser le moniteur série pour régler l'alarme via les commandes :
* "alarme=HHMM" ou HH correspond à l'heure de l'alarme et MM aux minutes (exemple: alarme=730 va régler l'alarme à 7h30)
* "activer" pour activer l'alarme
* "desactiver" pour désactiver l'alarme

Régler l'alarme puis redémarrer l'arduino (en appuyant sur le petit bouton noir "reset" sur le dessus de l'arduino)


---

## Utiliser un encodeur rotatif



---

## Utiliser un capteur de luminosité



---

## Construire votre projet 

A vous de choisir ce que vous voulez faire comme projet avec le matériel précédemment présenté :
* Un lecteur MP3 pilotable à distance
* Une station météo connectée
* Un radio-reveil connecté

Ou encore un mix de tout ça.

Pour commencer on va utiliser le moniteur série pour contrôler et récupérer les informations. En faisant cela vous aurez créé une [Interface de programmation](https://fr.wikipedia.org/wiki/Interface_de_programmation) (ou API en anglais)

Voici un exemple de chose à faire pour chaque type de projet 

### Un lecteur MP3 pilotable à distance

Comme dans l'exemple du module MP3 vous allez définir une liste de commande à taper pour contrôler le lecteur.

Programme arduino :
* gérer le module MP3
* pouvoir régler le volume avec le potentiomètre
* pouvoir passer à la chanson suivante/précédente avec l'encodeur rotatif
* pouvoir mettre en pause/lecture la chanson courante avec le bouton de l'encodeur rotatif (ou le gros bouton)

Données à remonter sur le moniteur série toutes les X secondes :
* volume courant
* état du lecteur (pause ou lecture)

Commandes à distance :
* pause/lecture
* chanson suivante
* chanson précédente
* régler le volume


### Une station météo connectée

Programme arduino :
* récupérer les données de température/humidité/pression atmosphérique
* analyser ces données pour définir la méteo : beau temps/nuaugeux/pluvieux/nuit
* afficher la méteo sur la matrice de DEL ou sur l'écran

Données à remonter sur le moniteur série toutes les X secondes :
* température
* taux d'humidité
* pression atmosphérique

Commandes à distance :
* Eteindre/Allumer le(s) écran(s)
 


### Un radio-reveil connecté


Programme arduino :
* gérer l'horloge
* stocker l'heure du réveil
* quand l'heure du réveil arrive, faire du son (buzzer ou lecteur MP3) et allumer la DEL du bouton
* quand l'alarme est active et qu'on appuie sur le bouton, on arrête l'alarme
    
Données à remonter sur le moniteur série toutes les X secondes :
* heure et date courante
* heure du reveil
* état du réveil (actif ou inactif)

Commandes à distance :
* Régler la date et l'heure
* Activer/désactiver le reveil
* Régler l'heure du réveil
 

---
## Préparer la communication entre l'Arduino et le Wemos

Maintenant que vous avez définit votre interface de programmation de votre projet via le moniteur série, on va pouvoir passer à l'étape suivante.

Pour que votre projet soit "connecté" il faut pouvoir communiquer avec lui (et de préférence sans fil). Ici on a le choix dans les protocoles : bluetooth, Z-Wave, ZigBee, Wifi ...

Dans cette session on va utiliser le Wifi via une carte WeMos D1 R1. Cette carte contient un [ESP8266](https://fr.wikipedia.org/wiki/ESP8266) qui permet de gérer facilement une connexion Wifi. Ce type de carte contient aussi assez de mémoire et de puissance de calcul pour héberger un mini site Web.

On va continuer à utiliser l'IDE Arduino pour programmer le Wemos, mais il va falloir installer tout l'environnement :
* Allez dans "Fichier/Préférences" et placez l’URL https://arduino.esp8266.com/stable/package_esp8266com_index.json dans « URL de gestionnaire de cartes supplémentaires
* Allez dans "Outils/Type de carte/Gestionnaire de carte", rechercher « esp8266 » et installer la dernière version proposée.
* Branchez le Wemos sur votre ordinateur avec le cable USB
* Sélectionner le nouveau port dans "Outils/ports"
* Sélectionner "WeMos D1 R1" dans "Outils/Type de carte"

Modifiez les déclarations de STASSID et STAPSK selon les paramètres de votre box et téléversez le programme suivant :
```C
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal_I2C_ESP.h>

#ifndef STASSID
#define STASSID "NomReseauWifi"
#define STAPSK  "MotDePasse"
#endif

const char* ssid     = STASSID;
const char* password = STAPSK;

ESP8266WiFiMulti WiFiMulti;
ESP8266WebServer server(80);

void handleRoot() {
  server.send(200, "text/html", "<h1>Bienvenue</h1>");
}

void setup() {
  Serial.begin(9600);

  // On essaye de se connecter au réseau Wifi
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);

  Serial.println();
  Serial.println();
  Serial.print("Wait for WiFi... ");
  while (WiFiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.begin();

  delay(500);
}

void loop() {
  server.handleClient();
}
```

Ouvrez le moniteur série, vous devriez voir apparaître les lignes suivantes:
```
WiFi connected
IP address:
192.168.1.XX
```

Notez cette dernière adresse (192.168.1.XX ou XX doit être un nombre de 0 à 255) et copiez la dans un navigateur Web sur votre PC. Vous deviez voir apparaître le mot "Bienvenue". Vous pouvez essayer la même manipulation depuis votre téléphone portable s'il est connecté au même Wifi.

Modifiez le code précédent pour afficher une autre phrase.
 
Pour le moment notre petit serveur Web ne sait gérer que les requêtes appelant la page racine ("/"). On va faire en sorte qu'il puisse répondre à l'interrogation de la page "/IP" :
    
```C
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal_I2C_ESP.h>

#ifndef STASSID
#define STASSID "NomReseauWifi"
#define STAPSK  "MotDePasse"
#endif

const char* ssid     = STASSID;
const char* password = STAPSK;

ESP8266WiFiMulti WiFiMulti;
ESP8266WebServer server(80);

void handleRoot() {
  server.send(200, "text/html", "<h1>Bienvenue</h1>");
}

void displayIP() {
  String ip = WiFi.localIP().toString();
  server.send(200, "text/html", ip);
}

void setup() {
  Serial.begin(9600);

  // On essaye de se connecter au réseau Wifi
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);

  Serial.println();
  Serial.println();
  Serial.print("Wait for WiFi... ");
  while (WiFiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/IP", displayIP);

  server.begin();

  delay(500);
}

void loop() {
  server.handleClient();
}
```

Modifiez le code précédent pour afficher d'autre page.

On va maintenant utiliser le moniteur série pour modifier une variable que l'on affichera sur le serveur Web :
```C
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal_I2C_ESP.h>

#ifndef STASSID
#define STASSID "Livebox-8A44"
#define STAPSK  "mGrfwzHYZwMfvPLNCX"
#endif

const char* ssid     = STASSID;
const char* password = STAPSK;

ESP8266WiFiMulti WiFiMulti;
ESP8266WebServer server(80);

void setup() {
  Serial.begin(9600);

  // On essaye de se connecter au réseau Wifi
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);

  Serial.println();
  Serial.println();
  Serial.print("Wait for WiFi... ");
  while (WiFiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/IP", displayIP);
  server.on("/temperature", displayTemp);
  
  server.begin();

  delay(500);
}

String getKey(String str) {
  return str.substring(0, str.indexOf('='));
}

String getValue(String str) {
  return str.substring(str.indexOf('=') + 1);
}

String temp="22";
void handleRoot() {
  server.send(200, "text/html", "<h1>Bienvenue</h1>");
}

void displayIP() {
  String ip = WiFi.localIP().toString();
  server.send(200, "text/html", ip);
}

void displayTemp() {
  server.send(200, "text/html", temp);
}

void loop() {
  server.handleClient();
  
  while (Serial.available() > 0) {
    String line = Serial.readStringUntil('\n');// read the incoming data as string
    line.trim();
    if (getKey(line) == "temperature") {
      temp=getValue(line);
    }
  }
  
}
```

Ici quand on tape dans le moniteur série "temperature=XX" on devrait voir la valeur de la page /temperature changer.

On va maintenant voir comment on peut changer une variable du WeMos depuis l'appel d'une page du serveur Web. Pour cela on va utiliser la propriété des URL qui permet de passer des paramètres au serveur Web.

Il faut pour cela utiliser ajouter à la fin de notre URL ?XXX=YYY, ou XXX correspond au nom de notre variable et YYY à sa valeur.

Dans nos projet on ne gérera pas plus d'un paramètre, dans le code ci-dessous on ne fait donc pas attention au nom du paramètre :

```C
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal_I2C_ESP.h>

#ifndef STASSID
#define STASSID "Livebox-8A44"
#define STAPSK  "mGrfwzHYZwMfvPLNCX"
#endif

const char* ssid     = STASSID;
const char* password = STAPSK;

ESP8266WiFiMulti WiFiMulti;
ESP8266WebServer server(80);

void setup() {
  Serial.begin(9600);

  // On essaye de se connecter au réseau Wifi
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);

  Serial.println();
  Serial.println();
  Serial.print("Wait for WiFi... ");
  while (WiFiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/IP", displayIP);
  server.on("/temperature", displayTemp);
  server.on("/mp3/volume", setMP3Volume);
  
  
  server.begin();

  delay(500);
}

String getKey(String str) {
  return str.substring(0, str.indexOf('='));
}

String getValue(String str) {
  return str.substring(str.indexOf('=') + 1);
}

String temp="22";
int volume=10;

void handleRoot() {
  server.send(200, "text/html", "<h1>Bienvenue</h1>");
}

void displayIP() {
  String ip = WiFi.localIP().toString();
  server.send(200, "text/html", "IP="+ip);
}

void setMP3Volume() {
  // On récupére la première valeur passée en paramètre de la page
  // ex ?volume=22 ... normalement on devrait vérifier que le server.argName(0) vaut bien "volume"
  // Mais comme on n'aura qu'un seul paramètre sur nos projets on ignore cette phase.
  String volumeStr = server.arg(0);
  if (volumeStr != "") {
    volume = volumeStr.toInt();
    Serial.print("volume=");
    Serial.println(volume);
  }
  server.send(200, "text/html", "volume="+String(volume));
}

void displayTemp() {
  server.send(200, "text/html", "temperature="+temp);
}

void loop() {
  server.handleClient();
  
  while (Serial.available() > 0) {
    String line = Serial.readStringUntil('\n');// read the incoming data as string
    line.trim();
    if (getKey(line) == "temperature") {
      temp=getValue(line);
    }
  }
  
}
```

Si vous allez sur la page /mp3/volume vous devriez voir la valeur actuelle du volume (par défaut égale à 10). Si vous allez sur la page /mp3/volume?volume=20 vous devriez voir apparaître la nouvelle valeur. Un nouvel appel à /mp3/volume vous confirmera que vous bien changer la valeur de la variable "volume" dans votre programme.

---

## Connecter le Wemos sur l'Arduino

Grâce aux étapes précédentes nous somme maintenant en mesure de faire en sorte que notre WeMos puisse récupérer et envoyer des informations sur l'arduino.

Pour cela on va connecter le WeMos de telle façon à ce qu'il puisse utiliser les interfaces de programmation que vous définies sur l'arduino via le moniteur série.

On va donc connecter 2 broches du WeMos sur le port série de l'Arduino. Pour cela on va devoir utiliser un convertisseur de niveau. En effet le WeMos utilse une tension de 3.3V pour communiquer alors que l'arduino utilise une tension de 5V.

![level](https://ae01.alicdn.com/kf/HTB1z3ifLpXXXXa5XXXXq6xXFXXXq/Convertisseur-de-niveau-logique-haute-vitesse-bidirectionnelle-3-3-V-5-V-4-Chanels.jpg =50%x50%)

Détachez un groupe de 4 fils:
*
*
*
*

Détachez un groupe de 4 fils :
*
*
*
*

---

## Décrire les interfaces Web

A vous maintenant de mettre en place les pages Web qui vont permettre de piloter votre projet.



---

## La suite


Vous allez maintenant utiliser AppInventor afin de contrôler votre projet depuis une application mobile.


