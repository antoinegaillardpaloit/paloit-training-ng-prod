import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Subscription } from "rxjs";
import { environment } from 'src/environments/environment';

import { FormationsService } from 'src/app/services/formations.service';
import { SharedService } from 'src/app/services/shared.service';
import { Formation } from 'src/app/models/formation.model';
import { Formateur } from 'src/app/models/formateur.model';

import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit, OnDestroy {

  private queryFormation: Subscription;
  
  apiUrl: string = environment.apiUrl;
  avatarUrl: string = environment.avatarUrl;

  formationId: number;
  formation: Formation;
  formateur: Formateur;
  formationPhotoUrl: string;
  formateurPhotoUrl: string;
  prochainesDates: string[][] = [];
  domainesIntitules: string;

  loading: boolean = true;
  error: any = null;

  // Used to pass the collapse bootstrap class to the paragraphs on mobile
  engageMobileNavigation: boolean = true;

  // These properties are used to complete the markdown parsing in the componenent template, via the replace() js function. ngx-markdown seems to render \n as a space instead of a line break.
  // mdLinebreak = /\n/g;
  // htmlLinebreak: string = '<br>';

  // Used in the template to get a dynamic id for the paragraphs based on their subtitle
  spaces = /\s+/g;
  nothing: string = '';

  faEnveloppe = faEnvelope;

  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private formationsService: FormationsService,
    private sharedService: SharedService) { }

  ngOnInit(): void {

    this.formationId = +this.route.snapshot.paramMap.get("id");

    this.getFormationById(this.formationId);

    this.breakpointObserver
      .observe(['(min-width: 992px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.engageMobileNavigation = false;
        } else {
          this.engageMobileNavigation = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.queryFormation.unsubscribe();
  }

  sinscrire() {
    window.open(
      "mailto:palotraining@palo-it.com?subject=Inscription à la formation " + this.formation.intitule,
      "_blank"
    );
  }

  contact() {
    window.open(
      "mailto:palotraining@palo-it.com?subject=Concernant la formation " + this.formation.intitule,
      "_blank"
    );
  }

  private getFormationById(id: number) {
    this.queryFormation = this.formationsService.fetchFormationById(id).subscribe(

      result => {
        this.formation = result.data.formation;
        this.formateur = this.formation.formateurs[0];
        this.formationPhotoUrl = this.apiUrl + this.formation.imagedefond.url;
        if(this.formateur.photo) {
          this.formateurPhotoUrl = this.apiUrl + this.formateur.photo.url;
        } else {
          this.formateurPhotoUrl = this.apiUrl + this.avatarUrl;
        }   
        this.prochainesDates = this.sharedService.formatDates(this.formation.prochainessessions);
        this.domainesIntitules = this.sharedService.formatEnumeration(this.formation.domaines, "intitule", "·");
        
        this.loading = result.loading;
      },

      error => {
        this.loading = false;
        this.error = "Nous n'avons pas pu récupérer la formation.";
      }
    );
  }
  
}