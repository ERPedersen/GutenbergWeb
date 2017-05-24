import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DataService} from "../../services/data/data.service";

@Component({
  moduleId: module.id,
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public subscription: Subscription;
  public lat: number = 29.745969;
  public lng: number = 72.702225;
  public markers = [];
  public circle = {
    lat: 0,
    lng: 0,
    visible: false
  };
  public zoom: number = 3;
  public test = 0;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.subscription = this.dataService.getSubject().subscribe(results => this.addMapMarker(results));
  }

  public addMapMarker(results) {

    if (results.type === "getBooksFromAuthor") {
      let markers = [];
      let books = results.data;

      for (let b in books) {
        let locations = results.data[b].locations;
        for (let i in locations) {
          markers.push({lat: locations[i].latitude, lng: locations[i].longitude})
        }

        this.markers = markers;
        this.zoom = 3;
      }
    }
  }

  public mapClicked($event) {
    console.log($event.coords.lat);
    console.log($event.coords.lng);

    this.circle.lat = $event.coords.lat;
    this.circle.lng = $event.coords.lng;
    this.circle.visible = true;

    // Make lat long query

  }

}
