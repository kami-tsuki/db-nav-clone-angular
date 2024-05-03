import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DbService} from "../../../services/db.service";
import {Station} from "../../../models/result.StationData.Stations";
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {typeCheckFilePath} from "@angular/compiler-cli/src/ngtsc/typecheck";
import {typeNodeToValueExpr} from "@angular/compiler-cli/src/ngtsc/reflection";
import {offsetSegment} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    searchString: string = '';
    offset: null | number = null;
    category: null | string = null;
    federalstate: null | string = null;
    eva: null | number = null;
    ril: null | string = null;
    logicaloperator: null | string = null;
    results: Station[] = [];
    searchUpdated: Subject<string> = new Subject<string>();

    constructor(
        public dbService: DbService,
        private router: Router,
        private route: ActivatedRoute) {
        this.searchUpdated.pipe(
            debounceTime(3000),
            distinctUntilChanged())
            .subscribe(value => {
                this.search();
            });
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.searchString = params.get('query') ?? localStorage.getItem('cachedSearchString') ?? '';
            let offset: string | null = params.get('offset') ? params.get('offset'): localStorage.getItem('offset') ? localStorage.getItem('offset') : null;
            this.offset = offset ? parseInt(offset) : null;
            this.category = params.get('category') ?? localStorage.getItem('category') ?? null;
            this.federalstate = params.get('federalstate') ?? localStorage.getItem('federalstate') ?? null;
            let eva: string | null = params.get('eva') ? params.get('eva') : localStorage.getItem('eva') ? localStorage.getItem('eva') : null;
            this.offset = eva ? parseInt(eva) : null;
            this.ril = params.get('ril') ?? localStorage.getItem('ril') ?? null;
            this.logicaloperator = params.get('logicaloperator') ?? localStorage.getItem('logicaloperator') ?? null;
            this.search();
        });
    }


    search() {
        if (!this.searchString) {
            this.results = [];
            return;
        }

        let queryParams: any = {
            query: this.searchString,
            category: this.category,
            federalstate: this.federalstate,
            ril: this.ril,
            logicaloperator: this.logicaloperator
        };

        if (this.offset !== null) {
            queryParams.offset = this.offset;
            localStorage.setItem('offset', String(this.offset));
        } else {
            localStorage.removeItem('offset');
        }

        if (this.eva !== null) {
            queryParams.eva = this.eva;
            localStorage.setItem('eva', String(this.eva));
        } else {
            localStorage.removeItem('eva');
        }

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: queryParams,
            queryParamsHandling: 'merge'
        });

        this.dbService.getSearchStationData(this.searchString, 15, this.offset, this.category, this.federalstate, this.eva, this.ril, this.logicaloperator).subscribe(
            (value: { data: { result: Station[]; }; }) => {
                console.log("search " + this.searchString + " result :", value?.data?.result || [])
                this.results = value?.data?.result || [];
                localStorage.setItem('cachedSearchString', this.searchString);
                this.category !== null ? localStorage.setItem('category', this.category) : localStorage.removeItem('category');
                this.federalstate !== null ? localStorage.setItem('federalstate', this.federalstate) : localStorage.removeItem('federalstate');
                this.ril !== null ? localStorage.setItem('ril', this.ril) : localStorage.removeItem('ril');
                this.logicaloperator !== null ? localStorage.setItem('logicaloperator', this.logicaloperator) : localStorage.removeItem('logicaloperator');
            }
        );
    }

    onSearchChange(): void {
        this.searchUpdated.next(this.searchString);
    }
}
