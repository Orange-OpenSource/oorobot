import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  btledevices:any;
  mydevice:any;
  message:string;
  numKeyboard:Array<Array<number>> = [[1,2,3],[4,5,6],[7,8,9],[0,10,11]];
  constructor(private bluetoothSerial:BluetoothSerial,public navCtrl: NavController) {
    this.bluetoothSerial.list().then((data)=>{console.log(JSON.stringify(data))
    this.btledevices=data;
    });
  }

  OnBTChange(device)
  {

    console.log(device)
    this.bluetoothSerial.connect(device.id).subscribe((data)=>{
      this.message="connected";
      this.bluetoothSerial.subscribeRawData().subscribe((data:any)=>{
        this.message=data;
      })
      console.log("connected")
    },(err)=>{
      this.message="error :" +err;
    }

      
    );



  }

  command(commmand)
  {
    this.bluetoothSerial.write(commmand).then(()=>
  {
    this.message="write ok";
  });
  }

}
