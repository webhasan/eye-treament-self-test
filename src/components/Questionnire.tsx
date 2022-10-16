import { useContext, useState } from "react";
import AppContext from "../store/app-context";
import Question from './question/Question';
import QuestionImage from "./question/QuestionImage";

const Questionnaire = () => {
    const {selfTest, currentTabIndex, answers } = useContext(AppContext);
    const [userInput, setUserInput] = useState<Record<any, any>>({});

    if(answers) {
        return null;
    }

    return (
        <div className="single-questions-step">
            <Question 
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