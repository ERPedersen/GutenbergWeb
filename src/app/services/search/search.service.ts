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
      case "location":
        uri = this.baseUrl + "/search/location?q=" + encodeURIComponent(query);
        break;
    }

    return this.http.get(uri)
      .do((res) => {
        let json = res.json();
        json.query = query;

        for (let e of json.data) {
          e = e.trim();
        }

        json.data.sort((a, b) => {
          if (a < b ) return -1;
          if (a > b ) return 1;
          return 0;
        });

        this.searchResultsChanged$.next(json)
      })
      .catch(() => {
        let error = {type: type, query: query, data: [], error: true};
        this.searchResultsChanged$.next(error);
        return Observable.throw(error);
      });
  }

  public getSubject(): Observable<any> {
    return this.searchResultsChanged$.asObservable();
  }


}
