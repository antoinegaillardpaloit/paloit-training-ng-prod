import { Component, AfterViewInit } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map: L.Map;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {

    const paloCoord: number[] = [47.214780, -1.558920];

    this.map = L.map('map', {
      center: paloCoord,
      zoom: 16
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

    tiles.addTo(this.map);

    L.marker(paloCoord).addTo(this.map);
  }

}
