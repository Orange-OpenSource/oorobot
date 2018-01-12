import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothProvider } from '../../providers/bluetooth/bluetooth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  numKeyboard: Array<Array<number>> = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0, 10, 11]];
  constructor(public navCtrl: NavController, private blProvider: BluetoothProvider) {

  }

  command(commmand) {
    this.blProvider.serialWritePreferedDevice(commmand).then(() => {

    });
  }

}
