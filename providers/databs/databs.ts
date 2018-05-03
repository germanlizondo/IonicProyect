import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabsProvider {
  private db: SQLiteObject;
  private isOpen : boolean;
  constructor(
    public http: Http,
    public storage: SQLite
  ) {
    if(!this.isOpen){
      this.storage = new SQLite();
      this.storage.create({name: "data.db",location:"default"}).then((db:SQLiteObject)=>{
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS tareas(id INTEGER PRIMARY KEY AUTOINCREMENT, identification TEXT,nom TEXT, descripcio TEXT)",[]);
        this.isOpen = true;
      }).catch((error)=>{
     console.log(error);
     })
    }
  }

  CreaTarea(identification: string, nom: string, descripcio:string){
    return new Promise ((resolve,reject) =>{
      let sql = "INSERT INTO tareas (identification, nom, descripcio) VALUES (?,?,?)";
      this.db.executeSql(sql, [identification, nom, descripcio]).then((data)=>{
        resolve(data);
      },(error)=>{
        reject(error);
      });
    });
  }

  GetTareas(){
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM tareas",[]).then((data)=>{
        let arrayTareas = [];
        if(data.rows.length > 0){
          for ( var i = 0; i <data.rows.length; i++){
            arrayTareas.push({
              id:data.rows.item(i).id,
              identification: data.rows.item(i).identification,
              nom: data.rows.item(i).nom,
              descripcio: data.rows.item(i).descripcio
            });
          }
        }
        resolve(arrayTareas);
      },(error) => {
        reject(error);
      })
    });
  }

}
