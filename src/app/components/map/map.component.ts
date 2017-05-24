import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DataService} from "../../services/data/data.service";
import * as _ from "lodash";

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

    if (results.type === "getBooksFromAuthor" || results.type === "getBooksFromLatLong") {
      let locations = [];
      let flags = {};

      for (let b in results.data) {
        locations.push(... results.data[b].locationsWithinRadius);
      }

      this.markers = locations.filter((e) => {
        if (flags[e.UID]) return false;
        flags[e.UID] = true;
        return true;
      });

      if (results.type === "getBooksFromAuthor") {
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
    this.dataService.getBooksFromLatLong($event.coords.lat, $event.coords.lng)
      .subscribe(res => this.addMapMarker(res));

  }

}
