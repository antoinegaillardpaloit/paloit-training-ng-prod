import { Injectable } from "@angular/core";

import { Apollo } from 'apollo-angular';
import DOMAINES_QUERY from 'src/app/apollo/queries/domaine/domaines';

import { Domaine } from 'src/app/models/domaine.model';

@Injectable({ providedIn: 'root' })
export class DomainesService {

    constructor(private apollo: Apollo) { }

    fetchDomaines() {

        interface DomaineResponse {
            domaines: Domaine[];
        };

        return this.apollo.watchQuery<DomaineResponse>({ query: DOMAINES_QUERY }).valueChanges;
    }
}