import { useContext, useState } from "react";
import AppContext from "../store/app-context";

const Navbar = () => {
    const {selfTest, currentTabIndex, onTabChange, setTabIndex, transitionTime, answers} = useContext(AppContext);

    const switchTab = (index: number) => {
        if(index < currentTabIndex && !answers) {
            onTabChange(true);

            setTimeout(() => {
                onTabChange(false);
                setTabIndex(index);
            }, transitionTime);
        }
    }

    const resultTabClasses = !!answers ? 'result-tab active-result' : 'result-tab';

    return (
        <nav className="questionnaire-nav">
            <ul>
                {selfTest.map((test, index) => {
                    let classes = (currentTabIndex === index && !answers) ? 'single-tab-nav active' : 'single-tab-nav';

                    if(index > currentTabIndex || !!answers) {
                        classes += ' not-allowed';
                    }

                    return  (
                        <li 
                            key={test.title} 
                            className={classes}
                            onClick={() => switchTab(index)}
                        >
                            <span className="question-lg">{`Question: ${index + 1}`}</span>
                            <span className="question-sm">{`Q: ${index + 1}`}</span>
                        </li>
                    )
                })}

                <li className={resultTabClasses}>
                    Result
                </li>
            </ul>
            <span className="app-process-bar" style={{width: `${(currentTabIndex + 1)  * 100 / selfTest.length}%`}}></span>
        </nav>
    )
}

export default Navbar;