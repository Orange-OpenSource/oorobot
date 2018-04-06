import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import OoRoBoT from '../../assets/oorobot';

/**
 * Generated class for the CanvasModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'canvas-modal',
  templateUrl: 'canvas-modal.html'
})
export class CanvasModalComponent {
  oorobot: any;
  code: String;
  text: string;

  @ViewChild('canvasDiv') canvasDiv: ElementRef;

  constructor(params: NavParams, public viewCtrl: ViewController) {
    this.code = params.get('code');
  }

  ngOnInit() {
    console.log('Hello CanvasModalComponent Component');
    this.oorobot = new OoRoBoT(this.canvasDiv.nativeElement, 500, 300, "#33cc00");
    this.oorobot.setCommands(this.code);
    this.oorobot.draw();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
