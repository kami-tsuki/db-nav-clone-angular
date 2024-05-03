import {Component, Input} from '@angular/core';
import {convertToModel, Timetable} from "../../../models/result.TimeTable.Plan";
import {DbService} from "../../../services/db.service";
import {Station} from "../../../models/result.StationData.Stations";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css'
})
export class TimetableComponent {
    @Input() station: Station;

    constructor(
        private dbService: DbService
    ) {
    }

    getTimeTable(station: Station) {
        const now = new Date();
        const year = now.getUTCFullYear().toString().slice(-2); // Get last two digits of year
        const month = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed in JavaScript
        const date = now.getUTCDate().toString().padStart(2, '0');
        const hour = now.getUTCHours().toString().padStart(2, '0');
        const formattedDate = year + month + date;
        const formattedHour = hour;
        this.dbService.getTimeTablesPlan(
            station.evaNumbers[0].number.toString(),
            formattedDate,
            formattedHour,
            true,
            false)
            .subscribe((value: any) => {
                const timetable: Timetable = convertToModel(value?.data?.timetable);
            });
    }
}
