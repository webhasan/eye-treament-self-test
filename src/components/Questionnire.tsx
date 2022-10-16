import { FC, useContext, useRef, useState } from "react";
import AppContext from "../store/app-context";
import Question from './question/Question';
import QuestionImage from "./question/QuestionImage";
import { SwitchTransition, CSSTransition } from "react-transition-group";

const Questionnaire:FC = () => {
    const {selfTest, currentTabIndex, setTabIndex, tabToBeChange, transitionTime, addUserInput, answers} = useContext(AppContext);
    const [userInput, setUserInput] = useState<Record<any, any>>({});
    console.log(answers);

    if(answers) {
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
                tabToBeChange = {tabToBeChange}
                transitionTime = {transitionTime}
                addUserInput = {addUserInput}
                totalQuestions = {selfTest.length}
            />
            <QuestionImage 
                src={selfTest[currentTabIndex].image}
                alt={selfTest[currentTabIndex].title}
            />
        </div>
    )
}

export default Questionnaire;