import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var Webcom: any;

/*
  Generated class for the ShareProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShareProvider {
  ref: any

  constructor(public http: HttpClient) {
    console.log('Hello ShareProvider Provider');
    this.ref = new Webcom('https://io.datasync.orange.com/base/oorobot/');

    this.disconnect();
  }

  shareRobot(name) {
    this.ref.child("robots").child(name).child("state").child('online').set(true);
    this.ref.child("robots").child(name).child("state").onDisconnect().child('online').set(false);
    this.ref.child("robots").child(name).child("programs").on("child_added", (snapshot) => {
      console.log(snapshot.val());

    });
  }

  connect() {
    this.ref.goOnline();
  }

  disconnect() {
    this.ref.goOffline();
  }

}
