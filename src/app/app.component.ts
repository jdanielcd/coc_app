import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { RestaurantesPage } from '../pages/restaurantes/restaurantes';
import { CartaPage } from '../pages/carta/carta';
import { PedidoPage } from '../pages/pedido/pedido';
import { StartersPage } from '../pages/starters/starters';
import { MeatsPage } from '../pages/meats/meats';
import { DessertsPage } from '../pages/desserts/desserts';
import { FishesPage } from '../pages/fishes/fishes';
import { AbentaharPage } from '../pages/abentahar/abentahar';
import { AtidamaPage } from '../pages/atidama/atidama';
import { GaumetPage } from '../pages/gaumet/gaumet';
import { HPedidoPage } from '../pages/h-pedido/h-pedido';
import { ReservaPage } from '../pages/reserva/reserva';
import { HReservaPage } from '../pages/h-reserva/h-reserva';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Restaurantes', component: RestaurantesPage },
      { title: 'Carta', component: CartaPage },
      { title: 'Pedido', component: PedidoPage },
      { title: 'Reserva', component: ReservaPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
