import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Abentahar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-abentahar',
  templateUrl: 'abentahar.html'
})
export class AbentaharPage {

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AbentaharPage');
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
