import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, LoadingController, Events} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


import {MyTeamsPage} from "../pages/my-teams/my-teams";
import {TournamentsPage} from "../pages/tournaments/tournaments";
import {UsersettingsService} from "../shared/user-settings.service";
import {DbApiService} from "../shared/db-api.service";
import {TeamHomePage} from "../pages/team-home/team-home";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];

  rootPage: any = MyTeamsPage;

  constructor(public platform: Platform,
              public userSettings: UsersettingsService,
              public dbApi: DbApiService,
              public loadingController: LoadingController,
              public events: Events) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.refreshFavorites();
    this.events.subscribe('favorites:changed', () => this.refreshFavorites());
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToTournaments(){
    this.nav.push(TournamentsPage);
  }

  goHome(){
    this.nav.setRoot(MyTeamsPage);
  }

  refreshFavorites(){
    this.favoriteTeams = this.userSettings.getAllFavorites();
  }
  goToTeam(e,fav){
      let loader = this.loadingController.create({
        content: 'Accediendo a los datos. .',
        dismissOnPageChange: true
      });
      loader.present();
      this.dbApi.getTournamentData(fav.tournamentId)
        .subscribe(t => this.nav.push(TeamHomePage,fav.team));
  }
}
