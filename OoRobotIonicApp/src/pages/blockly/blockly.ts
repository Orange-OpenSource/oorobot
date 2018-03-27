import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavController, NavParams, Platform, Content } from 'ionic-angular';
import { BluetoothProvider } from '../../providers/bluetooth/bluetooth';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import OoRoBoT from './oorobot';
//import { Dialogs } from '@ionic-native/dialogs';

declare var Blockly: any;
/**
 * Generated class for the BlocklyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-blockly',
  templateUrl: 'blockly.html',
})
export class BlocklyPage {
  myWorkspace: any;
  code = "";
  blocklyDivStyle = {};
  oorobot: any;

  @ViewChild('blocklyDiv') blocklyDiv: ElementRef;
  @ViewChild(Content) content: Content;
  @ViewChild('canvasDiv') canvasDiv: ElementRef;

  constructor(private screenOrientation: ScreenOrientation, private blProvider: BluetoothProvider, public navCtrl: NavController, private platform: Platform) {
    this.setBlocks(); // define Oorobot Blocks
  }

  testCode() {

    let code: string = Blockly.JavaScript.workspaceToCode(this.myWorkspace);
    this.oorobot.setCommands(code);
	  this.oorobot.draw();

  }

  generateCode() {
    let generated: string = Blockly.JavaScript.workspaceToCode(this.myWorkspace);

    console.log(generated)
    if (generated.indexOf('command') == 0 && generated.lastIndexOf('command') == 0) {
      this.code = "AAW20" + generated.substring(7, generated.length) + "G";
      this.blProvider.serialWritePreferedDevice(this.code).then(() => {

      });
    }
  }

  ionViewDidEnter() {
    this.oorobot = new OoRoBoT(this.canvasDiv.nativeElement, 500, 300, "#33cc00");

    let blocklyDiv = this.blocklyDiv.nativeElement;
    blocklyDiv.style.height = this.content.contentHeight + "px";
    blocklyDiv.style.width = this.platform.width() + "px";    //   ({"height": 500+"px","width": this.platform.width()+"px"});
    // this.blocklyDivStyle={"height": 500+"px","width": this.platform.width()+"px"};

    let toolbox = '<xml id="toolbox" style="display: none">' +
      '<block type="Start">   </block>' +
      '<block type="Up">   </block>' +
      '<block type="Down"></block>' +
      '<block type="Left"></block>' +
      '<block type="Right"></block>' +
      '<block type="Loop">   </block>' +
      '<block type="PenUp">   </block>' +
      '<block type="PenDown">   </block>' +
      '<block type="CircleRight">   </block>' +
      '<block type="CircleLeft">   </block>' +
      '<block type="Pause"></block>' +
      '</xml>'


    this.screenOrientation.onChange().subscribe(
      () => {
        if (this.myWorkspace) {
          console.log("Orientation Change")
          let blocklyDiv = this.blocklyDiv.nativeElement;
          blocklyDiv.style.height = this.content.contentHeight + "px";
          blocklyDiv.style.width = this.content.contentWidth + "px";    //   ({"height": 500+"px","width": this.platform.width()+"px"});
          Blockly.svgResize(this.myWorkspace);
        }
      }
    );

    if (!this.myWorkspace) {
      this.myWorkspace = Blockly.inject(blocklyDiv,
        {
          media: 'assets/blockly/media/',
          toolbox: toolbox,
          grid:
            {
              spacing: 50,
              length: 3,
              colour: '#ccc',
              snap: true
            },
          trashcan: true

        });
      Blockly.svgResize(this.myWorkspace);
    }
  }


  setBlocks() {

    let moveColor = "#3C8BDA";
    let controlColor = "#F0DC27";
    let startColor = "#74C042";

    Blockly.Generator.prototype.prefixLines = function (text, prefix) {  // Need to Overide this function not supported by ionic
      return text;
    };

    Blockly.FieldAngle.ROUND = 5;
    Blockly.FieldAngle.HALF = 100;
    Blockly.FieldAngle.CLOCKWISE = true;
    Blockly.FieldAngle.OFFSET = 90;
    Blockly.FieldAngle.WRAP = 360;
    Blockly.FieldAngle.RADIUS = Blockly.FieldAngle.HALF - 1;

    Blockly.Blocks['Start'] = {
      init: function () {
        this.jsonInit({
          "message0": '%1',
          "args0": [

            {
              "type": "field_image",
              "src": "assets/svg/flag.svg",
              "width": 40,
              "height": 40,
              "alt": "*"
            }
          ],
          "message1": "%1",
          "args1": [
            { "type": "input_statement", "name": "DO" }
          ],
          "colour": startColor,
          "tooltip": "",
          "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp",
        });
      }
    };

    Blockly.Blocks['Up'] = {
      init: function () {
        this.jsonInit({
          "message0": '%1 %2',
          "args0": [

            {
              "type": "field_image",
              "src": "assets/svg/arrow-thick-top.svg",
              "width": 40,
              "height": 40,
              "alt": "*"
            },
            {
              "type": "field_number",
              "name": "FIELDNAME",
              "value": 100
            }
          ],
          "colour": moveColor,
          "tooltip": "",
          "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp",
          "previousStatement": null,
          "nextStatement": null,
        });
      }
    };


    Blockly.Blocks['Pause'] = {
      init: function () {
        this.jsonInit({
          "message0": '%1 %2',
          "args0": [

            {
              "type": "field_image",
              "src": "assets/svg/media-pause.svg",
              "width": 40,
              "height": 40,
              "alt": "*"
            },
            {
              "type": "field_number",
              "name": "FIELDNAME",
              "value": 100
            }
          ],
          "colour": moveColor,
          "tooltip": "",
          "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp",
          "previousStatement": null,
          "nextStatement": null,
        });
      }
    };



    Blockly.Blocks['Down'] = {
      init: function () {
        this.jsonInit({
          "message0": '%1 %2',
          "args0": [

            {
              "type": "field_image",
              "src": "assets/svg/arrow-thick-bottom.svg",
              "width": 40,
              "height": 40,
              "alt": "*"
            },
            {
              "type": "field_number",
              "name": "FIELDNAME",
              "value": 100
            }
          ],
          "colour": moveColor,
          "tooltip": "",
          "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp",
          "previousStatement": null,
          "nextStatement": null,
        });
      }
    };

    Blockly.Blocks['Left'] = {
      init: function () {
        this.jsonInit({
          "message0": '%1 %2',
          "args0": [

            {
              "type": "field_image",
              "src": "assets/svg/action-undo.svg",
              "width": 40,
              "height": 40,
              "alt": "*"
            },
            {
              "type": "field_angle",
              "name": "FIELDNAME",
              "angle": "90"
            }
          ],
          "colour": moveColor,
          "tooltip": "",
          "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp",
          "previousStatement": null,
          "nextStatement": null,
        });
      }
    };

    Blockly.Blocks['Right'] = {
      init: function () {
        this.jsonInit({
          "message0": '%1 %2',
          "args0": [

            {
              "type": "field_image",
              "src": "assets/svg/action-redo.svg",
              "width": 40,
              "height": 40,
              "alt": "*"
            },
            {
              "type": "field_angle",
              "name": "FIELDNAME",
              "angle": "90"
            }
          ],
          "colour": moveColor,
          "tooltip": "",
          "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp",
          "previousStatement": null,
          "nextStatement": null,
        });
      }
    };

    Blockly.Blocks['CircleRight'] = {
      init: function () {
        this.jsonInit({
          "message0": '%1 r%2 a%3',
          "args0": [

            {
              "type": "field_image",
              "src": "assets/svg/circle-right.svg",
              "width": 40,
              "height": 40,
              "alt": "*"
            },
            {
              "type": "field_input",
              "name": "RADIUS",
              "text": "100"
            },
            {
              "type": "field_angle",
              "name": "ANGLE",
              "angle": "90"
            }
          ],
          "colour": moveColor,
          "tooltip": "",
          "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp",
          "previousStatement": null,
          "nextStatement": null,
        });
      }
    };


    Blockly.Blocks['CircleLeft'] = {
      init: function () {
        this.jsonInit({
          "message0": '%1 r%2 a%3',
          "args0": [

            {
              "type": "field_image",
              "src": "assets/svg/circle-left.svg",
              "width": 40,
              "height": 40,
              "alt": "*"
            },
            {
              "type": "field_input",
              "name": "RADIUS",
              "text": "100"
            },
            {
              "type": "field_angle",
              "name": "ANGLE",
              "angle": "90"
            }
          ],
          "colour": moveColor,
          "tooltip": "",
          "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp",
          "previousStatement": null,
          "nextStatement": null,
        });
      }
    };

    Blockly.Blocks['Loop'] = {
      init: function () {
        this.jsonInit({
          "message0": '%1 %2',
          "args0": [

            {
              "type": "field_image",
              "src": "assets/svg/loop-circular.svg",
              "width": 40,
              "height": 40,
              "alt": "*"
            },
            {
              "type": "field_number",
              "name": "FIELDNAME",
              "value": 4
            }
          ],
          "message1": "%1",
          "args1": [
            { "type": "input_statement", "name": "DO" }
          ],
          "colour": controlColor,
          "tooltip": "",
          "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp",
          "previousStatement": null,
          "nextStatement": null,
        });
      }
    };

    Blockly.Blocks['PenUp'] = {
      init: function () {
        this.jsonInit({
          "message0": '%1',
          "args0": [

            {
              "type": "field_image",
              "src": "assets/svg/pen-up.svg",
              "width": 40,
              "height": 40,
              "alt": "*"
            }
          ],
          "colour": moveColor,
          "tooltip": "",
          "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp",
          "previousStatement": null,
          "nextStatement": null,
        });
      }
    };

    Blockly.Blocks['PenDown'] = {
      init: function () {
        this.jsonInit({
          "message0": '%1',
          "args0": [

            {
              "type": "field_image",
              "src": "assets/svg/pen-down.svg",
              "width": 40,
              "height": 40,
              "alt": "*"
            }
          ],
          "colour": moveColor,
          "tooltip": "",
          "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp",
          "previousStatement": null,
          "nextStatement": null,
        });
      }
    };



    Blockly.JavaScript['Start'] = function (block) {
      // Search the text for a substring.
      let code = Blockly.JavaScript.statementToCode(block, 'DO');

      return "command" + code
    };

    Blockly.JavaScript['Up'] = function (block) {
      // Search the text for a substring.
      let operator = block.getFieldValue('FIELDNAME');

      let code = "U" + operator;
      return code;
    };

    Blockly.JavaScript['PenUp'] = function () {
      // Search the text for a substring.
      let code = "|";
      return code;
    };


    Blockly.JavaScript['PenDown'] = function () {
      // Search the text for a substring.
      let code = "!";
      return code;
    };

    Blockly.JavaScript['Down'] = function (block) {
      // Search the text for a substring.
      let operator = block.getFieldValue('FIELDNAME');

      let code = "D" + operator;
      return code;
    };

    Blockly.JavaScript['Left'] = function (block) {
      // Search the text for a substring.
      let operator = block.getFieldValue('FIELDNAME');

      let code = "L" + operator;
      return code;
    };

    Blockly.JavaScript['Pause'] = function (block) {
      // Search the text for a substring.
      let operator = block.getFieldValue('FIELDNAME');

      let code = "P" + operator;
      return code;
    };


    Blockly.JavaScript['Right'] = function (block) {
      // Search the text for a substring.
      let operator = block.getFieldValue('FIELDNAME');

      let code = "R" + operator;
      return code;
    };

    Blockly.JavaScript['CircleLeft'] = function (block) {
      let radius= block.getFieldValue('RADIUS');
      let angle = block.getFieldValue('ANGLE');

      let code = "r0c" + radius + "a" + angle;
      return code;
    };

    Blockly.JavaScript['CircleRight'] = function (block) {
      let radius= block.getFieldValue('RADIUS');
      let angle = block.getFieldValue('ANGLE');

      let code = "r1c" + radius + "a" + angle;
      return code;
    };


    Blockly.JavaScript['Loop'] = function (block) {
      // Search the text for a substring.
      let operator = block.getFieldValue('FIELDNAME');
      let subcode = Blockly.JavaScript.statementToCode(block, 'DO');
      return "B"+operator+subcode+"E";
    };

  }
}
