import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarSearchComponent } from './sidebar-search/sidebar-search.component';
import { SidebarResultsComponent } from './sidebar-results/sidebar-results.component';

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
    JsonpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
