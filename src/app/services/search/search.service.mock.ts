import {Injectable} from "@angular/core";
import {Observable, BehaviorSubject} from "rxjs";
import 'rxjs/add/operator/do';

@Injectable()
export class SearchServiceMock {

  searchResultsChanged$: BehaviorSubject<any> = new BehaviorSubject([]);

  public getSearchResults(type, query) {
    return Observable.of(
      {
        type: type,
        data: []
      }
    ).do(res => this.searchResultsChanged$.next(res));
  }

  public getSubject() {
    return this.searchResultsChanged$.asObservable();
  }
}
