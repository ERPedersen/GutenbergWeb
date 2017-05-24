import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {SidebarSearchComponent} from './sidebar-search.component';
import {SearchService} from '../../services/search/search.service';
import {HttpModule, JsonpModule, Http} from '@angular/http';
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {SearchServiceMock} from "../../services/search/search.service.mock";

describe('SidebarSearchComponent', () => {
  let component: SidebarSearchComponent;
  let fixture: ComponentFixture<SidebarSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarSearchComponent
      ],
      providers: [
        {provide: SearchService, useClass: SearchServiceMock}
      ],
      imports: [
        FormsModule,
        HttpModule
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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

  it('should give books when searching for books.', () => {
    component.type = 'book';
    component.query = 'test';
    component.formSubmit();
    expect(component.results.type).toBe('book');
  });

  it('should give authors when searching for authors.', () => {
    component.type = 'author';
    component.query = 'test';
    component.formSubmit();
    expect(component.results.type).toBe('author');
  });

  it('should give locations when searching for books.', () => {
    component.type = 'location';
    component.query = 'test';
    component.formSubmit();
    expect(component.results.type).toBe('location');
  });

  // it('should invalidate the search form when type or query is empty', () => {
  //   component.type = '';
  //   component.query = '';
  //   component.formSubmit();
  //   expect(component.errors.type).toBeTruthy();
  //   expect(component.errors.query).toBeTruthy();
  // });
  //
  // it('should validate the search form when type and query is set', () => {
  //   component.type = 'author';
  //   component.query = 'test';
  //   component.formSubmit();
  //   expect(component.errors.type).toBeFalsy();
  //   expect(component.errors.query).toBeFalsy();
  // });

});
