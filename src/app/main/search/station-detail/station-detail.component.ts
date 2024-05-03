import {Component, Input, OnInit} from '@angular/core';
import {Station} from '../../../../models/resultModel';
import {MatDialog} from '@angular/material/dialog';
import {IconExplanationDialogComponent} from "./icon-explanation-dialog/icon-explanation-dialog.component";
import {ConfigService} from "../../../../services/config.service";
import {join} from "@angular/compiler-cli";
import {
    Explanation,
    IconExplanationConfigModel,
    Explanations,
    ExplanationsModel
} from "../../../../models/iconExplanationConfigModel";
import {handleAutoChangeDetectionStatus} from "@angular/cdk/testing";


@Component({
    selector: 'app-station-detail',
    templateUrl: './station-detail.component.html',
    styleUrls: ['./station-detail.component.css']
})
export class StationDetailComponent{
    @Input() station: Station;
    config: IconExplanationConfigModel;

    constructor(
        private dialog: MatDialog,
        private configService: ConfigService) {
        this.configService.fetchConfig("data/iconExplanations.json").subscribe(
            (value: ExplanationsModel) => {
                console.log(value);
                this.config = new IconExplanationConfigModel(value);
            }
        );
    }

    openExplanationDialog(key: string, color: string) {
        const explanation: Explanation = this.config.getByKey(key)
        this.dialog.open(IconExplanationDialogComponent, {
            data: {
                iconClass: explanation.iconClasses?.join(" "),
                title: {
                    en: explanation.title.en,
                    de: explanation.title.de,
                },
                explanation: {
                    en: explanation.text.en,
                    de: explanation.text.de,
                },
                color: color
            }
        })

    }

    protected readonly HashChangeEvent = HashChangeEvent;
    protected readonly handleAutoChangeDetectionStatus = handleAutoChangeDetectionStatus;
}
