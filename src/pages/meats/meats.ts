import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController,ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

/*
  Generated class for the Meats page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-meats',
  templateUrl: 'meats.html'
})
export class MeatsPage {

  meats: FirebaseListObservable<any>;

  constructor(public toastCtrl: ToastController,
              public navCtrl: NavController,
              public alertCtrl: AlertController,
              af: AngularFire,
              public actionSheetCtrl: ActionSheetController) {
	  this.meats = af.database.list('/meats');
	}


  ionViewDidLoad() {
    console.log('ionViewDidLoad MeatsPage');
  }

  addMeat(){
  let prompt = this.alertCtrl.create({
    title: 'Añadir carne',
    message: "Rellene los datos de la carne",
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
        text: 'Añadir carne',
        handler: data => {
          this.meats.push({
            nombre: data.nombre,
            descripcion: data.descripcion,
            ingredientes: data.ingredientes,
            alergenos: data.alergenos,
            precio: data.precio,
            foto: 'http://res.cloudinary.com/jdanielcd/image/upload/v1491392543/no-image_e1elvx.png'
          });
          let toast = this.toastCtrl.create({
            message: 'Se ha añadido la carne.',
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


showOptions(meatId, meatTitle, meatDescripcion, meatIngredientes, meatAlergenos, meatPrecio, meatFoto) {
  let actionSheet = this.actionSheetCtrl.create({
    title: '¿Qué desea hacer con la carne?',
    buttons: [
      {
        text: 'Eliminarla',
        role: 'destructive',
        handler: () => {
          this.removeMeat(meatId);
        }
      },{
        text: 'Actualizarla',
        handler: () => {
          this.updateMeat(meatId, meatTitle, meatDescripcion, meatIngredientes,
            meatAlergenos, meatPrecio, meatFoto);
        }
      }
    ]
  });
  actionSheet.present();
}


removeMeat(meatId: string){
  this.meats.remove(meatId);
  let toast = this.toastCtrl.create({
    message: 'Se ha eliminado la carne.',
    position: 'bottom',
    showCloseButton: true,
    closeButtonText: "x",
    duration: 1500,
    cssClass: "toastStyle"
  });
  toast.present();
}


updateMeat(meatId, meatTitle, meatDescripcion, meatIngredientes,
  meatAlergenos, meatPrecio, meatFoto){
  let prompt = this.alertCtrl.create({
    title: 'Editar carne',
    message: "Rellene los campos que desea modificar",
    inputs: [
      {
        name: 'nombre',
        placeholder: 'Nombre',
        value: meatTitle
      },{
        name: 'descripcion',
        placeholder: 'Descripcion',
        value: meatDescripcion
      },{
        name: 'ingredientes',
        placeholder: 'Ingredientes',
        value: meatIngredientes
      },{
        name: 'alergenos',
        placeholder: 'Alergenos',
        value: meatAlergenos
      },{
        name: 'precio',
        placeholder: 'Precio',
        value: meatPrecio
      },{
        name: 'foto',
        placeholder: 'Foto',
        value: meatFoto
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
          this.meats.update(meatId, {
            nombre: data.nombre,
            descripcion: data.descripcion,
            ingredientes: data.ingredientes,
            alergenos: data.alergenos,
            precio: data.precio,
            foto: data.foto
          });
          let toast = this.toastCtrl.create({
            message: 'Se ha actualizado la carne.',
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
