import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import {NativeStorage} from "@ionic-native/native-storage";
import {PreviewPage} from "../preview/preview";
import {Http} from "@angular/http";
import {CameraPage} from "../camera/camera";
import {SecondPage} from "../second/second";

/**
 * Generated class for the ThanksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-thanks',
  templateUrl: 'thanks.html',
})
export class ThanksPage {
  fileName1;
  fileName0;
  fileName3;
  fileName2;
  y:number = 0;
  name;
  email;
  fileSend0;
  fileSend1;
  fileSend2;
  fileSend3;
  baseStrings = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public global:GlobalProvider,public native:NativeStorage,public loadingCtrl:LoadingController , public http:Http) {

    let env = this;
    env.baseStrings =  navParams.get("imageData");
    env.name = navParams.get('name');
    env.email = this.navParams.get('email');
      setTimeout(function () {
        setInterval(function () {
          // console.log("length " + env.baseStrings.length);
          if(env.baseStrings.length>0){
            if(env.y<4){
              env.fileName0 = "data:image/png;base64," + env.baseStrings[env.y];
              env.y++;
            }
            else {
              env.y = 0;
              env.fileName0 = "data:image/png;base64," + env.baseStrings[env.y];
              env.y++;
            }
            console.log("Y number " + env.y);
          }
          else{
            console.log("Its empty")
          }
          },300);

      },200)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThanksPage');
  }

  sendDetailsToServer(){
    let env = this;
    env.fileName0 = env.baseStrings[0];
    env.fileName1 = env.baseStrings[1];
    env.fileName2 = env.baseStrings[2];
    env.fileName3 = env.baseStrings[3];
    let loadingPopup = this.loadingCtrl.create({
      content: "Sending Email ...",
      spinner: 'circles'
    });
    loadingPopup.present();
    let body = new FormData();

    body.append('location', 'NA');
    body.append('name',env.name);
    body.append('mobile',"NA");
    body.append('email',env.email);
    body.append('photo_base_64_1',this.fileName0);
    body.append('photo_base_64_2',this.fileName1);
    body.append('photo_base_64_3',this.fileName2);
    body.append('photo_base_64_4',this.fileName3);
    body.append('clicked_on',new Date().toISOString());
    body.append('user_id',"EXPO2020GIFBOOTH");
    body.append('password',"EXPO2020GIFBOOTH#123");
    let headers = new Headers();
    let options = { headers: headers };
    this.http.post('http://expo2020gifbooth.digitalpico.com/saveclick_rest/', body ).subscribe(data => {
      console.log(data);
           loadingPopup.dismiss();
      // env.navCtrl.push(SecondPage,{animate: true, animation: 'transition', duration: 300, direction: 'forward'})
      // setTimeout(function () {
      //
      // },100);
    },error2 => {
             loadingPopup.dismiss();
      console.log("error->" + error2);
    });
  }

  retake() {
    for (let o = 0; o < 1000; o++) {
      clearInterval(o);
    }
    let env = this;
    setTimeout(function () {
      env.navCtrl.push(CameraPage,{name:env.name,email:env.email},{animate: true, animation: 'transition', duration: 300, direction: 'forward'})
    },100);
  }

  sent(){
    let env = this;
    env.sendDetailsToServer();
    for (let o = 0; o < 1000; o++) {
      clearInterval(o);
    }
    env.navCtrl.push(SecondPage,{animate: true, animation: 'transition', duration: 300, direction: 'forward'})
  }
}
