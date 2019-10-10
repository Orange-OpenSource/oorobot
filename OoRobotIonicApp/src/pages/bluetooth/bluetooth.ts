import { BluetoothProvider } from './../../providers/bluetooth/bluetooth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the BluetoothPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
})
export class BluetoothPage {

  btledevices: any;
  message: string;
  BLstatus=false;
  selectedBL: any;
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private blprovide: BluetoothProvider) {

    this.blprovide.getDeviceList().then((data) => {
      console.log(JSON.stringify(data))
      this.btledevices = data;
    });
    this.message = "pas connecté";

    this.selectedBL = 'none';

  }

  doRefresh(event) {
    console.log('Begin async operation');

    this.blprovide.getDeviceList().then((data) => {
      this.btledevices = data;
      event.complete();
    });
  }

  OnBTChange(device) {

    let loader = this.loadingCtrl.create({
      content: "Connexion en cours ...",
      duration: 30000
    });



    if (device == 'none') {
           this.disconnect();
    } else {

      this.blprovide.disconnect().then(() => {
        loader.present();
        this.blprovide.connectDevice(device).subscribe((data) => {

          this.blprovide.setPreferedDevice(device).then(() => {

            console.log("connected")
            this.BLstatus=true;
            this.message = "Connecté";
            loader.dismiss();
          }).catch((err) => {
            this.message = "Erreur :" + err;
            loader.dismiss();
          })

        }, (err) => {
          this.message = "Erreur :" + err;
          loader.dismiss();
        }
        );
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BluetoothPage');
  }

  disconnect() {
    console.log("disconnect")
    let loader = this.loadingCtrl.create({
      content: "Déconnexion en cours ...",
      duration: 30000
    });

    this.blprovide.disconnect().then(() => {
      this.message = "non connecté";
      this.BLstatus=false;

      loader.dismiss();
    }).catch((err) => {
      this.message = "Erreur :" + err;
      loader.dismiss();
    });
  }

}
