import { Component, OnInit } from '@angular/core';

import { trigger, state, transition, style, animate } from '@angular/animations';

import { Apollo } from "apollo-angular";
import DOMAINES_QUERY from 'src/app/apollo/queries/domaine/domaines'
import FORMATIONS_QUERY from "src/app/apollo/queries/formation/formations";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css'],
  animations: [
    trigger('fade', [

      state('void', style({ opacity: 0 })),

      transition(':enter, :leave', [
        animate(2000)
      ])
    ])
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

    this.queryFormations = this.apollo.watchQuery({
      query: FORMATIONS_QUERY
    }).valueChanges.subscribe(result => {

      // Stock api call results in temporary variable
      const allFormationsDataApi: any = result.data;

      // Attribute all formations
      this.allformations = allFormationsDataApi.formations;

      // Initialize formations to display with all formations
      this.formationsToDisplay = this.allformations;

      this.loading = result.loading;
      this.errors = result.errors;
    });

  }

  filterFormations(selectedDomainesIds: string[]): void {

    if (selectedDomainesIds.length < 1) {
      this.formationsToDisplay = this.allformations;
    } else {
      // Reset formations to display
      this.formationsToDisplay = [];

      let formationsToDisplayIds: string[] = [];

      this.availableDomaines.forEach(availableDomaine => {
        if (selectedDomainesIds.includes(availableDomaine.id)) {
          formationsToDisplayIds.push(...availableDomaine.formations.map(formation => formation.id))
        }
      });

      const uniqFormationsToDisplayIds = [...new Set(formationsToDisplayIds)];

      this.allformations.forEach(formation => {
        if (uniqFormationsToDisplayIds.includes(formation.id)) {
          this.formationsToDisplay.push(formation);
        }
      })
    }

  }

  resetFilters(): void {
    this.formationsToDisplay = this.allformations;
  }

  ngOnDestroy(): void {
    this.queryDomaines.unsubscribe();
    this.queryFormations.unsubscribe();
  }
}