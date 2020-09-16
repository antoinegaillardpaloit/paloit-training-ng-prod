import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from "rxjs";
import { Apollo } from "apollo-angular";
import ACCUEIL_QUERY from "../../apollo/queries/accueil/accueil";

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, OnDestroy {

  data: any = {};
  loading = true;
  errors: any;

  apiUrl: string = environment.apiUrl;

  photoFile: string = "/uploads/Team_blog_268a9414d0.jpg";
  photoURl: string = this.apiUrl + this.photoFile;
  letterFile: string = "/uploads/palo_orange_bb2e792835.png";
  letterUrl: string = this.apiUrl + this.letterFile;

  private queryAccueil: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.queryAccueil = this.apollo.watchQuery({
      query: ACCUEIL_QUERY
    }).valueChanges.subscribe(result => {
      this.data = result.data;
      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

  ngOnDestroy(): void {
    this.queryAccueil.unsubscribe();
  }
}
