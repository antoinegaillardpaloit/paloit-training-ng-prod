import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import ACCUEIL_QUERY from "../../apollo/queries/accueil/accueil";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  data: any = {};
  loading = true;
  errors: any;

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
