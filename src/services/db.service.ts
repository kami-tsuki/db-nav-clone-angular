import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, shareReplay} from "rxjs";
import {data} from "../models/resultModel";
import {CacheService} from "./cache.service";

@Injectable()
export class DbService {
    private api_key = 'b11a12d78edf2d10ca457ac65b4b3e70';
    private client_id = 'd68c1242f9c80764e301fb8f8f093ccd';

    constructor(
        protected readonly http: HttpClient,
        private cacheService: CacheService) {
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
        forceRequest: boolean = false
    ): any {
        const params = new HttpParams()
            .set('searchstring', `*${searchString}*`)
            .set('limit', limit.toString());

        if (offset !== null) {
            params.set('offset', offset.toString());
        }
        if (category !== null) {
            params.set('category', category);
        }
        if (federalstate !== null) {
            params.set('federalstate', federalstate);
        }
        if (eva !== null) {
            params.set('eva', eva.toString());
        }
        if (ril !== null) {
            params.set('ril', ril);
        }
        if (logicaloperator !== null) {
            params.set('logicaloperator', logicaloperator);
        }

        const url = 'https://apis.deutschebahn.com/db-api-marketplace/apis/station-data/v2/stations';
        const headers = {
            'DB-Api-Key': this.api_key,
            'DB-Client-ID': this.client_id,
            'accept': 'application/json'
        };

        const cacheKey = url + params.toString();
        if (!forceRequest) {
            const cachedResponse = this.cacheService.get(cacheKey);
            if (cachedResponse) {
                console.log("cache hit");
                return cachedResponse;
            }
        }

        const response = this.http.get(url, {headers, params, observe: 'response'}).pipe(
            map(response => {
                console.log("send request");
                if (response.body === undefined || response.status !== 200) {
                    return {
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
                }

                return {
                    data: response.body as data,
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
            }),
            shareReplay(1)
        );
        this.cacheService.set(cacheKey, response, 60000);
        return response;
    }

    getStationDataById(
        stationId: number,
        forceRequest: boolean = false): any {
        const url = `https://apis.deutschebahn.com/db-api-marketplace/apis/station-data/v2/stations/${stationId}`;
        const headers = {
            'DB-Api-Key': this.api_key,
            'DB-Client-ID': this.client_id,
            'accept': 'application/json'
        };

        const cacheKey = url;
        if (!forceRequest) {
            const cachedResponse = this.cacheService.get(cacheKey);
            if (cachedResponse) {
                console.log("cache hit");
                return cachedResponse;
            }
        }

        const response = this.http.get(url, {headers, observe: 'response'}).pipe(
            map(response => {
                if (response.body === undefined || response.status !== 200) {
                    return {
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
                }
                return {
                    data: response.body as data,
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
            }),
            shareReplay(1)
        );

        this.cacheService.set(cacheKey, response, 60000); // Cache for 60 seconds
        return response;
    }
}
