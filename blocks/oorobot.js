class OoRoBoT {
  constructor(canvas, width, height, color) {
    this.canvas=canvas;
    this.c=this.canvas.getContext("2d");
    this.width=width;
    this.height=height;
    this.initColor=color;
    this.color=color || "red";
    this.debug=false;
    this.init();
  }

  init() {
    this.angle=0;
    this.x=5;
    this.y=5;
    this.loops=[];
    this.lastCircleRadius=0;
    this.reverseOrientation=1;
    this.penDown=true;
    this.color=this.initColor;
    this.commandLaunched=0;
    this.bounds = {Xmin:0, Xmax:-Number.MAX_VALUE, Ymin:0, Ymax: -Number.MAX_VALUE};
    this.canvas.width  = this.width;
    this.canvas.height = this.height;
    this.c.moveTo(this.x, this.y);
    this.debug=false;
    this.drawArrow();
  }

  setCommands(commands) {
    this.commands=commands;
  }

  getDefaultCommandValue(command) {
    switch (command) {
      case 'W':
        return 800;
      case 'U':
      case 'D':
        return 140;
      case 'L':
      case 'R':
        return 90;
      case 'P':
        return 800;
      default:
        return 0;
    }
  }

  drawArrow() {
    const p=this.penDown;
    const c=this.color;
    this.color="#3C8BDA";
    this.penDown=true;
    this.forward(6);
    this.left(150);
    this.forward(7);
    this.backward(7);
    this.right(150);
    this.right(150);
    this.forward(7);
    this.backward(7);
    this.left(150);
    this.backward(6);
    this.penDown=p;
    this.color=c;
  };

  executeCommand(command, size) {
    switch (command) {
      case 'B':
        this.loops.push({index: size, pointer: this.commandLaunched});
        break;
      case 'E':
        this.loops[this.loops.length-1].index--;
        if (this.loops[this.loops.length-1].index<=0) {
          this.loops.pop();
        } else {
          this.commandLaunched=this.loops[this.loops.length-1].pointer;
        }
        break;
      case '#':
        let color="#";
        size=pad(size, 9);
        for (let i=0;i<size.length;i+=3) {
          color+=""+pad(parseInt(size.substr(i, 3)).toString(16), 2);
        }
        this.color=color;
        break;
      case 'U':
        this.forward(size);
        break;
      case 'D':
        this.backward(size);
        break;
      case 'R':
        this.right(size);
        break;
      case 'L':
        this.left(size);
        break;
      case '!':
        this.penDown=true;
        break;
      case '|':
        this.penDown=false;
        break;
      case 'c':
        this.lastCircleRadius=size;
        break;
      case 'r':
        if (size==1) {
          this.reverseOrientation=1;
        } else {
          this.reverseOrientation=-1;
        }
        break;
      case 'a':
        this.drawCircle(this.lastCircleRadius, size, this.reverseOrientation);
        break;
      default:
        console.log(command, size);
    }
  }

  toBlocklyXml() {
    this.lastCircleRadius=0;
    this.reverseOrientation=1;

    this.statementsIdx=[];
    this.statementsIdxHaveLoop=0;
    let idx=0;
    this.xml='<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="Start"><statement name="DO">';
    this.statementsIdx.push(0);
    this.statementsIdxMax=1;
    while(idx<this.commands.length) {
      const command = this.commands[idx];
      let value="";
      while (this.commands[idx+1] && this.commands[idx+1].match(/^\d$/)) {
        value += ''+this.commands[idx+1];
        idx++;
      }
      if (value == "") {
        value = this.getDefaultCommandValue(command);
      } else {
        value = parseInt(value);
      }
      this.xmlForCommand(command, value);
      idx++;
    }
    this.xml=this.xml.replace(/<next>$/, "");
    let commands=this.statementsIdx.pop();
    while(commands-- > 0-this.statementsIdxHaveLoop) {
      this.xml+="</block></next>";
    }
    this.xml=this.xml.replace(/<\/next>$/, "");
    this.xml+='</statement></block></xml>';
    return this.xml;
  }
  /*
<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables>
  <block type="Start">
    <statement name="DO">
       <block type="Up"><field name="FIELDNAME">100</field>
         <next>
            <block type="Right"><field name="FIELDNAME">90</field>
            </block>
         </next>
        </block>
        </next>
       </block>
     </statement>
   </block>
</xml>

B4U100R90ER45U100
<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables>
<block type="Start">
B   <statement name="DO">
4     <block type="Loop"><field name="FIELDNAME">4</field>
       <statement name="DO">
U         <block type="Up"><field name="FIELDNAME">100</field>
           <next>
R             <block type="Right"><field name="FIELDNAME">90</field>
             </block>
           </next>
         </block>
E        </statement>
        <next>
R          <block type="Right"><field name="FIELDNAME">45</field>
U            <next>
               <block type="Up"><field name="FIELDNAME">100</field>
               </block>
            </next>
          </block>
         </next>
       </block>
     </statement>
</block></xml>

<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables>
<block type="Start">
  <statement name="DO">
    <block type="Loop"><field name="FIELDNAME">4</field>
      <statement name="DO">
        <block type="Up"><field name="FIELDNAME">100</field>
          <next>
            <block type="Right"><field name="FIELDNAME">90</field>
            </block>
          </next>
         </block>
       </statement>
       <next>
         <block type="Right"><field name="FIELDNAME">45</field>
           <next>
              <block type="Up"><field name="FIELDNAME">100</field>
              </block>
           </next>
         </block>
   </statement>
</block></xml>

<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables>
<block type="Start">
    <statement name="DO">
      <block type="Loop"><field name="FIELDNAME">4</field>
         <statement name="DO">
           <block type="Up"><field name="FIELDNAME">100</field>
             <next>
                <block type="Right"><field name="FIELDNAME">90</field>
                </block>
              </next>
           </block>
        </statement>
        </block>
        <block type="Right"><field name="FIELDNAME">45</field>
          <next>
            <block type="Up"><field name="FIELDNAME">100</field>
            </block>
          </next>
        </block>
     </statement>
</block></xml>
*/
	xmlForCommand(command, size) {
    switch (command) {
      case 'B':
        this.xml+='<block type="Loop"><field name="FIELDNAME">'+size+'</field><statement name="DO">';
        this.statementsIdxHaveLoop=1;
        this.statementsIdx.push(0);
        break;
      case 'E':
        this.xml=this.xml.replace(/<next>$/, "");
        let commands=this.statementsIdx.pop();
        while(commands-- > 0) {
          this.xml+="</block></next>";
        }
        this.xml=this.xml.replace(/<\/next>$/, "");
        this.xml+='</statement><next>';
        break;
      case '#':
        let color="#";
        size=pad(size, 9);
        for (let i=0;i<size.length;i+=3) {
          color+=""+pad(parseInt(size.substr(i, 3)).toString(16), 2);
        }
        this.xml+='<block type="PenColor"><field name="FIELDNAME">'+color+'</field><next>';
        this.statementsIdx[this.statementsIdx.length-1]++;
        break;
      case 'U':
        this.xml+='<block type="Up"><field name="FIELDNAME">'+size+'</field><next>';
        this.statementsIdx[this.statementsIdx.length-1]++;
        break;
      case 'D':
        this.xml+='<block type="Down"><field name="FIELDNAME">'+size+'</field><next>'
        this.statementsIdx[this.statementsIdx.length-1]++;
        break;
      case 'R':
        this.xml+='<block type="Right"><field name="FIELDNAME">'+size+'</field><next>'
        this.statementsIdx[this.statementsIdx.length-1]++;
        break;
      case 'L':
        this.xml+='<block type="Left"><field name="FIELDNAME">'+size+'</field><next>'
        this.statementsIdx[this.statementsIdx.length-1]++;
        break;
      case '!':
        this.xml+='<block type="PenDown"><next>';
        this.statementsIdx[this.statementsIdx.length-1]++;
        break;
      case '|':
        this.xml+='<block type="PenUp"><next>';
        this.statementsIdx[this.statementsIdx.length-1]++;
        break;
      case 'c':
        this.lastCircleRadius=size;
        break;
      case 'r':
        if (size==1) {
          this.reverseOrientation=1;
        } else {
          this.reverseOrientation=-1;
        }
        break;
      case 'a':
        if (this.reverseOrientation) {
          this.xml+='<block type="CircleRight"><field name="RADIUS">'+this.lastCircleRadius+'</field><field name="ANGLE">'+size+'</field><next>'
        } else {
          this.xml+='<block type="CircleLeft"><field name="RADIUS">'+this.lastCircleRadius+'</field><field name="ANGLE">'+size+'</field><next>'
        }
        this.statementsIdx[this.statementsIdx.length-1]++;
        break;
      default:
        console.log(command, size);
    }
  }

  nextCommand() {
    if (this.commandLaunched>=this.commands.length) {
      return 0;
    } else {
      let value="";
      const command = this.commands[this.commandLaunched];
      while (this.commands[this.commandLaunched+1] && this.commands[this.commandLaunched+1].match(/^\d$/)) {
        value += ''+this.commands[this.commandLaunched+1];
        this.commandLaunched++;
      }
      if (value == "") {
        value = this.getDefaultCommandValue(command);
      } else {
        value = parseInt(value);
      }
      this.executeCommand(command, value);
      this.commandLaunched++;
      return 1;
    }
  }

  draw() {
    this.init();
    while(this.nextCommand());
    this.drawArrow();
  }

  left(angle) {
    this.angle-=angle;
  }

  right(angle) {
    this.angle+=angle;
  }

  forward(distance) {
    this.drawLine(distance)
  }

  backward(distance) {
    this.drawLine(-distance);
  }


  drawCircle(radius, angle, reverseOrientation){
    let x0 = this.x,
      y0 = this.y,
      a0 = this.angle;
    let Xcenter = x0+radius * Math.sin((this.angle+90*reverseOrientation) * Math.PI / 180.0);
    let Ycenter = y0+radius * Math.cos((this.angle+90*reverseOrientation) * Math.PI / 180.0);

    this.angle+=angle*reverseOrientation;

    this.x=Xcenter + radius * Math.sin((this.angle-90*reverseOrientation) * Math.PI / 180.0);
    this.y=Ycenter + radius * Math.cos((this.angle-90*reverseOrientation) * Math.PI / 180.0);

    this.c.strokeStyle = this.color;

    this.c.beginPath();
    this.c.lineWidth = 1;
    this.c.setLineDash([5]);
    this.c.moveTo(x0, y0);
    this.c.lineTo(Xcenter, Ycenter);
    this.c.lineTo(this.x, this.y);
    this.c.stroke();
    this.c.lineWidth = 2;
    this.c.setLineDash([0]);

    let start=Math.PI - a0 * Math.PI / 180.0;
    let end=Math.PI - (angle+a0) * Math.PI  / 180.0;
    if (reverseOrientation==-1) {
      start=Math.PI - (a0+180) * Math.PI  / 180.0;
      end=Math.PI - (a0-angle+180) * Math.PI / 180.0;
    }
    this.c.beginPath();
    this.c.lineWidth = 2;
    //this.c.strokeStyle = this.color;
    if (!this.penDown) {
      this.c.setLineDash([2,2]);
      this.c.lineWidth = 1;
      //this.c.strokeStyle = "#AAA";
    }
    this.c.arc(Xcenter, Ycenter, radius,
      start,
      end,
      reverseOrientation==1 ? true : false);
    this.c.stroke();
    this.c.setLineDash([0]);
    this.c.lineWidth = 2;
  }

  drawLine(length) {
    let x0 = this.x,
      y0 = this.y;
    this.x += length * Math.sin(this.angle * Math.PI / 180.0);
    this.y += length * Math.cos(this.angle * Math.PI / 180.0);
    if (this.debug) {
      if (this.x < this.bounds.Xmin) {
        this.bounds.Xmin=this.x;
      }
      if (this.y < this.bounds.Ymin) {
        this.bounds.Ymin=this.y;
      }
      if (this.x > this.bounds.Xmax) {
        this.bounds.Xmax=this.x;
      }
      if (this.y > this.bounds.Ymax) {
        this.bounds.Ymax=this.y;
      }
    } else {
      if (this.penDown) {
        this.c.beginPath();
        this.c.lineWidth = 2;
        this.c.strokeStyle = this.color;
        this.c.moveTo(x0, y0);
        this.c.lineTo(this.x, this.y);
        this.c.stroke();
      } else {
        this.c.moveTo(this.x, this.y);
      }
    }
  }
};
