import { ImageInfo } from 'src/app/models/content.model';
import { Formation } from 'src/app/models/formation.model';

export interface Formateur {
    id: number,
    nom: string,
    bio: string,
    linkedin: string,
    github: string,
    twitter: string,
    photo: ImageInfo,
    formations: Formation[]
}