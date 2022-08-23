import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from '@ionic/storage';
import { IonSlides } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.page.html',
  styleUrls: ['./extrato.page.scss'],
})
export class ExtratoPage implements OnInit {

  historico:string;

  public datastorage: any;
  nome: string;
  id: number;
  total: number;
  totalExpirados: number;

  public pontos: any = [];
  public pontos2: any = [];
  public pontos3: any = [];
  public pontosSomados: any = [];
  public pontosExpirados: any = [];
  public users: any = [];
  limit: number = 23;
  start: number = 0;

  arr = [];

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

  ngOnInit() {
  }

   async ionViewDidEnter(){

    const loader = await this.loadingCtrl.create({
      message: 'Carregando...',
    });
    loader.present();

    this.historico = "todos";

    this.storage.get('storage_xxx').then((res)=>{
        this.datastorage = res;
        this.nome = this.datastorage.nome;
        this.id = this.datastorage.id;

        this.start = 0;
        this.pontos = [];
        this.pontos2 = [];
        this.pontos3 = [];
        this.pontosSomados = [];
        this.pontosExpirados = [];
        this.users = [];
        this.loadPontos();
        this.loadPontos2();
        this.loadPontos3();
        this.loadPontosSomados();
        this.loadPontosExpirados();

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
      this.loadPontos().then(()=>{
        //event.target.complete();
      });
    }, 500);
  }

  async loadPontos(){

    return new Promise(resolve => {
      let body = {
        aksi: 'load_Pontos',
        start: this.start,
        limit: this.limit,
        id: this.datastorage.id
      }

      console.log(this.datastorage.id);

      this.accsPrvds.postData(body, 'api.php').subscribe((res:any)=>{
        for(let datas of res.result){ 
          this.pontos.push(datas);
        }
        resolve(true);
      });

    });
  }

  async loadPontos2(){

    return new Promise(resolve => {
      let body = {
        aksi: 'load_Pontos2',
        start: this.start,
        limit: this.limit,
        id: this.datastorage.id
      }

      console.log(this.datastorage.id);

      this.accsPrvds.postData(body, 'api.php').subscribe((res:any)=>{
        for(let datas of res.result){ 
          this.pontos2.push(datas);
        }
        resolve(true);
      });

    });
  }

  async loadPontos3(){

    return new Promise(resolve => {
      let body = {
        aksi: 'load_Pontos_geral',
        start: this.start,
        limit: this.limit,
        id: this.datastorage.id
      }

      console.log(this.datastorage.id);

      this.accsPrvds.postData(body, 'api.php').subscribe((res:any)=>{
        for(let datas of res.result){ 
          this.pontos3.push(datas);
        }
        resolve(true);
      });

    });
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

  async loadPontosExpirados(){

    return new Promise(resolve => {
      let body = {
        aksi: 'load_Pontos_expirados',
        id: this.datastorage.id
      }

      this.accsPrvds.postData(body, 'api.php').subscribe((res:any)=>{
        for(let datas of res.result){ 
          this.pontosExpirados.push(datas);
        }
        resolve(true);
      });

      console.log(this.pontosExpirados);

    });
  }

}
