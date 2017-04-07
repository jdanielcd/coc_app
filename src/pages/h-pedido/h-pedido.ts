import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, ActionSheetController,ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

/*
  Generated class for the HPedido page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-h-pedido',
  templateUrl: 'h-pedido.html'
})
export class HPedidoPage {

  pedidos: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              af: AngularFire,
              public navParams: NavParams) {
                this.pedidos = af.database.list('/pedidos');
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HPedidoPage');
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
