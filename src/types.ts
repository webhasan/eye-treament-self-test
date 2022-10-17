export type treatmentType = {
    slug: string;
    priority: number;
    name: string;
    description: string;
    price: string;
}

export type testType =  {
    title: string;
    image: string;
    answers: {
        as: string;
        name: string;
        errorBelow?: boolean;
        options: {
            label: string;
            value: string | boolean;
            description?: string;
            explanation?: string;
            results: Record<any, {
                score: number;
                reason: string;
                warning: string;
            }>;
        }[];
    }[];
}

export type pageData = {
    selfTestResultsHeading: string;
    selfTestResultDescription: string;
    allTreatmentUrl?: string;
    requestConsultationUrl?: string;
    reasonHeading: string;
    warningHeading: string;
    warningSubHeading: string;
    homePageUrl: string;
}