import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {SearchComponent} from "./search/search.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {provideRouter, RouterLink, RouterOutlet, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {NavigationsComponent} from "./navigations/navigations.component";
import {DbService} from "./service/db.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {StationDetailComponent} from "./station-detail/station-detail.component";

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'navigations', component: NavigationsComponent},
  {path: 'station-detail', component: StationDetailComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];
@NgModule({
  declarations: [SearchComponent, AppComponent, StationDetailComponent],
  imports: [
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
    NgForOf,
    BrowserModule
  ],
  providers: [HttpClient, provideRouter(routes), DbService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}
