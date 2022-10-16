import { Dispatch, FC, SetStateAction, MouseEvent, useEffect, useState, useContext } from "react";
import AppContext from "../../store/app-context";
import SingleQuestionSet from './SingleQuestionSet';


type propsType = {
    userInput: Record<any, any>;
    setUserInput: Dispatch<SetStateAction<Record<any, any>>>;
}

const Question:FC<propsType> = (props) => {
    const {
        currentTabIndex, 
        selfTest,
        setTabIndex,
        tabToBeChange,
        transitionTime,
        addUserInput
    } = useContext(AppContext);

    const questionData = selfTest[currentTabIndex];
    const buttonText = currentTabIndex === (selfTest.length - 1) ? 'Submit': 'Next Question';
    const totalQuestions = selfTest.length;


    const {
        userInput, 
        setUserInput, 
    } = props;

    const [classes, setClasses] = useState('question-step-wrap');
    const [error, setError] = useState<Record<number, boolean>>({});

    const hasError = (index: number) => {
        let error = false;
        for(let i = 0; i < questionData.answers.length; i++) {
            const {errorBelow, name} = questionData.answers[i];
            if(errorBelow && !userInput[name]) {
                error = true;
                break;
            }
        }

        return error;
    }

    useEffect(() => {
        setClasses('question-step-wrap');
        let timers = setTimeout(() => setClasses('question-step-wrap animation'), 100);
        return () => clearTimeout(timers);
    },[currentTabIndex]);

    useEffect(() => {
        if(tabToBeChange) {
            setClasses('question-step-wrap animation animation-out');
        }
    }, [tabToBeChange]);

    const handleNextQuestion = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        if(!hasError(currentTabIndex)) {
            setError(error => ({...error, [currentTabIndex]: false }))
            setClasses('question-step-wrap animation animation-out');
            setTimeout(() => {
                if((totalQuestions - 1) === currentTabIndex) {
                    addUserInput(userInput);
                    setUserInput({});
                }else {
                    setTabIndex(currentTabIndex + 1);
                }
               
            }, transitionTime);
        }else {
            setError(error => ({...error, [currentTabIndex]: true }))
        }
    }

    return (
        <div className={classes}>
            <h1>{questionData.title}</h1>
            <div className="question-area">
                <p className="user-input-error">{error[currentTabIndex] ? 'Please select an option.': null}</p>
                <div className="questions-set">
                    {questionData.answers.map(ans => {
                    return (
                        <SingleQuestionSet 
                            {...ans} 
                            key={ans.name} 
                            userInput={userInput} 
                            setUserInput={setUserInput}
                        />
                    );
                    })}
                </div>
            </div>
            <button className="x-btn" onClick={handleNextQuestion}>{buttonText}</button>
        </div>
    )
}

export default Question;