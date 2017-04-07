import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController,ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

/*
  Generated class for the Desserts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-desserts',
  templateUrl: 'desserts.html'
})
export class DessertsPage {

  desserts: FirebaseListObservable<any>;

  constructor(public toastCtrl: ToastController,
              public navCtrl: NavController,
              public alertCtrl: AlertController,
              af: AngularFire,
              public actionSheetCtrl: ActionSheetController) {
	  this.desserts = af.database.list('/desserts');
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DessertsPage');
  }

  addDessert(){
  let prompt = this.alertCtrl.create({
    title: 'Añadir postre',
    message: "Rellene los datos del postre",
    inputs: [
      {
        name: 'nombre',
        placeholder: 'Nombre'
      },{
        name: 'descripcion',
        placeholder: 'Descripción'
      },{
        name: 'ingredientes',
        placeholder: 'Ingredientes'
      },{
        name: 'alergenos',
        placeholder: 'Alérgenos'
      },{
        name: 'precio',
        placeholder: 'Precio'
      },{
        name: 'foto',
        placeholder: 'Foto'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Añadir postre',
        handler: data => {
          this.desserts.push({
            nombre: data.nombre,
            descripcion: data.descripcion,
            ingredientes: data.ingredientes,
            alergenos: data.alergenos,
            precio: data.precio,
            foto: 'http://res.cloudinary.com/jdanielcd/image/upload/v1491392543/no-image_e1elvx.png'
          });
          let toast = this.toastCtrl.create({
            message: 'Se ha añadido el postre.',
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: "x",
            duration: 1500,
            cssClass: "toastStyleGood"
          });
          toast.present();
        }
      }
    ]
  });
  prompt.present();
}


showOptions(dessertId, dessertTitle, dessertDescripcion, dessertIngredientes, dessertAlergenos, dessertPrecio, dessertFoto) {
  let actionSheet = this.actionSheetCtrl.create({
    title: '¿Qué desea hacer con el postre?',
    buttons: [
      {
        text: 'Eliminarlo',
        role: 'destructive',
        handler: () => {
          this.removeDessert(dessertId);
        }
      },{
        text: 'Actualizarlo',
        handler: () => {
          this.updateDessert(dessertId, dessertTitle, dessertDescripcion, dessertIngredientes,
            dessertAlergenos, dessertPrecio, dessertFoto);
        }
      }
    ]
  });
  actionSheet.present();
}


removeDessert(dessertId: string){
  this.desserts.remove(dessertId);
  let toast = this.toastCtrl.create({
    message: 'Se ha eliminado el postre.',
    position: 'bottom',
    showCloseButton: true,
    closeButtonText: "x",
    duration: 1500,
    cssClass: "toastStyle"
  });
  toast.present();
}


updateDessert(dessertId, dessertTitle, dessertDescripcion, dessertIngredientes,
  dessertAlergenos, dessertPrecio, dessertFoto){
  let prompt = this.alertCtrl.create({
    title: 'Editar postre',
    message: "Rellene los campos que desea modificar",
    inputs: [
      {
        name: 'nombre',
        placeholder: 'Nombre',
        value: dessertTitle
      },{
        name: 'descripcion',
        placeholder: 'Descripcion',
        value: dessertDescripcion
      },{
        name: 'ingredientes',
        placeholder: 'Ingredientes',
        value: dessertIngredientes
      },{
        name: 'alergenos',
        placeholder: 'Alergenos',
        value: dessertAlergenos
      },{
        name: 'precio',
        placeholder: 'Precio',
        value: dessertPrecio
      },{
        name: 'foto',
        placeholder: 'Foto',
        value: dessertFoto
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Actualizar',
        handler: data => {
          this.desserts.update(dessertId, {
            nombre: data.nombre,
            descripcion: data.descripcion,
            ingredientes: data.ingredientes,
            alergenos: data.alergenos,
            precio: data.precio,
            foto: data.foto
          });
          let toast = this.toastCtrl.create({
            message: 'Se ha actualizado el postre.',
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: "x",
            duration: 1500,
            cssClass: "toastStyleGood"
          });
          toast.present();
        }
      }
    ]
  });
  prompt.present();
}

}
