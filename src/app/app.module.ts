import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { GraphQLModule } from './graphql.module';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';

import { FormationsComponent } from './components/formations/formations.component';
import { FormateursComponent } from './components/formateurs/formateurs.component';
import { FormationComponent } from './components/formation/formation.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { MapComponent } from './components/map/map.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/formations/card/card.component';
import { DomainesComponent } from './components/formations/domaines/domaines.component';
import { FormateurComponent } from './components/formateur/formateur.component';
import { ModalitesComponent } from './components/modalites/modalites.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaloFooterComponent } from './components/palo-footer/palo-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FormationsComponent,
    FormationComponent,
    AccueilComponent,
    MapComponent,
    NavigationComponent,
    FooterComponent,
    CardComponent,
    DomainesComponent,
    FormateursComponent,
    FormateurComponent,
    ModalitesComponent,
    PaloFooterComponent
  ],
  imports: [
    MarkdownModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
