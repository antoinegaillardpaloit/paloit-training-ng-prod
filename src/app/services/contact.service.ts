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
      ],
      "legalConsentOptions": {
        "consent": {
          "consentToProcess": true,
          "text": "J'autorise l’entreprise PALO IT à stocker et traiter mes données personnelles soumises afin qu’elle me fournisse le contenu demandé.",
          "communications": [
            {
              "value": inputData.consent,
              "subscriptionTypeId": 999,
              "text": "J'accepte de recevoir d'autres communications de PALO IT."
            }
          ]
        }
      }
    }

    return this.http.post(this.api, formData);
  }
}