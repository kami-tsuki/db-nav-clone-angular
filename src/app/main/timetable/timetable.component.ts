import {Component, OnInit} from '@angular/core';
import {DbService} from "../../../services/db.service";
import {ActivatedRoute, Router} from "@angular/router";
import {convertToModel, Timetable, TimetableStop} from "../../../models/result.TimeTable.Plan";
import {timeInterval} from "rxjs";
import {MatDialog} from '@angular/material/dialog';
import {TrainInfoDialog} from "./train-info-dialog/train-info-dialog.component";

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
        private router: Router,
        public dialog: MatDialog
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

    openDialog(stop: any) {
        this.dialog.open(TrainInfoDialog, {
            data: {
                stop: stop
            }
        });
    }


    protected readonly timeInterval = timeInterval;
}
