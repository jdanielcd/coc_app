import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController,
  ActionSheetController,ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

import { AbentaharPage } from '../abentahar/abentahar';
import { AtidamaPage } from '../atidama/atidama';
import { GaumetPage } from '../gaumet/gaumet';

/*
  Generated class for the Restaurantes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-restaurantes',
  templateUrl: 'restaurantes.html'
})
export class RestaurantesPage {

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams) {}

  modalAbentahar() {
    let modal = this.modalCtrl.create(AbentaharPage);
    modal.present(modal);
  }

  modalAtidama() {
    let modal = this.modalCtrl.create(AtidamaPage);
    modal.present(modal);
  }

  modalGaumet() {
    let modal = this.modalCtrl.create(GaumetPage);
    modal.present(modal);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantesPage');
  }



}
