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

  public getSubject(): Observable<any> {
    return this.resultsChanged$.asObservable();
  }

}
