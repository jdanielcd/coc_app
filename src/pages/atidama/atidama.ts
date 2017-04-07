import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Atidama page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-atidama',
  templateUrl: 'atidama.html'
})
export class AtidamaPage {

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtidamaPage');
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
