import { DetailPage } from './../detail/detail.page';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// google map
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';

declare var google; // map

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('myNav') nav: NavController;
  data: string = ''; // gps

  // map
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  // map: GoogleMap; // google map

  // test data
  contacts = [
    {name: 'A', address: 'Address : Aaaaa aa'},
    {name: 'B', address: 'Address : Bbbbb bb'},
    {name: 'C', address: 'Address : Ccccc cc'}
  ];

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private platform: Platform) {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  // map
  ionViewDidLoad() {
   this.loadMap();
  }

  // after click show alert and redirect to detail page.
  showDetail(contact: any) {
    console.log('alert!!');
    alert(contact.address);
    this.navCtrl.navigateForward('/detail');
    console.log('go to detailpage!!');
  }

  // after click "GPS button" show geolocation value.
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

  // google map
  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {

      const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      }, (err) => {
      console.log(err);
      this.addMarker;
    });

  }
  addMarker() {
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    const content = '<h4>Information!</h4>';
    this.addInfoWindow(marker, content);
  }
  addInfoWindow(marker, content) {
    const infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

}
