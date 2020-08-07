import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Apollo } from "apollo-angular";
import DOMAINES_QUERY from 'src/app/apollo/queries/domaine/domaines'
import { Subscription } from "rxjs";

@Component({
  selector: 'app-domaines',
  templateUrl: './domaines.component.html',
  styleUrls: ['./domaines.component.css']
})
export class DomainesComponent implements OnInit {

  @Output() domaineUpdated = new EventEmitter<string[]>();
  @Output() filtersReset = new EventEmitter<void>();

  availableDomaines: any[] = []; // Domaines from the API that have at least one formation attached to, and thus are proposed to the user
  selectedDomaines: string[] = []; // Domaines selected by the user

  private queryDomaines: Subscription;
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

  }

  onTagChoice(domaineId: string, event): void {

    // Add the clicked domaine to selected domaines if not here yet, remove it if already there
    if (this.selectedDomaines.includes(domaineId)) {
      var index = this.selectedDomaines.indexOf(domaineId);
      this.selectedDomaines.splice(index, 1);
    } else {
      this.selectedDomaines.push(domaineId);
    }

    // Toggle the active styling on the clicked button
    event.target.classList.toggle("palo-button-filter-active");

    // Inform formations component that the domaines selection has changed
    this.domaineUpdated.emit(this.selectedDomaines);
  }

  onResetFilters(event): void {
    
    // Empty selected domaines array and remove active styling on all tags
    this.selectedDomaines = [];
    document.querySelectorAll('.palo-button-filter').forEach(button => button.classList.remove('palo-button-filter-active'));

    // Inform formations component to display all formations again
    this.filtersReset.emit();
  }

  ngOnDestroy(): void {
    this.queryDomaines.unsubscribe();
  }
}