import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, NavParams, AlertController, ActionSheetController,ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

import { StartersPage } from '../starters/starters';
import { MeatsPage } from '../meats/meats';
import { DessertsPage } from '../desserts/desserts';
import { FishesPage } from '../fishes/fishes';

/*
  Generated class for the Carta page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-carta',
  templateUrl: 'carta.html'
})
export class CartaPage {

  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              af: AngularFire,
              public actionSheetCtrl: ActionSheetController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartaPage');
  }

  goStarters(){
    this.navCtrl.push(StartersPage);
  }

  goFishes(){
    this.navCtrl.push(FishesPage);
  }

  goMeats(){
    this.navCtrl.push(MeatsPage);
  }

  goDesserts(){
    this.navCtrl.push(DessertsPage);
  }

}
