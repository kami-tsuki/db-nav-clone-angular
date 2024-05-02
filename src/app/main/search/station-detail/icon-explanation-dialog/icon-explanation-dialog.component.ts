import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-icon-explanation-dialog',
    templateUrl: './icon-explanation-dialog.component.html',
    styleUrls: ['./icon-explanation-dialog.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class IconExplanationDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.data = data;
    }
}
