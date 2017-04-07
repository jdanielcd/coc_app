import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController,
  ActionSheetController,ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

import { HPedidoPage } from '../h-pedido/h-pedido';

/*
  Generated class for the Pedido page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html'
})
export class PedidoPage {

  starters: FirebaseListObservable<any>;
  meats: FirebaseListObservable<any>;
  fishes: FirebaseListObservable<any>;
  desserts: FirebaseListObservable<any>;
  pedidos: FirebaseListObservable<any>;

  constructor(public toastCtrl: ToastController,
              public navCtrl: NavController,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              af: AngularFire,
              public actionSheetCtrl: ActionSheetController,
              public navParams: NavParams) {
                this.starters = af.database.list('/starters');
                this.fishes = af.database.list('/fishes');
                this.meats = af.database.list('/meats');
                this.desserts = af.database.list('/desserts');
                this.pedidos = af.database.list('/pedidos');
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidoPage');
  }

  modalHistoryPedido() {
    let modal = this.modalCtrl.create(HPedidoPage);
    modal.present(modal);
  }

  rPedido(restaurante,entrante,carne,pescado,postre){
    if(restaurante!=null && entrante!=null && carne!=null && pescado!=null && postre!=null){
      this.pedidos.push({
        restaurante: restaurante,
        entrantes: entrante,
        carnes: carne,
        pescados: pescado,
        postres: postre
      });
      let toast = this.toastCtrl.create({
        message: 'Se ha realizado su pedido',
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: "x",
        duration: 2000,
        cssClass: "toastStyleGood"
      });
      toast.present();
    }else{
      let toast = this.toastCtrl.create({
        message: 'Faltan datos por rellenar',
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: "x",
        duration: 2000,
        cssClass: "toastStyle"
      });
      toast.present();
    }

}

}
