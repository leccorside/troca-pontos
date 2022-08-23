import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
})
export class AlterarSenhaPage implements OnInit {

  senha: string = "";
  senha2: string = "";

  public datastorage: any;
  public dadosperfil: any;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private navCtrl: NavController,
    private storage: Storage
  ) { 

    
  }

  ngOnInit() {
  }

  ionViewDidEnter(){

    //this.presentLoading();

    this.storage.get('storage_xxx').then((res)=>{
   
        //console.log(res);
        this.datastorage = res;
    });

  }

  async salvar(){

    if(this.senha != this.senha2){
      this.presentToast('As senhas não conferem!');
    }

    else if(this.senha ==""){
      this.presentToast('Senha não alterada!');
      this.router.navigate(['/alterar-senha']);
    }

    else{

      const loader = await this.loadingCtrl.create({
        message: 'Salvando...',
      });
      loader.present();
  
      return new Promise(resolve => {
        let body = {
          aksi: 'editar_senha',
          id: this.datastorage.id,
          senha: this.senha,
          senha2: this.senha2
        }
  
        this.accsPrvds.postData(body, 'api.php').subscribe((res:any)=>{
          if(res.success == true){
            loader.dismiss();
            //this.router.navigate(['/minha-area']);
            //this.navCtrl.pop();
            this.router.navigate([`/home2/minha-area`]);
            this.presentToast('Senha alterada com sucesso!'); 
          }
          else{
            loader.dismiss();
            this.presentToast(res.msg);
          }
        }, (err)=>{
            loader.dismiss();
            this.router.navigate([`/home2/minha-area`]);
            this.presentToast('Senha alterada com sucesso!');
        });
  
      });

    }

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


async presentLoading() {
  const loading = await this.loadingCtrl.create({
    cssClass: 'my-custom-class',
    message: 'Carregando...',
    duration: 2000
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');
}

}
