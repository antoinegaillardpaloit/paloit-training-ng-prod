import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import CONTACT_QUERY from "../../apollo/queries/coordonnees/coordonnees";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  data: any = {};
  loading = true;
  errors: any;

  // These properties are used to complete the markdown parsing in the componenent template, via the replace() js function. ngx-markdown seems to render \n as a space instead of a line break.
  mdLinebreak = /\n/g;
  htmlLinebreak: string = '<br>';

  private queryContact: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.queryContact = this.apollo.watchQuery({
      query: CONTACT_QUERY
    }).valueChanges.subscribe(result => {
      this.data = result.data;
      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

  ngOnDestroy(): void {
    this.queryContact.unsubscribe();
  }
}