import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';

declare var google; // map

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('myNav') nav: NavController;

  @ViewChild('map') MapElement: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initMap();
    });
  }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  logForm() {
    this.navCtrl.navigateForward('/home');
  }
}
