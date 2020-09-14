import { Component, OnInit } from '@angular/core';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  // Used to pass the bootstrap toggle attribute to the links on mobile
  engageMobileNavigation: boolean = true;

  faEnveloppe = faEnvelope;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void { 
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
  
  contact(){
    window.open(
      "mailto:palotraining@palo-it.com?subject=Demande de renseignements concernant vos formations",
      '_blank'
    );
  }
}