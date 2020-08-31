import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Apollo } from "apollo-angular";
import { environment } from 'src/environments/environment';
import FORMATION_QUERY from "src/app/apollo/queries/formation/formation";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  apiUrl: string = environment.apiUrl;

  formateur: any;
  formationPhotoUrl: string;
  formateurPhotoUrl: string;
  prochainesSessions: any[] = [];
  
  // These properties are used to complete the markdown parsing in the componenent template, via the replace() js function. ngx-markdown seems to render \n as a space instead of a line break.
  mdLinebreak = /\n/g;
  htmlLinebreak: string = '<br>';

  data: any = {};
  loading = true;
  errors: any;
  
  private queryFormation: Subscription;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.queryFormation = this.apollo.watchQuery({
        query: FORMATION_QUERY,
        variables: {
          id: this.route.snapshot.paramMap.get("id")
        }
      }).valueChanges.subscribe(result => {
        this.data = result.data;
        this.formateur = this.data.formation.formateurs[0];
        this.formationPhotoUrl = this.apiUrl + this.data.formation.imagedefond.url;
        this.formateurPhotoUrl = this.apiUrl + this.data.formation.formateurs[0].photo.url;
        this.prochainesSessions = this.formatDates(this.data.formation.prochainessessions);
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  ngOnDestroy(): void {
    this.queryFormation.unsubscribe();
  }

  private formatDates(inputArray: any[]) {
    const datesArray = inputArray.map(el => [new Date(el.datedebut), new Date(el.datefin)]);
    const sortedArray = datesArray.sort((a, b) => a[0].getTime() - b[0].getTime());
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return sortedArray.map(el => [ el[0].toLocaleString("fr-FR", options), el[1].toLocaleString("fr-FR", options) ]);
  }
}