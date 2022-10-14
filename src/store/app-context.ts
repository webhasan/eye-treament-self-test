import React from 'react';

type appContextType = {
    treatments: {
        __typename: string;
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

    isLoading: boolean;

    currentTabIndex: number;

    setTabIndex: (index: number) => void;

    onTabChange: (index: number) => void;

    tabToBeChange: boolean | number;
}

const AppContext = React.createContext<appContextType>({
    treatments: [],
    selfTest: [],
    isLoading: true,
    currentTabIndex: 0,
    setTabIndex: (index) => {},
    onTabChange: (index) => {},
    tabToBeChange: false
});


export default AppContext;

