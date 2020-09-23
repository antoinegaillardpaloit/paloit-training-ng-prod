import { Component, OnInit, Input } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Formation } from 'src/app/models/formation.model';
import { Lieu } from 'src/app/models/lieu.model';
import { Formateur } from 'src/app/models/formateur.model';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  apiUrl: string = environment.apiUrl;
  avatarUrl: string = environment.avatarUrl;

  @Input() cardFormation: Formation;
  formateursNames: string;
  formateurPrincipal: Formateur
  formateurPhotoUrl: string;
  domainesIntitules: string;
  prochainesDates: string[][] = [];
  lieu: Lieu;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {

    this.formateursNames = this.sharedService.formatEnumeration(this.cardFormation.formateurs, "nom", "et");
    this.formateurPrincipal = this.cardFormation.formateurs[0];
    
    if(this.formateurPrincipal.photo) {
      this.formateurPhotoUrl = this.apiUrl + this.formateurPrincipal.photo.url;
    } else {
      this.formateurPhotoUrl = this.apiUrl + this.avatarUrl;
    }    

    this.domainesIntitules = this.sharedService.formatEnumeration(this.cardFormation.domaines, "intitule", "·");
    this.prochainesDates = this.sharedService.formatDates(this.cardFormation.prochainessessions);
    this.lieu = this.cardFormation.lieus;
  }
}