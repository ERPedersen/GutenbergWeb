import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './components/app/app.component';
import {MapComponent} from './components/map/map.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SidebarSearchComponent} from './components/sidebar-search/sidebar-search.component';
import {SidebarResultsComponent} from './components/sidebar-results/sidebar-results.component';
import {SearchService} from "./services/search/search.service";

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
    HttpModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
