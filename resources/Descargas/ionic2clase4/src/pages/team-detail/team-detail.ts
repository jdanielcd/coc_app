import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {MyTeamsPage} from "../my-teams/my-teams";
import * as _ from 'lodash';
import {DbApiService} from "../../shared/db-api.service";
import {TeamHomePage} from "../team-home/team-home";
import {UsersettingsService} from "../../shared/user-settings.service";
/*
  Generated class for the TeamDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html'
})
export class TeamDetailPage {

  team;
  games:any[];
  private tourneyData: any;
  teamStandings:any={};
  isFollowing: boolean =false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dbApi: DbApiService,
              private toastController: ToastController,
              private userSettings: UsersettingsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailPage');
    this.team = this.navParams.data;
    console.log("navparam: ", this.navParams);

    this.tourneyData=this.dbApi.getCurrentTorney();

    this.games = _.chain(this.tourneyData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);
        let opponentName = isTeam1 ? g.team2 : g.team1;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at")
        };
      })
      .value();
      this.teamStandings = _.find(this.tourneyData.standings, {'teamId':this.team.id})
    console.log("partidos: ",this.games);
      this.userSettings.isFavoriteTeam(this.team.id)
        .then(value => this.isFollowing = value);
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      let teamScore = (isTeam1 ? team1Score : team2Score);
      let opponentScore = (isTeam1 ? team2Score : team1Score);
      let winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    else {
      return "";
    }
  }

  goHome(){
    //console.log(this.navCtrl);
    this.navCtrl.parent.parent.popToRoot();
  }

  gameClicked(e,game){
    let opponent = this.tourneyData.teams.find(g => g.name == game.opponent);
    this.navCtrl.parent.parent.push(TeamHomePage,opponent);
    console.log("navCtrl: ",this.navCtrl);
    console.log("Opponent", opponent);
  }

  toggleFollow(){
    this.isFollowing =!this.isFollowing;
    if (this.isFollowing)
      this.userSettings.favoriteTeam(this.team, this.tourneyData.tournament.id, this.tourneyData.tournament.name)
    else
      this.userSettings.unFavoriteTeam(this.team);
    let toast = this.toastController.create({
      message: `  ahora following es ${this.isFollowing}`,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
