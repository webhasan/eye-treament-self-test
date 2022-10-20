import { FC, ReactNode, useEffect, useState } from "react";
import AppContext from './app-context';
import treatmentsData from '../data/treatments.json';
import selfTestData from '../data/self-test.json';
import pageRawData from '../data/page-data.json';

//types
import {treatmentType, testType, pageData} from '../types';


type propsType = {
    children: ReactNode
}

const AppContextProvider:FC<propsType> = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [treatments, setTreatments] = useState<treatmentType[]>([]);
    const [selfTest, setSelfTest] = useState<testType[]>([]);
    const [pageData, setPageData] = useState<pageData>({
        selfTestResultsHeading: "",
        selfTestResultDescription: "",
        allTreatmentUrl: "#",
        requestConsultationUrl: "#",
        reasonHeading: "",
        warningHeading: "",
        warningSubHeading: "",
        homePageUrl: "#"
    });
    const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
    const [tabToBeChange, setTabToBeChange] = useState<boolean>(false);
    const [answers, setAnswers] = useState<Record<string, string | boolean> | null>(null);

    
    useEffect(() => {
        // TODO: Load real data from server
        setTreatments(treatmentsData);
        setSelfTest(selfTestData);
        setPageData(pageRawData);

        const ansData = localStorage.getItem('answer');
        if(!!ansData) {
            setAnswers(JSON.parse(ansData));
            setCurrentTabIndex(selfTestData.length);
        }

        // after fetched data change loading state
        setIsLoading(false);

    },[]);

    const setTabIndex = (index: number) => {
        setCurrentTabIndex(index);
    }

    const onTabChange = (isChangingTab: boolean) => {
        setTabToBeChange(isChangingTab);
    }

    const addUserInput = (inputs: Record<string, string | boolean> | null) => {
        if(!inputs) {
            localStorage.removeItem('answer');
        }else {
            localStorage.setItem('answer', JSON.stringify(inputs));
        }
        setAnswers(inputs);
    }

    const appContextValue = {
        treatments,
        selfTest,
        isLoading,
        currentTabIndex,
        setTabIndex,
        onTabChange,
        tabToBeChange,
        transitionTime: 700,
        answers,
        addUserInput,
        pageData
    }

    if(isLoading) {
        return (
            <div className="app-loading-state">
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;
