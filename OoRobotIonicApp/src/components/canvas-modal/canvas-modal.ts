import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavParams, ViewController, Content} from "ionic-angular";
//import OoRoBoT from '../../assets/oorobot';

/**
 * Generated class for the CanvasModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare var OoRoBoT: any;

@Component({
  selector: 'canvas-modal',
  templateUrl: 'canvas-modal.html'
})
export class CanvasModalComponent {
  oorobot: any;
  code: String;
  text: string;

  @ViewChild('canvasDiv') canvasDiv: ElementRef;
  @ViewChild(Content) content: Content;

  constructor(params: NavParams, public viewCtrl: ViewController) {
    this.code = params.get('code');
  }

  ionViewDidEnter() {
    this.oorobot = new OoRoBoT(this.canvasDiv.nativeElement, "#33cc00");

    this.oorobot.setCommands(this.code);
    this.oorobot.draw();
    const widthRatio = (this.content.contentWidth-20) / this.oorobot.width;
    const heightRatio = (this.content.contentHeight-20) / this.oorobot.height;
    let ratio=1;
    widthRatio<heightRatio ? ratio=widthRatio : ratio=heightRatio;

    //this.canvasDiv.nativeElement.getContext("2d").scale(ratio, ratio);
    this.canvasDiv.nativeElement.style.transform= `scale(${ratio}, -${ratio}) translateY(-${this.oorobot.height}px)`;

    //this.canvasDiv.nativeElement.width=this.content.contentWidth;
    //this.canvasDiv.nativeElement.height=this.content.contentHeight;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
