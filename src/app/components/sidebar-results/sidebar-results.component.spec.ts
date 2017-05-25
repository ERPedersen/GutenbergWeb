import {async, ComponentFixture, inject, TestBed} from "@angular/core/testing";
import {SidebarResultsComponent} from "./sidebar-results.component";
import {SearchService} from "../../services/search/search.service";
import {JsonpModule, HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {DataService} from "../../services/data/data.service";
import {Data} from "@angular/router";
import {DataServiceMock} from "../../services/data/data.service.mock";
import {SearchServiceMock} from "../../services/search/search.service.mock";

describe('SidebarResultsComponent', () => {
  let component: SidebarResultsComponent;
  let fixture: ComponentFixture<SidebarResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarResultsComponent
      ],
      providers: [
        {provide: DataService, useClass: DataServiceMock},
        {provide: SearchService, useClass: SearchServiceMock},
        SearchService
      ],
      imports: [
        FormsModule,
        HttpModule,
        JsonpModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give and empty array of books on getBooksFromAuthor',
    inject([DataService], (dataService: DataService) => {
      component.getBooksFromAuthor("John Cena");
      expect(component.results.type).toBe("getBooksFromAuthor");
      expect(component.results.authorName).toBe("John Cena");
      expect(component.results.data.length).toBe(0);
      expect(component.results.search).toBeFalsy();
    })
  );

  it('should give and empty array of books on getBooksFromCity',
    inject([DataService], (dataService: DataService) => {
      component.getBooksFromCity("Copenhagen");
      expect(component.results.type).toBe("getBooksFromCity");
      expect(component.results.cityName).toBe("Copenhagen");
      expect(component.results.data.length).toBe(0);
      expect(component.results.search).toBeFalsy();
    })
  );

  it('should give and empty array of books on getLocations',
    inject([DataService], (dataService: DataService) => {
      component.getLocations("Adventures of the One");
      expect(component.results.type).toBe("getCitiesFromBook");
      expect(component.results.bookTitle).toBe("Adventures of the One");
      expect(component.results.data.length).toBe(0);
      expect(component.results.search).toBeFalsy();
    })
  );

});
