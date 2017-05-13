import {Component, OnInit} from '@angular/core';
import {BookService} from '../book.service';


@Component({
  moduleId: module.id,
  selector: 'app-sidebar-search',
  templateUrl: './sidebar-search.component.html',
  styleUrls: ['sidebar-search.component.scss'],
  providers: [BookService]
})

export class SidebarSearchComponent implements OnInit {

  public type: string;
  public query: string;
  public errors = {
    type: false,
    query: false
  };

  objects = [];
  errorMessage: string;

  constructor(private bookService: BookService) {
    this.type = '';
    this.query = '';
  }

  ngOnInit(): void {
    this.getObjects();
  }

  getObjects() {
    this.bookService.getResponse()
      .subscribe(function(objects) {
        console.log(objects);
      }, function(error) {
        console.log(error);
      });
  }

  formSubmit() {
    this.validateForm();

    if (!this.errors.type && !this.errors.query) {
      console.log(this.bookService.getResponse());
    } else {
      console.log('Failed');
    }
  }

  validateForm() {
    this.errors.type = this.type === '';
    this.errors.query = this.query === '';
  }
}
