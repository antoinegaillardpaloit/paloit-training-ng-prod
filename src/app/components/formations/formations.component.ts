import { Component, OnInit } from '@angular/core';

import { Apollo } from "apollo-angular";
import { Subscription } from "rxjs";

import DOMAINES_QUERY from 'src/app/apollo/queries/domaine/domaines'
import FORMATIONS_QUERY from "src/app/apollo/queries/formation/formations";

import { cardShuffle } from '../../animations'

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css'],
  animations: [
    cardShuffle
  ]
})
export class FormationsComponent implements OnInit {

  availableDomaines: any[] = []; // Domaines from the API that have at least one formation attached to, and thus are proposed to the user
  allformations: any[] = [];
  formationsToDisplay: any[] = [];

  private queryDomaines: Subscription;
  private queryFormations: Subscription;

  loading = true;
  errors: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {

    // API call to get domaines
    this.getDomaines()

    // API call to get formations
    this.getFormations()
  }

  ngOnDestroy(): void {
    this.queryDomaines.unsubscribe();
    this.queryFormations.unsubscribe();
  }

  filterFormations(selectedDomainesIds: string[]): void {

    // Determines which formations to display based on user choice
    if (selectedDomainesIds.length < 1) {

      // If no domaine is selected, then display all formations (= reset filters)
      this.resetFilters();

    } else {

      // If one or more domaines are selected, extract formations from domaines whose ids are passed as parameter
      let formationsRequested: any[] = [];

      this.availableDomaines.forEach(availableDomaine => {
        if (selectedDomainesIds.includes(availableDomaine.id)) formationsRequested.push(...availableDomaine.formations);
      });

      // As a same formation can be referenced by different domaines, we need to filter the result for uniqueness by id
      formationsRequested = [...new Map(formationsRequested.map(formation => [formation["id"], formation])).values()];
      
      // In formations already displayed, remove those that are not part of the new request
      this.formationsToDisplay = this.formationsToDisplay.filter(ftd => formationsRequested.some(fr => ftd.id === fr.id));

      // In formations already displayed, add those from the new request that are not already in there
      // (via a method which itself calls the sort by date method at the end)
      this.addFormationsToDisplay(formationsRequested);
    }
  }

  resetFilters(): void {
    this.addFormationsToDisplay(this.allformations);
  }

  private getDomaines() {

    // Get all domaines from API
    this.queryDomaines = this.apollo.watchQuery({
      query: DOMAINES_QUERY
    }).valueChanges.subscribe(result => {

      // Stock api call results in temporary variable
      const allDomainesDataApi: any = result.data;

      // Filter results to get only the domaines that have at least one formation attached
      allDomainesDataApi.domaines.forEach((domaine) => {
        if (domaine.formations.length > 0) this.availableDomaines.push(domaine);
      });

      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

  private getFormations() {

    // Get all formations from API
    this.queryFormations = this.apollo.watchQuery({
      query: FORMATIONS_QUERY
    }).valueChanges.subscribe(result => {

      // Stock api call results in temporary variable
      const allFormationsDataApi: any = result.data;

      // Attribute all formations
      this.allformations = allFormationsDataApi.formations;

      // Initialize formations to display with all formations after sorting them
      this.formationsToDisplay = this.sortFormationsByDate(this.allformations);

      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

  private addFormationsToDisplay(requestedFormations: any[]) {
    requestedFormations.forEach(requestedFormation => {
      if(!this.formationsToDisplay.map(ftd => ftd.id).includes(requestedFormation.id)) this.formationsToDisplay.push(requestedFormation);
    })
    this.formationsToDisplay = this.sortFormationsByDate(this.formationsToDisplay);
  }

  private sortFormationsByDate(unsortedFormations: any[]) {
    let formationsWithDates = unsortedFormations.filter( f => f.prochainessessions.length > 0);
    let formationsWithoutDates = unsortedFormations.filter( f => f.prochainessessions.length === 0);
    formationsWithDates.sort(this.compareDates);
    return [...formationsWithDates, ...formationsWithoutDates];
  }

  private compareDates(a, b) {
    if (a.prochainessessions[0].datedebut < b.prochainessessions[0].datedebut) {
      return -1;
    }
    if (a.prochainessessions[0].datedebut > b.prochainessessions[0].datedebut) {
      return 1;
    }
    return 0;
  }
}