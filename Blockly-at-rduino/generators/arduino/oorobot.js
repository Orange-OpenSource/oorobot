'use strict';

goog.provide('Blockly.Arduino.oorobot');

goog.require('Blockly.Arduino');

Blockly.Arduino.oorobot_keypad_init = function() {
	var value_pin = Blockly.Arduino.valueToCode(this, 'PORT', Blockly.Arduino.ORDER_ATOMIC);
	
	Blockly.Arduino.includes_['define_oorobot_keypad'] = '#define KEYS_PIN A'+value_pin;
	Blockly.Arduino.definitions_['define_oorobot_keypad'] = "int LONG_CLICK_DELAY = 500;\n"+
		"int DEBOUNCING_DELAY = 300;\n" +
		"int lastButtonId = -1;\n" + 
		"unsigned long lastClick = 0;\n" +
		"unsigned long lastRawPressed = 0;\n" +
		"int getPressedButton() {\n" + 
		" \n" + 
		"  int raw = analogRead(KEYS_PIN);\n" + 
		"  int b = -1;\n" + 
		"  if (raw >= 472) {\n" + 
		"    lastRawPressed = millis();\n" + 
		"    if (raw >= 981) {\n" + 
		"      b = 1;\n" + 
		"    } else if (raw >= 894 && raw <= 966) {\n" + 
		"      b = 2;\n" + 
		"    } else if (raw >= 823 && raw < 877) {\n" + 
		"      b = 3;\n" + 
		"    } else if (raw >= 763 && raw <= 817) {\n" + 
		"      b = 4;\n" + 
		"    } else if (raw >= 707 && raw <= 753) {\n" + 
		"      b = 5;\n" + 
		"    } else if (raw >= 662 && raw <= 698) {\n" + 
		"      b = 6;\n" + 
		"    } else if (raw >= 622 && raw <= 698) {\n" + 
		"      b = 7;\n" + 
		"    } else if (raw >= 586 && raw <= 614) {\n" + 
		"      b = 8;\n" + 
		"    } else if (raw >= 556 && raw <= 584) {\n" + 
		"      b = 9;\n" + 
		"    } else if (raw >= 526 && raw <= 554) {\n" + 
		"      b = 10;\n" + 
		"    } else if (raw >= 501 && raw <= 519) {\n" + 
		"      b = 0;\n" + 
		"    } else if (raw >= 472 && raw <= 508) {\n" + 
		"      b = 11;\n" + 
		"    }\n" + 
		"    unsigned long currentClick = millis();\n" + 
		"    if (lastButtonId != b) {\n" + 
		"      if (currentClick > lastClick + DEBOUNCING_DELAY) {\n" + 
		"        lastClick = currentClick;\n" + 
		"        lastButtonId = b;\n" + 
		"      } else {\n" + 
		"        b = -1;\n" + 
		"      }\n" + 
		"    } else {\n" + 
		"      if (currentClick > lastClick + LONG_CLICK_DELAY) {\n" + 
		"        lastButtonId = b;\n" + 
		"        b = b + 12;\n" + 
		"        lastClick = currentClick;\n" + 
		"      } else {\n" + 
		"        b = -1;\n" + 
		"      }\n" + 
		"    }\n" + 
		"  } else {\n" + 
		"    if (millis() - lastRawPressed > 100) {\n" + 
		"      lastButtonId = -1;\n" + 
		"    }\n" + 
		"  }\n" + 
		"  return b;\n" + 
		"}\n";
	Blockly.Arduino.setups_['setup_lcd'] = "pinMode(KEYS_PIN, INPUT);\n";
	
	
	return "";
};

