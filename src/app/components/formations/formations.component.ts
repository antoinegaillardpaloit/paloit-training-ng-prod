import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import FORMATIONS_QUERY from "src/app/apollo/queries/formation/formations";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {

  data: any = {};
  loading = true;
  errors: any;

  private queryFormations: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.queryFormations = this.apollo.watchQuery({
      query: FORMATIONS_QUERY
    }).valueChanges.subscribe(result => {
      this.data = result.data;
      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

  ngOnDestroy(): void {
    this.queryFormations.unsubscribe();
  }
}