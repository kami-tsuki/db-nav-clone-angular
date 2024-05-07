import {Component, Input} from '@angular/core';
import {Station} from '../../../../models/result.StationData.Stations';
import {MatDialog} from '@angular/material/dialog';
import {IconExplanationDialogComponent} from "./icon-explanation-dialog/icon-explanation-dialog.component";
import {ConfigService} from "../../../../services/config.service";
import {Router} from "@angular/router";
import {
    Explanation,
    ExplanationsModel,
    IconExplanationConfigModel
} from "../../../../models/iconExplanationConfigModel";
import {DbService} from "../../../../services/db.service";
import {FacilityInformationComponent} from "./facility-information/facility-information.component";


@Component({
    selector: 'app-station-detail',
    templateUrl: './station-detail.component.html',
    styleUrls: ['./station-detail.component.css']
})
export class StationDetailComponent {
    @Input() station: Station;
    config: IconExplanationConfigModel;

    constructor(
        private dialog: MatDialog,
        private dbService: DbService,
        private configService: ConfigService,
        private router: Router) {
        this.configService.fetchConfig("data/iconExplanations.json").subscribe(
            (value: ExplanationsModel) => {
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

    openTimeTablePage() {
        const evaNo = this.station.evaNumbers[0]?.number;
        this.router.navigate(['/timetable'], {queryParams: {evaNo}});
    }

    openFacilityInformationDialog() {
        try {
            const evaNo = this.station.number;
            this.dbService.getFacilityInformation(evaNo).subscribe(
                (facilityData: any) => {
                    this.openFacilityModalDialog(facilityData.data);
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    openFacilityModalDialog(facilityData: any) {
        console.log('Opening modal');
        this.dialog.open(FacilityInformationComponent, {
            data: facilityData as Station,
            width: '80%'
        });
    }

}
