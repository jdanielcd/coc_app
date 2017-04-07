import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {TeamsPage} from "../teams/teams";
import {DbApiService} from "../../shared/db-api.service";

/*
  Generated class for the Tournaments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html'
})
export class TournamentsPage {
  tournaments: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dbApi:DbApiService,
              private  loadingController: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TournamentsPage');

    let loader= this.loadingController.create({
      content: 'accediendo a los datos ...'
    })
    loader.present().then(()=>{
      this.dbApi.getTournaments().subscribe( res => {
        this.tournaments=res;
        loader.dismiss();
      });
    })
  }

  itemTapped(e,torney){
    this.navCtrl.push(TeamsPage,torney);
  }
}
