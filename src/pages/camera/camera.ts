import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";
import {CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions} from "@ionic-native/camera-preview";
import {HomePage} from "../home/home";
import {ThanksPage} from "../thanks/thanks";
import {GlobalProvider} from "../../providers/global/global";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {LoginPage} from "../login/login";
// import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  backgroundImages = [];
  backgroundImagesLength;
  handle;
  base64ImageData = [];
  imageLength = 0;
  // cameraCounter = 4;
  cameraPreviewOpts: CameraPreviewOptions = {
    x: 140,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'front',
    tapPhoto: false,
    previewDrag: false,
    toBack: true,
    alpha: 1,
  };
  pictureOpts: CameraPreviewPictureOptions = {
    width: 2080,
    height: 1280,
    quality: 85
  };

  private picture;

  constructor(public navCtrl: NavController, public navParams: NavParams, public native: NativeStorage, public cameraPreview: CameraPreview, public global: GlobalProvider) {
    this.base64ImageData = this.navParams.get("imageData");
    this.imageLength = this.navParams.get("length");
    this.backgroundImagesLength = 0;
    let env = this;
    env.cameraPreview.startCamera(env.cameraPreviewOpts).then(
      (res) => {

      }, (err) => {
        console.log("Error " + err);
      });
    setInterval(function () {
      env.takeImage();
    }, 1000)


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  takeImage() {
    let env = this;
    if (env.backgroundImagesLength < 4) {
      env.cameraPreview.takePicture(env.pictureOpts).then((imageData) => {
        // alert(imageData);
        env.base64ImageData.push(imageData);
        console.log("length->> ");
      }, (err) => {
        alert(err);
      });
      env.backgroundImagesLength = env.backgroundImagesLength + 1;
    }
    else {
      console.log("Clear");
      for (let o = 0; o < 1000; o++) {
        clearInterval(o);
      }
      env.cameraPreview.stopCamera();
      env.navCtrl.push(ThanksPage, {imageData: env.base64ImageData, imageLength: env.imageLength}, {
        animate: true,
        animation: 'transition',
        duration: 300,
        direction: 'forward'
      });
    }

  }
}



