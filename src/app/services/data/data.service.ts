import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class DataService {

  resultsChanged$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: Http) {
  }

  public getBooksFromAuthor(authorName: string): any {

    let uri = "http://localhost:8080/booksfromauthor?q=" + encodeURIComponent(authorName);

    return this.http.get(uri)
      .do((res) => {
        let json = res.json();
        json.authorName = authorName;
        json.search = false;
        json.type = "getBooksFromAuthor";
        this.resultsChanged$.next(json)
      })
      .catch(() => {
        let error = {authorName: authorName, data: [], error: true, search: false, type: "getBooksFromAuthor"};
        this.resultsChanged$.next(error);
        return Observable.throw(error);
      });
  }

  public getBooksFromCity(cityName: string): any {

    let uri = "http://localhost:8080/booksfromcity?q=" + encodeURIComponent(cityName);

    return this.http.get(uri)
      .do((res) => {
        let json = res.json();
        json.cityName = cityName;
        json.search = false;
        json.type = "getBooksFromCity";
        this.resultsChanged$.next(json)
      })
      .catch(() => {
        let error = {authorName: cityName, data: [], error: true, search: false, type: "getBooksFromCity"};
        this.resultsChanged$.next(error);
        return Observable.throw(error);
      });
  }

  public getCitiesFromBook(bookTitle: string): any {

    let uri = "http://localhost:8080/citiesfrombook?q=" + encodeURIComponent(bookTitle);

    return this.http.get(uri)
      .do((res) => {
        let json = res.json();
        json.bookTitle = bookTitle;
        json.search = false;
        json.type = "getCitiesFromBook";
        this.resultsChanged$.next(json)
      })
      .catch(() => {
        let error = {bookTitle: bookTitle, data: [], error: true, search: false, type: "getCitiesFromBook"};
        this.resultsChanged$.next(error);
        return Observable.throw(error);
      });
  }

  public getSubject(): Observable<any> {
    return this.resultsChanged$.asObservable();
  }

}
