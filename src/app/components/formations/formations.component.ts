import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Domaine } from 'src/app/models/domaine.model';
import { Formation } from 'src/app/models/formation.model';
import { DomainesService } from 'src/app/services/domaines.service';
import { FormationsService } from 'src/app/services/formations.service';

import { cardShuffle } from '../../animations';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css'],
  animations: [
    cardShuffle
  ]
})
export class FormationsComponent implements OnInit, OnDestroy {

  availableDomaines: Domaine[] = []; // Domaines from the API that have at least one formation attached to, and thus are proposed to the user
  allformations: Formation[] = [];
  formationsToDisplay: Formation[] = [];

  private queryDomaines: Subscription;
  private queryFormations: Subscription;

  loadingDomaines: boolean = true;
  loadingFormations: boolean = true;

  domainesError: any = null;
  formationsError: any = null;

  constructor(private domainesService: DomainesService, private formationsService: FormationsService) { }

  ngOnInit(): void {

    // API call to get domaines
    this.getDomaines();

    // API call to get formations
    this.getFormations();
  }

  ngOnDestroy(): void {
    this.queryDomaines.unsubscribe();
    this.queryFormations.unsubscribe();
  }

  private getDomaines(): void {
    this.queryDomaines = this.domainesService.fetchDomaines().subscribe(

      result => {
        // Filter results to get only the domaines that have at least one formation attached
        result.data.domaines.forEach((domaine) => {
          if (domaine.formations.length > 0) this.availableDomaines.push(domaine);
        });

        this.loadingDomaines = result.loading;
      },

      error => {
        this.loadingDomaines = false;
        this.domainesError = "Nous n'avons pu récupérer les catégories.";
      }
    );
  }

  private getFormations(): void {
    this.queryFormations = this.formationsService.fetchFormations().subscribe(
      
      result => {
        // Attribute all formations
        this.allformations = result.data.formations;

        // Initialize formations to display with all formations after sorting them
        this.formationsToDisplay = this.formationsService.sortFormationsByDate(this.allformations);

        this.loadingFormations = result.loading;
      },

      error => {
        this.loadingFormations = false;
        this.formationsError = "Nous n'avons pu récupérer les formations."
      }
    );
  }

  filterFormations(selectedDomainesIds: number[]): void {

    // Determines which formations to display based on user choice
    if (selectedDomainesIds.length < 1) {

      // If no domaine is selected, then display all formations (= reset filters)
      this.resetFilters();

    } else {

      // If one or more domaines are selected, extract formations from domaines whose ids are passed as parameter
      let formationsRequested: Formation[] = [];

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

  private addFormationsToDisplay(requestedFormations: Formation[]) {
    requestedFormations.forEach(requestedFormation => {
      if (!this.formationsToDisplay.map(ftd => ftd.id).includes(requestedFormation.id)) this.formationsToDisplay.push(requestedFormation);
    })
    this.formationsToDisplay = this.formationsService.sortFormationsByDate(this.formationsToDisplay);
  }
}