import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DatabsProvider} from '../../providers/databs/databs';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private ListTareas : any;
  image: string = null;
  searchQuery: string = '';
  items: any;
  constructor(public navCtrl: NavController,private database : DatabsProvider) {

    this.initializeItems();
  }
  initializeItems() {
    this.GetAllTareas();
    this.items = this.ListTareas;
  }
  GetAllTareas(){
    this.database.GetTareas().then((data:any)=>{
      console.log(data);
      this.ListTareas = data;
    },(error)=>{
      console.log(error);
    })
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}



