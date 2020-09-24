import { Component, OnDestroy, OnInit } from '@angular/core';

import { Apollo } from "apollo-angular";
import MODALITES_QUERY from "../../apollo/queries/modalites/modalites";
import { Subscription } from "rxjs";

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modalites',
  templateUrl: './modalites.component.html',
  styleUrls: ['./modalites.component.css']
})
export class ModalitesComponent implements OnInit, OnDestroy {

  apiUrl: string = environment.apiUrl;

  photoUrl: string = this.apiUrl + "/uploads/modalites2_ee9d497594.jpg";

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
