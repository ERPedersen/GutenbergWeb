import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class BookService {

  booksChanged$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: Http) {
  }

  public getBooks() {
    return this.http.get('http://localhost:3000/books').
      do(res => this.booksChanged$.next(res.json()));
  }

  public getSubject(): Observable<any> {
    return this.booksChanged$.asObservable();
  }
}
