import {Component, OnInit} from '@angular/core';
import {DbService} from "../../../services/db.service";
import {ActivatedRoute, Router} from "@angular/router";
import {combineAndSortStops, convertToModel, Timetable} from "../../../models/result.TimeTable.Plan";
import {timeInterval} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
    timetable: Timetable;
    isLoading = true;
    evaNo: string;
    nowDate: string;
    selectedDateTime: Date;
    now: Date;
    nowHour: string;
    earlierOffset = 0;
    laterOffset = 0;

    constructor(
        private dbService: DbService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
    ) {
        this.isLoading = true;
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
            this.nowDate = now.getFullYear().toString().slice(-2) + ('0' + (now.getMonth() + 1)).slice(-2) + ('0' + now.getDate()).slice(-2);
            this.nowHour = ('0' + now.getHours()).slice(-2);

            if (!evaNo) this.router.navigate(['/search'])
                .then(r => console.log('Navigated to search'));
            else this.getTimeTable(evaNo, date, hour);
        });
    }

    getTimeTable(eva: string, date: string, hour: string, add: boolean = false) {
        this.evaNo = eva;
        this.isLoading = true;
        this.dbService.getTimeTablesPlan(eva, date, hour, true, false)
            .subscribe((value: any) => {
                if (value?.msg?.error) {
                    this.isLoading = false;
                    this.snackBar.open(value.msg.message, 'Close', { duration: 3000 }); // Display the error message
                    return;
                }

                const newTimetable = convertToModel(value?.data?.timetable);
                if (add && this.timetable) this.timetable.stops = combineAndSortStops([this.timetable, newTimetable]);
                else this.timetable = newTimetable;
                this.isLoading = false;
            });
    }

    addEarlier() {
        this.earlierOffset++;
        const earlierHour = ('0' + (parseInt(this.nowHour) - this.earlierOffset)).slice(-2);
        this.getTimeTable(this.evaNo, this.nowDate, earlierHour, true);
    }

    addLater() {
        this.laterOffset++;
        const laterHour = ('0' + (parseInt(this.nowHour) + this.laterOffset)).slice(-2);
        this.getTimeTable(this.evaNo, this.nowDate, laterHour, true);
    }

    updateTimeTable() {
        const selectedDate = new Date(this.selectedDateTime);
        const year = selectedDate.getFullYear().toString().slice(-2);
        const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
        const day = ('0' + selectedDate.getDate()).slice(-2);
        const hour = ('0' + selectedDate.getHours()).slice(-2);
        const date = year + month + day;
        this.getTimeTable(this.evaNo, date, hour);
    }

    protected readonly timeInterval = timeInterval;
}
