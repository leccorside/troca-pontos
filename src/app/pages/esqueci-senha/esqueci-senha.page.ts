import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.page.html',
  styleUrls: ['./esqueci-senha.page.scss'],
})
export class EsqueciSenhaPage implements OnInit {

  email: string = "";

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private navCtrl: NavController,
    private accsPrvds: AccessProviders
  ) { }

  ngOnInit() {
  }

  voltar(){
    this.navCtrl.pop();
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top',
      cssClass:'toast-bg'
    });
    toast.present();
  }

  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      cssClass: a,
      header: 'Confirm!',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Fechar',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            //AÇÃO
          }
        }, {
          text: 'Tente novamente',
          handler: () => {
            this.esqueci();
          }
        }
      ]
    });

    await alert.present();
  }


  async esqueci(){
    if(this.email == ""){
      this.presentToast('Preencha o e-mail!');
    }
    else{
      const loader = await this.loadingCtrl.create({
        message: 'Aguarde...',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'recupera_senha',
          email: this.email
        }

        this.accsPrvds.postData(body, 'api.php').subscribe((res:any)=>{
          if(res.success == true){
            loader.dismiss();
            this.navCtrl.navigateRoot(['/login']);
            this.presentToast('Uma senha provisória foi enviada para seu e-mail.'); 
          }
          else{
            loader.dismiss();
            this.presentToast(res.msg);
          }
        }, (err)=>{
            loader.dismiss();
            this.navCtrl.navigateRoot(['/login']);
            this.presentToast('Uma senha provisória foi enviada para seu e-mail.');
        });

      });
    }
  }



}
