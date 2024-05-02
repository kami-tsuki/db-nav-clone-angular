import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    constructor(private http: HttpClient) {
    }

    fetchConfig(file: string): Observable<any> {
        return this.http.get('assets/configs/' + file);
    }
}
