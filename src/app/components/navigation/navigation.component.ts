import { Component, OnInit } from '@angular/core';

import { faEnvelope } from '@fortawesome/free-regular-svg-icons';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  faEnveloppe = faEnvelope;

  constructor() { }

  ngOnInit(): void {
  }

}
