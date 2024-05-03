import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

export interface TimetableStopEvent {
    cde?: string;
    clt?: string;
    cp?: string;
    cpth?: string;
    cs: 'p' | 'a' | 'c';
    ct?: string;
    dc?: number;
    hidden?: number;
    line?: string;
    m?: Message[];
    pde?: string;
    plannedPlatform?: string;
    plannedPath?: string;
    pathArray?: string[];
    ps?: TimetableStopEvent['cs'];
    plannedTime?: string;
    plannedDateTime?: Date;
    tra?: string;
    wings?: string;
}

export interface HistoricDelay {
    arrivalTimestamp: string;
    arrivalDateTime?: Date;
    causeOfDelay?: string;
    departureTimestamp: string;
    departureDateTime?: Date;
    delaySource: 'L' | 'NA' | 'NM' | 'V' | 'IA' | 'IM' | 'A';
    timestamp: string;
    timestampDateTime?: Date;
}

export interface HistoricPlatformChange {
    arrivalPlatform: string;
    causeOfChange?: string;
    departurePlatform: string;
    timestamp: string;
    timestampDateTime?: Date;
}

export interface ConnectionElement {
    connectionStatus: 'w' | 'n' | 'a';
    eva: number;
    id: string;
    ref: TimetableStop;
    stop: TimetableStop;
    timestamp: string;
    timestampDateTime?: Date;
}

interface ReferenceTrip {
    cancellationFlag: string;
    ea: {
        eva: string;
        index: number;
        name: string;
        plannedTime: string;
        plannedDateTime?: Date;
    };
    id: string;
    rtl: {
        category: string;
        number: string;
    };
    sd: ReferenceTrip['ea'];
    tl: {
        category: string;
        filterFlags: string;
        number: string;
        owner: string;
        type: 'p' | 'e' | 'z' | 's' | 'h' | 'n';
    }[];
}


export interface ReferenceTripRelation {
    referenceType: ReferenceTrip;
    rts: 'b' | 'e' | 'c' | 's' | 'a';
}

export interface Message {
    code?: number;
    category?: string;
    deleted?: number | boolean;
    distributorMessages?: {
        internalText?: string;
        name: string;
        type: 's' | 'r' | 'f' | 'x';
        timestamp: string;
    }[];
    externalCategory?: string;
    externalLink?: string;
    externalText?: string;
    from?: string;
    fromDateTime?: Date;
    id: string;
    internalText?: string;
    owner?: string;
    priority: '1' | '2' | '3' | '4';
    status: 'h' | 'q' | 'f' | 'd' | 'i' | 'u' | 'r' | 'c';
    tripLabel?: {
        category: string;
        filterFlags: string;
        number: string;
        owner: string;
        type: 'p' | 'e' | 'z' | 's' | 'h' | 'n';
    }[];
    to?: string;
    toDateTime?: Date;
    timestamp: string;
    timestampDateTime?: Date;
}

export interface TimetableStop {
    arrival?: TimetableStopEvent[];
    connections?: ConnectionElement[];
    departure?: TimetableStopEvent[];
    evaStationNumber: number;
    historicDelays?: HistoricDelay[];
    historicPlatformChanges?: HistoricPlatformChange[];
    id: string;
    messages?: Message[];
    tripReferences?: {
        referenceTrip?: ReferenceTrip[];
        tl: ReferenceTrip['tl'];
    };
    referenceTripRelations?: ReferenceTripRelation[];
    stops?: TimetableStop[];
    tripFlags?: {
        category: string;
        filterFlags: string;
        number: string;
        owner: string;
        type: 'p' | 'e' | 'z' | 's' | 'h' | 'n';
    }[];
}

export interface Timetable {
    station: string;
    evaStationNumber: string;
    stops: TimetableStop[];
}

