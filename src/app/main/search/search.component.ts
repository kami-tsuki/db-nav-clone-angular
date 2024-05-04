import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DbService} from "../../../services/db.service";
import {Station} from "../../../models/result.StationData.Stations";
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    searchString: string = '';
    offset?: null | number = null;
    category?: null | string = null;
    federalstate?: null | string = null;
    eva?: null | number = null;
    ril?: null | string = null;
    logicaloperator?: null | string = null;
    results: Station[] = [];
    searchUpdated: Subject<string> = new Subject<string>();
    searchTriggered: Subject<void> = new Subject<void>();
    isLoading: boolean = false;

    constructor(
        public dbService: DbService,
        private router: Router,
        private route: ActivatedRoute) {
        this.searchUpdated.pipe(
            debounceTime(5000), // Increase debounce time to 5 seconds
            distinctUntilChanged(),
            takeUntil(this.searchTriggered)) // Cancel debounced search when a manual search is triggered
            .subscribe(value => {
                this.search();
            });
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.searchString = params.get('query') ?? '';
            const offset = params.get('offset') ? params.get('offset') : null;
            this.offset = offset ? parseInt(offset) : null;
            this.category = params.get('category') ?? null;
            this.federalstate = params.get('federalstate') ?? null;
            const eva = params.get('eva') ? params.get('eva') : null;
            this.eva = eva ? parseInt(eva) : null;
            this.ril = params.get('ril') ?? null;
            this.logicaloperator = params.get('logicaloperator') ?? null;
            this.search();
        });
    }

    search() {
        this.searchTriggered.next(); // Emit a value to cancel the debounced search
        this.isLoading = true;
        if (!this.searchString) {
            this.results = [];
            this.isLoading = false;
            return;
        }

        let queryParams: any = {};
        queryParams.query = this.searchString;
        if (this.category !== null) queryParams.category = this.category;
        if (this.federalstate !== null) queryParams.federalstate = this.federalstate;
        if (this.ril !== null) queryParams.ril = this.ril;
        if (this.logicaloperator !== null) queryParams.logicaloperator = this.logicaloperator;
        if (this.offset !== null) queryParams.offset = this.offset;
        if (this.eva !== null) queryParams.eva = this.eva;

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: queryParams,
            queryParamsHandling: 'merge'
        });

        this.dbService.getSearchStationData(this.searchString, 15, this.offset, this.category, this.federalstate, this.eva, this.ril, this.logicaloperator).subscribe(
            (value: { data: { result: Station[]; }; }) => {
                this.results = value?.data?.result || [];
                this.isLoading = false;
            },
            (error: any) => {
                this.isLoading = false;
            }
        );
    }

    onSearchChange(): void {
        this.searchUpdated.next(this.searchString);
    }
}
