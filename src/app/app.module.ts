import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule, AuthProviders, AuthMethods  } from 'angularfire2';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RestaurantesPage } from '../pages/restaurantes/restaurantes';
import { CartaPage } from '../pages/carta/carta';
import { PedidoPage } from '../pages/pedido/pedido';
import { StartersPage } from '../pages/starters/starters';
import { MeatsPage } from '../pages/meats/meats';
import { FishesPage } from '../pages/fishes/fishes';
import { DessertsPage } from '../pages/desserts/desserts';
import { AbentaharPage } from '../pages/abentahar/abentahar';
import { AtidamaPage } from '../pages/atidama/atidama';
import { GaumetPage } from '../pages/gaumet/gaumet';
import { HPedidoPage } from '../pages/h-pedido/h-pedido';
import { ReservaPage } from '../pages/reserva/reserva';
import { HReservaPage } from '../pages/h-reserva/h-reserva';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export const firebaseConfig = {
  apiKey: "AIzaSyArspIymezxakUAuD3rUmtxhDmMtaVASa4",
  authDomain: "cocapp-d225d.firebaseapp.com",
  databaseURL: "https://cocapp-d225d.firebaseio.com",
  projectId: "cocapp-d225d",
  storageBucket: "cocapp-d225d.appspot.com",
  messagingSenderId: "643309244246"
  };

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RestaurantesPage,
    CartaPage,
    PedidoPage,
    StartersPage,
    MeatsPage,
    FishesPage,
    DessertsPage,
    AbentaharPage,
    AtidamaPage,
    GaumetPage,
    HPedidoPage,
    ReservaPage,
    HReservaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RestaurantesPage,
    CartaPage,
    PedidoPage,
    StartersPage,
    MeatsPage,
    FishesPage,
    DessertsPage,
    AbentaharPage,
    AtidamaPage,
    GaumetPage,
    HPedidoPage,
    ReservaPage,
    HReservaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
