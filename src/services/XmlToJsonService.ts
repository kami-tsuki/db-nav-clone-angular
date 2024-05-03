import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js';

@Injectable({
    providedIn: 'root'
})
export class XmlToJsonService {

    constructor() { }

    convert(xml: string): Promise<any> {
        return new Promise((resolve, reject) => {
            xml2js.parseString(xml, { explicitArray: false }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}
