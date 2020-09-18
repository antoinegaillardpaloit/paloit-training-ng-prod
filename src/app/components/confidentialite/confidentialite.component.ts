import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from "rxjs";
import { Apollo } from "apollo-angular";
import PRIVACY_QUERY from "../../apollo/queries/privacy/confidentialite";

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confidentialite',
  templateUrl: './confidentialite.component.html',
  styleUrls: ['./confidentialite.component.css']
})
export class ConfidentialiteComponent implements OnInit, OnDestroy {

  apiUrl: string = environment.apiUrl;

  photoUrl: string = this.apiUrl + "/uploads/politique_de_confidentialite_612789f854.jpg";

  private queryPrivacy: Subscription;

  data: any = {};
  loading = true;
  errors: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.queryPrivacy = this.apollo.watchQuery({
      query: PRIVACY_QUERY
    }).valueChanges.subscribe(result => {
      this.data = result.data;
      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

  ngOnDestroy(): void {
    this.queryPrivacy.unsubscribe();
  }

}
