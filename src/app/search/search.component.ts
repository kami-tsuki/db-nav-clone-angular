import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DbService} from "../service/db.service";
import {Station} from "../model/resultModel";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchString: any;
  results: Station[] = [];

  constructor(public dbService: DbService) {
  }

  search() {
    const result = this.dbService.getSearchStationData(this.searchString).subscribe(
      (value: { data: { result: Station[]; }; }) => {
        this.results = value?.data?.result;

        console.log(value);
      }
    );
    this.results = result?.data?.result;

  }
}
