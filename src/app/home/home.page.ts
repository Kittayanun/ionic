import { DetailPage } from './../detail/detail.page';
import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('myNav') nav: NavController;
  data:string = '';
  contacts = [
    {name: 'A', address: 'Address : Aaaaa aa'},
    {name: 'B', address: 'Address : Bbbbb bb'},
    {name: 'C', address: 'Address : Ccccc cc'}
  ];

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }

  showDetail(contact: any) {
    console.log('alert!!');
    alert(contact.address);
    this.navCtrl.navigateForward('/detail');
    console.log('go to detailpage!!');
  }

  gps() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.data = 'Lat : ' + resp.coords.latitude + ' , ' + 'Log : ' + resp.coords.longitude;
      alert('Location : ' + this.data);
    }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
