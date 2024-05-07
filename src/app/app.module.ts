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
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ConfigService} from "../services/config.service";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {HeaderComponent} from "./shared/header/header.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {CacheService} from "../services/cache.service";
import {TimetableComponent} from "./main/timetable/timetable.component";
import {TrainInfoDialog} from "./main/timetable/train-info-dialog/train-info-dialog.component";
import {
    FacilityInformationComponent
} from "./main/search/station-detail/facility-information/facility-information.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatList, MatListItem} from "@angular/material/list";

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'search', component: SearchComponent},
    {path: 'navigations', component: NavigationsComponent},
    {path: 'station-detail', component: StationDetailComponent},
    {path: 'timetable', component: TimetableComponent},
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
        FooterComponent,
        TimetableComponent,
        TrainInfoDialog,
        FacilityInformationComponent
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
        MatIconButton,
        MatDialogTitle,
        MatCard,
        MatCardTitle,
        MatCardContent,
        MatToolbar,
        MatCardHeader,
        MatProgressSpinner,
        MatFormField,
        MatInput,
        MatList,
        MatListItem
    ],
    providers: [
        HttpClient,
        provideRouter(routes),
        DbService,
        CacheService,
        ConfigService,
        provideAnimationsAsync()],
    bootstrap: [
        AppComponent,
        AppComponent,
        StationDetailComponent,
        IconExplanationDialogComponent,
        HeaderComponent,
        HomeComponent,
        NavigationsComponent,
        NavbarComponent,
        FooterComponent,
        TimetableComponent,
        TrainInfoDialog,
        FacilityInformationComponent
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
        FooterComponent,
        TimetableComponent,
        TrainInfoDialog,
        FacilityInformationComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class AppModule {
}
