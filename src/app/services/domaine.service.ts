import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DomaineService {

    constructor(private http: HttpClient) { }

    getDomainesByIds(idsArray: any[]) {
        const queryString: string = this.formatIdsForQuery(idsArray);
        return this.http.get(`${environment.apiUrl}/domaines?${queryString}`).pipe(map(res => res));
    }

    private formatIdsForQuery(idsArray: any[]): string {
        const formattedIdsArray: string[] = idsArray.map(el => `id=${el}`);
        const idsString: string = formattedIdsArray.join("&");
        return idsString;
    }
}