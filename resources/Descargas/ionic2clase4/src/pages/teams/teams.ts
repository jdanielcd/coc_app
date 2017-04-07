import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {TeamDetailPage} from "../team-detail/team-detail";
import {TeamHomePage} from "../team-home/team-home";
import {DbApiService} from "../../shared/db-api.service";
import * as _ from 'lodash';

/*
  Generated class for the Teams page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {

  teams=[];
  selectedTorney:any;
  private allTeams:any;
  private allTeamDivisions: any;
  querytext:string='';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dbApi: DbApiService,
              private loadingController: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    this.selectedTorney= this.navParams.data;
    this.dbApi.getTournamentData(this.selectedTorney.id)
      .subscribe(data => {
        let loader= this.loadingController.create({
          content: "accediendo a los datos"
        });
        loader.present().then(()=>{
          this.allTeams = data.teams;
          this.allTeamDivisions =
            _.chain(data.teams)
              .groupBy('division')
              .toPairs()
              .map(item => _.zipObject(['divisionName','divisionTeams'],item))
              .value();
          console.log('division teams',this.allTeamDivisions);
          loader.dismiss();
          this.teams = this.allTeamDivisions;
        });
      });
  }

  itemTapped(e,team){
    this.navCtrl.push(TeamHomePage,team);
  }

  updateTeams(){
    let queryTextlower = this.querytext.toLowerCase();
    let filteredTeams =[];
    _.forEach(this.allTeamDivisions, td=>{
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextlower));
      if(teams.length){
        filteredTeams.push({divisionName: td.divisionName, divisionTeams: teams});
      }
    });
    this.teams = filteredTeams;
  }

}
