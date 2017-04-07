import { Component, ViewChild } from '@angular/core';
import { App, NavController, NavParams, AlertController, ModalController,
  ActionSheetController,ToastController, ViewController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

import { HReservaPage } from '../h-reserva/h-reserva';
import { HomePage } from '../home/home';

/*
  Generated class for the Pedido page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html'
})
export class ReservaPage {

  reservas: FirebaseListObservable<any>;

  constructor(public toastCtrl: ToastController,
              public navCtrl: NavController,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public appCtrl: App,
              af: AngularFire,
              public actionSheetCtrl: ActionSheetController,
              public navParams: NavParams) {
                this.reservas = af.database.list('/reservas');
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidoPage');
  }

  modalHistoryReserva() {
    let modal = this.modalCtrl.create(HReservaPage);
    modal.present(modal);
  }

  rReserva(restaurante,fechaReserva,horaReserva,comensales){
    if(restaurante!=null && fechaReserva!=null && horaReserva!=null){
      this.reservas.push({
        restaurante: restaurante,
        fecha: fechaReserva,
        hora: horaReserva,
        comensal: comensales
      });
      let toast = this.toastCtrl.create({
        message: 'Se ha realizado su reserva',
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