export function convertToModel(data: any): Timetable {
    const timetable: Timetable = {
        station: data.$.station,
        evaStationNumber: data.$.eva,
        stops: data.s.map((stop: any) => {
            const timetableStop: TimetableStop = {
                id: stop.$.id,
                evaStationNumber: stop.$.eva,
                arrival: stop.ar ? stop.ar.map((ar: any) => ({
                    line: ar.$.l,
                    plannedPlatform: ar.$.pp,
                    plannedPath: ar.$.ppth,
                    pathArray: ar.$.ppth ? ar.$.ppth.split('|') : undefined,
                    plannedTime: ar.$.pt,
                    plannedDateTime: ar.$.pt ? convertToDateTime(ar.$.pt) : undefined
                })) : undefined,
                departure: stop.dp ? stop.dp.map((dp: any) => ({
                    line: dp.$.l,
                    plannedPlatform: dp.$.pp,
                    plannedPath: dp.$.ppth,
                    pathArray: dp.$.ppth ? dp.$.ppth.split('|') : undefined,
                    plannedTime: dp.$.pt,
                    plannedDateTime: dp.$.pt ? convertToDateTime(dp.$.pt) : undefined
                })) : undefined,
                tripFlags: stop.tl ? stop.tl.map((tl: any) => ({
                    category: tl.$.c,
                    filterFlags: tl.$.f,
                    number: tl.$.n,
                    owner: tl.$.o,
                    type: tl.$.t as 'p' | 'e' | 'z' | 's' | 'h' | 'n'
                })) : undefined,
                connections: stop.conn ? stop.conn.map((conn: any) => ({
                    connectionStatus: conn.$.cs as 'w' | 'n' | 'a',
                    eva: conn.$.eva,
                    id: conn.$.id,
                    ref: {
                        eva: conn.ref.$.eva,
                        id: conn.ref.$.id
                    },
                    stop: {
                        eva: conn.s.$.eva,
                        id: conn.s.$.id
                    },
                    timestamp: conn.$.ts,
                    timestampDateTime: conn.$.pt ? convertToDateTime(conn.$.pt) : undefined
                })) : undefined,
                messages: stop.m ? stop.m.map((msg: any) => ({
                    code: msg.$.c,
                    category: msg.$.cat,
                    deleted: msg.$.del,
                    distributorMessages: msg.dm ? msg.dm.map((dm: any) => ({
                        internalText: dm.$.int,
                        number: dm.$.n,
                        type: dm.$.t as 's' | 'r' | 'f' | 'x',
                        timestamp: dm.$.ts,
                        timestampDateTime: dm.$.pt ? convertToDateTime(dm.$.pt) : undefined
                    })) : undefined,
                    externalCategory: msg.$.ec,
                    externalLink: msg.$.elnk,
                    externalText: msg.$.ext,
                    from: msg.$.from,
                    fromDateTime: msg.$.from ? convertToDateTime(msg.$.from) : undefined,
                    id: msg.$.id,
                    internalText: msg.$.int,
                    owner: msg.$.o,
                    priority: msg.$.pr as '1' | '2' | '3' | '4',
                    status: msg.$.t as 'h' | 'q' | 'f' | 'd' | 'i' | 'u' | 'r' | 'c',
                    tripLabel: msg.tl ? msg.tl.map((tl: any) => ({
                        category: tl.$.c,
                        filterFlags: tl.$.f,
                        number: tl.$.n,
                        owner: tl.$.o,
                        type: tl.$.t as 'p' | 'e' | 'z' | 's' | 'h' | 'n'
                    })) : undefined,
                    to: msg.$.to,
                    toDateTime: msg.$.to ? convertToDateTime(msg.$.to) : undefined,
                    timestamp: msg.$.ts,
                    timestampDateTime: msg.$.pt ? convertToDateTime(msg.$.pt) : undefined
                })) : undefined,
                historicDelays: stop.hd ? stop.hd.map((delay: any) => ({
                    arrivalTimestamp: delay.ar,
                    arrivalDateTime: delay.$.ar ? convertToDateTime(delay.$.ar) : undefined,
                    causeOfDelay: delay.$.cod,
                    departureTimeStamp: delay.dp,
                    departureDateTime: delay.$.ar ? convertToDateTime(delay.$.ar) : undefined,
                    delaySource: delay.$.src as 'L' | 'NA' | 'NM' | 'V' | 'IA' | 'IM' | 'A',
                    timestamp: delay.$.ts,
                    timestampDateTime: delay.$.pt ? convertToDateTime(delay.$.pt) : undefined
                })) : undefined,
                historicPlatformChanges: stop.hpc ? stop.hpc.map((platformChange: any) => ({
                    arrivalPlatform: platformChange.ar,
                    causeOfChange: platformChange.$.cot,
                    departurePlatform: platformChange.dp,
                    timestamp: platformChange.$.ts,
                    timestampDateTime: platformChange.$.pt ? convertToDateTime(platformChange.$.pt) : undefined
                })) : undefined,
                referenceTripRelations: stop.rtr ? stop.rtr.map((relation: any) => ({
                    referenceTrip: {
                        cancellationFlag: relation.rt.$.c,
                        ea: {
                            eva: relation.rt.ea.$.eva,
                            index: Number(relation.rt.ea.$.i),
                            name: relation.rt.ea.$.n,
                            plannedTime: relation.rt.ea.$.pt,
                            plannedDateTime: relation.$.pt ? convertToDateTime(relation.$.pt) : undefined
                        },
                        id: relation.rt.$.id,
                        rtl: {
                            category: relation.rt.rtl.$.c,
                            number: relation.rt.rtl.$.n
                        },
                        sd: {
                            eva: relation.rt.sd.$.eva,
                            index: Number(relation.rt.sd.$.i),
                            number: relation.rt.sd.$.n,
                            plannedTime: relation.rt.sd.$.pt,
                            plannedDateTime: relation.$.pt ? convertToDateTime(relation.$.pt) : undefined
                        },
                        tl: relation.rt.tl.map((tl: any) => ({
                            category: tl.$.c,
                            filterFlags: tl.$.f,
                            number: tl.$.n,
                            owner: tl.$.o,
                            type: tl.$.t as 'p' | 'e' | 'z' | 's' | 'h' | 'n'
                        }))
                    },
                    rts: relation.$.rts as 'b' | 'e' | 'c' | 's' | 'a'
                })) : undefined,
                tripReferences: stop.ref ? {
                    referenceTrip: stop.ref.rt ? stop.ref.rt.map((rt: any) => ({
                        c: rt.$.c,
                        ea: {
                            eva: rt.ea.$.eva,
                            i: Number(rt.ea.$.i),
                            n: rt.ea.$.n,
                            pt: rt.ea.$.pt
                        },
                        id: rt.$.id,
                        rtl: {
                            c: rt.rtl.$.c,
                            n: rt.rtl.$.n
                        },
                        sd: {
                            eva: rt.sd.$.eva,
                            i: Number(rt.sd.$.i),
                            n: rt.sd.$.n,
                            pt: rt.sd.$.pt
                        },
                        tl: rt.tl.map((tl: any) => ({
                            category: tl.$.c,
                            filterFlags: tl.$.f,
                            number: tl.$.n,
                            owner: tl.$.o,
                            type: tl.$.t as 'p' | 'e' | 'z' | 's' | 'h' | 'n'
                        }))
                    })) : undefined,
                    tl: stop.ref.tl.map((tl: any) => ({
                        category: tl.$.c,
                        filterFlags: tl.$.f,
                        number: tl.$.n,
                        owner: tl.$.o,
                        type: tl.$.t as 'p' | 'e' | 'z' | 's' | 'h' | 'n'
                    }))
                } : undefined
            };
            return timetableStop;
        })
    };
    return timetable;
}

function convertToDateTime(input: string): Date {
    const year = 2000 + parseInt(input.slice(0, 2)); // Add 2000 to get the full year, with the hope this program has no need to work in 20th or 22th century LOL
    const month = parseInt(input.slice(2, 4)) - 1; // Subtract 1 because months are 0-indexed in JavaScript
    const day = parseInt(input.slice(4, 6));
    const hour = parseInt(input.slice(6, 8));
    const minute = parseInt(input.slice(8, 10));

    return new Date(year, month, day, hour, minute);
}
