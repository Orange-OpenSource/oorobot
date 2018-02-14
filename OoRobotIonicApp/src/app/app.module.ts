import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BlocklyPage } from '../pages/blockly/blockly';
import { BluetoothProvider } from '../providers/bluetooth/bluetooth';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    BlocklyPage,
    ContactPage,
    HomePage,
    BluetoothPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BlocklyPage,
    AboutPage,
    ContactPage,
    HomePage,
    BluetoothPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    BluetoothSerial,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BluetoothProvider,
    ScreenOrientation
  ]
})
export class AppModule {}
