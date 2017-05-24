import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AgmCoreModule} from '@agm/core';

import {AppComponent} from './components/app/app.component';
import {MapComponent} from './components/map/map.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SidebarSearchComponent} from './components/sidebar-search/sidebar-search.component';
import {SidebarResultsComponent} from './components/sidebar-results/sidebar-results.component';
import {SearchService} from "./services/search/search.service";
import {DataService} from "./services/data/data.service";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidebarComponent,
    SidebarSearchComponent,
    SidebarResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAtZnU28zd51Mfl2hv8JLKHKoH7Ja-JpyQ'
    })
  ],
  providers: [SearchService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
