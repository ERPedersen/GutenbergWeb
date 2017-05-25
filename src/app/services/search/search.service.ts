import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class SearchService {

  searchResultsChanged$: BehaviorSubject<any> = new BehaviorSubject([]);
  private baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = "http://zesty.emilrosenius.dk:8080/api/mysql"
  }

  public getSearchResults(type, query) {

    let uri: string;

    switch (type) {
      case "book":
        uri = this.baseUrl + "/search/book?q=" + encodeURIComponent(query);
        break;
      case "author":
        uri = this.baseUrl + "/search/author?q=" + encodeURIComponent(query);
        break;
      case "city":
        uri = this.baseUrl + "/search/city?q=" + encodeURIComponent(query);
        break;
    }

    return this.http.get(uri)
      .do((res) => {
        let json = res.json();
        json.query = query;
        json.data = this.trimData(json.data);
        json.data = this.sortData(json.data);
        this.searchResultsChanged$.next(json)
      })
      .catch(() => this.handleError(type, query));
  }

  public getSubject(): Observable<any> {
    return this.searchResultsChanged$.asObservable();
  }

  trimData(input) {
    for (let e in input) {
      input[e] = input[e].trim();
    }
    return input;
  }

  sortData(input) {
    input.sort((a, b) => {
      if (a < b ) return -1;
      if (a > b ) return 1;
      return 0;
    });
    return input;
  }

  handleError(type, query) {
    let error = {type: type, query: query, data: [], error: true};
    this.searchResultsChanged$.next(error);
    return Observable.throw(error);
  }


}
