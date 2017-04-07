import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TeamDetailPage} from "../team-detail/team-detail";
import {StandingsPage} from "../standings/standings";
import {MyTeamsPage} from "../my-teams/my-teams";

/*
  Generated class for the TeamHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html'
})
export class TeamHomePage {

  teamDetailTab= TeamDetailPage;
  standingsTab = StandingsPage;
  team:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.team=this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  goHome(){
    this.navCtrl.popToRoot();
  }
}
