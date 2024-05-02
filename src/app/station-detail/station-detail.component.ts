import { Component, Input } from '@angular/core';
import { Station } from '../model/resultModel';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.css']
})
export class StationDetailComponent {
  @Input() station: Station;
}
