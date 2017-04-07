import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {TournamentsPage} from "../tournaments/tournaments";
import {TeamHomePage} from "../team-home/team-home";
import {DbApiService} from "../../shared/db-api.service";
import {UsersettingsService} from "../../shared/user-settings.service";

/*
  Generated class for the MyTeams page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {
  favorites =  [ ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingController: LoadingController,
              private dbApi: DbApiService,
              private userSettings: UsersettingsService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  ionViewDidEnter(){
    this.favorites = this.userSettings.getAllFavorites();
  }

  goToTournaments(){
    this.navCtrl.push(TournamentsPage);
  }

  favoriteTapped($event,item){
    let loader = this.loadingController.create({
      content: 'Accediendo a los datos. .',
      dismissOnPageChange: true
    });
    loader.present();
    this.dbApi.getTournamentData(item.tournamentId)
      .subscribe(t => this.navCtrl.push(TeamHomePage,item.team));
  }


}
