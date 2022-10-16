import { Dispatch, FC, SetStateAction, MouseEvent, useEffect, useState } from "react";
import SingleQuestionSet from './SingleQuestionSet';

type propsType = {
    questionIndex: number;
    setNexIndex: (index: number) => void;
    buttonText: string;
    userInput: Record<any, any>;
    setUserInput: Dispatch<SetStateAction<Record<any, any>>>;
    tabToBeChange: boolean;
    transitionTime: number;
    addUserInput:  (inputs: Record<string, string | boolean>) => void;
    totalQuestions: number;
    questionData: {
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
    }
}

const Question:FC<propsType> = (props) => {


    const {
        questionData, 
        transitionTime, 
        setNexIndex, 
        questionIndex, 
        buttonText, 
        userInput, 
        setUserInput, 
        tabToBeChange, 
        addUserInput,
        totalQuestions
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
    },[questionIndex]);

    useEffect(() => {
        if(tabToBeChange) {
            setClasses('question-step-wrap animation animation-out');
        }
    }, [tabToBeChange]);

    const handleNextQuestion = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        if(!hasError(questionIndex)) {
            setError(error => ({...error, [questionIndex]: false }))
            setClasses('question-step-wrap animation animation-out');
            setTimeout(() => {
                if((totalQuestions - 1) === questionIndex) {
                    console.log('I am the last setup');
                    addUserInput(userInput);
                    setUserInput({});
                }
                setNexIndex(questionIndex + 1);
            }, transitionTime);
        }else {
            setError(error => ({...error, [questionIndex]: true }))
        }
    }

    return (
        <div className={classes}>
            <h1>{questionData.title}</h1>
            <div className="question-area">
                <p className="user-input-error">{error[questionIndex] ? 'Please select an option.': null}</p>
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