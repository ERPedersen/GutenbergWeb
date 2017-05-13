import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book/book.service';


@Component({
  moduleId: module.id,
  selector: 'app-sidebar-search',
  templateUrl: './sidebar-search.component.html',
  styleUrls: ['sidebar-search.component.scss'],
  providers: [BookService]
})

export class SidebarSearchComponent {

  public type: string;
  public query: string;
  public errors = {
    type: false,
    query: false
  };

  constructor() {
    this.type = '';
    this.query = '';
  }

  formSubmit() {
    this.validateForm();

    if (!this.errors.type && !this.errors.query) {
      console.log('Success');
    } else {
      console.log('Failed');
    }
  }

  validateForm() {
    this.validateType();
    this.validateQuery();
  }

  validateType() {
    this.errors.type = this.type === '';
  }

  validateQuery() {
    this.errors.query = this.query === '';
  }
}
