import { Formation } from 'src/app/models/formation.model';

export interface Domaine {
    id: number,
    intitule: string,
    formations: Formation[]
}