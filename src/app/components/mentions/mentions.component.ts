import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from "rxjs";
import { Apollo } from "apollo-angular";
import MENTIONS_QUERY from "../../apollo/queries/mentions/mentionslegales";

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.css']
})
export class MentionsComponent implements OnInit, OnDestroy {

  apiUrl: string = environment.apiUrl;

  photoUrl: string = this.apiUrl + "/uploads/mentions_legales_74941291f9.jpg";

  private queryMentions: Subscription;

  data: any = {};
  loading = true;
  errors: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.queryMentions = this.apollo.watchQuery({
      query: MENTIONS_QUERY
    }).valueChanges.subscribe(result => {
      this.data = result.data;
      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

  ngOnDestroy(): void {
    this.queryMentions.unsubscribe();
  }
}