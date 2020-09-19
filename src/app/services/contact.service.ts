import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  private api: string = "https://api.hsforms.com/submissions/v3/integration/submit/7666765/3cb8a68d-a385-406c-bb30-53bead5cd104";

  postMessage(inputData: any) {

    let formData: any = {
      "fields": [
        {
          "name": "email",
          "value": inputData.email
        },
        {
          "name": "firstname",
          "value": inputData.prenom
        },
        {
          "name": "lastname",
          "value": inputData.nom
        },
        {
          "name": "city",
          "value": inputData.ville
        },
        {
          "name": "company",
          "value": inputData.entreprise
        },
        {
          "name": "message",
          "value": inputData.message
        }
      ] 
    }

    console.log(formData);
    
    return this.http.post(this.api, formData);
  }
}