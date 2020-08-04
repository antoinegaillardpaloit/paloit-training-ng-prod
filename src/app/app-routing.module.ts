import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FormationComponent } from './components/formation/formation.component';
import { FormationsComponent } from './components/formations/formations.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: "formations", component: FormationsComponent },
  { path: "formations/:id", component: FormationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }