import { Injectable } from "@angular/core";

import { Apollo } from 'apollo-angular';
import FORMATIONS_QUERY from 'src/app/apollo/queries/formation/formations';
import FORMATION_QUERY from "src/app/apollo/queries/formation/formation";

import { Formation } from 'src/app/models/formation.model';

@Injectable({ providedIn: 'root' })
export class FormationsService {

    constructor(private apollo: Apollo) { }

    fetchFormations() {
        interface FormationsResponse { formations: Formation[]; };
        return this.apollo.watchQuery<FormationsResponse>({ query: FORMATIONS_QUERY }).valueChanges;
    }

    fetchFormationById(id: number) {
        interface FormationResponse { formation: Formation; };
        return this.apollo.watchQuery<FormationResponse>({ query: FORMATION_QUERY, variables: { id: id } }).valueChanges;
    }

    sortFormationsByDate(unsortedFormations: Formation[]): Formation[] {
        let formationsWithDates = unsortedFormations.filter(f => f.prochainessessions.length > 0);
        let formationsWithoutDates = unsortedFormations.filter(f => f.prochainessessions.length === 0);
        formationsWithDates.sort(this.compareDates);
        return [...formationsWithDates, ...formationsWithoutDates];
    }

    private compareDates(a: Formation, b: Formation) {
        if (a.prochainessessions[0].datedebut < b.prochainessessions[0].datedebut) return -1;
        if (a.prochainessessions[0].datedebut > b.prochainessessions[0].datedebut) return 1;
        return 0;
    }
}