import {async, ComponentFixture, inject, TestBed} from "@angular/core/testing";
import {MapComponent} from "./map.component";
import {AgmCircle, AgmCoreModule, AgmMap, AgmMarker} from "@agm/core";
import {DataServiceMock} from "app/services/data/data.service.mock";
import {DataService} from "app/services/data/data.service";
import {HttpModule} from "@angular/http";
import {SearchService} from "../../services/search/search.service";
import {SearchServiceMock} from "../../services/search/search.service.mock";

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapComponent
      ],
      providers: [
        { provide: DataService, useClass: DataServiceMock },
        DataService
      ],
      imports: [
        HttpModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyAtZnU28zd51Mfl2hv8JLKHKoH7Ja-JpyQ'
        })
      ]
    });
  }));

  it('should be injectable', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dataService.getBooksFromLatLong on mapClicked with event coordinates', inject([DataService], (service: DataService) => {
    let r;
    const eventObjectMock: any = { coords: { lat: 50.8475, lng: 16.52} };

    service.getSubject().subscribe(results => r = results);
    component.mapClicked(eventObjectMock);

    service.getBooksFromLatLong(eventObjectMock.coords.lat, eventObjectMock.coords.lng).subscribe((books) => {
      expect(r.type).toBe("getBooksFromLatLong");
      expect(r.lat).toBe(eventObjectMock.coords.lat);
      expect(r.long).toBe(eventObjectMock.coords.lng);
    });
  }));

  it('should add markers on author search', inject([DataService], (service: DataService) => {
    let r;
    service.getSubject().subscribe(results => r = results);
    spyOn(component, "addMapMarker");

    service.getBooksFromAuthor("John").subscribe((books) => {
      expect(r.type).toBe("getBooksFromAuthor");
      expect(component.addMapMarker).toHaveBeenCalled();
    });
  }));
});
