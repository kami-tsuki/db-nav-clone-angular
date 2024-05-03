import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

export interface TimetableStopEvent {
    cde?: string;
    clt?: string;
    cp?: string;
    cpth?: string;
    cs: 'p' | 'a' | 'c';
    ct?: string;
    dc?: number;
    hi?: number;
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
    ar: string;
    cod?: string;
    dp: string;
    src: 'L' | 'NA' | 'NM' | 'V' | 'IA' | 'IM' | 'A';
    ts: string;
}

export interface HistoricPlatformChange {
    ar: string;
    cot?: string;
    dp: string;
    ts: string;
}

export interface ConnectionElement {
    cs: 'w' | 'n' | 'a';
    eva: number;
    id: string;
    ref: TimetableStop;
    s: TimetableStop;
    ts: string;
}

interface ReferenceTrip {
    cancellationFlag: string;
    ea: {
        eva: string;
        index: number;
        name: string;
        plannedTime: string;
    };
    id: string;
    rtl: {
        category: string;
        number: string;
    };
    sd: ReferenceTrip['ea'];
    tl: {
        c: string;
        f: string;
        n: string;
        o: string;
        t: 'p' | 'e' | 'z' | 's' | 'h' | 'n';
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
    timestamp: string;
}

export interface TimetableStop {
    arrivalStopEvent?: TimetableStopEvent[];
    connections?: ConnectionElement[];
    departureStopEvent?: TimetableStopEvent[];
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
    tl?: {
        c: string;
        f: string;
        n: string;
        o: string;
        t: 'p' | 'e' | 'z' | 's' | 'h' | 'n';
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
                arrivalStopEvent: stop.ar ? stop.ar.map((ar: any) => ({
                    line: ar.$.l,
                    plannedPlatform: ar.$.pp,
                    plannedPath: ar.$.ppth,
                    pathArray: ar.$.ppth ?  ar.$.ppth.split('|') : undefined,
                    plannedTime: ar.$.pt,
                    plannedDateTime: ar.$.pt ? convertToDateTime(ar.$.pt) : undefined
                })) : undefined,
                departureStopEvent: stop.dp ? stop.dp.map((dp: any) => ({
                    line: dp.$.l,
                    plannedPlatform: dp.$.pp,
                    plannedPath: dp.$.ppth,
                    pathArray: dp.$.ppth ?  dp.$.ppth.split('|') : undefined,
                    plannedTime: dp.$.pt,
                    plannedDateTime: dp.$.pt ? convertToDateTime(dp.$.pt) : undefined
                })) : undefined,
                tl: stop.tl ? stop.tl.map((tl: any) => ({
                    c: tl.$.c,
                    f: tl.$.f,
                    n: tl.$.n,
                    o: tl.$.o,
                    t: tl.$.t as 'p' | 'e' | 'z' | 's' | 'h' | 'n'
                })) : undefined,
                connections: stop.conn ? stop.conn.map((conn: any) => ({
                    cs: conn.$.cs as 'w' | 'n' | 'a',
                    eva: conn.$.eva,
                    id: conn.$.id,
                    ref: {
                        eva: conn.ref.$.eva,
                        id: conn.ref.$.id
                    },
                    s: {
                        eva: conn.s.$.eva,
                        id: conn.s.$.id
                    },
                    ts: conn.$.ts
                })) : undefined,
                messages: stop.m ? stop.m.map((msg: any) => ({
                    code: msg.$.c,
                    category: msg.$.cat,
                    deleted: msg.$.del,
                    distributorMessages: msg.dm ? msg.dm.map((dm: any) => ({
                        int: dm.$.int,
                        n: dm.$.n,
                        t: dm.$.t as 's' | 'r' | 'f' | 'x',
                        ts: dm.$.ts
                    })) : undefined,
                    externalCategory: msg.$.ec,
                    externalLink: msg.$.elnk,
                    externalText: msg.$.ext,
                    from: msg.$.from,
                    id: msg.$.id,
                    internalText: msg.$.int,
                    owner: msg.$.o,
                    priority: msg.$.pr as '1' | '2' | '3' | '4',
                    status: msg.$.t as 'h' | 'q' | 'f' | 'd' | 'i' | 'u' | 'r' | 'c',
                    tripLabel: msg.tl ? msg.tl.map((tl: any) => ({
                        c: tl.$.c,
                        f: tl.$.f,
                        n: tl.$.n,
                        o: tl.$.o,
                        t: tl.$.t as 'p' | 'e' | 'z' | 's' | 'h' | 'n'
                    })) : undefined,
                    to: msg.$.to,
                    timestamp: msg.$.ts
                })) : undefined,
                historicDelays: stop.hd ? stop.hd.map((delay: any) => ({
                    ar: delay.ar,
                    cod: delay.$.cod,
                    dp: delay.dp,
                    src: delay.$.src as 'L' | 'NA' | 'NM' | 'V' | 'IA' | 'IM' | 'A',
                    ts: delay.$.ts
                })) : undefined,
                historicPlatformChanges: stop.hpc ? stop.hpc.map((platformChange: any) => ({
                    ar: platformChange.ar,
                    cot: platformChange.$.cot,
                    dp: platformChange.dp,
                    ts: platformChange.$.ts
                })) : undefined,
                referenceTripRelations: stop.rtr ? stop.rtr.map((relation: any) => ({
                    rt: {
                        c: relation.rt.$.c,
                        ea: {
                            eva: relation.rt.ea.$.eva,
                            i: Number(relation.rt.ea.$.i),
                            n: relation.rt.ea.$.n,
                            pt: relation.rt.ea.$.pt
                        },
                        id: relation.rt.$.id,
                        rtl: {
                            c: relation.rt.rtl.$.c,
                            n: relation.rt.rtl.$.n
                        },
                        sd: {
                            eva: relation.rt.sd.$.eva,
                            i: Number(relation.rt.sd.$.i),
                            n: relation.rt.sd.$.n,
                            pt: relation.rt.sd.$.pt
                        },
                        tl: relation.rt.tl.map((tl: any) => ({
                            c: tl.$.c,
                            f: tl.$.f,
                            n: tl.$.n,
                            o: tl.$.o,
                            t: tl.$.t as 'p' | 'e' | 'z' | 's' | 'h' | 'n'
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
                            c: tl.$.c,
                            f: tl.$.f,
                            n: tl.$.n,
                            o: tl.$.o,
                            t: tl.$.t as 'p' | 'e' | 'z' | 's' | 'h' | 'n'
                        }))
                    })) : undefined,
                    tl: stop.ref.tl.map((tl: any) => ({
                        c: tl.$.c,
                        f: tl.$.f,
                        n: tl.$.n,
                        o: tl.$.o,
                        t: tl.$.t as 'p' | 'e' | 'z' | 's' | 'h' | 'n'
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
