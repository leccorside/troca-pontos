import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from '@ionic/storage';
import { IonSlides } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public datastorage: any;
  nome: string;
  id: number;
  total: number;
  totalExpirados: number;

  users: any = [];
  limit: number = 23;
  start: number = 0;

  public pontosSomados: any = [];

  slideOpts = {
    slidesPerView: 1,
    initialSlide: 0,
    speed: 400,
    slideShadows: true,
    autoplay: true,
    loop: true
  };

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private navCtrl: NavController,
    private accsPrvds: AccessProviders,
    private iab: InAppBrowser
  ) {

   }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  ngOnInit() {
  }

  async ionViewDidEnter(){

    const loader = await this.loadingCtrl.create({
      message: 'Carregando...',
    });
    loader.present();

    this.storage.get('storage_xxx').then((res)=>{

        console.log(res);
        this.datastorage = res;
        this.nome = this.datastorage.nome;

        this.start = 0;
        this.users = [];
        this.pontosSomados = [];
        this.loadUsers();
        this.loadPontosSomados();
     
    });

    loader.dismiss();
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

  loadData(){
    this.start += this.limit;
    setTimeout(()=>{
      this.loadUsers().then(()=>{
        //event.target.complete();
      });
    }, 500);
  }

  async loadUsers(){

      return new Promise(resolve => {
        let body = {
          aksi: 'load_Users',
          start: this.start,
          limit: this.limit
        }

        this.accsPrvds.postData(body, 'api.php').subscribe((res:any)=>{
          for(let datas of res.result){ 
            this.users.push(datas);
          }
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

  parceiros(){
    this.router.navigate(['/parceiros']);
  }

  extrato(){
    this.router.navigate(['/extrato']);
  }

  produtos(){
    this.router.navigate(['/produtos']);
  }

  faleConosco(){
    this.router.navigate(['/fale-conosco']);
  }

  async loadPontosSomados(){

    return new Promise(resolve => {
      let body = {
        aksi: 'load_Pontos_somado',
        id: this.datastorage.id
      }

      this.accsPrvds.postData(body, 'api.php').subscribe((res:any)=>{
        for(let datas of res.result){ 
          this.pontosSomados.push(datas);
        }
        resolve(true);
      });

      console.log(this.pontosSomados);

    });
  }

}
