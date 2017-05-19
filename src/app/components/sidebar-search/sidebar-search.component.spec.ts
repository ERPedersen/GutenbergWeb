import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarSearchComponent} from './sidebar-search.component';
import {SearchService} from '../../services/search/search.service';
import {HttpModule, JsonpModule, Http} from '@angular/http';
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";

describe('SidebarSearchComponent', () => {
  let component: SidebarSearchComponent;
  let fixture: ComponentFixture<SidebarSearchComponent>;
  let searchService: SearchService;

  const SEARCH_OBJECT = [{type: "books", data: ["1", "2", "3"]}];

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
    searchService = TestBed.get(SearchService);

    spyOn(searchService, "getSearchResults").and.returnValue(Observable.of(SEARCH_OBJECT));
    spyOn(searchService, "getSubject").and.returnValue(Observable.of(SEARCH_OBJECT));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should construct', () => {
    component.constructor(searchService);
    expect(component).toBeTruthy();
  });

  it('should invalidate the search query if empty', () => {
    component.query = '';
    component.validateQuery();
    expect(component.errors.query).toBeTruthy();
  });

  it('should invalidate the search type if empty', () => {
    component.type = '';
    component.validateType();
    expect(component.errors.type).toBeTruthy();
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

  it('should return the books from the search.service', () => {
    component.type = 'authors';
    component.query = 'test';
    component.formSubmit();
    expect(component.books).toBe(SEARCH_OBJECT);
  });

});
