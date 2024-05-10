import {Component, Input} from '@angular/core';
import {TimetableStop} from "../../../../models/result.TimeTable.Plan";
import {TrainInfoDialog} from "../train-info-dialog/train-info-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-stop-info',
    templateUrl: './stop-info.component.html',
    styleUrls: ['./stop-info.component.css']
})
export class StopInfoComponent  {
    @Input() stop: TimetableStop;


    constructor(
        public dialog: MatDialog) {
    }

    openDialog(stop: any) {
        this.dialog.open(TrainInfoDialog, {
            data: {
                stop: stop
            }
        });
    }
}
