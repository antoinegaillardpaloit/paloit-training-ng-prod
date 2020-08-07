import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import FORMATIONS_QUERY from "src/app/apollo/queries/formation/formations";
import { Subscription } from "rxjs";
import { DomaineService } from '../../services/domaine.service'

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {

  allformations: any[] = [];
  formationsToDisplay: any[] = [];

  private queryFormations: Subscription;
  loading = true;
  errors: any;

  constructor(private apollo: Apollo, private domaineService: DomaineService) { }

  ngOnInit(): void {
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

  filterFormations(domainesId: any[]): void {

    // Reset formations to display
    this.formationsToDisplay = [];

    this.domaineService.getDomainesByIds(domainesId).subscribe(res => {

      // Stock api call results in temporary variable
      const domainesSelected: any = res;

      // Stock all formations corresponding to the domaines selected in a temporary array, before filtering on uniqueness
      const formationsWithDuplicates: any[] = [];
      domainesSelected.forEach((domaine: { formations: any; }) => formationsWithDuplicates.push(...domaine.formations));

      // Filter formations on uniqueness of id and push in formationsToDisplay
      const map = new Map();
      for (const formation of formationsWithDuplicates) {
        if (!map.has(formation.id)) {
          map.set(formation.id, true);
          this.formationsToDisplay.push(formation);
        }
      }

    });
  }

  resetFilters(): void {
    this.formationsToDisplay = this.allformations;
  }

  ngOnDestroy(): void {
    this.queryFormations.unsubscribe();
  }
}