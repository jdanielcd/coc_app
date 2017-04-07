import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Gaumet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gaumet',
  templateUrl: 'gaumet.html'
})
export class GaumetPage {

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaumetPage');
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
