import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSearchComponent } from './sidebar-search.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('SidebarSearchComponent', () => {
  let component: SidebarSearchComponent;
  let fixture: ComponentFixture<SidebarSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarSearchComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should invalidate the search form type or query is empty', () => {
  //   // component.type = "";
  //   // component.query = "";
  //   expect(component.errors.type).toBeTruthy();
  //   expect(component.errors.query).toBeTruthy();
  // })
});
