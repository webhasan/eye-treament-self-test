import React from 'react';

type appContextType = {
    treatments: {
        slug: string;
        priority: number;
        name: string;
        description: string;
        price: string;
    }[];

    selfTest: {
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
    }[];

    pageData: {
        selfTestResultsHeading: string;
        selfTestResultDescription: string;
        allTreatmentUrl?: string;
        requestConsultationUrl?: string;
        reasonHeading: string;
        warningHeading: string;
        warningSubHeading: string;
        homePageUrl: string;
    }

    isLoading: boolean;

    currentTabIndex: number;

    setTabIndex: (index: number) => void;

    onTabChange: (index: boolean) => void;

    tabToBeChange: boolean;

    transitionTime: number; 

    answers: Record<string, string | boolean> | null;

    addUserInput: (inputs: null | Record<string, string | boolean>) => void;
}

const AppContext = React.createContext<appContextType>({
    treatments: [],
    selfTest: [],
    isLoading: true,
    currentTabIndex: 0,
    setTabIndex: (index) => {},
    onTabChange: (index) => {},
    tabToBeChange: false,
    transitionTime: 500, //transition time for question out
    answers: {},
    addUserInput: (inputs) => null,
    pageData: {
        selfTestResultsHeading: "",
        selfTestResultDescription: "",
        allTreatmentUrl: "#",
        requestConsultationUrl: "#",
        reasonHeading: "",
        warningHeading: "",
        warningSubHeading: "",
        homePageUrl: "#"
    }
});


export default AppContext;

