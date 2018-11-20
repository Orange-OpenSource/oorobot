//www.technozone51.fr

'use strict';

goog.provide('Blockly.Blocks.oorobot');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks['oorobot_keypad_init'] = {
  init: function() {
    this.setColour(Blockly.Blocks.oorobot.HUE);
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.appendValueInput("PORT")
		.setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.OOROBOT_KEYPAD_INIT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
  }
};

Blockly.Blocks['oorobot_keypad'] = {
  init: function() {
    this.setColour(Blockly.Blocks.oorobot.HUE);
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.appendDummyInput("")
        .appendField(Blockly.Msg.OOROBOT_KEYPAD_PRESSED);
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.OOROBOT_KEYPAD_PRESSED_TOOLTIP);
  }
};

Blockly.Blocks['oorobot_right_stepper_config'] = {
  /**
   * Block for for the stepper generator configuration including creating
   * an object instance and setting up the speed. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.setColour(Blockly.Blocks.oorobot.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OOROBOT_STEPPER_SETUP)
        .appendField(Blockly.Msg.STEPPER_MOTOR)
        .appendField(
            new Blockly.FieldInstance('OorobotStepper',
                                      Blockly.Msg.OOROBOT_DEFAULT_RIGHT_STEPPER_MOTOR_NAME,
                                      false, false, false),
            'STEPPER_NAME');
    this.appendValueInput('STEPPER_IN1')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN1");
    this.appendValueInput('STEPPER_IN2')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN2");
    this.appendValueInput('STEPPER_IN3')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN3");
    this.appendValueInput('STEPPER_IN4')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN4");
    this.appendValueInput('STEPPER_SPEED')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.STEPPER_SPEED);
    this.setTooltip(Blockly.Msg.STEPPER_SETUP_TIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['oorobot_left_stepper_config'] = {
  /**
   * Block for for the stepper generator configuration including creating
   * an object instance and setting up the speed. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.setColour(Blockly.Blocks.oorobot.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OOROBOT_STEPPER_SETUP)
        .appendField(Blockly.Msg.STEPPER_MOTOR)
        .appendField(
            new Blockly.FieldInstance('OorobotStepper',
                                      Blockly.Msg.OOROBOT_DEFAULT_LEFT_STEPPER_MOTOR_NAME,
                                      false, false, false),
            'STEPPER_NAME');
    this.appendValueInput('STEPPER_IN1')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN1");
    this.appendValueInput('STEPPER_IN2')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN2");
    this.appendValueInput('STEPPER_IN3')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN3");
    this.appendValueInput('STEPPER_IN4')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IN4");
    this.appendValueInput('STEPPER_SPEED')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.STEPPER_SPEED);
    this.setTooltip(Blockly.Msg.STEPPER_SETUP_TIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	  
  }
};


Blockly.Blocks['oorobot_stepper_enable'] = {
  /**
   * Block for for the stepper 'step()' function.
   * @this Blockly.Block
   */
  init: function() {
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.setColour(Blockly.Blocks.oorobot.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OOROBOT_STEPPER_ENABLE)
        .appendField(
            new Blockly.FieldInstance('OorobotStepper',
                                      Blockly.Msg.OOROBOT_DEFAULT_LEFT_STEPPER_MOTOR_NAME,
                                      false, false, false),
            'STEPPER_NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.STEPPER_STEP_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks/warns if the selected stepper instance has a config block.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('STEPPER_NAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'OorobotStepper', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.STEPPER_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

Blockly.Blocks['oorobot_stepper_disable'] = {
  /**
   * Block for for the stepper 'step()' function.
   * @this Blockly.Block
   */
  init: function() {
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.setColour(Blockly.Blocks.oorobot.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OOROBOT_STEPPER_DISABLE)
        .appendField(
            new Blockly.FieldInstance('OorobotStepper',
                                      Blockly.Msg.OOROBOT_DEFAULT_LEFT_STEPPER_MOTOR_NAME,
                                      false, false, false),
            'STEPPER_NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.STEPPER_STEP_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks/warns if the selected stepper instance has a config block.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('STEPPER_NAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'OorobotStepper', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.STEPPER_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

Blockly.Blocks['oorobot_stepper_set_speed'] = {
  /**
   * Block for for the stepper 'step()' function.
   * @this Blockly.Block
   */
  init: function() {
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.setColour(Blockly.Blocks.oorobot.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OOROBOT_STEPPER_SET_SPEED)
        .appendField(
            new Blockly.FieldInstance('OorobotStepper',
                                      Blockly.Msg.OOROBOT_DEFAULT_LEFT_STEPPER_MOTOR_NAME,
                                      false, false, false),
            'STEPPER_NAME');
    this.appendValueInput('STEPPER_SPEED')
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.STEPPER_STEP_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks/warns if the selected stepper instance has a config block.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('STEPPER_NAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'OorobotStepper', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.STEPPER_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

Blockly.Blocks['oorobot_stepper_distance_to_go'] = {
  /**
   * Block for for the stepper 'step()' function.
   * @this Blockly.Block
   */
  init: function() {
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.setColour(Blockly.Blocks.oorobot.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OOROBOT_STEPPER_DISTANCE_TO_GO)
          .appendField(
              new Blockly.FieldInstance('OorobotStepper',
										Blockly.Msg.OOROBOT_DEFAULT_LEFT_STEPPER_MOTOR_NAME,
										false, false, false),
              'STEPPER_NAME');
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.STEPPER_STEP_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks/warns if the selected stepper instance has a config block.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('STEPPER_NAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'OorobotStepper', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.STEPPER_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};


Blockly.Blocks['oorobot_stepper_move_to'] = {
  /**
   * Block for for the stepper 'step()' function.
   * @this Blockly.Block
   */
  init: function() {
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.setColour(Blockly.Blocks.oorobot.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OOROBOT_STEPPER_MOVE_TO)
        .appendField(
            new Blockly.FieldInstance('OorobotStepper',
                                      Blockly.Msg.OOROBOT_DEFAULT_LEFT_STEPPER_MOTOR_NAME,
                                      false, false, false),
            'STEPPER_NAME');
    this.appendValueInput('STEPPER_DISTANCE')
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput()
        .appendField(Blockly.Msg.STEPPER_STEPS);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.STEPPER_STEP_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks/warns if the selected stepper instance has a config block.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('STEPPER_NAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'OorobotStepper', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.STEPPER_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};


Blockly.Blocks['oorobot_stepper_run_speed_to_position'] = {
  /**
   * Block for for the stepper 'step()' function.
   * @this Blockly.Block
   */
  init: function() {
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.setColour(Blockly.Blocks.oorobot.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.OOROBOT_STEPPER_RUN_SPEED_TO_POSITION)
        .appendField(
            new Blockly.FieldInstance('OorobotStepper',
                                      Blockly.Msg.OOROBOT_DEFAULT_LEFT_STEPPER_MOTOR_NAME,
                                      false, false, false),
            'STEPPER_NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.STEPPER_STEP_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks/warns if the selected stepper instance has a config block.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('STEPPER_NAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'OorobotStepper', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.STEPPER_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

Blockly.Blocks['oorobot_i2c_lcdinit'] = {
  init: function() {
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.setColour(Blockly.Blocks.oorobot.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT74)
        .appendField(new Blockly.FieldImage("blocks/lcd_i2c/lcd.jpg", Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.TECHNOZONE51_TEXT75)
        .appendField(new Blockly.FieldTextInput('0x27',Blockly.Blocks.math_number.validator), 'I2C_adress');
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT76)
        .appendField(new Blockly.FieldTextInput('16',Blockly.Blocks.math_number.validator), 'nbcol');
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT77)
        .appendField(new Blockly.FieldTextInput('2',Blockly.Blocks.math_number.validator), 'nblig');   
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT78)     
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'backlight');   
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT79)     
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'cursor'); 
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT80)     
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'blink');          
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TECHNOZONE51_TEXT81);
  }
};

//lcdclear
Blockly.Blocks['oorobot_i2c_lcdclear'] = {
  init: function() {
    this.setColour(Blockly.Blocks.oorobot.HUE);
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.appendDummyInput("")
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT92)
        .appendField(new Blockly.FieldImage("blocks/lcd_i2c/lcd.jpg", Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));   
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TECHNOZONE51_TEXT93);
  }
};

//lcdwrite
Blockly.Blocks['oorobot_i2c_lcdwrite'] = {
  init: function() {
    this.setColour(Blockly.Blocks.oorobot.HUE);
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.appendDummyInput("")
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT94)
        .appendField(new Blockly.FieldImage("blocks/lcd_i2c/lcd.jpg", Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
    this.appendValueInput("TEXT")
		.setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT98);
    this.appendDummyInput("")
		.appendField(Blockly.Msg.TECHNOZONE51_TEXT95);
    this.appendValueInput("COL")
		.setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT96)
    this.appendValueInput("LIG")
		.setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT97)   
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TECHNOZONE51_TEXT99);
    this.setInputsInline(false);
  }
};


//bt_init OK
Blockly.Blocks['oorobot_bt_init'] = {
  init: function() {
    this.setColour(Blockly.Blocks.oorobot.HUE);
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.appendDummyInput("")
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT157);
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldImage("blocks/technozone51/bt1.jpg", Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.TECHNOZONE51_TEXT165);
    this.appendValueInput("RX")
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("RX ");
    this.appendValueInput("TX")
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("TX ");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TECHNOZONE51_TEXT158);
  }
};

//robot_bt_available OK
Blockly.Blocks['oorobot_bt_available'] = {
  init: function() {
    this.setColour(Blockly.Blocks.oorobot.HUE);
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.appendDummyInput("")	
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT159);
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.TECHNOZONE51_TEXT160);
  }
};

//robot_bt_read OK
Blockly.Blocks['oorobot_bt_read'] = {
  init: function() {
    this.setColour(Blockly.Blocks.oorobot.HUE);
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.appendDummyInput("")	
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT161);
    this.setOutput(true, 'String');
    this.setTooltip(Blockly.Msg.TECHNOZONE51_TEXT162);
  }
};

