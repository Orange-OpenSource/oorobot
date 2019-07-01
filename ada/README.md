# Initiation à la programmation Arduino et ESP8266

---

## Avant de commencer

Il vous faudra télécharger l'environnement de développement (IDE) Arduino sur le site officiel : https://www.arduino.cc/en/Main/Software

Ceci n'est pas un cours d'électronique, nous passons sous silence un grand nombre de terminologie afin de pouvoir programmer rapidement un objet fonctionnel.


![logo](https://pbs.twimg.com/profile_images/928655749605199872/ygogGX2j_400x400.jpg)

---

## Arduino

L'Arduino est une carte construite autour d'un microcontrôleur qui peut être programmé pour analyser et produire des signaux électriques de manière à effectuer des tâches très diverses comme la domotique (le contrôle des appareils domestiques - éclairage, chauffage…), le pilotage d'un robot, de l'informatique embarquée, etc.

![arduino](https://ae01.alicdn.com/kf/HTB11nPYOpXXXXbOapXXq6xXFXXXN/225552329/HTB11nPYOpXXXXbOapXXq6xXFXXXN.jpg?size=144900&height=1000&width=1000&hash=f5fd08d9de92dc32c720726cd0ea707a =50%x50%)

![arduino](https://ae01.alicdn.com/kf/HTB1EhFHb2NNTKJjSspeq6ySwpXaU.jpg)

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

Vérifez que la vitesse de communication est bien égale à *9600 baud* (menu en bas à droite de la fênêtre).
 
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

La DEL (ou LED en anglais) est un composant simple s'allumant quand elle reçoit du courant. Nous allons commencer par brancher une DEL sur notre arduino. Pour cela prenez 2 fils.

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


Vous pouvez aussi utiliser le feu tricolore preséent dans votre kit, détachez un groupe de 4 fils :
* Branchez un fil entre la broche **G** du feu vers la broche **S** du port 8
* Branchez un fil entre la broche **Y** du feu vers la broche **S** du port 9
* Branchez un fil entre la broche **R** du feu vers la broche **S** du port 10
* Branchez un fil entre la broche **GND** du feu vers la broche **G** du port 8, 9 ou 10

![feu](https://ae01.alicdn.com/kf/HTB1mnOyaULrK1Rjy1zbq6AenFXao/Mini-Module-d-affichage-de-LED-de-feu-de-signalisation-5-V-pour-Arduino-rouge-jaune.jpg)

```C
#define GREEN_PIN 8
#define YELLOW_PIN 9
#define RED_PIN 10

void setup() {
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(YELLOW_PIN, OUTPUT);
  pinMode(RED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(GREEN_PIN, HIGH);
  digitalWrite(YELLOW_PIN, LOW);
  digitalWrite(RED_PIN, LOW);
  delay(500); 
  digitalWrite(GREEN_PIN, LOW);
  digitalWrite(YELLOW_PIN, HIGH);
  digitalWrite(RED_PIN, LOW);
  delay(500);
  digitalWrite(GREEN_PIN, LOW);
  digitalWrite(YELLOW_PIN, LOW);
  digitalWrite(RED_PIN, HIGH);
  delay(500); 
}
```

---

## Mesurer une distance avec des ultrasons

On peut utiliser un capteur ultrason (HR-SR04) pour mesurer une distance. L'idée est d'envoyer des ondes sonores (inaudibles) et de mesurer le temps qui s'écoule avant de les recapter. A partir de ce temps écoulés on peut grâce à la connaissance de la vitesse du son dans l'air estimé la distance entre le capteur et l'objet devant lui.

En théorie, le capteur peut capter les obstacles sur un angle de 15° environ et permet de faire des mesures de distance entre 2 centimètres et 4 mètres avec une précision de 3mm.

![ultrason](https://ae01.alicdn.com/kf/HTB1uVMfa6rguuRjy0Feq6xcbFXam/10-pi-ces-SAMIORE-ROBOT-Module-ultrasons-HC-SR04-Distance-mesure-capteur-capteur-chantillons-meilleurs-prix.jpg)

Détachez un groupe de 4 fils :
* Branchez un fil entre la broche **Trig** du capteur et la broche **S** du port 6
* Branchez un fil entre la broche **Echo** du capteur et la broche **V** du port 7
* Branchez un fil entre la broche **GND** du capteur et la broche **G** du port 7
* Branchez un fil entre la broche **VCC** du capteur et la broche **V** du port 7

Téléversez le code suivant :
```C
#define trigPin 7
#define echoPin 6

void setup() {
  Serial.begin (9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Envoi une impulsion de 10 micro seconde sur la broche "trigger"
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);

  digitalWrite(trigPin, LOW);
  // Attend que la broche Echo passe au niveau HAUT
  // retourne la durée
  int duration = pulseIn(echoPin, HIGH);

  //Calculer la distance (en cm, basé sur la vitesse du son).
  int distance = duration / 58.2;
  Serial.print("distance=");
  Serial.println(distance);
  delay(500);
}
```

Travail complémentaire : faire un radar de recul, selon la distance de l'obstacle, vous allumerez les DEL verte, jaune et enfin rouge du feu tricolore.

---

## Utiliser un bouton


On va utiliser ici un bouton un peu particulier :

![bouton led](https://ae01.alicdn.com/kf/HTB1EpxhdRfM8KJjSZFhq6ARyFXad/Bouton-d-arcade-5-couleurs-lumi-re-LED-lampe-60-MM-45-MM-grand-rond-Arcade.jpg)

Ce bouton intègre une DEL en plus d'un contact on/off. N'hésitez pas à démonter le bouton pour voir la DEL intégrée.

Pour commencer on va n'utiliser que le bouton.

![vue éclatée](https://ae01.alicdn.com/kf/HTB1iuZ_j4HI8KJjy1zbq6yxdpXaS/Bouton-d-arcade-5-couleurs-lumi-re-LED-lampe-60-MM-45-MM-grand-rond-Arcade.jpg)

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


Quand vous appuyez sur le bouton, vous devriez voir apparaître sur le moniteur série l'état du bouton (appuyé ou relaché)

Vous remarquerez ici que l'on déclare le "port" en "INPUT_PULLUP", cela veut dire que l'Arduino va connecter une de ses résistances interne entre la broche V du port (reliée au 5V) et sa broche d'entrée (S).

On va maintenant utiliser la DEL intégrée. Débranchez la DEL précédemment branchée sur le port 5. Branchez ensuite le fil venant du côté noir du bouton sur la broche **G** du port 5 et le fil venant du côté rouge du bouton sur la broche **S** du port 5 

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

![potar](https://i2.cdscdn.com/pdt2/2/6/4/1/700x700/sou0712662893264/rw/commutateur-rotatif-sourcingmap-r-b10k-10k-ohm-si.jpg)


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


Proposition d'exercice : Faire varier le temps de clignotement d'une DEL avec le potentiomètre

---

## Faire tourner un servomoteur

Un servomoteur est un petit moteur pouvant tourner précisément sur 180°.

![servo](https://ae01.alicdn.com/kf/HTB1QbQfmHSYBuNjSspfq6AZCpXaa.jpg)

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

Ajouter un des morceaux de plastique sur l'axe du servomoteur afin de bien visualiser les mouvements.

Travail complémentaire : Faire tourner le servomoteur à partir de la valeur d'un potentiomètre (utilisation de la fonction [map](https://www.arduino.cc/reference/en/language/functions/math/map/) pour convertir les valeurs d'entrées du potentiomètre - de 0 à 1023 - en une valeur en degrée - de 0 à 180) :

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

## Afficher des informations sur un écran LCD I²C

Les écrans LCD permettent d'afficher des informations facilement. La version présentée ici utilise une interface I²C .

Ces écrans nécessitent que l'on installe une bibliothèque nous permettant de les contrôler facilement. Pour cela dans l'IDE Arduino allez dans le menu "Croquis/Inclure une bibliothèque/Gérer les bibliothèques" puis cherchez et installez la bibliothèque suivante : **LiquidCrystal I2C** de Frank de Brabander

![lcd](https://ae01.alicdn.com/kf/HTB1lQ0qu9BYBeNjy0Feq6znmFXas/10-pcs-SAMIORE-ROBOT-LCD1602-I2C-LCD-1602-module-cran-Bleu-IIC-I2C-pour-LCD1602-Adaptateur.jpg_640x640.jpg)

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

Afin de gérer ce composant vous aurez besoin d'une nouvelle bibliothèque. Pour cela dans l'IDE Arduino allez dans le menu "Croquis/Inclure une bibliothèque/Gérer les bibliothèques" puis cherchez et installez la bibliothèque suivante : **BME280** by Tyler Glenn

![bmc](https://ae01.alicdn.com/kf/HTB1_NQjkamWBuNjy1Xaq6xCbXXaY/10-pi-ces-SAMIORE-ROBOT-BMP280-Remplacer-BMP180-3-3-V-Num-rique-Capteur-De-Pression.jpg)

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

## Gérer une horloge temps réel (I²C)

L'arduino n'est pas capable de récupérer l'heure et la date courante. 

On peut lui adjoindre une horloge temps réel afin de gérer précisement l'heure et la date courante. Une horloge RTC contient un emplacement pour une pile afin que ce dernier puisse continuer à faire vibrer un quartz piézoélectrique et ainsi connaître combien de temps s'est écoulé depuis la dernière fois que le composant a été éteint. 

**Remarque** : On trouve le même type de composant dans les unité centrales des ordinateurs afin que ces derniers gardent la bonne date même lorsqu'ils sont débrancher électriquement.


![rtc](https://ae01.alicdn.com/kf/HTB1hJgePNTpK1RjSZR0q6zEwXXaG/DS3231-AT24C32-IIC-pr-cision-RTC-Module-de-m-moire-d-horloge-en-temps-r-el.jpg)

Une nouvelle fois, il va falloir ajouter une bibliothèque pour gérer notre horloge interne. Pour cela dans l'IDE Arduino allez dans le menu "Croquis/Inclure une bibliothèque/Gérer les bibliothèques" puis cherchez et installez la bibliothèque suivante : **RTCLib** by Adafruit


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

![dht11](https://ae01.alicdn.com/kf/HTB1WbV_ayLrK1Rjy1zdq6ynnpXa5/10-pi-ces-DHT22-AM2302-DHT11-DHT12-AM2320-Module-de-capteur-d-humidit-de-temp-rature.jpg)

Une nouvelle fois, il va falloir ajouter une bibliothèque pour gérer ce composant. Pour cela dans l'IDE Arduino allez dans le menu "Croquis/Inclure une bibliothèque/Gérer les bibliothèques" puis cherchez et installez la bibliothèque suivante : **SDHT** by Helder Rodrigues

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
![tm](https://ae01.alicdn.com/kf/HTB1N13if0fJ8KJjy0Feq6xKEXXaO/4-LED-num-rique-0-56-Tube-d-affichage-d-cimal-7-Segments-TM1637-horloge-Double.jpg)

Ici encore, il va falloir ajouter une bibliothèque pour gérer ce composant. Pour cela dans l'IDE Arduino allez dans le menu "Croquis/Inclure une bibliothèque/Gérer les bibliothèques" puis cherchez et installez la bibliothèque suivante : **TM1637** by Avishay Orpaz

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
  // Luminosité de l'afficheur de 0 à 7
  display.setBrightness(5);
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

![dfplayer](https://ae01.alicdn.com/kf/HTB1O54OFuySBuNjy1zdq6xPxFXaT/A14-10-pi-ces-SAMIORE-ROBOT-Mini-lecteur-MP3-Module-TF-carte-U-disque-Mini-lecteur.jpg)

Les chansons doivent être placées dans un répertoire nommé *mp3* sur la carte micro-SD et doivent être renommées afin quelles commencent par quatre chiffres (indiquant l'ordre de lecture). Les chansons suivantes ont été installées sur votre carte micro-SD :
    
Chanson 0001 : 
* Titre:  Broke Inside My Mind (feat Ellie Griffiths)
* Auteur: Anitek
* Source: [https://soundcloud.com/anitek](https://soundcloud.com/anitek)
* Licence: [CC BY-NC-ND](http://creativecommons.org/licenses/by-nc-nd/3.0/deed.fr)
* Téléchargement (6MB): [https://www.auboutdufil.com/index.php?id=472](https://www.auboutdufil.com/index.php?id=472)

Chanson 0002 :
* Titre:  Summer Spliffs
* Auteur: Broke For Free
* Source: [http://brokeforfree.bandcamp.com/](http://brokeforfree.bandcamp.com/)
* Licence: [CC BY](https://creativecommons.org/licenses/by/3.0/deed.fr)
* Téléchargement (9MB): [https://www.auboutdufil.com/index.php?id=495](https://www.auboutdufil.com/index.php?id=495)

Chanson 0003 :
* Titre:  Barefoot Girl Pebble Road
* Auteur: Twizzle
* Source: [http://www.myspace.com/twizzlesizzles](http://www.myspace.com/twizzlesizzles)
* Licence: http://creativecommons.org/licenses/by-nc/2.0/deed.fr
* Téléchargement (4MB): [https://www.auboutdufil.com/index.php?id=432](https://www.auboutdufil.com/index.php?id=432)

Chanson 0004 : 
* Titre:  Final
* Auteur: K Soviet
* Source: [http://ksoviet.blogspot.com](http://ksoviet.blogspot.com)
* Licence: [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr)
* Téléchargement (5MB): [https://www.auboutdufil.com/index.php?id=484](https://www.auboutdufil.com/index.php?id=484)
               
Chanson 0005 :
* Titre:  Mr Disco
* Auteur: Nezoomie
* Source: [https://www.facebook.com/NeZoomieFanPage](https://www.facebook.com/NeZoomieFanPage)
* Licence: [CC BY-NC-ND](http://creativecommons.org/licenses/by-nc-nd/2.5/it/deed.fr)
* Téléchargement (12MB): [https://www.auboutdufil.com/index.php?id=418](https://www.auboutdufil.com/index.php?id=418)

Chanson 0006 : 
* Titre:  Plastic Submarine
* Auteur: The Grammar Club
* Source: [https://www.facebook.com/TheGrammarClub](https://www.facebook.com/TheGrammarClub)
* Licence: [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/3.0/deed.fr)
* Téléchargement (10MB): [https://www.auboutdufil.com/index.php?id=478](https://www.auboutdufil.com/index.php?id=478)


Insérez la carte micro-SD dans le module.
    
Une nouvelle fois, il va falloir ajouter une bibliothèque pour gérer ce composant. Pour cela dans l'IDE Arduino allez dans le menu "Croquis/Inclure une bibliothèque/Gérer les bibliothèques" puis cherchez et installez la bibliothèque suivante : **DFRobotDFPlayerMini** by DFRobot


![dfplayer2](https://raw.githubusercontent.com/DFRobot/DFRobotMediaWikiImage/master/Image/miniplayer_pin_map.png)


**Attention** : Aidez-vous du schéma ci-dessus pour faire les branchements. Faites toutefois attention, les broches de connexions sont en dessous du module si vous le mettez dans même position que sur le schéma.

Récupérez le cable avec la résistance intégrée et branchez le entre la broche **S** du port 11 et la broche **RX** du module.

Détachez un groupe de 3 fils :
* Branchez un fil entre la broche **S** du port 10 et la broche **TX** du module
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


![neopixel](https://ae01.alicdn.com/kf/HTB1c6WwmSMmBKNjSZTEq6ysKpXaG/10-pi-ces-WS2812-LED-5050-RVB-8x8-64-LED-Matrice.jpg)

Une nouvelle fois, il va falloir ajouter une bibliothèque pour gérer ce composant. Pour cela dans l'IDE Arduino allez dans le menu "Croquis/Inclure une bibliothèque/Gérer les bibliothèques" puis cherchez et installez la bibliothèque suivante : **Adafruit NeoPixel** by Adafruit


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

## Stocker des informations dans l'arduino

Par défaut, quand on arrête l'arduino on va perdre toutes les valeurs du programme. Dans certain cas, on aimerait garder une information après le redémarrage de l'arduino. 

Pour cela on peut utiliser la partie où est stocké le programme pour enregistrer des informations. Cette partie s'appelle l'[EEPROM](https://fr.wikipedia.org/wiki/Electrically-erasable_programmable_read-only_memory).

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

Régler l'alarme puis redémarrer l'arduino (en appuyant sur le petit bouton noir "reset" sur le dessus de l'arduino) afin de vérifier que vos modifications sont bien sauvegardées après le redémarrage.


---

## Utiliser un buzzer

Le buzzer MH-FMG permet de générer des sons de manière simple. 

![buzzer](https://ae01.alicdn.com/kf/HTB14yOBaLLsK1Rjy0Fbq6xSEXXah/10-pi-ces-Module-de-sonnerie-actif-nouveau-kit-de-bricolage-Module-de-sonnerie-Active-bas.jpg)

Détachez un groupe de 3 fils :
* Branchez un fil entre la broche **I/O** du buzzer et la broche **S** du port 3
* Branchez un fil entre la broche **VCC** du buzzer et la broche **V** du port 3
* Branchez un fil entre la broche **GND** du buzzer et la broche **G** du port 3

Laissez le cache devant le buzzer avant de téléverser le programme suivant, en effet le son sortant du buzzer est très fort :
```C
const byte PIN_BUZZER = 3;

void playTetris() {
   tone(PIN_BUZZER, 2637, 200);
  delay(400);
  tone(PIN_BUZZER, 1975, 200);
  delay(200);
  tone(PIN_BUZZER, 2093, 200);
  delay(200);
  tone(PIN_BUZZER, 2349, 200);
  delay(400);
  tone(PIN_BUZZER, 2093, 200);
  delay(200);
  tone(PIN_BUZZER, 1975, 200);
  delay(200);
  tone(PIN_BUZZER, 1760, 200);
  delay(400);
  tone(PIN_BUZZER, 1760, 200);
  delay(200);
  tone(PIN_BUZZER, 2093, 200);
  delay(200);
  tone(PIN_BUZZER, 2637, 200);
  delay(400);
  tone(PIN_BUZZER, 2349, 200);
  delay(200);
  tone(PIN_BUZZER, 2093, 200);
  delay(200);
  tone(PIN_BUZZER, 1975, 200);
  delay(400);
  tone(PIN_BUZZER, 1975, 200);
  delay(200);
  tone(PIN_BUZZER, 2093, 200);
  delay(200);
  tone(PIN_BUZZER, 2349, 200);
  delay(400);
  tone(PIN_BUZZER, 2637, 200);
  delay(400);
  tone(PIN_BUZZER, 2093, 200);
  delay(400);
  tone(PIN_BUZZER, 1760, 200);
  delay(400);
  tone(PIN_BUZZER, 1760, 200);
  delay(800);
  tone(PIN_BUZZER, 1760, 200);
  delay(400);
  tone(PIN_BUZZER, 2349, 200);
  delay(200);
  tone(PIN_BUZZER, 2794, 200);
  delay(200);
  tone(PIN_BUZZER, 3520, 200);
  delay(400);
  tone(PIN_BUZZER, 3136, 200);
  delay(200);
  tone(PIN_BUZZER, 2794, 200);
  delay(200);
  tone(PIN_BUZZER, 2637, 200);
  delay(600);
  tone(PIN_BUZZER, 2093, 200);
  delay(200);
  tone(PIN_BUZZER, 2637, 200);
  delay(400);
  tone(PIN_BUZZER, 2349, 200);
  delay(200);
  tone(PIN_BUZZER, 2093, 200);
  delay(200);
  tone(PIN_BUZZER, 1975, 200);
  delay(400);
  tone(PIN_BUZZER, 1975, 200);
  delay(200);
  tone(PIN_BUZZER, 2093, 200);
  delay(200);
  tone(PIN_BUZZER, 2349, 200);
  delay(400);
  tone(PIN_BUZZER, 2637, 200);
  delay(400);
  tone(PIN_BUZZER, 2093, 200);
  delay(400);
  tone(PIN_BUZZER, 1760, 200);
  delay(400);
  tone(PIN_BUZZER, 1760, 200);
  delay(800); 
}

void setup() {
  pinMode(PIN_BUZZER, OUTPUT);
}

void loop() {
  playTetris();
  delay(2000);
}
```


---

## Utiliser un encodeur rotatif

Un encodeur rotatif permet d'incrémenter ou décrémenter une valeur. L'encodeur contient aussi un bouton.

![encoder](https://ae01.alicdn.com/kf/HTB1lSn3kb1YBuNjSszhq6AUsFXaJ/10-pi-ces-SAMIORE-ROBOT-codeur-rotatif-Module-brique-capteur-d-veloppement.jpg)

Détachez un groupe de 5 fils :
* Branchez un fil entre la broche **GND** de l'encodeur et la broche **G** du port A1
* Branchez un fil entre la broche **+** de l'encodeur et la broche **V** du port A1
* Branchez un fil entre la broche **SW** de l'encodeur et la broche **S** du port A3
* Branchez un fil entre la broche **DT** de l'encodeur et la broche **S** du port A2
* Branchez un fil entre la broche **CLK** de l'encodeur et la broche **S** du port A1

Téléversez le programme suivant :
    
```C
int ROTARY_CLK = A1;  // Pin 9 to clk on encoder
int ROTARY_DT = A2;  // Pin 8 to DT on encoder
int ROTARY_BUTTON = A3;


int position = 0; 
int rotation;
int lastClicked;

void setup() {
  Serial.begin (9600);
  pinMode (ROTARY_CLK,INPUT);
  pinMode (ROTARY_DT,INPUT);
  pinMode(ROTARY_BUTTON, INPUT_PULLUP);    
}

void loop() {
  // put your main code here, to run repeatedly:
  int value = digitalRead(ROTARY_CLK);
  if (value != rotation){ // we use the DT pin to find out which way we turning.
     if (digitalRead(ROTARY_DT) != value) {  // Clockwise
       position ++;
     } else { //Counterclockwise
       position--;
     }
     Serial.print("Encoder position: ");
     Serial.println(position);
  }
  int clicked = ! digitalRead(ROTARY_BUTTON);
  if (lastClicked != clicked) {
    Serial.print("Button clicked: ");
    Serial.println(clicked);
    lastClicked=clicked;
  }

  rotation = value;
}
```


---

## Utiliser un capteur de luminosité (LDR)


On peut mesurer la luminosité ambiante grâce à une [photorésistance](https://fr.wikipedia.org/wiki/Photor%C3%A9sistance) (*Light Dependent Resistor*, *LDR* ou *photoresistor* en anglais). 

![LDR](https://ae01.alicdn.com/kf/HTB1Xe3lIFXXXXcOaXXXq6xXFXXXR/20-pcs-lot-GL5516-5516-r-sistance-d-pendante-de-la-lumi-re-LDR-5-MM.jpg)


On ne va pas détailler ici le pré-cablage que l'on a fait avec la photorésitance et la résistance, suivez simplement ces étapes :
* Branchez le fils réunissant une patte de la photorésistance et une patte de la résistance sur la broche **S** du port A7
* Branchez le fils venant de la patte restante de la photorésistance sur la broche **V** du port A7
* Branchez le fils venant de la patte restante de la résistance sur la broche **G** du port A7

Téléverser le code suivante :
```C
#define LDR A7

void setup() {
    Serial.begin(9600);

}

void loop() {
  int lum = analogRead(LDR);
  Serial.print("luminosite=");
  Serial.println(lum);
  delay(500);
}
```
    
Vous devriez voir dans la console développeur la valeur de la luminosité, recouvrer ou éclairer la photorésistance pour voir cette valeur changer.

En combinant ce code avec celui de l'afficheur 4*7 segments, on peut faire un programme qui change l'éclairage de l'afficheur selon la luminosité :

```C
#include <TM1637Display.h>
#define TM1637_CLK 12
#define TM1637_DIO 13
#define LDR A7

TM1637Display display(TM1637_CLK, TM1637_DIO);

void setup() {
  Serial.begin(9600);
}

void loop() {
  int lum = analogRead(LDR);
  Serial.print("luminosite=");
  Serial.println(lum);
  int brightness = map(lum, 0, 1023, 0, 7);
  display.setBrightness(brightness);
  display.showNumberDec(lum);
  delay(500);
}
```

---

## DEL RVB

Vous n'aurez normalement pas besoin de ce composant pour votre projet, mais voici tout de même sa documentation si vous voulez l'utiliser plus tard.

Une DEL RVB (Rouge, Vert, Bleu ou RGB en anglais pour Red, Green, Blue) permet de choisir la couleur de la lumière. Chaque composante de la lumière (rouge, verte et bleue) peut prendre une valeur de 0 à 255. 

![rgb led](https://ae01.alicdn.com/kf/HTB1j1U4XhuaVKJjSZFjq6AjmpXar.jpg)

Il faut brancher les broches R,G et B de la DEL sur des ports PWM de l'Arduino (typiquement les port 9, 10 et 11). Détachez un groupe de 4 fils :
* Branchez un fil entre la broche ***G*** de la DEL sur la broche ***S*** du port 9
* Branchez un fil entre la broche ***B*** de la DEL sur la broche ***S*** du port 10
* Branchez un fil entre la broche ***R*** de la DEL sur la broche ***S*** du port 11
* Branchez un fil entre la broche ***-*** de la DEL sur la broche ***G*** du port 9, 10 ou 11 

```C
int redpin=11;
int bluepin=10;
int greenpin=9;
void setup() {
  pinMode(redpin, OUTPUT);
  pinMode(bluepin, OUTPUT);
  pinMode(greenpin, OUTPUT);
  randomSeed(analogRead(0));
}
void loop() {
  analogWrite(redpin,
              random(255));
  analogWrite(bluepin,
              random(255));
  analogWrite(greenpin,
              random(255));
  delay(500); 
}
```

---

## Moteur pas-à-pas 

Vous n'aurez normalement pas besoin de ce composant pour votre projet, mais voici tout de même sa documentation si vous voulez l'utiliser plus tard.

Un moteur pas-à-pas permet de gérer des rotations précises ([documentation](http://www.airspayce.com/mikem/arduino/AccelStepper/))


![step motor](https://ae01.alicdn.com/kf/HTB1jujvLFXXXXX7XXXXq6xXFXXX2/225895102/HTB1jujvLFXXXXX7XXXXq6xXFXXX2.jpg)


Une nouvelle fois, il va falloir ajouter une bibliothèque pour gérer ce composant. Pour cela dans l'IDE Arduino allez dans le menu "Croquis/Inclure une bibliothèque/Gérer les bibliothèques" puis cherchez et installez la bibliothèque suivante : **AccelStepper** de Mike McCauley


Branchez le cable du moteur pas-à-pas sur la carte de contrôle. Détachez un groupe de 4 fils pour les broches ***IN*** et un groupe de 2 fils pour les broches ***-*** et ***+***): 
* Branchez un fil entre la broche ***IN1*** du contrôleur et la broche ***S*** du port ***4*** de l'Arduino
* Branchez un fil entre la broche ***IN2*** du contrôleur et la broche ***S*** du port ***5*** de l'Arduino
* Branchez un fil entre la broche ***IN3*** du contrôleur et la broche ***S*** du port ***6*** de l'Arduino
* Branchez un fil entre la broche ***IN4*** du contrôleur et la broche ***S*** du port ***7*** de l'Arduino
* Branchez un fil entre la broche ***-*** du contrôleur et la broche ***G*** du port ***7*** de l'Arduino
* Branchez un fil entre la broche ***+*** du contrôleur et la broche ***V*** du port ***7*** de l'Arduino


### Mode bloquant

```C
#include <AccelStepper.h>
#define motorPin1  4
#define motorPin2  5
#define motorPin3  6
#define motorPin4  7
AccelStepper stepper(
    AccelStepper::HALF4WIRE,
    motorPin1, motorPin3,
    motorPin2, motorPin4);

void setup() {
  stepper.setMaxSpeed(1000);
  stepper.setAcceleration(100.0);
  stepper.enableOutputs();
}
void loop() {
    stepper.runToNewPosition(0);
    stepper.runToNewPosition(1000);
}
```


### Mode non-bloquant

Dans le code précédent à chaque appel à la fonction ***runToNewPosition*** le programme attend la fin de la rotation du moteur pour exécuter la ligne de code suivante. Voici ici un exemple de code permettant de faire tourner le moteur sans bloquer le programme :

```C
#include <AccelStepper.h>
#define motorPin1  4
#define motorPin2  5
#define motorPin3  6
#define motorPin4  7
AccelStepper stepper(
    AccelStepper::HALF4WIRE,
    motorPin1, motorPin3,
    motorPin2, motorPin4);

void setup() {
  stepper.setMaxSpeed(1000);
  stepper.move(1);
  Serial.begin(9600);
}

void loop() {
  if (isCommandTerminated()) {
    Serial.println("fin");
    delay(500);
    stepper.move(300);
  }
}

boolean isCommandTerminated() {
  stepper.setSpeed(1000);    
  int d = stepper.distanceToGo();
  stepper.runSpeedToPosition();
  if (d == 0) {
    return true;
  } else {
    return false;
  }
}
```

---


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

Pour que votre projet soit "connecté" il faut pouvoir communiquer avec lui (et de préférence sans fil). Ici on a le choix dans les protocoles : LoRa, bluetooth, Z-Wave, ZigBee, Wifi ...

Dans cette session on va utiliser le Wifi via une carte WeMos D1 R1. Cette carte contient un [ESP8266](https://fr.wikipedia.org/wiki/ESP8266) qui permet de gérer facilement une connexion Wifi. Ce type de carte contient aussi assez de mémoire et de puissance de calcul pour héberger un mini [serveur Web](https://fr.wikipedia.org/wiki/Serveur_web).

On va continuer à utiliser l'IDE Arduino pour programmer le Wemos, mais il va falloir installer tout l'environnement (cette partie est déjà réalisée sur les ordinateurs fournis) :
* Allez dans "Fichier/Préférences" et placez l’URL https://arduino.esp8266.com/stable/package_esp8266com_index.json dans « URL de gestionnaire de cartes supplémentaires
* Allez dans "Outils/Type de carte/Gestionnaire de carte", rechercher « esp8266 » et installer la dernière version proposée.
* Branchez le Wemos sur votre ordinateur avec le cable USB
* Sélectionnez le nouveau port dans "Outils/ports"
* Sélectionnez "WeMos D1 R1" dans "Outils/Type de carte"
* Ouvrez le moniteur série et vérifez que la vitesse de communication est bien toujours égale à *9600 baud* (menu en bas à droite de la fenêtre)

Modifiez les déclarations de STASSID et STAPSK selon les paramètres de votre box et téléversez le programme suivant :
```C
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>

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

Notez cette dernière adresse (192.168.1.XX ou XX doit être un nombre de 0 à 255) et copiez la dans un navigateur Web sur votre PC. Vous deviez voir apparaître le mot "Bienvenue". Vous pouvez essayer la même manipulation depuis votre téléphone portable s'il est connecté au même réseau Wifi.

Modifiez le code précédent pour afficher une autre phrase.
 
Pour le moment notre petit serveur Web ne sait gérer que les requêtes appelant la page racine ("/"). On va faire en sorte qu'il puisse répondre à l'interrogation de la page "/IP" :
    
```C
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>


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
Retounez sur votre navigateur et tapez l'URL http://192.168.1.XX/IP vous deviez voir apparaître l'adresse IP de votre WeMos.

Modifiez le code précédent pour afficher d'autre page.

On va maintenant utiliser le moniteur série pour modifier une variable que l'on affichera sur le serveur Web :
```C
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>


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

![level](https://ae01.alicdn.com/kf/HTB1z3ifLpXXXXa5XXXXq6xXFXXXq/Convertisseur-de-niveau-logique-haute-vitesse-bidirectionnelle-3-3-V-5-V-4-Chanels.jpg)

Repérez sur le *shield* arduino la ligne de broches **RX TX 5V GND** (au dessus de la ligne I2C) et détachez un groupe de 4 fils :
* Branchez un fil entre la broche **5V** du convertisseur sur la broche **5V** sur l'arduino
* Branchez un fil entre la broche **GND** (sous la broche **5V**) du convertisseur sur la broche **GND** sur l'arduino
* Branchez un fil entre la broche **A4** du convertisseur sur la broche **TX** sur l'arduino
* Branchez un fil entre la broche **A3** du convertisseur sur la broche **RX** sur l'arduino

Détachez un groupe de 2 fils :
* Branchez un fil entre la broche **3.3V** du convertisseur sur une des broches **3V3** de l'arduino
* Branchez un fil entre la broche **GND** (sous la broche **3.3V**) du convertisseur sur une des broches **GND** (sous la broche **3V3** précédemment connectée) de l'arduino

Détachez un groupe de 2 fils de la même couleurs que ceux brancher sur les broches **A4** et **A3** du convertisseur :
* Branchez le fil de la même couleur que celui partant de **A4** entre la broche **B4** du convertisseur sur la broche **D6** du WeMos
* Branchez un fil de la même couleur que celui partant de **A3** entre la broche **B3** du convertisseur sur la broche **D5** du WeMos

Détachez un groupe de 2 fils :
* Branchez un fil entre la broche **V** du port **0** de l'arduino sur la broche **5V** du WeMos
* Branchez un fil entre la broche **G** du port **0** de l'arduino sur la broche **G** du WeMos

Téléversez le programme suivant :
    
```C
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>

#ifndef STASSID
#define STASSID "Livebox-8A44"
#define STAPSK  "mGrfwzHYZwMfvPLNCX"
#endif

#define RX D6
#define TX D5
SoftwareSerial arduino(RX, TX);
ESP8266WiFiMulti WiFiMulti;
ESP8266WebServer server(80);

const char* ssid     = STASSID;
const char* password = STAPSK;

void setup() {
  Serial.begin(9600);
  arduino.begin(9600);

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
  server.on("/mp3/play", playMP3);
  server.on("/mp3/pause", pauseMP3);
  server.on("/mp3/next", nextMP3);
  server.on("/mp3/previous", previousMP3);
  server.on("/image", setImage);

  server.begin();

  delay(500);
}

String getKey(String str) {
  return str.substring(0, str.indexOf('='));
}

String getValue(String str) {
  return str.substring(str.indexOf('=') + 1);
}


int temperature = 0;
int volume = 10;

void handleRoot() {
  // Sur la page d'accueil on ajoute des liens (HTML) pour controler notre arduino
  server.send(200, "text/html", "<h1>Bienvenue</h1>"
              "<hr>"
              "<a href='/mp3/play'>MP3 : lancer</a><br>"
              "<a href='/mp3/pause'>MP3 : pause</a><br>"
              "<a href='/mp3/next'>MP3 : chanson suivante</a><br>"
              "<a href='/mp3/previous'>MP3 : chanson precedente</a><br>"
              "<a href='/mp3/volume'>MP3 : recuperer volume</a><br>"
              "<a href='/mp3/volume?volume=25'>MP3 : mettre volume a 25</a><br>"
              "<a href='/mp3/volume?volume=10'>MP3 : mettre volume a 10</a><br>"
              "<hr>"
              "<a href='/image?image='>image : aucune</a><br>"              
              "<a href='/image?image=coeur'>image : coeur</a><br>"
              "<a href='/image?image=smiley'>image : smiley</a><br>"              
              "<a href='/image?image=pluie'>image : pluie</a><br>"
              "<a href='/image?image=soleil'>image : soleil</a><br>"
              "<a href='/image?image=nuage'>image : nuage</a><br>"
              "<a href='/image?image=nuit'>image : nuit</a><br>"
              "<hr>"              
              "<a href='/temperature'>Recuperer temperature</a><br>"
             );
}

void displayIP() {
  String ip = WiFi.localIP().toString();
  server.send(200, "text/html", "IP=" + ip);
}

void setImage() {
  String image = server.arg(0);
  arduino.print("image=");
  arduino.println(image);
  server.send(200, "text/html", "image="+image);  
}

void setMP3Volume() {
  // On récupére la première valeur passée en paramètre de la page
  // ex ?volume=22 ... normalement on devrait vérifier que le server.argName(0) vaut bien "volume"
  // Mais comme on n'aura qu'un seul paramètre sur nos projets on ignore cette phase.
  String volumeStr = server.arg(0);
  if (volumeStr != "") {
    volume = volumeStr.toInt();
    arduino.print("volume=");
    arduino.println(volume);
  }
  server.send(200, "text/html", "volume=" + String(volume));
}

void playMP3() {
  arduino.println("lecture");
  server.send(200, "text/html", "mp3=lecture");
}

void pauseMP3() {
  arduino.println("pause");
  server.send(200, "text/html", "mp3=pause");
}

void nextMP3() {
  arduino.println("suivante");
  server.send(200, "text/html", "mp3=suivante");
}

void previousMP3() {
  arduino.println("precedente");
  server.send(200, "text/html", "mp3=precedente");
}


void displayTemp() {
  server.send(200, "text/html", "temperature=" + String(temperature));
}

void loop() {
  // Ici on peut récupérer les lignes venant de l'arduino
  while (arduino.available()) {
    String line = arduino.readStringUntil('\n');// read the incoming data as string
    line.trim();
    Serial.print("received:<");
    Serial.print(line);
    Serial.println(">");
    if (getKey(line) == "temp") {
      temperature = getValue(line).toInt();
    } else if (getKey(line) == "volume") {
      volume = getValue(line).toInt();
    }
  }
  // Si on écrit des lignes dans le moniteur série on les envoie sur l'arduino
  while (Serial.available() > 0) {
    arduino.write(Serial.read());
  }
  server.handleClient();

}

```

Vous devriez voir apparaître des lignes venant de votre arduino dans le moniteur série. Toutes les lignes écrites dans le moniteur série seront envoyée vers l'arduino. Faites quelques essais pour vérifier que vous pouvez bien piloter votre arduino depuis le WeMos.

**Remarques importantes** :
* Vous pouvez brancher l'arduino et le WeMos sur le même PC. Pensez juste à changer le port et le type de carte avant de téléverser vos programmes
* Si vous voulez changer votre programme arduino quand ce dernier est connecté au WeMos vous aurez des problème durant le téléversement. En effet le fait que le WeMos soit connecté sur les ports RX et TX de l'arduino perturbe le téléversement. Il faut donc débrancher les cables reliant les ports RX/TX de l'arduino et D5/D6 du WeMos. Le plus simple est de débrancher 2 fils au niveau du convertisseur de niveau (broches A4/A3 ou B3/B4). Le fait de choisir des couleurs identiques pour ces fils vous permettra de les rebrancher facilement quand votre programme arduino sera finalisé. 
* Attention à ne pas mettre trop de luminosité sur la matrice de DEL. Si trop de courant passe par l'arduino ce dernier peut "cramer". Quand on veut mettre la luminosité à fond il faut alimenter la matrice via une alimentation externe.

---

## Décrire les interfaces Web

A vous maintenant de mettre en place les pages Web qui vont permettre de piloter votre projet.


---

## La suite


Vous allez maintenant utiliser AppInventor afin de contrôler votre projet depuis une application mobile.
