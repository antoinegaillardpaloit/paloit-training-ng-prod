import { Lieu } from 'src/app/models/lieu.model';
import { PresentationSection, InfoSection, ImageInfo } from 'src/app/models/content.model';
import { Session } from 'src/app/models/session.model';
import { Domaine } from 'src/app/models/domaine.model';
import { Formateur } from 'src/app/models/formateur.model';

export interface Formation {
    id: number,
    intitule: string,
    lieus: Lieu,
    accroche: string,
    slug: string,
    presentation: PresentationSection[],
    infos: InfoSection[],
    prochainessessions: Session[],
    imagedefond: ImageInfo,
    domaines: Domaine[],
    formateurs: Formateur[]
}