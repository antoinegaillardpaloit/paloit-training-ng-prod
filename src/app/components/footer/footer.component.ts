import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import CONTACT_QUERY from "../../apollo/queries/coordonnees/coordonnees";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // coordonnees: any = {};

  data: any = {};
  loading = true;
  errors: any;

  private queryContact: Subscription;

  constructor(private apollo: Apollo) {}

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