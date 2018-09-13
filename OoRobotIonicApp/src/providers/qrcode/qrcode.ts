import { Injectable } from '@angular/core';
declare var Blockly: any;
/*
  Generated class for the QrcodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrcodeProvider {
  dictionary = {
    '<block': '<b',
    '<field': '<f',
    '<next>': '<n',
    '<statement': '<s',
    '</block>': 'b#',
    '</field>': 'f#',
    '</next>': 'n#',
    '</statement>': 's#',
    'type=': 't=',
    'name=': 'n=',
    '<xml xmlns="http://www.w3.org/1999/xhtml">': '<x',
    '<variables>': '<v',
    '</variables>': 'v#',
    '</xml>': 'x#',
    '"FIELDNAME"': 'F@',
    '"RADIUS"': 'Y@',
    '"ANGLE"': 'A@',
    '"WIDTH"': 'W@',
    '"HEIGHT"': 'H@',
    '"Left"': 'L@',
    '"Right"': 'R@',
    '"Up"': 'U@',
    '"Down"': 'D@',
    '"LeftSimple"': 'l@',
    '"RightSimple"': 'r@',
    '"UpSimple"': 'u@',
    '"DownSimple"': 'd@',
    '"PenUp"': 'P@',
    '"PenDown"': 'p@',
    '"PenColor"': 'C@',
    '"Start"': 's@',
    '"Loop"': 'k@',
    '"Pause"': 'z@',
    '"CircleRight"': 'x@',
    '"CircleLeft"': 'w@',
    '"DO"': 'n@'
  };
  constructor() {
    console.log('Hello QrcodeProvider Provider');
  }

  domLoop(
    x //remove unusefull id
  ) {
    var i, y, xLen, txt;
    x = x.childNodes;
    xLen = x.length;
    for (i = 0; i < xLen; i++) {
      y = x[i];
      if (y.nodeType == 1) y.removeAttribute('id');
      if (y.childNodes[0] != undefined) {
        this.domLoop(y);
      }
    }
  }
  encode(xml: any): string {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(Blockly.Xml.domToText(xml), 'text/xml');
    //remove unusefull id
    this.domLoop(xmlDoc);
    let textDom = Blockly.Xml.domToText(xmlDoc);
    for (let obj of Object.keys(this.dictionary)) {
      let re = new RegExp(obj, 'g');
      textDom = textDom.replace(re, this.dictionary[obj]);
    }
    return textDom;
  }

  decode(textDom: string): any {
    for (let obj of Object.keys(this.dictionary)) {
      let re = new RegExp(this.dictionary[obj], 'g');
      textDom = textDom.replace(re, obj);
    }
    console.log(textDom);
    return Blockly.Xml.textToDom(textDom);
  }
}
