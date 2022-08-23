import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private iab: InAppBrowser, private loadingCtrl: LoadingController) {

    

   }

  ngOnInit() {
  }

  async load(){
    const loader = await this.loadingCtrl.create({
      message: 'Entrando...',
    });
    loader.present();
  }

}
