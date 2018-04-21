import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { CanvasModalComponent } from '../components/canvas-modal/canvas-modal';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SharePage} from "../pages/share/share";
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BlocklyPage } from '../pages/blockly/blockly';
import { BluetoothProvider } from '../providers/bluetooth/bluetooth';
import { IonicStorageModule } from '@ionic/storage';
import { ShareProvider } from '../providers/share/share';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    BlocklyPage,
    ContactPage,
    HomePage,
    BluetoothPage,
    SharePage,
    CanvasModalComponent,
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
    SharePage,
    BluetoothPage,
    CanvasModalComponent,
    TabsPage
  ],
  providers: [
    StatusBar,
    BluetoothSerial,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BluetoothProvider,
    ScreenOrientation,
    ShareProvider
  ]
})
export class AppModule {}
