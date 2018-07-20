import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PreviewGifPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var gifshot;
@IonicPage()

@Component({
  selector: 'page-preview-gif',
  templateUrl: 'preview-gif.html',
})
export class PreviewGifPage {
  images= [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    gifshot.createGIF({}, function(obj) {
      if(!obj.error) {
        let imageGif = obj.image,
        animatedImage = document.createElement('img');
        animatedImage.src = imageGif;
        document.body.appendChild(animatedImage);
      }
    });
    // setInterval(function () {
    //   console.log("Helo");
    // },20)
    console.log("support"+ gifshot.isSupported());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviewGifPage');
  }

}
