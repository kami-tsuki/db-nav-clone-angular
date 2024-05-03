import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {SearchComponent} from "./main/search/search.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {provideRouter, RouterLink, RouterOutlet, Routes} from "@angular/router";
import {HomeComponent} from "./main/home/home.component";
import {NavigationsComponent} from "./main/navigations/navigations.component";
import {DbService} from "../services/db.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {StationDetailComponent} from "./main/search/station-detail/station-detail.component";
import {
    IconExplanationDialogComponent
} from "./main/search/station-detail/icon-explanation-dialog/icon-explanation-dialog.component";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ConfigService} from "../services/config.service";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {HeaderComponent} from "./shared/header/header.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {CacheService} from "../services/cache.service";

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'search', component: SearchComponent},
    {path: 'navigations', component: NavigationsComponent},
    {path: 'station-detail', component: StationDetailComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
    declarations: [
        SearchComponent,
        AppComponent,
        StationDetailComponent,
        IconExplanationDialogComponent,
        HeaderComponent,
        HomeComponent,
        NavigationsComponent,
        NavbarComponent,
        FooterComponent
    ],
    imports: [
        HttpClientModule,
        RouterOutlet,
        RouterLink,
        FormsModule,
        NgForOf,
        BrowserModule,
        MatDialogContent,
        MatTabGroup,
        MatTab,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatIcon,
        MatIconButton
    ],
    providers: [
        HttpClient,
        provideRouter(routes),
        DbService,
        CacheService,
        ConfigService,
        provideAnimationsAsync()],
    bootstrap: [
        AppComponent
    ],
    exports: [
        SearchComponent,
        AppComponent,
        StationDetailComponent,
        IconExplanationDialogComponent,
        HeaderComponent,
        HomeComponent,
        NavigationsComponent,
        NavbarComponent,
        FooterComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class AppModule {
}
