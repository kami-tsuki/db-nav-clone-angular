export interface Facility {
    description?: string;
    equipmentnumber: number;
    geocoordX?: number;
    geocoordY?: number;
    operatorname?: string;
    state: 'ACTIVE' | 'INACTIVE' | 'UNKNOWN';
    stateExplanation?: string;
    stationnumber: number;
    type: 'ESCALATOR' | 'ELEVATOR';
}

export interface Station {
    facilities: Facility[];
    name: string;
    stationnumber: number;
}
