import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SidebarResultsComponent} from "./sidebar-results.component";
import {SearchService} from "../../services/search/search.service";
import {JsonpModule, HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

describe('SidebarResultsComponent', () => {
  let component: SidebarResultsComponent;
  let fixture: ComponentFixture<SidebarResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarResultsComponent
      ],
      providers: [
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
});
