import { BluetoothPage } from './../bluetooth/bluetooth';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { BlocklyPage } from '../blockly/blockly';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = BluetoothPage;
  tab4Root = BlocklyPage;
  constructor() {

  }
}
