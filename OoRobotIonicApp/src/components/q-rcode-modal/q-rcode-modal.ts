import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

/**
 * Generated class for the QRcodeModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'q-rcode-modal',
  templateUrl: 'q-rcode-modal.html'
})
export class QRcodeModalComponent {
  code: string = '';

  constructor(params: NavParams, public navController: NavController) {
    console.log('Hello QRcodeModalComponent Component');
    this.code = params.get('code');
  }
  closeModal() {
    this.navController.pop();
  }
}
