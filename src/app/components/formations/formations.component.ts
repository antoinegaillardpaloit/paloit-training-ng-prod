import { Component, OnInit } from '@angular/core';

import { Apollo } from "apollo-angular";
import FORMATIONS_QUERY from "src/app/apollo/queries/formation/formations";
import FORMATIONS_BY_DOMAINE_QUERY from 'src/app/apollo/queries/domaine/formations-by-domaine'
import { Subscription } from "rxjs";

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {

  data: any = {};
  allformations: any[] = [];
  formationsToDisplay: any[] = [];

  loading = true;
  errors: any;

  private queryFormations: Subscription;
  private queryFormationsByDomaine: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.queryFormations = this.apollo.watchQuery({
      query: FORMATIONS_QUERY
    }).valueChanges.subscribe(result => {
      this.data = result.data;
      this.allformations = this.data.formations;
      this.formationsToDisplay = this.allformations;
      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

  filterFormations(domaineId: string): void {
    this.queryFormationsByDomaine = this.apollo.watchQuery({
      query: FORMATIONS_BY_DOMAINE_QUERY,
      variables: {
        id: domaineId
      }
    }).valueChanges.subscribe(result => {
      this.data = result.data;
      this.formationsToDisplay = this.data.domaine.formations;
      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

  resetFilters(): void {
    this.formationsToDisplay = this.allformations;
  }

  ngOnDestroy(): void {
    this.queryFormations.unsubscribe();
    this.queryFormationsByDomaine.unsubscribe();
  }
}