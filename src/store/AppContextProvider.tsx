import { FC, ReactNode, useEffect, useState } from "react";
import AppContext from './app-context';
import treatmentsData from '../data/treatments.json';
import selfTestData from '../data/self-test.json';
import pageRawData from '../data/page-data.json';

type treatmentType = {
    slug: string;
    priority: number;
    name: string;
    description: string;
    price: string;
}[];

type selfTestType = {
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

type pageData = {
    selfTestResultsHeading: string;
    selfTestResultDescription: string;
    allTreatmentUrl?: string;
    requestConsultationUrl?: string;
    reasonHeading: string;
    warningHeading: string;
    warningSubHeading: string;
}

type propsType = {
    children: ReactNode
}

const AppContextProvider:FC<propsType> = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [treatments, setTreatments] = useState<treatmentType>([]);
    const [selfTest, setSelfTest] = useState<selfTestType>([]);
    const [pageData, setPageData] = useState<pageData>({
        selfTestResultsHeading: "",
        selfTestResultDescription: "",
        allTreatmentUrl: "#",
        requestConsultationUrl: "#",
        reasonHeading: "",
        warningHeading: "",
        warningSubHeading: "",
    });
    const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
    const [tabToBeChange, setTabToBeChange] = useState<boolean>(false);
    const [answers, setAnswers] = useState<Record<string, string | boolean> | null>(null);

    
    useEffect(() => {
        // TODO: Load real data from server
        setTreatments(treatmentsData);
        setSelfTest(selfTestData);
        setPageData(pageRawData);

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