import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AccessProviders {
   //URL DA API JSON
   server: string = 'https://developeranddesigner.com.br/troca-pontos/api/';

   constructor(
    public http: HttpClient
  ) { }

  postData(body, file){
      let headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8'
      });
      let options = {
         headers: headers 
      }

      return this.http.post(this.server + file, JSON.stringify(body), options)
      .timeout(59000) //59 segundos de timeout
      .map(res => res);
  }
}