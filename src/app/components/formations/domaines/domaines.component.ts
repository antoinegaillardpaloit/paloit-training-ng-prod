import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Apollo } from "apollo-angular";
import DOMAINES_QUERY from 'src/app/apollo/queries/domaine/domaines'
import { Subscription } from "rxjs";

@Component({
  selector: 'app-domaines',
  templateUrl: './domaines.component.html',
  styleUrls: ['./domaines.component.css']
})
export class DomainesComponent implements OnInit {

  data: any = {};
  loading = true;
  errors: any;

  @Output() domaineUpdated = new EventEmitter<string>();
  @Output() filtersReset = new EventEmitter<void>();

  private queryDomaines: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.queryDomaines = this.apollo.watchQuery({
      query: DOMAINES_QUERY
    }).valueChanges.subscribe(result => {
      this.data = result.data;
      this.loading = result.loading;
      this.errors = result.errors;
    });
  }

  onTagChoice(domaineId: string): void {
    this.domaineUpdated.emit(domaineId);
  }

  onResetFilters():void {
    this.filtersReset.emit();
  }
  
  ngOnDestroy(): void {
    this.queryDomaines.unsubscribe();
  }
}