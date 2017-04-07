/**
 * Created by DAW2 on 06/03/2017.
 */

import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {Events} from "ionic-angular";

@Injectable()
export class UsersettingsService{
  constructor(private storage: Storage,
              private events: Events){}

  favoriteTeam(team, tournamentid, tournamentName){
    let item ={
      team: team,
      tournamentId: tournamentid,
      tournamentName: tournamentName
    }
    this.storage.set(team.id.toString(),JSON.stringify(item))
      .then(()=>this.events.publish('favorites:changed'));

  }
  unFavoriteTeam(team){
    this.storage.remove(team.id.toString())
      .then(()=>this.events.publish('favorites:changed'));
  }

  isFavoriteTeam(teamId){
    return this.storage.get(teamId.toString())
      .then(value => value ? true : false)
  }

  getAllFavorites(){
    let item=[];
    this.storage.forEach((value,key,index) =>{
      item.push(JSON.parse(value))
    });
    return item;
  }
}
