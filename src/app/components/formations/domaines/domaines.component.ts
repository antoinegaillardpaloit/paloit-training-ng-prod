import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { Domaine } from 'src/app/models/domaine.model';

@Component({
  selector: 'app-domaines',
  templateUrl: './domaines.component.html',
  styleUrls: ['./domaines.component.css']
})
export class DomainesComponent implements OnInit {

  @Output() domaineUpdated = new EventEmitter<number[]>();
  @Output() filtersReset = new EventEmitter<void>();

  @Input() availableDomaines: Domaine[] = []; // Domaines from the API (via formations component) that have at least one formation attached to, and thus are proposed to the user
  selectedDomainesIds: number[] = []; // Domaines selected by the user

  constructor() { }

  ngOnInit(): void { }

  onTagChoice(domaineId: number, event): void {

    // Add the clicked domaine to selected domaines if not here yet, remove it if already there
    if (this.selectedDomainesIds.includes(domaineId)) {
      var index = this.selectedDomainesIds.indexOf(domaineId);
      this.selectedDomainesIds.splice(index, 1);
    } else {
      this.selectedDomainesIds.push(domaineId);
    }

    // Toggle the active styling on the clicked button
    event.target.classList.toggle("palo-button-filter-active");

    // Inform formations component that the domaines selection has changed
    this.domaineUpdated.emit(this.selectedDomainesIds);
  }

  onResetFilters(event): void {
    
    // Empty selected domaines array and remove active styling on all tags
    this.selectedDomainesIds = [];
    document.querySelectorAll('.palo-button-filter').forEach(button => button.classList.remove('palo-button-filter-active'));

    // Inform formations component to display all formations again
    this.filtersReset.emit();
  }
}