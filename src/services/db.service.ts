import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, shareReplay} from "rxjs";
import {data} from "../models/result.StationData.Stations";
import {CacheService} from "./cache.service";
import {parseString} from 'xml2js';
import {of, from} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import * as stream from "node:stream";

@Injectable()
export class DbService {
    private api_key = 'b11a12d78edf2d10ca457ac65b4b3e70';
    private client_id = 'd68c1242f9c80764e301fb8f8f093ccd';

    constructor(
        protected readonly http: HttpClient,
        private cacheService: CacheService) {
    }

    private fetchJsonData(url: string, params: HttpParams, forceRequest: boolean = false, addToCache: boolean = true): any {
        const headers = {
            'DB-Api-Key': this.api_key,
            'DB-Client-ID': this.client_id,
            'accept': 'application/json',
        };

        const cacheKey = url + params.toString();
        if (!forceRequest) {
            const cachedResponse = this.cacheService.get(cacheKey);
            if (cachedResponse) {
                console.log("cache hit: ", cachedResponse);
                return of(cachedResponse);
            }
        }

        return this.http.get(url, {headers, params, observe: 'response', responseType: 'json'}).pipe(
            map(response => {
                let result;
                if (response.body === undefined || response.status !== 200) {
                    result = {
                        data: null,
                        msg: {
                            error: true,
                            message: 'No data found',
                            statusCode: response.status.toString(),
                            req: {
                                url: response.url,
                                method: 'GET'
                            }
                        }
                    };
                } else {
                    result = {
                        data: response.body as string,
                        msg: {
                            error: false,
                            message: 'Data fetched successfully',
                            statusCode: response.status.toString(),
                            req: {
                                url: response.url,
                                method: 'GET'
                            }
                        }
                    };
                }

                if (addToCache) this.cacheService.set(cacheKey, result, 60000);
                return result;
            }),
            shareReplay(1)
        );
    }

    private fetchXmlData(url: string, params: HttpParams, forceRequest: boolean = false, addToCache: boolean = true): any {
        const headers = {
            'DB-Api-Key': this.api_key,
            'DB-Client-ID': this.client_id,
            'accept': 'application/xml',
        };

        const cacheKey = url + params.toString();
        if (!forceRequest) {
            const cachedResponse = this.cacheService.get(cacheKey);
            if (cachedResponse) {
                console.log("cache hit: ", cachedResponse);
                return of(cachedResponse);
            }
        }

        let response;
        response = this.http.get(url, {headers, params, observe: 'response', responseType: 'text'}).pipe(
            switchMap(response => {
                if (response.body === undefined || response.status !== 200) {
                    return of({
                        data: null,
                        msg: {
                            error: true,
                            message: 'No data found',
                            statusCode: response.status.toString(),
                            req: {
                                url: response.url,
                                method: 'GET'
                            }
                        }
                    });
                } else {
                    return from(new Promise((resolve, reject) => {
                        parseString(response.body as string, (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    })).pipe(
                        map(data => ({
                            data,
                            msg: {
                                error: false,
                                message: 'Data fetched successfully',
                                statusCode: response.status.toString(),
                                req: {
                                    url: response.url,
                                    method: 'GET'
                                }
                            }
                        }))
                    );
                }
            }),
            shareReplay(1)
        );

        if (addToCache) this.cacheService.set(cacheKey, response, 60000);
        return response;
    }

    getSearchStationData(
        searchString: string = '',
        limit: number = 15,
        offset: null | number = null,
        category: null | string = null,
        federalstate: null | string = null,
        eva: null | number = null,
        ril: null | string = null,
        logicaloperator: null | string = null,
        forceRequest: boolean = false,
        addToCache: boolean = true):
        any {
        const params = new HttpParams()
            .set('searchstring', `*${searchString}*`)
            .set('limit', limit.toString());

        if (offset !== null) params.set('offset', offset.toString());
        if (category !== null) params.set('category', category);
        if (federalstate !== null) params.set('federalstate', federalstate);
        if (eva !== null) params.set('eva', eva.toString());
        if (ril !== null) params.set('ril', ril);
        if (logicaloperator !== null) params.set('logicaloperator', logicaloperator);

        const url = 'https://apis.deutschebahn.com/db-api-marketplace/apis/station-data/v2/stations';
        return this.fetchJsonData(url, params, forceRequest, addToCache);
    }

    getStationDataById(
        stationId: number,
        forceRequest: boolean = false,
        addToCache: boolean = true
    ):
        any {
        const url = `https://apis.deutschebahn.com/db-api-marketplace/apis/station-data/v2/stations/${stationId}`;
        const params = new HttpParams();
        return this.fetchJsonData(url, params, forceRequest, addToCache);
    }

    getTimeTablesPlan(
        evaNo: string,
        date: string,
        hour: string,
        forceRequest: boolean = false
        , addToCache: boolean = true
    ): any {
        const url = `https://apis.deutschebahn.com/db-api-marketplace/apis/timetables/v1/plan/${evaNo}/${date}/${hour}`;
        const params = new HttpParams();
        return this.fetchXmlData(url, params, forceRequest, addToCache);
    }

    getFacilityInformation(stationnumber: number, forceRequest: boolean = false, addToCache: boolean = true): any {
        const url = `https://apis.deutschebahn.com/db-api-marketplace/apis/fasta/v2/stations/${stationnumber}`;
        const params = new HttpParams();

        return this.fetchJsonData(url, params, forceRequest, addToCache);
    }

    getFacilityByEquipmentNumber(equipmentnumber: number, forceRequest: boolean = false, addToCache: boolean = true): any {
        const url = `https://apis.deutschebahn.com/db-api-marketplace/apis/fasta/v2/facilities/${equipmentnumber}`;
        const params = new HttpParams();

        return this.fetchJsonData(url, params, forceRequest, addToCache);
    }

    findFacilities(
        type?: string[],
        state?: string[],
        equipmentnumbers?: number[],
        stationnumber?: number,
        area?: string[],
        forceRequest: boolean = false,
        addToCache: boolean = true
    ): any {
        const url = 'https://apis.deutschebahn.com/db-api-marketplace/apis/fasta/v2/facilities';

        let params = new HttpParams();
        if (type && type.length > 0) params = params.set('type', type.join(','));
        if (state && state.length > 0) params = params.set('state', state.join(','));
        if (equipmentnumbers && equipmentnumbers.length > 0) params = params.set('equipmentnumbers', equipmentnumbers.join(','));
        if (stationnumber) params = params.set('stationnumber', stationnumber.toString());
        if (area && area.length === 4) params = params.set('area', area.join(','));

        return this.fetchJsonData(url, params, forceRequest, addToCache);
    }



}

interface ResponseObject {
    body: any;
    status: number;
    statusText: string;
    url: string;
}

