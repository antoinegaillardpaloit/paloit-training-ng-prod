import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AccueilComponent } from './components/accueil/accueil.component';
import { FormationComponent } from './components/formation/formation.component';
import { FormationsComponent } from './components/formations/formations.component';
import { FormateursComponent } from './components/formateurs/formateurs.component';
import { ModalitesComponent } from './components/modalites/modalites.component';
import { MentionsComponent } from './components/mentions/mentions.component';
import { ConfidentialiteComponent } from './components/confidentialite/confidentialite.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: "formations", component: FormationsComponent },
  { path: "formations/:id/:slug", component: FormationComponent },
  { path: "formateurs", component: FormateursComponent },
  { path: "modalites", component: ModalitesComponent },
  { path: "mentions-legales", component: MentionsComponent },
  { path: "contact", component: ContactFormComponent },
  { path: "politique-de-confidentialite", component: ConfidentialiteComponent },
  { path: "not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }