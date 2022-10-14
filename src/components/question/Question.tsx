import { Dispatch, FC, SetStateAction } from "react";
import SingleQuestionSet from './SingleQuestionSet';

type propsType = {
    questionIndex: number;
    setNexIndex: (index: number) => void;
    buttonText: string;
    userInput: Record<any, any>;
    setUserInput: Dispatch<SetStateAction<Record<any, any>>>;
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

const Question:FC<propsType> = ({questionData, setNexIndex, questionIndex, buttonText, userInput, setUserInput}) => {
    return (
        <div className="question-step-wrap">
            <h1>{questionData.title}</h1>
            <div className="questions-set">
                {questionData.answers.map(ans => {
                  return <SingleQuestionSet {...ans} key={ans.name} userInput={userInput} setUserInput={setUserInput}/>
                })}
            </div>
            <button className="x-btn" onClick={() => setNexIndex(questionIndex + 1)}>{buttonText}</button>
        </div>
    )
}

export default Question;