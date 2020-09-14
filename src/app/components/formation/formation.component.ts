import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

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

  private queryFormation: Subscription;
  
  apiUrl: string = environment.apiUrl;

  formateur: any;
  formationPhotoUrl: string;
  formateurPhotoUrl: string;
  prochainesSessions: any[] = [];
  domainesIntitules: string;

  data: any = {};
  loading = true;
  errors: any;

  // Used to pass the collapse bootstrap class to the paragraphs on mobile
  engageMobileNavigation: boolean = true;

  // These properties are used to complete the markdown parsing in the componenent template, via the replace() js function. ngx-markdown seems to render \n as a space instead of a line break.
  // mdLinebreak = /\n/g;
  // htmlLinebreak: string = '<br>';

  // Used in the template to get a dynamic id for the paragraphs based on their subtitle
  spaces = /\s+/g;
  nothing: string = '';

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver) { }

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
      this.domainesIntitules = this.formatEnumeration(this.data.formation.domaines, "intitule", "·");

      this.loading = result.loading;
      this.errors = result.errors;
    });

    this.breakpointObserver
      .observe(['(min-width: 992px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.engageMobileNavigation = false;
        } else {
          this.engageMobileNavigation = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.queryFormation.unsubscribe();
  }

  // TODO : services based on these 2 functions, since they are also used (99% the same) in the card.component.ts

  private formatEnumeration(inputArray: any[], wantedProperty: string, separator: string): string {
    const propertyArray: string[] = inputArray.map(el => el[wantedProperty]);
    const propertyString: string = propertyArray.join(` ${separator} `);
    return propertyString;
  }

  private formatDates(inputArray: any[]) {
    const datesArray = inputArray.map(el => [new Date(el.datedebut), new Date(el.datefin)]);
    const sortedArray = datesArray.sort((a, b) => a[0].getTime() - b[0].getTime());
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return sortedArray.map(el => [el[0].toLocaleString("fr-FR", options), el[1].toLocaleString("fr-FR", options)]);
  }
}