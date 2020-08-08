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
      
      // If no domaine is selected, then display all formations
      this.formationsToDisplay = this.allformations;

    } else {
      
      // If one or more domaines are selected, first reset formations to display
      this.formationsToDisplay = [];

      // Then extract formations from domaines whose ids are passed as parameter
      this.availableDomaines.forEach(availableDomaine => {
        if (selectedDomainesIds.includes(availableDomaine.id)) {
          this.formationsToDisplay.push(...availableDomaine.formations)
        }
      });

      // As a same formation can be referenced by different domaines, we need to filter the result for uniqueness by id
      this.formationsToDisplay = [...new Map(this.formationsToDisplay.map(formation => [formation["id"], formation])).values()];
    }
  }

  resetFilters(): void {
    this.formationsToDisplay = this.allformations;
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

      // Initialize formations to display with all formations
      this.formationsToDisplay = this.allformations;

      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

}