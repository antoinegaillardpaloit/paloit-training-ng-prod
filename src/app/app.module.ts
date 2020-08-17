import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

import { MarkdownModule } from "ngx-markdown";

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
    MarkdownModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
