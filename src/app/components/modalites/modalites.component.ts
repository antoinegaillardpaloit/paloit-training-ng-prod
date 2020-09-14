import { Component, OnInit } from '@angular/core';

import { Apollo } from "apollo-angular";
import MODALITES_QUERY from "../../apollo/queries/modalites/modalites";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-modalites',
  templateUrl: './modalites.component.html',
  styleUrls: ['./modalites.component.css']
})
export class ModalitesComponent implements OnInit {

  data: any = {};
  loading = true;
  errors: any;

  private queryModalites: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.queryModalites = this.apollo.watchQuery({
      query: MODALITES_QUERY
    }).valueChanges.subscribe(result => {
      this.data = result.data;
      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

  ngOnDestroy(): void {
    this.queryModalites.unsubscribe();
  }
}
