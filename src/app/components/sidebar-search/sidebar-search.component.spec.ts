import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarSearchComponent} from './sidebar-search.component';
import {SearchService} from '../../services/search/search.service';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";

describe('SidebarSearchComponent', () => {
  let component: SidebarSearchComponent;
  let fixture: ComponentFixture<SidebarSearchComponent>;
  let searchService: SearchService;

  const SUBJECT = [
    {
      UID: 1643012885599,
      title: "Flee To The Apocolypse",
      text: 0,
      authors: [
        {
          UID: 1633031650299,
          name: "Sade J. Estrada"
        }
      ],
      locations: [
        {
          name: "Crystal Springs",
          lat: -66.18598,
          long: 148.63678
        },
        {
          name: "Blue Mountains",
          lat: 35.64578,
          long: 126.71533
        }
      ]
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarSearchComponent
      ],
      providers: [
        SearchService
      ],
      imports: [
        FormsModule,
        HttpModule,
        JsonpModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate the search form when type or query is empty.', () => {
    component.type = '';
    component.query = '';
    component.formSubmit();
    expect(component.errors.type).toBeTruthy();
    expect(component.errors.query).toBeTruthy();
  });

  it('should validate the search form when type and query is set.', () => {
    component.type = 'authors';
    component.query = 'test';
    component.formSubmit();
    expect(component.errors.type).toBeFalsy();
    expect(component.errors.query).toBeFalsy();
  });

});
