import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormationsComponent } from './components/formations/formations.component';
import { FormationComponent } from './components/formation/formation.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { MapComponent } from './components/map/map.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/formations/card/card.component';
import { DomainesComponent } from './components/formations/domaines/domaines.component';

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
    DomainesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
