import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from "apollo-angular";
import CARD_QUERY from "src/app/apollo/queries/formation/card";
import { Subscription } from "rxjs";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  @Input() id: string;

  data: any = {};
  loading = true;
  errors: any;

  formateursNames: string;
  formateurPhotoUrl: string;
  domainesIntitules: string;
  prochainesSessions: string[] = [];
  lieu: string;

  private queryCard: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.queryCard = this.apollo.watchQuery({
      query: CARD_QUERY,
      variables: {
        id: this.id
      }
    }).valueChanges.subscribe(result => {
      this.data = result.data;
      this.loading = result.loading;
      this.errors = result.errors;
      this.formateursNames = this.formatEnumeration(this.data.formation?.formateurs, "nom", "et");
      this.domainesIntitules = this.formatEnumeration(this.data.formation?.domaines, "intitule", "-");
      this.prochainesSessions = this.formatDates(this.data.formation?.prochainessessions);
      this.lieu = this.data.formation?.infospratiques.find(el => el.soustitre === "Lieu").info;
      this.formateurPhotoUrl = this.apiUrl + this.data.formation?.formateurs[0].photo.formats.thumbnail.url;
    });
  }

  ngOnDestroy(): void {
    this.queryCard.unsubscribe();
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