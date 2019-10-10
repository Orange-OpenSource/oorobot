import { QRcodeModalComponent } from './../../components/q-rcode-modal/q-rcode-modal';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavController, NavParams, Platform, Content } from 'ionic-angular';
import { BluetoothProvider } from '../../providers/bluetooth/bluetooth';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { CanvasModalComponent } from '../../components/canvas-modal/canvas-modal';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

//import { Dialogs } from '@ionic-native/dialogs';

declare var Blockly: any;
declare var Webcom: any;
declare var OoRoBoT: any;
/**
 * Generated class for the BlocklyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-blockly',
  templateUrl: 'blockly.html'
})
export class BlocklyPage {
  myWorkspace: any;
  code = '';
  qrCodeCancelled: boolean;
  blocklyDivStyle = {};
  currentModal: any;
  oorobot: any;
  level = '1';
  lastLevel = '1';
  toolboxes = {
    '0':
    '<xml id="toolbox" style="display: none">' +
    '<block type="Start"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="UpSimple"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="DownSimple"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="LeftSimple"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="RightSimple"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="Loop"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="PenUp"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="PenDown"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="PenColor"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="Pause"></block>' +
    '</xml>',
    '1':
    '<xml id="toolbox" style="display: none">' +
    '<block type="Start"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="Up"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="Down"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="Left"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="Right"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="Loop"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="PenUp"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="PenDown"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="PenColor"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="CircleRight"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="CircleLeft"></block>' +
    '<sep gap="10"></sep>' +
    '<block type="Pause"></block>' +
    '</xml>'
  };

  @ViewChild('blocklyDiv')
  blocklyDiv: ElementRef;
  @ViewChild('content')
  content: Content;

  constructor(private qrScanner: BarcodeScanner, private screenOrientation: ScreenOrientation, private blProvider: BluetoothProvider, private modalCtrl: ModalController, public navCtrl: NavController, private platform: Platform) {
    this.level = '1';
    this.qrCodeCancelled=false;
    platform.registerBackButtonAction(() => {
      // TODO: manage double 'back' click to exit App ?
      if (this.qrCodeCancelled) {
        this.qrCodeCancelled = false;
      } else {
        if (this.currentModal) {
          this.currentModal.dismiss();
        }
        if (navCtrl.canGoBack()) { //Can we go back?
          navCtrl.pop();
        }
      }
    }, 101);
    this.setBlocks(); // define Oorobot Blocks
    this.oorobot = new OoRoBoT();
  }

  testCode() {
    let code: string = Blockly.JavaScript.workspaceToCode(this.myWorkspace);
    code = code.replace(/^command/, '');
    this.currentModal = this.modalCtrl.create(CanvasModalComponent, { code: code });
    this.currentModal.present();
  }

  levelChange(val: any) {
    console.log('LevelChange:', this.level, val);

    this.myWorkspace.updateToolbox(this.toolboxes[val]);
    this.level = val;
    // this.initWorkspace();
  }
  loadCode() {
    this.qrScanner
      .scan()
      .then(data => {
        this.qrCodeCancelled=false;
        console.log('Scanned something', data.text);
        if (data.text) {
          console.log(JSON.stringify(data));

          var decoded = this.oorobot.decode(data.text);
          console.log('decoded' + JSON.stringify(decoded));
          this.levelChange(decoded.level);
          Blockly.mainWorkspace.clear();
          Blockly.Xml.domToWorkspace(decoded.xml, Blockly.mainWorkspace);
        } else {
          this.qrCodeCancelled=true;
          console.log('no scan done!');
        }
      })
      .catch((e: any) => console.log('Error is' + e));
  }
  shareCode() {
    var codedDom = this.generateCode().codedDom;
    if (codedDom) {
      this.currentModal  = this.modalCtrl.create(QRcodeModalComponent, { codedDom: codedDom });
      this.currentModal.present();
    }
  }

  sendCode() {
    var code = this.generateCode().code;
    // Wait 400ms between each 20 characters
    const p = x =>
      new Promise(f =>
        setTimeout(f, 500, x))

    if (code) {
      var parts = code.match(/.{1,20}/g);
      parts.reduce((acc, x) =>
        acc.then(() => p(x)).then((c)=> this.blProvider.serialWritePreferedDevice(c).then(() => {})
      ), Promise.resolve());
    }
  }

  generateCode(): { codedDom: string; code: string } {
    var codedDom = this.oorobot.encode(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace), this.level);
    let generated: string = Blockly.JavaScript.workspaceToCode(this.myWorkspace);
    generated = generated.replace(/(#\d+)/g, '');
    var code = null;
    if (generated.indexOf('command') == 0 && generated.lastIndexOf('command') == 0) {
      code = 'AAW10' + generated.substring(7, generated.length) + 'G';
    }
    return { codedDom: codedDom, code: code };
  }

  initWorkspace() {
    let blocklyDiv = this.blocklyDiv.nativeElement;
    blocklyDiv.style.height = this.content.contentHeight + 'px';
    blocklyDiv.style.width = this.platform.width() + 'px'; //   ({"height": 500+"px","width": this.platform.width()+"px"});
    // this.blocklyDivStyle={"height": 500+"px","width": this.platform.width()+"px"};
    console.log('initWorkspace', this.level);
    this.myWorkspace = Blockly.inject(blocklyDiv, {
      media: 'assets/blockly/media/',
      toolbox: this.toolboxes[this.level],
      move:{
        scrollbars: true,
        drag: true,
        wheel: false
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.2,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.1
      },
      grid:{
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true
      },
      trashcan: true});

    Blockly.svgResize(this.myWorkspace);
  }

  ionViewDidEnter() {
    this.screenOrientation.onChange().subscribe(() => {
      if (this.myWorkspace) {
        this.content.resize();
        setTimeout(() => {
          // content dimension not updated yet
          var contentDim = this.content.getContentDimensions();
          console.log('Orientation Change', contentDim, this.screenOrientation.type, this.content.contentHeight + 'px', this.content.contentWidth + 'px');
          let blocklyDiv = this.blocklyDiv.nativeElement;
          blocklyDiv.style.height = contentDim.contentHeight + 'px';
          blocklyDiv.style.width = contentDim.contentWidth + 'px'; //   ({"height": 500+"px","width": this.platform.width()+"px"});
          Blockly.svgResize(this.myWorkspace);
        }, 200);
      }
    });
    if (!this.myWorkspace) {
      this.initWorkspace();
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
      init: function() {
        this.jsonInit({
          message0: '%1 plateau %2 %3cm*%4cm %5 %6',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/flag.svg',
              width: 22,
              height: 22,
              alt: '*'
            },
            {
              "type": "input_dummy"
            },
            {
              type: 'field_number',
              name: 'WIDTH',
              value: 100
            },
            {
              type: 'field_number',
              name: 'HEIGHT',
              value: 60
            },
            {
              "type": "input_dummy"
            },
            { type: 'input_statement',
              name: 'DO'
            },
          ],
          colour: startColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp'
        });
      }
    };

    Blockly.Blocks['Up'] = {
      init: function() {
        this.jsonInit({
          message0: '%1 %2cm',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/arrow-thick-top.svg',
              width: 22,
              height: 22,
              alt: '*'
            },
            {
              type: 'field_number',
              name: 'FIELDNAME',
              value: 10
            }
          ],
          colour: moveColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.Blocks['UpSimple'] = {
      init: function() {
        this.jsonInit({
          message0: '%1',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/arrow-thick-top.svg',
              width: 22,
              height: 22,
              alt: '*'
            }
          ],
          colour: moveColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.Blocks['Pause'] = {
      init: function() {
        this.jsonInit({
          message0: '%1 %2 s',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/media-pause.svg',
              width: 22,
              height: 22,
              alt: '*'
            },
            {
              type: 'field_number',
              name: 'FIELDNAME',
              value: 10
            }
          ],
          colour: moveColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.Blocks['Down'] = {
      init: function() {
        this.jsonInit({
          message0: '%1 %2cm',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/arrow-thick-bottom.svg',
              width: 22,
              height: 22,
              alt: '*'
            },
            {
              type: 'field_number',
              name: 'FIELDNAME',
              value: 10
            }
          ],
          colour: moveColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.Blocks['DownSimple'] = {
      init: function() {
        this.jsonInit({
          message0: '%1',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/arrow-thick-bottom.svg',
              width: 22,
              height: 22,
              alt: '*'
            }
          ],
          colour: moveColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.Blocks['Left'] = {
      init: function() {
        this.jsonInit({
          message0: '%1 %2',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/left.svg',
              width: 22,
              height: 22,
              alt: '*'
            },
            {
              type: 'field_angle',
              name: 'FIELDNAME',
              angle: '90'
            }
          ],
          colour: moveColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.Blocks['LeftSimple'] = {
      init: function() {
        this.jsonInit({
          message0: '%1',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/left.svg',
              width: 22,
              height: 22,
              alt: '*'
            }
          ],
          colour: moveColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.Blocks['Right'] = {
      init: function() {
        this.jsonInit({
          message0: '%1 %2',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/right.svg',
              width: 22,
              height: 22,
              alt: '*'
            },
            {
              type: 'field_angle',
              name: 'FIELDNAME',
              angle: '90'
            }
          ],
          colour: moveColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.Blocks['RightSimple'] = {
      init: function() {
        this.jsonInit({
          message0: '%1',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/right.svg',
              width: 22,
              height: 22,
              alt: '*'
            }
          ],
          colour: moveColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.Blocks['CircleRight'] = {
      init: function() {
        this.jsonInit({
          message0: '%1 r%2 a%3',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/circle-right.svg',
              width: 22,
              height: 22,
              alt: '*'
            },
            {
              type: 'field_input',
              name: 'RADIUS',
              text: '10'
            },
            {
              type: 'field_angle',
              name: 'ANGLE',
              angle: '90'
            }
          ],
          colour: moveColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.Blocks['CircleLeft'] = {
      init: function() {
        this.jsonInit({
          message0: '%1 r%2 a%3',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/circle-left.svg',
              width: 22,
              height: 22,
              alt: '*'
            },
            {
              type: 'field_input',
              name: 'RADIUS',
              text: '10'
            },
            {
              type: 'field_angle',
              name: 'ANGLE',
              angle: '90'
            }
          ],
          colour: moveColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.Blocks['Loop'] = {
      init: function() {
        this.jsonInit({
          message0: '%1 %2',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/repeat.svg',
              width: 22,
              height: 22,
              alt: '*'
            },
            {
              type: 'field_number',
              name: 'FIELDNAME',
              value: 4
            }
          ],
          message1: '%1',
          args1: [{ type: 'input_statement', name: 'DO' }],
          colour: controlColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.Blocks['PenUp'] = {
      init: function() {
        this.jsonInit({
          message0: '%1',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/pen-up.svg',
              width: 22,
              height: 22,
              alt: '*'
            }
          ],
          colour: moveColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.Blocks['PenDown'] = {
      init: function() {
        this.jsonInit({
          message0: '%1',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/pen-down.svg',
              width: 22,
              height: 22,
              alt: '*'
            }
          ],
          colour: moveColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.Blocks['PenColor'] = {
      init: function() {
        this.jsonInit({
          message0: '%1 %2',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/color-picker.svg',
              width: 22,
              height: 22,
              alt: '*'
            },
            {
              type: 'field_colour',
              name: 'FIELDNAME',
              colour: '#33cc00'
            }
          ],
          colour: moveColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp',
          previousStatement: null,
          nextStatement: null
        });
      }
    };

    Blockly.JavaScript['Start'] = function(block) {
      // Search the text for a substring.
      let code = Blockly.JavaScript.statementToCode(block, 'DO');
      let width = block.getFieldValue('WIDTH');
      let height = block.getFieldValue('HEIGHT');
      return 'commandw' + width*10 + 'h' + height*10 + code;
    };

    Blockly.JavaScript['Up'] = function(block) {
      // Search the text for a substring.
      let operator = block.getFieldValue('FIELDNAME');

      let code = 'U' + operator*10;
      return code;
    };

    Blockly.JavaScript['UpSimple'] = function(block) {
      return 'U';
    };

    Blockly.JavaScript['PenUp'] = function() {
      // Search the text for a substring.
      let code = '|';
      return code;
    };

    Blockly.JavaScript['PenDown'] = function() {
      // Search the text for a substring.
      let code = '!';
      return code;
    };

    Blockly.JavaScript['Down'] = function(block) {
      // Search the text for a substring.
      let operator = block.getFieldValue('FIELDNAME');

      let code = 'D' + operator*10;
      return code;
    };

    Blockly.JavaScript['DownSimple'] = function(block) {
      return 'D';
    };

    Blockly.JavaScript['Left'] = function(block) {
      // Search the text for a substring.
      let operator = block.getFieldValue('FIELDNAME');

      let code = 'L' + operator;
      return code;
    };

    Blockly.JavaScript['LeftSimple'] = function(block) {
      return 'L';
    };

    Blockly.JavaScript['Pause'] = function(block) {
      // Search the text for a substring.
      let operator = block.getFieldValue('FIELDNAME');

      let code = 'P' + operator;
      return code;
    };

    Blockly.JavaScript['PenColor'] = function(block) {
      let hexColor = block.getFieldValue('FIELDNAME');
      let color = '#';
      for (let i = 1; i < hexColor.length; i += 2) {
        const v = '' + parseInt(hexColor.substr(i, 2), 16);
        color += new Array(3 - v.length + 1).join('0') + v;
      }
      return color;
    };

    Blockly.JavaScript['Right'] = function(block) {
      // Search the text for a substring.
      let operator = block.getFieldValue('FIELDNAME');

      let code = 'R' + operator;
      return code;
    };

    Blockly.JavaScript['RightSimple'] = function(block) {
      return 'R';
    };

    Blockly.JavaScript['CircleLeft'] = function(block) {
      let radius = block.getFieldValue('RADIUS');
      let angle = block.getFieldValue('ANGLE');

      let code = 'r0c' + radius*10 + 'a' + angle;
      return code;
    };

    Blockly.JavaScript['CircleRight'] = function(block) {
      let radius = block.getFieldValue('RADIUS');
      let angle = block.getFieldValue('ANGLE');

      let code = 'r1c' + radius*10 + 'a' + angle;
      return code;
    };

    Blockly.JavaScript['Loop'] = function(block) {
      // Search the text for a substring.
      let operator = block.getFieldValue('FIELDNAME');
      let subcode = Blockly.JavaScript.statementToCode(block, 'DO');
      return 'B' + operator + subcode + 'E';
    };
  }

}
