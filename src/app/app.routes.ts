import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { NavigationsComponent } from './navigations/navigations.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'navigations', component: NavigationsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
