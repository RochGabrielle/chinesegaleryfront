import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class TranslationService {

private traduction: any[] = ['world hello!'];

constructor(private httpClient: HttpClient) { }

translate() {
this.httpClient
    .get<any[]>('https://127.0.0.1:8000/api/test')
      .subscribe(
        (response) => {
          this.traduction = response;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
          this.traduction = ['ca ne marche pas!'];
        }
      );
      return this.traduction;
}
  
}