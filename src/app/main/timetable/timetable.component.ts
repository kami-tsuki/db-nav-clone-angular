import {Component, OnInit} from '@angular/core';
import {DbService} from "../../../services/db.service";
import {ActivatedRoute, Router} from "@angular/router";
import {convertToModel, Timetable} from "../../../models/result.TimeTable.Plan";
import {timeInterval} from "rxjs";

@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
    timetable: Timetable;

    constructor(
        private dbService: DbService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const evaNo = params['evaNo'] || undefined;
            const now = new Date();
            const year = now.getFullYear().toString().slice(-2);
            const month = ('0' + (now.getMonth() + 1)).slice(-2);
            const day = ('0' + now.getDate()).slice(-2);
            const date = params['date'] || year + month + day;
            const hour = params['hour'] || ('0' + now.getHours()).slice(-2);

            if (!evaNo) {
                this.router.navigate(['/search']);
            } else {
                this.getTimeTable(evaNo, date, hour);
            }
        });
    }

    getTimeTable(eva: string, date: string, hour: string) {
        this.dbService.getTimeTablesPlan(eva, date, hour, true, false)
            .subscribe((value: any) => {
                console.log("response: ", value);
                this.timetable = convertToModel(value?.data?.timetable);
                console.log("timetable: ", this.timetable)
            });
    }

    protected readonly timeInterval = timeInterval;
}
