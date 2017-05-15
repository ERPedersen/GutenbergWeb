import {Component} from '@angular/core';
import {BookService} from '../../services/book/book.service';


@Component({
  moduleId: module.id,
  selector: 'app-sidebar-search',
  templateUrl: 'sidebar-search.component.html',
  styleUrls: ['sidebar-search.component.scss']
})

export class SidebarSearchComponent {

  public type: string;
  public query: string;
  public loading: boolean;
  public errors = {
    type: false,
    query: false
  };

  constructor(private bookService: BookService) {
    this.type = '';
    this.query = '';
  }

  formSubmit() {
    this.validateForm();

    if (!this.errors.type && !this.errors.query) {
      this.loading = true;
      // @todo: Simulate delay for testing purpose
      setTimeout(() => this.getBooks(), 2000);
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

  private getBooks() {
    this.bookService.getBooks();
    this.loading = false;
  }
}
