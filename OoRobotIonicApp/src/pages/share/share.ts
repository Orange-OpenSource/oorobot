import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { BluetoothProvider } from '../../providers/bluetooth/bluetooth';


@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private blprovide: BluetoothProvider) {

  }


}
