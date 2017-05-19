import {TestBed, async} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {SidebarResultsComponent} from "../sidebar-results/sidebar-results.component";
import {SidebarSearchComponent} from "../sidebar-search/sidebar-search.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {MapComponent} from "../map/map.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {SearchService} from "../../services/search/search.service";

describe('AppComponent', () => {

  let fixture;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MapComponent,
        SidebarComponent,
        SidebarSearchComponent,
        SidebarResultsComponent
      ],
      providers: [
        SearchService
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

});
