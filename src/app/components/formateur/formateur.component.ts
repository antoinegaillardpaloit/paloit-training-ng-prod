import { Component, OnInit, Input } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})
export class FormateurComponent implements OnInit {

  @Input() formateur: any;
  @Input() orientationIndex: number;
  orientationClass: string = '';

  apiUrl: string = environment.apiUrl;
  photoUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.photoUrl = this.apiUrl + this.formateur.photo.url;
    this.orientationClass = this.orientationIndex%2 === 0 ? 'palo-formateur-left' : 'palo-formateur-right';
  }

}