Blockly.Arduino.oorobot_keypad = function() {
	return [ 'getPressedButton()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.oorobot_right_stepper_config = function() {
	var dropdown_stepper_name = this.getFieldValue('STEPPER_NAME');
	var stepper_in1 = Blockly.Arduino.valueToCode(this, 'STEPPER_IN1', Blockly.Arduino.ORDER_ATOMIC);
	var stepper_in2 = Blockly.Arduino.valueToCode(this, 'STEPPER_IN2', Blockly.Arduino.ORDER_ATOMIC);
	var stepper_in3 = Blockly.Arduino.valueToCode(this, 'STEPPER_IN3', Blockly.Arduino.ORDER_ATOMIC);
	var stepper_in4 = Blockly.Arduino.valueToCode(this, 'STEPPER_IN4', Blockly.Arduino.ORDER_ATOMIC);
	var stepper_max_speed = Blockly.Arduino.valueToCode(this, 'STEPPER_SPEED', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.includes_['define_AccelStepper'] = '#include <AccelStepper.h>';
	
	Blockly.Arduino.includes_['define_oorobot_right_stepper'] = "#define motorPin1  "+stepper_in1+"\n" +
		"#define motorPin2  "+stepper_in2+"\n"+
		"#define motorPin3  "+stepper_in3+"\n"+
		"#define motorPin4  "+stepper_in4+"\n";

	Blockly.Arduino.definitions_['define_oorobot_right_stepper'] = 'AccelStepper '+dropdown_stepper_name+'(AccelStepper::HALF4WIRE, motorPin1, motorPin3, motorPin2, motorPin4);\n';

	Blockly.Arduino.setups_['setup_oorobot_right_stepper'] = dropdown_stepper_name+'.setMaxSpeed('+stepper_max_speed+');\n'+
		'  '+dropdown_stepper_name+'.move(1);\n';
	
	return "";
};

Blockly.Arduino.oorobot_left_stepper_config = function() {
	var dropdown_stepper_name = this.getFieldValue('STEPPER_NAME');
	var stepper_in1 = Blockly.Arduino.valueToCode(this, 'STEPPER_IN1', Blockly.Arduino.ORDER_ATOMIC);
	var stepper_in2 = Blockly.Arduino.valueToCode(this, 'STEPPER_IN2', Blockly.Arduino.ORDER_ATOMIC);
	var stepper_in3 = Blockly.Arduino.valueToCode(this, 'STEPPER_IN3', Blockly.Arduino.ORDER_ATOMIC);
	var stepper_in4 = Blockly.Arduino.valueToCode(this, 'STEPPER_IN4', Blockly.Arduino.ORDER_ATOMIC);
	var stepper_max_speed = Blockly.Arduino.valueToCode(this, 'STEPPER_SPEED', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.includes_['define_AccelStepper'] = '#include <AccelStepper.h>';
	
	Blockly.Arduino.includes_['define_oorobot_left_stepper'] = "#define motorPin5  "+stepper_in1+"\n" +
		"#define motorPin6  "+stepper_in2+"\n"+
		"#define motorPin7  "+stepper_in3+"\n"+
		"#define motorPin8  "+stepper_in4+"\n";

	Blockly.Arduino.definitions_['define_oorobot_left_stepper'] = 'AccelStepper '+dropdown_stepper_name+'(AccelStepper::HALF4WIRE, motorPin5, motorPin7, motorPin6, motorPin8);\n';

	Blockly.Arduino.setups_['setup_oorobot_left_stepper'] = dropdown_stepper_name+'.setMaxSpeed('+stepper_max_speed+');\n'+
		'  '+dropdown_stepper_name+'.move(1);\n';
	
	return "";
};

Blockly.Arduino.oorobot_stepper_enable = function() {
	var dropdown_stepper_name = this.getFieldValue('STEPPER_NAME');
	return dropdown_stepper_name+".enableOutputs();\n";
};

Blockly.Arduino.oorobot_stepper_disable = function() {
	var dropdown_stepper_name = this.getFieldValue('STEPPER_NAME');
	return dropdown_stepper_name+".disableOutputs();\n";
};

	
Blockly.Arduino.oorobot_stepper_set_speed = function() {
	var dropdown_stepper_name = this.getFieldValue('STEPPER_NAME');
	var stepper_speed = Blockly.Arduino.valueToCode(this, 'STEPPER_SPEED', Blockly.Arduino.ORDER_ATOMIC);
	return dropdown_stepper_name+".setSpeed("+stepper_speed+");\n";
};

Blockly.Arduino.oorobot_stepper_move_to = function() {
	var dropdown_stepper_name = this.getFieldValue('STEPPER_NAME');
	var stepper_steps = Blockly.Arduino.valueToCode(this, 'STEPPER_DISTANCE', Blockly.Arduino.ORDER_ATOMIC);
	return dropdown_stepper_name+".moveTo("+stepper_steps+");\n";
};

Blockly.Arduino.oorobot_stepper_run_speed_to_position = function() {
	var dropdown_stepper_name = this.getFieldValue('STEPPER_NAME');
	return dropdown_stepper_name+".runSpeedToPosition();\n";
};

Blockly.Arduino.oorobot_stepper_distance_to_go = function() {
	var dropdown_stepper_name = this.getFieldValue('STEPPER_NAME');
	//var dropdown_stepper_name = Blockly.Arduino.valueToCode(this, 'STEPPER_NAME', Blockly.Arduino.ORDER_ATOMIC);;
	console.log('oorobot_stepper_distance_to_go');
	console.log(dropdown_stepper_name);
	var code = dropdown_stepper_name+'.distanceToGo()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.oorobot_i2c_lcdinit = function() {
	var dropdown_I2C_adress = this.getFieldValue('I2C_adress');
	var dropdown_nbcol = this.getFieldValue('nbcol');
	var dropdown_nblig = this.getFieldValue('nblig');
	var dropdown_cursor = this.getFieldValue('cursor');
	var dropdown_blink = this.getFieldValue('blink');
	var dropdown_backlight = this.getFieldValue('backlight');
	Blockly.Arduino.includes_['define_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.includes_['define_LiquidCrystal_I2C'] = '#include <LiquidCrystal_I2C.h>';
	Blockly.Arduino.definitions_['var_lcd'] = 'LiquidCrystal_I2C lcd('+dropdown_I2C_adress+', '+dropdown_nbcol+', '+dropdown_nblig+');';
	var mysetup='lcd.init();\n';
	if (dropdown_backlight=="TRUE")
	{
		mysetup+='  lcd.backlight();\n';
	} else
	{
		mysetup+='  lcd.noBacklight();\n';
	}
	if (dropdown_cursor=="TRUE")
	{
		mysetup+='  lcd.cursor();\n';
	} else
	{
		mysetup+='  lcd.noCursor();\n';
	}
	if (dropdown_blink=="TRUE")
	{
		mysetup+='  lcd.blink();\n';
	} else
	{
		mysetup+='  lcd.noBlink();\n';
	}
	Blockly.Arduino.setups_['setup_lcd'] = mysetup;
	var code="";
	return code;
};

Blockly.Arduino.oorobot_i2c_lcdclear = function() {
  var code = 'lcd.clear();\n';
  return code;
};

Blockly.Arduino.oorobot_i2c_lcdwrite = function() {
	var text = Blockly.Arduino.valueToCode(this, 'TEXT',
										   Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
	var dropdown_col = Blockly.Arduino.valueToCode(this, 'COL',
												   Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';
	var dropdown_lig = Blockly.Arduino.valueToCode(this, 'LIG',
												   Blockly.Arduino.ORDER_UNARY_POSTFIX) || '0';    
	var code = 'lcd.setCursor('+dropdown_col+','+dropdown_lig+');\n'+
		'lcd.print('+text+');\n';
	return code;
};

Blockly.Arduino.oorobot_bt_init = function() {
  var dropdown_RX_pin = Blockly.Arduino.valueToCode(this, 'RX', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_TX_pin = Blockly.Arduino.valueToCode(this, 'TX', Blockly.Arduino.ORDER_ATOMIC);   
  //dans include définition    
  Blockly.Arduino.includes_['define_SoftwareSerial'] = "#include <SoftwareSerial.h>\n"; 
  Blockly.Arduino.includes_['define_TimerOne'] = "#include <TimerOne.h>\n";
  Blockly.Arduino.definitions_['define_var_bt'] = "SoftwareSerial bt("+dropdown_RX_pin+","+dropdown_TX_pin+"); // RX, TX\n"; 
  Blockly.Arduino.definitions_['define_var_time_out'] = "boolean time_out;\n";
  Blockly.Arduino.definitions_['define_var_stringOne'] = 'String stringOne = "";\n';
  Blockly.Arduino.definitions_['define_var_btnPress'] = 'volatile boolean btnPress[] = {false,false,false,false,false,false,false,false,false,false};\n';
  Blockly.Arduino.definitions_['define_var_interPress'] = 'volatile boolean interPress[] = {false,false,false,false,false,false,false,false,false,false};\n';
  Blockly.Arduino.definitions_['define_var_potarVal'] = 'volatile unsigned int potarVal[]={0,0,0,0,0,0,0,0,0,0};\n'; 
  Blockly.Arduino.definitions_['define_var_intflag'] = 'volatile boolean intflag =false;\n';
  Blockly.Arduino.definitions_['define_var_ihmflag'] = 'volatile boolean ihmflag = false;\n';
  //dans fonctions
  Blockly.Arduino.definitions_['define_floatToString'] = 'String floatToString(float valeur,int precision){\n'+
  '  char charVal[10];\n'+
  '  String stringVal = "";\n'+
  '  float valc=valeur*pow(0.1,precision);\n'+
  '  for(int i=0;i<sizeof(charVal);i++)\n'+
  '    {\n'+
  '     charVal[i]=\' \';\n'+
  '    }\n'+
  '  dtostrf(valc, 0, precision, charVal);\n'+
  '  //convert chararray to string\n'+
  '  for(int i=0;i<sizeof(charVal);i++)\n'+
  '    {\n'+
  '     if (charVal[i]!=\' \') {stringVal+=charVal[i];}\n'+
  '    }\n'+
  '  //supprime le dernier caractère de strinVal\n'+
  '  stringVal=stringVal.substring(0,stringVal.length()-1);\n'+
  '  return stringVal;\n'+
  '}\n'; 
  Blockly.Arduino.definitions_['define_lire_octet'] = "int lire_octet() {\n"+
   " time_out=false;\n"+
   " byte counter=0;\n"+
   " while(bt.available()==0 && !time_out) {\n"+
   "  counter+=1;\n"+
   "  delayMicroseconds(1000); // wait 1 ms\n"+      
   "  if (counter>100) {time_out=true;} //time_out + watchdog !\n"+
   " }\n"+
   " if (!time_out) { return bt.read(); } else { return -1; }\n"+
   "}\n";
  Blockly.Arduino.definitions_['define_bt_read'] = 'int bt_read() {\n'+
    ' stringOne = "";\n'+
    ' if (bt.available()>0) {\n'+  
    '   int carac;\n'+
    '   time_out=false;\n'+
    '   do {\n'+
    '      carac=lire_octet();\n'+
    '      if ((carac!=10)&(carac!=13)){stringOne+=char(carac);}\n'+
    '     }\n'+
    '   while ((carac!=10)&(!time_out));\n'+
    '   if (time_out) {\n'+ 
    '      stringOne="";\n'+
    '      return 0;\n'+
    '   }\n'+
    '   return 1;\n'+
    '  }\n'+
    ' return 0;\n'+  
    '}\n';   
  Blockly.Arduino.definitions_['define_ihm_available'] = 'int ihm_available() {\n'+
    ' stringOne = "";\n'+
    ' bt.println("|P");\n'+
    ' delay(300);\n'+
    ' if (bt_read()>0) {\n'+
    '  if (stringOne=="OK") {\n'+
    '     Timer1.start();\n'+
    '     return 1;  \n'+
    '  } else {\n'+
    '     return 0;\n'+
    '  }\n'+
    ' } else {\n'+
    ' return 0;\n'+
    ' }\n'+
    '}\n';
  Blockly.Arduino.definitions_['define_hex2int'] = 'unsigned long hex2int(String a, unsigned int len) {\n'+
    ' int i;\n'+
    ' unsigned long val = 0;\n'+
    ' for(i=0;i<len;i++)\n'+
    '   if(a[i] <= 57)\n'+
    '    val += (a[i]-48)*(1<<(4*(len-1-i)));\n'+
    '   else\n'+
    '    val += (a[i]-55)*(1<<(4*(len-1-i)));\n'+
    ' return val;\n'+
    '}\n';
    Blockly.Arduino.definitions_['define_isValidNumber'] = 'boolean isValidNumber(String str){\n'+
    ' boolean temp=true;\n'+
    ' for(byte i=0;i<str.length();i++) {\n'+
    '    if(!isDigit(str.charAt(i))) { temp=false; }\n'+
    ' }\n'+
    ' return temp;\n'+
    '}\n';
  Blockly.Arduino.definitions_['define_BTinterrupt'] = 'void BTinterrupt() {\n'+
  ' if (!intflag) {\n'+
  '    intflag=true;\n'+
  '    if (bt.available()>0) {\n'+
  '       if (bt_read()>0) {\n'+
  '          if (stringOne[0] == \'B\') {\n'+
  '             int decValue = hex2int(stringOne.substring(1),1)-1;\n'+
  '             btnPress[decValue]=true;\n'+
  '             ihmflag=true;\n'+
  '          } else if (stringOne[0] == \'I\') {\n'+
  '             int decValue = hex2int(stringOne.substring(1,2),1)-1;\n'+
  '             if (stringOne[2]==\'1\') {\n'+
  '                interPress[decValue]=true;\n'+
  '                ihmflag=true;\n'+
  '             } else {\n'+
  '                interPress[decValue]=false;\n'+
  '                ihmflag=true;\n'+
  '             }\n'+
  '         } else if (stringOne[0] == \'P\') {\n'+
  '           int decValue = hex2int(stringOne.substring(1,2),1)-1;\n'+
  '           if (isValidNumber(stringOne.substring(2))) {\n'+
  '               potarVal[decValue]=stringOne.substring(2).toInt();\n'+
  '               ihmflag=true;\n'+               
  '           }\n'+
  '         }else {\n'+
  '            stringOne=""; //On vide la chaine de réception\n'+
  '         }\n'+
  '      } else {\n'+
  '         stringOne=""; //On vide la chaine de réception\n'+
  '      }\n'+
  '    }\n'+
  '    intflag=false;\n'+
  ' }\n'+
  '}\n';
    Blockly.Arduino.definitions_['define_ihm_change'] = 'boolean ihm_change() {\n'+
    ' if (ihmflag) {\n'+
    '  ihmflag=false;\n'+
    '  return 1;\n'+
    ' } else {\n'+
    '  return 0;\n'+
    ' }\n'+
    '}\n';
  //dans setup    
  Blockly.Arduino.setups_['setup_bt'] = 'bt.begin(9600);';   
  Blockly.Arduino.setups_['setup_Timer1_initialize'] = 'Timer1.initialize(100000);'; 
  Blockly.Arduino.setups_['setup_Timer1_attachInterrupt'] = 'Timer1.attachInterrupt(BTinterrupt);'; 
  Blockly.Arduino.setups_['setup_Timer1_stop'] = 'Timer1.stop();';    
  var code = '';
  return code;
};

Blockly.Arduino.oorobot_bt_available = function() {
  //dans include définition    
  Blockly.Arduino.includes_['define_SoftwareSerial'] = "#include <SoftwareSerial.h>\n";      
  Blockly.Arduino.definitions_['define_var_time_out'] = "boolean time_out;\n";
  Blockly.Arduino.definitions_['define_var_stringOne'] = 'String stringOne = "";\n';    
  //dans fonctions
  Blockly.Arduino.definitions_['define_lire_octet'] = "int lire_octet() {\n"+
   " time_out=false;\n"+
   " byte counter=0;\n"+
   " while(bt.available()==0 && !time_out) {\n"+
   "  counter+=1;\n"+
   "  delayMicroseconds(1000); // wait 1 ms\n"+      
   "  if (counter>100) {time_out=true;} //time_out + watchdog !\n"+
   " }\n"+
   " if (!time_out) { return bt.read(); } else { return -1; }\n"+
   "}\n";
  Blockly.Arduino.definitions_['define_bt_read'] = 'int bt_read() {\n'+
    ' stringOne = "";\n'+
    ' if (bt.available()>0) {\n'+  
    '   int carac;\n'+
    '   time_out=false;\n'+
    '   do {\n'+
    '      carac=lire_octet();\n'+
    '      if ((carac!=10)&(carac!=13)){stringOne+=char(carac);}\n'+
    '     }\n'+
    '   while ((carac!=10)&(!time_out));\n'+
    '   if (time_out) {\n'+ 
    '      stringOne="";\n'+
    '      return 0;\n'+
    '   }\n'+
    '   return 1; \n'+
    '  }\n'+
    ' return 0;\n'+  
    '}\n';  
    
  //dans setup    
  Blockly.Arduino.setups_['setup_bt'] = 'bt.begin(9600);';   
  var code = 'bt_read()>0';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.oorobot_bt_read = function() {
  //var text = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\''; 
  //dans include définition    
  Blockly.Arduino.includes_['define_SoftwareSerial'] = "#include <SoftwareSerial.h>\n";      
  Blockly.Arduino.definitions_['define_var_time_out'] = "boolean time_out;\n";
  Blockly.Arduino.definitions_['define_var_stringOne'] = 'String stringOne = "";\n';
  
  //dans setup     
  Blockly.Arduino.setups_['setup_bt'] = 'bt.begin(9600);';   
  //var code = '(stringOne = ' +text+ ')';
  var code = 'stringOne';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.oorobot_bt_write = function() {
  var text = Blockly.Arduino.valueToCode(this, 'TEXT',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';    
  //dans include définition    
  Blockly.Arduino.includes_['define_SoftwareSerial'] = "#include <SoftwareSerial.h>\n";      
  Blockly.Arduino.definitions_['define_var_time_out'] = "boolean time_out;\n";
  Blockly.Arduino.definitions_['define_var_stringOne'] = 'String stringOne = "";\n';
  
  //dans setup     
  Blockly.Arduino.setups_['setup_bt'] = 'bt.begin(9600);';   
  var code = 'bt.println('+text+');\n';
  return code;
};

Blockly.Arduino.oorobot_servo_attach = function() {
  var value_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_name = this.getFieldValue('SERVO_NAME');

  Blockly.Arduino.includes_['define_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo' + dropdown_name] = 'Servo ' + dropdown_name + ';';
  Blockly.Arduino.setups_['setup_servo_' + dropdown_name] = dropdown_name + '.attach(' + value_pin + ');';
  return '';
};

Blockly.Arduino.oorobot_servo_move = function() {
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_name = this.getFieldValue('SERVO_NAME');

  var code = dropdown_name + '.write(' + value_degree + ');\n';
  return code;
};

Blockly.Arduino.oorobot_servo_detach = function() {
  var dropdown_name = this.getFieldValue('SERVO_NAME');
  
  var code = dropdown_name+'.detach();';
  return code;
};

