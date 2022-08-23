import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-minha-area',
  templateUrl: './minha-area.page.html',
  styleUrls: ['./minha-area.page.scss'],
})
export class MinhaAreaPage implements OnInit {

  nome: string = "";
  email: string = "";
  inicial: string = "";

  public datastorage: any;
  public dadosperfil: any;

  public users: any = [];

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private navCtrl: NavController,
    private accsPrvds: AccessProviders
  ) {
    

   }

  ngOnInit() {
  }

  

  ionViewDidEnter(){

    this.storage.get('storage_xxx').then((res)=>{
      //console.log(res);
      this.datastorage = res;
      console.log(this.datastorage.id);
      this.users = [];
      this.loadUsers();

      //ATUALIZA A LISTA AO DELETAR
      let index = this.users.indexOf(this.nome);

      if(index > -1){
        this.users.splice(index, 1);
      }

    });


    const str = this.nome;
    //text = text.charAt(0).toUpperCase() + text.slice(1);

    //console.log(str.substr(0, 1));

    console.log(this.nome);

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
        this.email = data.result[0].email;
        this.inicial = data.result[0].nome.substr(0, 1);

        console.log(this.nome);

        resolve(true);
      });

    });
}

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      message: 'Tem certeza que quer sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sair',
          handler: () => {
            this.sair();
          }
        }
      ]
    });

    await alert.present();
  }

  async sair(){
    this.storage.clear();
    this.navCtrl.navigateRoot(['/login']);
  }

  meusdados(){
    this.router.navigate(['/meus-dados']);
  }

  alterarsenha(){
    this.router.navigate(['/alterar-senha']);
  }

  extrato(){
    this.router.navigate([`/home2/extrato`]);
  }

  regulamento(){
    this.router.navigate(['/regulamento']);
  }

}
