import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController,ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

/*
  Generated class for the Starters page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-starters',
  templateUrl: 'starters.html'
})
export class StartersPage {

  starters: FirebaseListObservable<any>;

  constructor(public toastCtrl: ToastController,
              public navCtrl: NavController,
              public alertCtrl: AlertController,
              af: AngularFire,
              public actionSheetCtrl: ActionSheetController) {
	  this.starters = af.database.list('/starters');
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartersPage');
  }

  addStarter(){
  let prompt = this.alertCtrl.create({
    title: 'Añadir entrante',
    message: "Rellene los datos del entrante",
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
        text: 'Añadir entrante',
        handler: data => {
          this.starters.push({
            nombre: data.nombre,
            descripcion: data.descripcion,
            ingredientes: data.ingredientes,
            alergenos: data.alergenos,
            precio: data.precio,
            foto: 'http://res.cloudinary.com/jdanielcd/image/upload/v1491392543/no-image_e1elvx.png'
          });
          let toast = this.toastCtrl.create({
            message: 'Se ha añadido el entrante.',
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


showOptions(starterId, starterTitle, starterDescripcion, starterIngredientes, starterAlergenos, starterPrecio, starterFoto) {
  let actionSheet = this.actionSheetCtrl.create({
    title: '¿Qué desea hacer con el entrante?',
    buttons: [
      {
        text: 'Eliminarlo',
        role: 'destructive',
        handler: () => {
          this.removeStarter(starterId);
        }
      },{
        text: 'Actualizarlo',
        handler: () => {
          this.updateStarter(starterId, starterTitle, starterDescripcion, starterIngredientes,
            starterAlergenos, starterPrecio, starterFoto);
        }
      }
    ]
  });
  actionSheet.present();
}


removeStarter(starterId: string){
  this.starters.remove(starterId);
  let toast = this.toastCtrl.create({
    message: 'Se ha eliminado el entrante.',
    position: 'bottom',
    showCloseButton: true,
    closeButtonText: "x",
    duration: 1500,
    cssClass: "toastStyle"
  });
  toast.present();
}


updateStarter(starterId, starterTitle, starterDescripcion, starterIngredientes,
  starterAlergenos, starterPrecio, starterFoto){
  let prompt = this.alertCtrl.create({
    title: 'Editar entrante',
    message: "Rellene los campos que desea modificar",
    inputs: [
      {
        name: 'nombre',
        placeholder: 'Nombre',
        value: starterTitle
      },{
        name: 'descripcion',
        placeholder: 'Descripcion',
        value: starterDescripcion
      },{
        name: 'ingredientes',
        placeholder: 'Ingredientes',
        value: starterIngredientes
      },{
        name: 'alergenos',
        placeholder: 'Alergenos',
        value: starterAlergenos
      },{
        name: 'precio',
        placeholder: 'Precio',
        value: starterPrecio
      },{
        name: 'foto',
        placeholder: 'Foto',
        value: starterFoto
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
          this.starters.update(starterId, {
            nombre: data.nombre,
            descripcion: data.descripcion,
            ingredientes: data.ingredientes,
            alergenos: data.alergenos,
            precio: data.precio,
            foto: data.foto
          });
          let toast = this.toastCtrl.create({
            message: 'Se ha actualizado el entrante.',
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
