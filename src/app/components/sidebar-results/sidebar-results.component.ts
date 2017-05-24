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

  constructor(private searchService: SearchService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.subscription = this.searchService.getSubject().subscribe(results => this.setSearchResults(results));
    this.hasSearched = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setSearchResults(results) {
    this.results = results;
    this.hasSearched = true;
  }

  getLocations(bookTitle: string): void {
    this.dataService.getCitiesFromBook(bookTitle).subscribe((res) => {
      console.log(res);
    });
  }

}
