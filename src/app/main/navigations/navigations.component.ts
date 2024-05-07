import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-navigations',
    templateUrl: './navigations.component.html',
    styleUrls: ['./navigations.component.css']
})
export class NavigationsComponent implements OnInit {
    origin = new FormControl();
    destination = new FormControl();
    options: string[] = [];
    filteredOptions: Observable<string[]>;
    filteredOptions2: Observable<string[]>;

    constructor() {
    }

    ngOnInit(): void {
        this.filteredOptions = this.origin.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );

        this.filteredOptions2 = this.destination.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    displayFn(option: string): string {
        return option ? option : '';
    }
    switchLocations(): void {
        const temp = this.origin.value;
        this.origin.setValue(this.destination.value);
        this.destination.setValue(temp);
    }
}
