import { BluetoothPage } from './../bluetooth/bluetooth';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { BlocklyPage } from '../blockly/blockly';
import { SharePage } from '../share/share';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = BluetoothPage;
  tab4Root = BlocklyPage;
  tab5Root = SharePage;
  tab6Root = SettingsPage;

  constructor() {}
}
