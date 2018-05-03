import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DatabsProvider} from '../../providers/databs/databs';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  private todo : FormGroup;
  private ListTareas : any;
  image: string = null;
  constructor(public navCtrl: NavController,private database : DatabsProvider,private camera: Camera,private formBuilder: FormBuilder ) {
    this.todo = this.formBuilder.group({
      nom: ['', Validators.required],
      descripcio: [''],
    });
  }
  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture( options )
      .then(imageData => {
        this.image = `data:image/jpeg;base64,${imageData}`;
      })
      .catch(error =>{
        console.error( error );
      });
  }
    CreateTareas(){
    console.log(this.todo.value);
      this.database.CreaTarea(this.image,this.todo.value.nom, this.todo.value.descripcio).then((data)=>{
        this.GetAllTareas();
        console.log(data);
      },(error) =>{
        console.log(error);
      })
    }
  GetAllTareas(){
    this.database.GetTareas().then((data:any)=>{
      console.log(data);
      this.ListTareas = data;
    },(error)=>{
      console.log(error);
    })
  }




}
