export interface result {
    data: data;
    msg: {
        error: boolean;
        message: string;
        statusCode: string;
        req: {
            url: string;
            method: string;
        }
    }
}


export interface data {
    result: Station[]
    limit: number;
    offset: number;
    total: number;
}

export class Station {
    getBoolByKey(key: string): any | undefined {
    if (this.hasOwnProperty(key)) {
        return this[key as keyof object];
    } else {
        return undefined;
    }
}

    federalState: string;
    aufgabentraeger: aufgabentraeger;
    category: number;
    evaNumbers: evaNumber[];
    hasBicycleParking: boolean;
    hasCarRental: boolean;
    hasDBLounge: boolean;
    hasLocalPublicTransport: boolean;
    hasLockerSystem: boolean;
    hasLostAndFound: boolean;
    hasMobilityService: string;
    hasParking: boolean;
    hasPublicFacilities: boolean;
    hasRailwayMission: boolean;
    hasSteplessAccess: boolean;
    hasTaxiRank: boolean;
    hasTravelNecessities: boolean;
    hasWifi: boolean;
    ifopt: string;
    localServiceStaff: availablility;
    mailingAddress: mailingAddress;
    name: string;
    number: number;
    priceCategory: number;
    productLine: productLine;
    regionalbereich: regionalbereich;
    ril100Identifiers: rilIdentifier[];
    stationManagement: stationManagement;
    szentrale: szentrale;
    timetableOffice: timetableOffice;
    wirlessLan: any;
}

export interface aufgabentraeger {
    name: string;
    shortName: string;
}

export interface evaNumber {
    number: number;
    geographicCoordinates: geographicCoordinates;
    isMain: boolean;
}

export interface geographicCoordinates {
    type: string;
    coordinates: number[];
}

export interface availablility {
    friday: availablilityTime;
    monday: availablilityTime;
    saturday: availablilityTime;
    sunday: availablilityTime;
    thursday: availablilityTime;
    tuesday: availablilityTime;
    wednesday: availablilityTime;
}

export interface availablilityTime {
    fromTime: string;
    toTime: string;
}

export interface mailingAddress {
    city: string;
    zipcode: string;
    street: string;
}

export interface productLine {
    productLine: string;
    segment: string;
}

export interface regionalbereich {
    name: string;
    number: number;
    shortName: string;
}

export interface rilIdentifier {
    geographicCoordinates: geographicCoordinates;
    hasSteamPermission: boolean;
    isMain: boolean;
    rilIdentifier: string;
    primaryLocationCode: string;
    steamPermission: string;
}

export interface stationManagement {
    name: string;
    number: number;
}

export interface szentrale {
    number: number;
    name: string;
    publicPhoneNumber: string;
}

export interface timetableOffice {
    email: string;
    name: string;
}
