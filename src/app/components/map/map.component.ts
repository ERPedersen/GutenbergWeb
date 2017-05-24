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
  public searching = false;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.subscription = this.dataService.getSubject().subscribe(results => this.addMapMarker(results));
  }

  public addMapMarker(results) {

    this.circle.visible = false;

    if (results.type === "getBooksFromAuthor" || results.type === "getBooksFromLatLong") {
      let locations = [];
      let flags = {};

      if (results.type === "getBooksFromLatLong") {
        for (let b in results.data) {
          locations.push(...results.data[b].locationsWithinRadius);
        }
      } else if (results.type === "getBooksFromAuthor") {
        for (let b in results.data) {
          locations.push(...results.data[b].locations);
        }
      }

      this.markers = locations.filter((e) => {
        if (flags[e.UID]) return false;
        flags[e.UID] = true;
        return true;
      });

      if (results.type === "getBooksFromAuthor") {
        this.zoom = 3;
      } else if (results.type === "getBooksFromLatLong") {
        this.searching = false;
        this.circle.visible = true;
      }

    }
  }

  public mapClicked($event) {
    this.circle.lat = $event.coords.lat;
    this.circle.lng = $event.coords.lng;
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.zoom = 8;
    this.searching = true;

    // Make lat long query
    this.dataService.getBooksFromLatLong($event.coords.lat, $event.coords.lng)
      .subscribe(res => this.addMapMarker(res));

  }

}
