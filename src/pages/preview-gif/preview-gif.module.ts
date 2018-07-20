import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviewGifPage } from './preview-gif';

@NgModule({
  declarations: [
    PreviewGifPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviewGifPage),
  ],
})
export class PreviewGifPageModule {}
