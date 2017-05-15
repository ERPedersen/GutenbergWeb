import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SidebarResultsComponent} from "./sidebar-results.component";
import {BookService} from "../../services/book/book.service";
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
        BookService
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
