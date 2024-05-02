export interface Explanation {
    title: Language;
    text: Language;
    iconClasses: string[];
}

export interface Language {
    de: string;
    en: string;
}

export interface Explanations {
    hasBicycle: Explanation;
    hasSteplessAccess: Explanation;
    hasCarRental: Explanation;
    hasWifi: Explanation;
    hasLocalPublicTransport: Explanation;
    hasTaxiRank: Explanation;
    hasParking: Explanation;
    hasLockerSystem: Explanation;
    hasPublicFacilities: Explanation;
    hasRailwayMission: Explanation;
    hasDBLounge: Explanation;
    default: Explanation;

}

export interface  ExplanationsModel {
    explanations: Explanations;
}

export class IconExplanationConfigModel {


        constructor(
            private rootObj :ExplanationsModel
        ) {
        }

    getByKey(key: string): Explanation {
        if (this.rootObj.explanations.hasOwnProperty(key)) {
            return this.rootObj.explanations[key as keyof Explanations];
        } else {
            return this.rootObj.explanations.default;
        }
    }
}
