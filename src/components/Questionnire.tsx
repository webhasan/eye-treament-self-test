import { FC, useContext, useState } from "react";
import AppContext from "../store/app-context";
import Question from './question/Question';
import QuestionImage from "./question/QuestionImage";

const Questionnaire:FC = () => {
    const {selfTest, currentTabIndex, setTabIndex} = useContext(AppContext);
    const [userInput, setUserInput] = useState<Record<any, any>>({});


    if(currentTabIndex > selfTest.length - 1) {
        return null;
    }

    return (
        <div className="single-questions-step">
            <Question 
                questionIndex = {currentTabIndex}
                questionData = {selfTest[currentTabIndex]}
                setNexIndex = {setTabIndex}
                buttonText = {currentTabIndex === (selfTest.length - 1) ? 'Submit': 'Next Question'}
                userInput = {userInput}
                setUserInput = {setUserInput}
            />
            <QuestionImage 
                src={selfTest[currentTabIndex].image}
                alt={selfTest[currentTabIndex].title}
            />
        </div>
    )
}

export default Questionnaire;