import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {data} from "../models/resultModel";

@Injectable()
export class DbService {
  constructor(
    protected readonly http: HttpClient
  ) {
  }

  private api_key = 'b11a12d78edf2d10ca457ac65b4b3e70';
  private client_id = 'd68c1242f9c80764e301fb8f8f093ccd';


  getSearchStationData(searchString: string, limit: number = 15): any {
    searchString === undefined ? searchString = '' : searchString;
    const url = `https://apis.deutschebahn.com/db-api-marketplace/apis/station-data/v2/stations?searchstring=*${searchString}*&limit=${limit}`;
    const headers = {
      'DB-Api-Key': this.api_key,
      'DB-Client-ID': this.client_id,
      'accept': 'application/json'
    };

    let response = this.http.get(url, {headers, observe: 'response'});
    return response.pipe(map(response => {
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
    }));
  }
}
