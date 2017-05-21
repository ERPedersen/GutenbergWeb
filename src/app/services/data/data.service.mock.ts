import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {BehaviorSubject, Observable} from "rxjs";
import 'rxjs/add/operator/do';

@Injectable()
export class DataServiceMock {

  resultsChanged$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: Http) {}

  public getBooksFromAuthor(authorName: string): any {

    return Observable.of(
      {
        type: "getBooksFromAuthor",
        data: [],
        search: false,
        authorName: authorName
      }
    ).do(res => this.resultsChanged$.next(res));

  }

  public getBooksFromCity(cityName: string): any {

    return Observable.of(
      {
        type: "getBooksFromCity",
        data: [],
        search: false,
        cityName: cityName
      }
    ).do(res => this.resultsChanged$.next(res));
  }

  public getCitiesFromBook(bookTitle: string): any {

    return Observable.of(
      {
        type: "getCitiesFromBook",
        data: [],
        search: false,
        bookTitle: bookTitle
      }
    ).do(res => this.resultsChanged$.next(res));
  }

  public getBooksFromLatLong(lat: number, long: number): any {

    return Observable.of(
      {
        type: "getBooksFromLatLong",
        data: [],
        search: false,
        lat: lat,
        long: long
      }
    ).do(res => this.resultsChanged$.next(res));
  }

  public getSubject(): Observable<any> {
    return this.resultsChanged$.asObservable();
  }

}
