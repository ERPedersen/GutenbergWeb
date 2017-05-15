import {Component, OnInit, Input} from '@angular/core';
import {BookService} from "../../services/book/book.service";
import { Subject } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'app-sidebar-results',
  templateUrl: './sidebar-results.component.html',
  styleUrls: ['./sidebar-results.component.scss'],
  inputs: ['books']
})
export class SidebarResultsComponent implements OnInit {

  books;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getSubject().subscribe(books => this.setBooks(books));
  }

  private setBooks(books) {
    this.books = books;
  }

}
