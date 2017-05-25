import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MapComponent} from "./map.component";
import {AgmCircle, AgmCoreModule, AgmMap, AgmMarker} from "@agm/core";
import {DataServiceMock} from "app/services/data/data.service.mock";
import {DataService} from "app/services/data/data.service";
import {HttpModule} from "@angular/http";

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

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
