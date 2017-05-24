import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {SearchService} from "../../services/search/search.service";
import {Subscription} from 'rxjs';
import {DataService} from "../../services/data/data.service";

@Component({
  moduleId: module.id,
  selector: 'app-sidebar-results',
  templateUrl: './sidebar-results.component.html',
  styleUrls: ['./sidebar-results.component.scss'],
  providers: [DataService]
})
export class SidebarResultsComponent implements OnInit, OnDestroy {

  public results;
  public hasSearched;
  public subscription: Subscription;
  public searching: boolean;

  constructor(private searchService: SearchService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.subscription = this.searchService.getSubject().subscribe(results => this.setSearchResults(results));
    this.hasSearched = false;
    this.searching = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setSearchResults(results) {
    this.results = results;
    this.hasSearched = true;
  }

  getLocations(bookTitle: string): void {
    this.searching = true;
    this.dataService.getCitiesFromBook(bookTitle).subscribe((res) => {

      res.data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

      this.results = res;
      this.searching = false;
    });
  }

  getBooksFromCity(city: string): void {
    this.searching = true;
    this.dataService.getBooksFromCity(city).subscribe((res) => {
      this.results = res;
      this.searching = false;
    });
  }

  getBooksFromAuthor(authorName: string): void {
    this.searching = true;
    this.dataService.getBooksFromAuthor(authorName).subscribe((res) => {
      this.results = res;
      this.searching = false;
    });
  }

}
