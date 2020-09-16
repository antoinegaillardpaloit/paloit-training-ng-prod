import { Injectable } from "@angular/core";

import { Session } from 'src/app/models/session.model';

@Injectable({ providedIn: 'root' })
export class SharedService {

    formatEnumeration(inputArray: any[], wantedProperty: string, separator: string): string {
        const propertyArray: string[] = inputArray.map(el => el[wantedProperty]);
        const propertyString: string = propertyArray.join(` ${separator} `);
        return propertyString;
    }

    formatDates(inputArray: Session[]): string[][] {
        const datesArray = inputArray.map(el => [new Date(el.datedebut), new Date(el.datefin)]);
        const sortedArray = datesArray.sort((a, b) => a[0].getTime() - b[0].getTime());
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return sortedArray.map(el => [el[0].toLocaleString("fr-FR", options), el[1].toLocaleString("fr-FR", options)]);
    }
}