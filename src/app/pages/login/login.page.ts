import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  senha: string = "";

  disabledButton;

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

  async login(){

    if(this.email == ""){
      this.presentToast('E-mail obrigatório!');
    }
    else if(this.senha == ""){
      this.presentToast('Senha obrigatório!');
    }
    else{

      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Entrando...',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'login',
          email: this.email,
          senha: this.senha
        }

        this.accsPrvds.postData(body, 'api.php').subscribe((res:any)=>{
          if(res.success == true){
            loader.dismiss();
            this.storage.set('storage_xxx', res.result); //CRIA A SESSÃO
            this.navCtrl.navigateRoot(['/home2']);
            this.presentToast('Bem-Vindo!'); 
          }
          else{
            loader.dismiss();
            this.presentToast(res.msg);
          }
        }, (err)=>{
            loader.dismiss();
            //this.storage.set('storage_xxx', res.result); //CRIA A SESSÃO
            this.navCtrl.navigateRoot(['/home2']);
            this.presentToast('Bem-Vindo!');
        });

      });

    }

  }

  registro(){
    this.router.navigate(['/register']);
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
            this.registro();
          }
        }
      ]
    });

    await alert.present();
  }

  esqueci(){
    this.router.navigate(['/esqueci-senha']);
  }

}
