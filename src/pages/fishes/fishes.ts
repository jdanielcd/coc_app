import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController,ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

/*
  Generated class for the Starters page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-fishes',
  templateUrl: 'fishes.html'
})
export class FishesPage {

  fishes: FirebaseListObservable<any>;

  constructor(public toastCtrl: ToastController,
              public navCtrl: NavController,
              public alertCtrl: AlertController,
              af: AngularFire,
              public actionSheetCtrl: ActionSheetController) {
	  this.fishes = af.database.list('/fishes');
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FishesPage');
  }

  addFish(){
  let prompt = this.alertCtrl.create({
    title: 'Añadir pescado',
    message: "Rellene los datos del pescado",
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
        text: 'Añadir pescado',
        handler: data => {
          this.fishes.push({
            nombre: data.nombre,
            descripcion: data.descripcion,
            ingredientes: data.ingredientes,
            alergenos: data.alergenos,
            precio: data.precio,
            foto: 'http://res.cloudinary.com/jdanielcd/image/upload/v1491392543/no-image_e1elvx.png'
          });
          let toast = this.toastCtrl.create({
            message: 'Se ha añadido el pescado.',
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


showOptions(fishId, fishTitle, fishDescripcion, fishIngredientes, fishAlergenos, fishPrecio, fishFoto) {
  let actionSheet = this.actionSheetCtrl.create({
    title: '¿Qué desea hacer con el pescado?',
    buttons: [
      {
        text: 'Eliminarlo',
        role: 'destructive',
        handler: () => {
          this.removeFish(fishId);
        }
      },{
        text: 'Actualizarlo',
        handler: () => {
          this.updateFish(fishId, fishTitle, fishDescripcion, fishIngredientes,
            fishAlergenos, fishPrecio, fishFoto);
        }
      }
    ]
  });
  actionSheet.present();
}


removeFish(fishId: string){
  this.fishes.remove(fishId);
  let toast = this.toastCtrl.create({
    message: 'Se ha eliminado el pescado.',
    position: 'bottom',
    showCloseButton: true,
    closeButtonText: "x",
    duration: 1500,
    cssClass: "toastStyle"
  });
  toast.present();
}


updateFish(fishId, fishTitle, fishDescripcion, fishIngredientes,
  fishAlergenos, fishPrecio, fishFoto){
  let prompt = this.alertCtrl.create({
    title: 'Editar pescado',
    message: "Rellene los campos que desea modificar",
    inputs: [
      {
        name: 'nombre',
        placeholder: 'Nombre',
        value: fishTitle
      },{
        name: 'descripcion',
        placeholder: 'Descripcion',
        value: fishDescripcion
      },{
        name: 'ingredientes',
        placeholder: 'Ingredientes',
        value: fishIngredientes
      },{
        name: 'alergenos',
        placeholder: 'Alergenos',
        value: fishAlergenos
      },{
        name: 'precio',
        placeholder: 'Precio',
        value: fishPrecio
      },{
        name: 'foto',
        placeholder: 'Foto',
        value: fishFoto
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
          this.fishes.update(fishId, {
            nombre: data.nombre,
            descripcion: data.descripcion,
            ingredientes: data.ingredientes,
            alergenos: data.alergenos,
            precio: data.precio,
            foto: data.foto
          });
          let toast = this.toastCtrl.create({
            message: 'Se ha actualizado el pescado.',
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
