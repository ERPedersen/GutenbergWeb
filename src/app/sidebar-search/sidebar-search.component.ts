import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-sidebar-search',
  templateUrl: './sidebar-search.component.html',
  styleUrls: ['sidebar-search.component.scss']
})
export class SidebarSearchComponent implements OnInit {

  public type: string;
  public query: string;
  public errors = {
    type: false,
    query: false
  };

  constructor() {
    this.type = 'none';
    this.query = '';
  }

  ngOnInit(): void {
  }

  formSubmit() {
    this.validateForm();

    if (!this.errors.type && !this.errors.query) {
      console.log('Success');
    } else {
      console.log('Fail');
    }
  }

  validateForm() {
    this.errors.type = this.type === 'none' || this.type === '';
    this.errors.query = this.query === '';
  }
}