//robot_bt_write
Blockly.Blocks['oorobot_bt_write'] = {
  init: function() {
    this.setColour(Blockly.Blocks.oorobot.HUE);
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.appendValueInput("TEXT")
		.setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.TECHNOZONE51_TEXT163);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TECHNOZONE51_TEXT164);
  }
};

Blockly.Blocks.oorobot_servo_attach = {
  init: function() {
    this.setColour(Blockly.Blocks.oorobot.HUE);
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARDUINO_SERVO_ATTACH1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/servo/servomoteur.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARDUINO_SERVO_ATTACH2)
        .appendField(
            new Blockly.FieldInstance('Servo',
                                      Blockly.Msg.CAT_OOROBOT_SERVO_DEFAULT_NAME,
                                      false, false, false),
            'SERVO_NAME');
	this.appendValueInput("PIN")
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARDUINO_SERVO_MOVE_INPUT2);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_SERVO_MOVE_TOOLTIP);
  }
};

Blockly.Blocks.oorobot_servo_move = {
  init: function() {
    this.setColour(Blockly.Blocks.oorobot.HUE);
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARDUINO_SERVO_MOVE_INPUT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/servo/servomoteur.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(
            new Blockly.FieldInstance('Servo',
                                      Blockly.Msg.CAT_OOROBOT_SERVO_DEFAULT_NAME,
                                      false, false, false),
            'SERVO_NAME');
    this.appendValueInput("DEGREE")
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARDUINO_SERVO_MOVE_DEGREE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_SERVO_MOVE_TOOLTIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks/warns if the selected instance has a config block.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('SERVO_NAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'Servo', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.COMPONENT_WARN.replace(
            //'%1', Blockly.Msg.SERVO_COMPONENT).replace(
            '%1', '').replace(
                '%2', instanceName));
    }
  }
};

Blockly.Blocks.oorobot_servo_detach = {
  init: function() {
    this.setColour(Blockly.Blocks.oorobot.HUE);
	this.setHelpUrl('https://orange-opensource.github.io/oorobot/');
	this.setInputsInline(false);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARDUINO_SERVO_DETACH)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/servo/servomoteur.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(
            new Blockly.FieldInstance('Servo',
                                      Blockly.Msg.CAT_OOROBOT_SERVO_DEFAULT_NAME,
                                      false, false, false),
            'SERVO_NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Release a pin from servo driving.');
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks/warns if the selected instance has a config block.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('SERVO_NAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'Servo', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.COMPONENT_WARN.replace(
            //'%1', Blockly.Msg.SERVO_COMPONENT).replace(
            '%1', '').replace(
                '%2', instanceName));
    }
  }
};
