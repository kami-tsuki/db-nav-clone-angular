import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DbService} from "../../../services/db.service";
import {Station} from "../../../models/resultModel";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    searchString: any;
    results: Station[] = [];

    constructor(
        public dbService: DbService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            const newSearchString = params.get('query');
            if (newSearchString !== this.searchString) {
                this.searchString = newSearchString;
                if (this.searchString) {
                    this.search();
                }
            }
        });
    }

    search() {
        if (!this.searchString) {
            return;
        }

        this.router.navigate(
            [], {
                relativeTo: this.route,
                queryParams: {query: this.searchString},
                queryParamsHandling: 'merge'
            });

        this.dbService.getSearchStationData(this.searchString).subscribe(
            (value: { data: { result: Station[]; }; }) => {
                console.log("search " + this.searchString + " result :", value?.data?.result)
                this.results = value?.data?.result;
            }
        );
    }
}
