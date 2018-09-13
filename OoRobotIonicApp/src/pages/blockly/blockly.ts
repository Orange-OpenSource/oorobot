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
  blocklyDivStyle = {};
  oorobot: any;
  level: '0';
  toolboxes = {
    '0':
      '<xml id="toolbox" style="display: none">' +
      '<block type="Start"></block>' +
      '<block type="UpSimple"></block>' +
      '<block type="DownSimple"></block>' +
      '<block type="LeftSimple"></block>' +
      '<block type="RightSimple"></block>' +
      '<block type="Loop"></block>' +
      '<block type="PenUp"></block>' +
      '<block type="PenDown"></block>' +
      '<block type="PenColor"></block>' +
      '<block type="Pause"></block>' +
      '</xml>',
    '1':
      '<xml id="toolbox" style="display: none">' +
      '<block type="Start"></block>' +
      '<block type="Up"></block>' +
      '<block type="Down"></block>' +
      '<block type="Left"></block>' +
      '<block type="Right"></block>' +
      '<block type="Loop"></block>' +
      '<block type="PenUp"></block>' +
      '<block type="PenDown"></block>' +
      '<block type="PenColor"></block>' +
      '<block type="CircleRight"></block>' +
      '<block type="CircleLeft"></block>' +
      '<block type="Pause"></block>' +
      '</xml>',
    '2':
      '<xml id="toolbox" style="display: none">' +
      '<block type="Start"></block>' +
      '<block type="Up"></block>' +
      '<block type="Down"></block>' +
      '<block type="Left"></block>' +
      '<block type="Right"></block>' +
      '<block type="Loop"></block>' +
      '<block type="PenUp"></block>' +
      '<block type="PenDown"></block>' +
      '<block type="PenColor"></block>' +
      '<block type="CircleRight"></block>' +
      '<block type="CircleLeft"></block>' +
      '<block type="Pause"></block>' +
      '</xml>',
    '3':
      '  <xml id="toolbox" style="display: none">\n' +
      '    <category name="Logic">\n' +
      '      <category name="If">\n' +
      '        <block type="controls_if"></block>\n' +
      '        <block type="controls_if">\n' +
      '          <mutation else="1"></mutation>\n' +
      '        </block>\n' +
      '        <block type="controls_if">\n' +
      '          <mutation elseif="1" else="1"></mutation>\n' +
      '        </block>\n' +
      '      </category>\n' +
      '      <category name="Boolean">\n' +
      '        <block type="logic_compare"></block>\n' +
      '        <block type="logic_operation"></block>\n' +
      '        <block type="logic_negate"></block>\n' +
      '        <block type="logic_boolean"></block>\n' +
      '        <block type="logic_null"></block>\n' +
      '        <block type="logic_ternary"></block>\n' +
      '      </category>\n' +
      '    </category>\n' +
      '    <category name="Loops">\n' +
      '      <block type="controls_repeat_ext">\n' +
      '        <value name="TIMES">\n' +
      '          <block type="math_number">\n' +
      '            <field name="NUM">10</field>\n' +
      '          </block>\n' +
      '        </value>\n' +
      '      </block>\n' +
      '      <block type="controls_whileUntil"></block>\n' +
      '      <block type="controls_for">\n' +
      '        <field name="VAR">i</field>\n' +
      '        <value name="FROM">\n' +
      '          <block type="math_number">\n' +
      '            <field name="NUM">1</field>\n' +
      '          </block>\n' +
      '        </value>\n' +
      '        <value name="TO">\n' +
      '          <block type="math_number">\n' +
      '            <field name="NUM">10</field>\n' +
      '          </block>\n' +
      '        </value>\n' +
      '        <value name="BY">\n' +
      '          <block type="math_number">\n' +
      '            <field name="NUM">1</field>\n' +
      '          </block>\n' +
      '        </value>\n' +
      '      </block>\n' +
      '      <block type="controls_forEach"></block>\n' +
      '      <block type="controls_flow_statements"></block>\n' +
      '    </category>\n' +
      '    <category name="Math">\n' +
      '      <block type="math_number"></block>\n' +
      '      <block type="math_arithmetic"></block>\n' +
      '      <block type="math_single"></block>\n' +
      '      <block type="math_trig"></block>\n' +
      '      <block type="math_constant"></block>\n' +
      '      <block type="math_number_property"></block>\n' +
      '      <block type="math_round"></block>\n' +
      '      <block type="math_on_list"></block>\n' +
      '      <block type="math_modulo"></block>\n' +
      '      <block type="math_constrain">\n' +
      '        <value name="LOW">\n' +
      '          <block type="math_number">\n' +
      '            <field name="NUM">1</field>\n' +
      '          </block>\n' +
      '        </value>\n' +
      '        <value name="HIGH">\n' +
      '          <block type="math_number">\n' +
      '            <field name="NUM">100</field>\n' +
      '          </block>\n' +
      '        </value>\n' +
      '      </block>\n' +
      '      <block type="math_random_int">\n' +
      '        <value name="FROM">\n' +
      '          <block type="math_number">\n' +
      '            <field name="NUM">1</field>\n' +
      '          </block>\n' +
      '        </value>\n' +
      '        <value name="TO">\n' +
      '          <block type="math_number">\n' +
      '            <field name="NUM">100</field>\n' +
      '          </block>\n' +
      '        </value>\n' +
      '      </block>\n' +
      '      <block type="math_random_float"></block>\n' +
      '    </category>\n' +
      '    <category name="Lists">\n' +
      '      <block type="lists_create_empty"></block>\n' +
      '      <block type="lists_create_with"></block>\n' +
      '      <block type="lists_repeat">\n' +
      '        <value name="NUM">\n' +
      '          <block type="math_number">\n' +
      '            <field name="NUM">5</field>\n' +
      '          </block>\n' +
      '        </value>\n' +
      '      </block>\n' +
      '      <block type="lists_length"></block>\n' +
      '      <block type="lists_isEmpty"></block>\n' +
      '      <block type="lists_indexOf"></block>\n' +
      '      <block type="lists_getIndex"></block>\n' +
      '      <block type="lists_setIndex"></block>\n' +
      '    </category>\n' +
      '    <category name="Variables" custom="VARIABLE"></category>\n' +
      '    <category name="Functions" custom="PROCEDURE"></category>' +
      '</xml>'
  };

  @ViewChild('blocklyDiv')
  blocklyDiv: ElementRef;
  @ViewChild('content')
  content: Content;

  constructor(private qrScanner: BarcodeScanner, private screenOrientation: ScreenOrientation, private blProvider: BluetoothProvider, private modalCtrl: ModalController, public navCtrl: NavController, private platform: Platform) {
    this.level = '0';
    this.setBlocks(); // define Oorobot Blocks
    this.oorobot = new OoRoBoT();
    //let ref = new Webcom('https://io.datasync.orange.com/base/legorange/');
  }

  testCode() {
    let code: string = Blockly.JavaScript.workspaceToCode(this.myWorkspace);
    code = code.replace(/^command/, '');
    let canvasModal = this.modalCtrl.create(CanvasModalComponent, { code: code });
    canvasModal.present();
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
        console.log('Scanned something', data.text);
        console.log(JSON.stringify(data));

        var decoded = this.oorobot.decode(data.text);
        console.log('decoded' + JSON.stringify(decoded));
        this.levelChange(decoded.level);
        Blockly.mainWorkspace.clear();
        Blockly.Xml.domToWorkspace(decoded.xml, Blockly.mainWorkspace);
      })
      .catch((e: any) => console.log('Error is' + e));
  }
  shareCode() {
    var codedDom = this.generateCode().codedDom;
    if (codedDom) {
      const modal = this.modalCtrl.create(QRcodeModalComponent, { codedDom: codedDom });
      modal.present();
    }
  }

  sendCode() {
    var code = this.generateCode().code;
    if (code) {
      this.blProvider.serialWritePreferedDevice(code).then(() => {});
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
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      grid: {
        spacing: 50,
        length: 3,
        colour: '#ccc',
        snap: true
      },
      trashcan: true
    });
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
    let moveColor = '#3C8BDA';
    let controlColor = '#F0DC27';
    let startColor = '#74C042';

    Blockly.Generator.prototype.prefixLines = function(text, prefix) {
      // Need to Overide this function not supported by ionic
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
          message0: '%1 x%2 y%3',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/flag.svg',
              width: 40,
              height: 40,
              alt: '*'
            },
            {
              type: 'field_number',
              name: 'WIDTH',
              value: '1000'
            },
            {
              type: 'field_number',
              name: 'HEIGHT',
              value: '600'
            }
          ],
          message1: '%1',
          args1: [{ type: 'input_statement', name: 'DO' }],
          colour: startColor,
          tooltip: '',
          helpUrl: 'http://www.w3schools.com/jsref/jsref_length_string.asp'
        });
      }
    };

    Blockly.Blocks['Up'] = {
      init: function() {
        this.jsonInit({
          message0: '%1 %2',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/arrow-thick-top.svg',
              width: 40,
              height: 40,
              alt: '*'
            },
            {
              type: 'field_number',
              name: 'FIELDNAME',
              value: 100
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
              width: 40,
              height: 40,
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
          message0: '%1 %2',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/media-pause.svg',
              width: 40,
              height: 40,
              alt: '*'
            },
            {
              type: 'field_number',
              name: 'FIELDNAME',
              value: 100
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
          message0: '%1 %2',
          args0: [
            {
              type: 'field_image',
              src: 'assets/svg/arrow-thick-bottom.svg',
              width: 40,
              height: 40,
              alt: '*'
            },
            {
              type: 'field_number',
              name: 'FIELDNAME',
              value: 100
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
              width: 40,
              height: 40,
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
              width: 40,
              height: 40,
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
              width: 40,
              height: 40,
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
              width: 40,
              height: 40,
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
              width: 40,
              height: 40,
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
              width: 40,
              height: 40,
              alt: '*'
            },
            {
              type: 'field_input',
              name: 'RADIUS',
              text: '100'
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
              width: 40,
              height: 40,
              alt: '*'
            },
            {
              type: 'field_input',
              name: 'RADIUS',
              text: '100'
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
              width: 40,
              height: 40,
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
              width: 40,
              height: 40,
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
              width: 40,
              height: 40,
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
              width: 40,
              height: 40,
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
      return 'commandw' + width + 'h' + height + code;
    };

    Blockly.JavaScript['Up'] = function(block) {
      // Search the text for a substring.
      let operator = block.getFieldValue('FIELDNAME');

      let code = 'U' + operator;
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

      let code = 'D' + operator;
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

      let code = 'r0c' + radius + 'a' + angle;
      return code;
    };

    Blockly.JavaScript['CircleRight'] = function(block) {
      let radius = block.getFieldValue('RADIUS');
      let angle = block.getFieldValue('ANGLE');

      let code = 'r1c' + radius + 'a' + angle;
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
