import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import FORMATION_QUERY from "src/app/apollo/queries/formation/formation";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  data: any = {};
  loading = true;
  errors: any;

  private queryFormation: Subscription;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit() {
    this.queryFormation = this.apollo.watchQuery({
        query: FORMATION_QUERY,
        variables: {
          id: this.route.snapshot.paramMap.get("id")
        }
      }).valueChanges.subscribe(result => {
        this.data = result.data;
        this.loading = result.loading;
        this.errors = result.errors;
        console.log(result.data);
      });
  }

  ngOnDestroy() {
    this.queryFormation.unsubscribe();
  }
}