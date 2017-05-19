import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {SearchService} from "../../services/search/search.service";
import {Subscription} from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'app-sidebar-results',
  templateUrl: './sidebar-results.component.html',
  styleUrls: ['./sidebar-results.component.scss']
})
export class SidebarResultsComponent implements OnInit, OnDestroy {

  public results;
  public hasSearched;
  public subscription: Subscription;

  constructor(private searchService: SearchService) {
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

}
