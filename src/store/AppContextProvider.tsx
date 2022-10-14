import { FC, ReactNode, useEffect, useState } from "react";
import AppContext from './app-context';
import treatmentsData from '../data/treatments.json';
import selfTestData from '../data/self-test.json';

type treatmentType = {
    __typename: string;
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

type propsType = {
    children: ReactNode
}

const AppContextProvider:FC<propsType> = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [treatments, setTreatments] = useState<treatmentType>([]);
    const [selfTest, setSelfTest] = useState<selfTestType>([]);
    const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
    const [tabToBeChange, setTabToBeChange] = useState<number | boolean>(false);
    
    useEffect(() => {
        // TODO: Load real data from server
        setTreatments(treatmentsData);
        setSelfTest(selfTestData);

        // after fetched data change loading state
        setIsLoading(false);
    },[]);

    const setTabIndex = (index: number) => {
        setCurrentTabIndex(index);
    }

    const onTabChange = (index: number) => {
        setTabToBeChange(index);
    }

    const appContextValue = {
        treatments,
        selfTest,
        isLoading,
        currentTabIndex,
        setTabIndex,
        onTabChange,
        tabToBeChange,
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