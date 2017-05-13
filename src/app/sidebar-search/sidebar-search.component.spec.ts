import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarSearchComponent} from './sidebar-search.component';
import {BookService} from '../book.service';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule} from "@angular/forms";

describe('SidebarSearchComponent', () => {
  let component: SidebarSearchComponent;
  let fixture: ComponentFixture<SidebarSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarSearchComponent
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
    fixture = TestBed.createComponent(SidebarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate the search form when type or query is empty', () => {
    component.type = '';
    component.query = '';
    component.formSubmit();
    expect(component.errors.type).toBeTruthy();
    expect(component.errors.query).toBeTruthy();
  });

  it('should validate the search form when type and query is set', () => {
    component.type = 'author';
    component.query = 'test';
    component.formSubmit();
    expect(component.errors.type).toBeFalsy();
    expect(component.errors.query).toBeFalsy();
  });
});
