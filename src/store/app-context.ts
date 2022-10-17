import React from 'react';

//type
import {treatmentType, testType, pageData} from '../types';

type appContextType = {
    treatments: treatmentType[];
    
    selfTest: testType[];

    pageData: pageData;

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

