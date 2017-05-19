import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class SearchService {

  searchResultsChanged$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: Http) {
  }

  public getSearchResults(type, query) {

    let uri: string;

    switch (type) {
      case "books":
        uri = "http://localhost:8080/api/mysql/fuzzybook/" + encodeURIComponent(query);
        break;
      case "authors":
        uri = "http://localhost:8080/api/mysql/fuzzyauthor/" + encodeURIComponent(query);
        break;
      case "locations":
        uri = "http://localhost:8080/api/mysql/fuzzycity/" + encodeURIComponent(query);
        break;
    }

    return this.http.get(uri).
      do(res => this.searchResultsChanged$.next(res.json()));
  }

  public getSubject(): Observable<any> {
    return this.searchResultsChanged$.asObservable();
  }
}
