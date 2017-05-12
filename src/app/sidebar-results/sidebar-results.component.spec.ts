import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarResultsComponent } from './sidebar-results.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('SidebarResultsComponent', () => {
  let component: SidebarResultsComponent;
  let fixture: ComponentFixture<SidebarResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarResultsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
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
