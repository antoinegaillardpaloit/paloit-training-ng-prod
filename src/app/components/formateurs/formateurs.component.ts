import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

import FORMATEURS_QUERY from "src/app/apollo/queries/formateur/formateurs";

@Component({
  selector: 'app-formateurs',
  templateUrl: './formateurs.component.html',
  styleUrls: ['./formateurs.component.css']
})
export class FormateursComponent implements OnInit {

  private queryFormateurs: Subscription;

  formateurs: any[] = [];

  loading = true;
  errors: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    
    // API call to get formateurs
    this.getFormateurs()
  }

  ngOnDestroy(): void {
    this.queryFormateurs.unsubscribe();
  }

  private getFormateurs() {

    // Get all formateurs from API
    this.queryFormateurs = this.apollo.watchQuery({
      query: FORMATEURS_QUERY
    }).valueChanges.subscribe(result => {

      // Stock api call results in temporary variable
      const formateursDataApi: any = result.data;

      // Attribute all formations
      this.formateurs = formateursDataApi.formateurs;

      this.loading = result.loading;
      this.errors = result.errors;
    });
  }
}
