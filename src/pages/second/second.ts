import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {NativeStorage} from "@ionic-native/native-storage";
import {OptionPage} from "../option/option";
import {CameraPage} from "../camera/camera";

/**
 * Generated class for the SecondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-second',
  templateUrl: 'second.html',
})
export class SecondPage {
  name;
  email;
  number;
  min = 5;
  max = 35;
  imageData =[];
  length:number = 4;
  backgroundImages=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public native:NativeStorage) {
    this.generateRandomImage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecondPage');
  }


  enter() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.name == null || this.email == null) {
      alert("Enter Name/Email")
    }
    else {
      if (!re.test(this.email)) {
        // Invalid Email
        alert("Email is not Valid");
      }
      else {
        // this.native.setItem("name", this.name).then(value => {
        //   console.log("saved->" + value);
        // }, (error) => console.error('Error storing item', error));
        // this.native.setItem("email", this.email);
        console.log("name->" + this.name + " -> " + this.email);
        let env = this;
        // this.native.setItem("backgroundImages",JSON.stringify(this.backgroundImages));
        this.native.setItem("backgroundImages", JSON.stringify(this.backgroundImages));
        this.navCtrl.push(CameraPage, {
          imageData: env.imageData,
          length: env.length,
          name: env.name,
          email: env.email
        }, {animate: true, animation: 'transition', duration: 300, direction: 'forward'});
      }
    }
  }



  generateRandomImage() {
    for(let i=0;i<4;i++) {
      this.number = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
      this.backgroundImages.push(this.number);
    }
  }
  options(){
    this.navCtrl.push(OptionPage);
  }
}
