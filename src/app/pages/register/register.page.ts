import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nome: string = "";
  sexo: string = "";
  nascimento: string = "";
  email: string = "";
  telefone: string = "";
  senha: string = "";
  confirme_senha: string = "";

  disabledButton;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private navCtrl: NavController
  ) { 


  }


  ngOnInit() {
  }

  voltar(){
    this.navCtrl.pop();
  }

  login(){
    this.router.navigate(['/login']);
  }

  ionViewDidEnter(){
    this.disabledButton = false;
  }

  async registro(){
    if(this.nome == ""){
      this.presentToast('Nome obrigatório!');
    }
    else if(this.sexo == ""){
      this.presentToast('Sexo obrigatório!');
    }
    else if(this.nascimento == ""){
      this.presentToast('Data de nascimento obrigatória!');
    }
    else if(this.email == ""){
      this.presentToast('E-mail obrigatório!');
    }
    else if(this.telefone == ""){
      this.presentToast('Telefone obrigatório!');
    }
    else if(this.senha == ""){
      this.presentToast('Senha obrigatória!');
    }
    else if(this.senha != this.confirme_senha){
      this.presentToast('A senha e confirmação de senha não conferem!');
    }
    else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Salvando...',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'registro',
          nome: this.nome,
          sexo: this.sexo,
          nascimento: this.nascimento,
          email: this.email,
          telefone: this.telefone,
          senha: this.senha
        }

        this.accsPrvds.postData(body, 'api.php').subscribe((res:any)=>{
          if(res.success == true){
            loader.dismiss();
            this.disabledButton = false;
            this.router.navigate(['/login']);
            this.presentToast('Cadastro efetuado com sucesso!'); 
          }
          else{
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
          }
        }, (err)=>{
            loader.dismiss();
            this.disabledButton = false;
            this.router.navigate(['/login']);
            this.presentToast('Cadastro efetuado com sucesso!');
        });

      });
    }
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

}
