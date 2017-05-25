import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import {SidebarResultsComponent} from "../sidebar-results/sidebar-results.component";
import {SidebarSearchComponent} from "../sidebar-search/sidebar-search.component";
import {FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {SearchService} from "../../services/search/search.service";
import {DataService} from "../../services/data/data.service";
import {DataServiceMock} from "../../services/data/data.service.mock";
import {SearchServiceMock} from "../../services/search/search.service.mock";

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        SidebarSearchComponent,
        SidebarResultsComponent
      ],
      providers: [
        SearchService,
        DataService
      ],
      imports: [
        FormsModule,
        HttpModule
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
