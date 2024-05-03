import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {getTrainLine} from "../../../../models/result.TimeTable.Plan";

@Component({
    selector: 'app-train-info-dialog',
    templateUrl: './train-info-dialog.component.html',
})
export class TrainInfoDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {stop: any}) {}

    protected readonly getTrainLine = getTrainLine;
}
