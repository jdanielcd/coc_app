import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';


/**
 * Created by DAW2 on 21/02/2017.
 */
@Injectable()
export class DbApiService{
  url = 'https://futbolbase-29fd6.firebaseio.com/';
  currentTorney: any={};
  constructor(private http:Http){}

  getTournaments():Observable<any>{
    return this.http.get(this.url+'tournaments.json')
      .map(res=> res.json());
  }

  getTournamentData(torneyId):Observable<any>{
    return this.http.get(this.url+`tournaments-data/${torneyId}.json`)
      .map(resp=>{
         this.currentTorney=resp.json();
         return this.currentTorney;
      })
  }
  getCurrentTorney(){
    return this.currentTorney;
  }
}
