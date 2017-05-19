import {Component} from '@angular/core';
import {SearchService} from '../../services/search/search.service';


@Component({
  moduleId: module.id,
  selector: 'app-sidebar-search',
  templateUrl: 'sidebar-search.component.html',
  styleUrls: ['sidebar-search.component.scss']
})

export class SidebarSearchComponent {

  public books: any;
  public type: string;
  public query: string;
  public loading: boolean;
  public errors = {
    type: false,
    query: false
  };

  constructor(private searchService: SearchService) {
    this.type = '';
    this.query = '';
  }

  formSubmit() {
    this.validateForm();

    if (!this.errors.type && !this.errors.query) {
      this.loading = true;
      this.search(this.type, this.query);
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

  private search(type, query) {
    this.searchService.getSearchResults(type, query).subscribe((books) => {
      this.loading = false;
      this.books = books;
    });
  }
}
