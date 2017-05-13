import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import {SidebarResultsComponent} from "../sidebar-results/sidebar-results.component";
import {SidebarSearchComponent} from "../sidebar-search/sidebar-search.component";
import {FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";

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
      imports: [
        FormsModule,
        HttpModule,
        JsonpModule
      ]
    })
    .compileComponents();
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
