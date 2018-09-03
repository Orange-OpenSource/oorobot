import { Platform } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Storage } from '@ionic/storage';
import { ShareProvider } from '../share/share';

//import { Observable } from 'rxjs/Observable';
/*
  Generated class for the BluetoothProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class BluetoothProvider {

  constructor(private bluetoothSerial: BluetoothSerial, private shareProvider: ShareProvider, private storage: Storage, private platform: Platform) {
    console.log('Hello BluetoothProvider Provider');
  }
  public btledevices;

  getDeviceList() {
    return this.bluetoothSerial.list();
  }

  setPreferedDevice(device) {
    return this.storage.set("device", device);
  }

  getPreferedDevice() {
    return this.storage.get("device");
  }

  disconnect() {
    this.shareProvider.disconnect();
    return this.bluetoothSerial.disconnect();
  }

  serialWritePreferedDevice(command) {
    console.log("BT serial send :" + command)

    return new Promise((resolve, reject) => {

      this.bluetoothSerial.isConnected().then((connected) => {
        if (connected) {
          this.bluetoothSerial.write(command).then(() => {
            resolve();
          }).catch((err) => {
            reject(err);
          });
        }
        else {
          this.getPreferedDevice().then((device) => {
            this.connectDevice(device).subscribe((data) => {
              this.bluetoothSerial.write(command).then(() => {
                resolve();
              }).catch((err) => {
                reject(err);
              });
            }, (err) => {
              reject(err);
            })

          })
        }
      })
    })
  }

  connectDevice(device) {
    const deviceId=device.id;
    //this.shareProvider.shareRobot(deviceId);
    return this.bluetoothSerial.connect(deviceId);
  }

}
