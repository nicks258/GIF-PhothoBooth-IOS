import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CameraPage} from "../camera/camera";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  name;
  email;
  imageLength:number;
  backgroundImages=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.backgroundImages = this.navParams.get("imageData");
    this.imageLength = this.navParams.get("imageLength");
    this.imageLength-=1;
    let env = this;
    setTimeout(function () {
      env.navCtrl.push(CameraPage,{imageData:env.backgroundImages,length:env.imageLength})
    },1000)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
