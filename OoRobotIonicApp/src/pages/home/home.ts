import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothProvider } from '../../providers/bluetooth/bluetooth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  constructor(public navCtrl: NavController, private blProvider: BluetoothProvider) {

  }

  command(commmand) {
    this.blProvider.serialWritePreferedDevice(commmand).then(() => {

    });
  }

}
