import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Plugins} from '@capacitor/core';
import { ToastController } from '@ionic/angular';

const { Network } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  apiData : any ;
  limit = 10; 

  constructor(private http: HttpClient, public toastController:ToastController) {}
  async openToast(){
    const toast = await this.toastController.create({
      message:'Your settings have been saved.',
      duration:2000,
      animated:true,
      

    });
    toast.present();
    toast.onDidDismiss().then((apiData)=>{
      console.log('toast dismissed');
    });

  }
  getData(event = undefined){
    const URL= "https://picsum.photos/v2/list?limit=" + this.limit;
    this.http.get( URL ).subscribe((data)=>{
      this.apiData = data;
      this.apiData.reverse();
      if(event) event.target.complete();

    console.log('Données récupérees :', data);
    
    });

  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.limit +=2;
    this.getData( event );

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter(){
    this.getData();
    let handler = Network.addListener('networkStatusChange', (status) => {
      if ( !status.connected ) {
        alert("Warning !! This app need a network connection");
      }
      console.log("Network status changed", status);

  });
 }

}
