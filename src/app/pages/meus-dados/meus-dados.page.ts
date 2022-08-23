import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
})
export class MeusDadosPage implements OnInit {

  id2: number;
  id: number = 12;
  nome2: string = "";
  nome3: string = "";

  nome: string = "";
  sexo: string = "";
  nascimento: string = "";
  email: string = "";
  telefone: string = "";

  public datastorage: any;
  public dadosperfil: any;
  

  public users: any = [];

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

  async doRefresh(event){
    const loader = await this.loadingCtrl.create({
      message: 'Carregando...',
    });
    loader.present();

    this.ionViewDidEnter();
    event.target.complete();

    loader.dismiss();
  }

  ionViewDidEnter(){

    this.presentLoading();

    this.storage.get('storage_xxx').then((res)=>{
   
        //console.log(res);
        this.datastorage = res;
        this.id2 = this.datastorage.id;
        this.nome3 = this.datastorage.nome;
        console.log(this.datastorage.id);
        this.users = [];
        this.loadUsers();

    });

  }

  loadData(){
    setTimeout(()=>{
      this.loadUsers().then(()=>{
        //event.target.complete();
      });
    }, 500);
  }

  async loadUsers(){

      return new Promise(resolve => {
        let body = {
          aksi: 'profile2',
          id: this.datastorage.id
        }

        this.accsPrvds.postData(body, 'api.php').subscribe((data:any)=>{

          this.dadosperfil = data;
          this.users = data.result;
          this.nome = data.result[0].nome;
          this.sexo = data.result[0].sexo;
          this.nascimento = data.result[0].nascimento;
          this.email = data.result[0].email;
          this.telefone = data.result[0].telefone;

          console.log(this.nome);

          resolve(true);
        });

      });
  }

  async salvar(){

      const loader = await this.loadingCtrl.create({
        message: 'Salvando...',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'editar_dados',
          id: this.datastorage.id,
          nome: this.nome,
          sexo: this.sexo,
          nascimento: this.nascimento,
          email: this.email,
          telefone: this.telefone
        }

        this.accsPrvds.postData(body, 'api.php').subscribe((res:any)=>{
          if(res.success == true){
            loader.dismiss();
            this.router.navigate([`/home2/minha-area`]);
            //this.navCtrl.navigateRoot(['/home2/minha-area']);
            this.presentToast('Dados salvos com sucesso!'); 
          }
          else{
            loader.dismiss();
            this.presentToast(res.msg);
          }
        }, (err)=>{
            loader.dismiss();
            this.router.navigate([`/home2/minha-area`]);
            this.presentToast('Dados salvos com sucesso!');
        });

      });
    
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
            this.salvar();
          }
        }
      ]
    });

    await alert.present();
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
