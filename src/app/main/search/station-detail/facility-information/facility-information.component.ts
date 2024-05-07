import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {Facility, Station} from "../../../../../models/result.StationFacilityStatus.Facility";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {encapsulateStyle} from "@angular/compiler";

@Component({
    selector: 'app-facility-information',
    templateUrl: './facility-information.component.html',
    styleUrl: './facility-information.component.css',
    encapsulation: ViewEncapsulation.None
})
export class FacilityInformationComponent {
    public elevators: Facility[];
    public escelators: Facility[];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Station,
        public dialogRef: MatDialogRef<FacilityInformationComponent>
    ) {
        this.data = data;
        this.elevators = this.data.facilities.filter(facility => facility.type === 'ELEVATOR');
        this.escelators = this.data.facilities.filter(facility => facility.type === 'ESCALATOR');
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    protected readonly encapsulateStyle = encapsulateStyle;
}
