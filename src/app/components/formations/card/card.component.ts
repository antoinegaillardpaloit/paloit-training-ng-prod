import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() cardFormation: any;

  apiUrl: string = environment.apiUrl;

  formateursNames: string;
  formateurPhotoUrl: string;
  domainesIntitules: string;
  prochainesSessions: string[] = [];
  lieu: string;

  constructor() { }

  ngOnInit(): void {
    this.formateursNames = this.formatEnumeration(this.cardFormation.formateurs, "nom", "et");
    this.domainesIntitules = this.formatEnumeration(this.cardFormation.domaines, "intitule", "-");
    this.prochainesSessions = this.formatDates(this.cardFormation.prochainessessions);
    this.lieu = this.cardFormation.infospratiques.find(el => el.soustitre === "Lieu").info;
    this.formateurPhotoUrl = this.apiUrl + this.cardFormation.formateurs[0].photo.formats.thumbnail.url;
  }

  private formatEnumeration(inputArray: any[], wantedProperty: string, separator: string): string {
    const propertyArray: string[] = inputArray.map(el => el[wantedProperty]);
    const propertyString: string = propertyArray.join(` ${separator} `);
    return propertyString;
  }

  private formatDates(inputArray: any[]) {
    const datesArray = inputArray.map(el => new Date(el.datedebut));
    const sortedArray = datesArray.sort((a, b) => a.getTime() - b.getTime());
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return sortedArray.map(el => el.toLocaleDateString("fr-FR", options));
  }

}