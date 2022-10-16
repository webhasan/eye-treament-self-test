import { ChangeEvent, FC } from "react";

type propsType = {
    name: string; 
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
    as: string;
    errorBelow?: boolean;
    userInput: Record<any, any>;
    setUserInput: React.Dispatch<React.SetStateAction<Record<any, any>>>;
}
const SingleQuestionSet:FC<propsType> = ({name, options, as, errorBelow, userInput, setUserInput}) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUserInput((userInput) => ({...userInput, [name]: value}));
    }

    return (
        <div className={`single-question-set question-type-${as}`}>
           {options.map(option => {
                const isRadioSelected = ( as === 'radio' && userInput[name] && userInput[name] === option.value);
                const isCheckboxSelected = ( as === 'checkbox' &&  !!userInput[name]);

                let isSelected = isRadioSelected || isCheckboxSelected;

                const value = as !== 'checkbox' ? {value: option.value as string} : {}

                return (
                    <label key={option.label}>
                        <input 
                            type={as} 
                            name={name} 
                            checked={isSelected}
                            onChange={handleChange}
                            {...value}
                        />

                        <span className="label-wrap">
                            <span className="main-label">{option.label}</span>
                            {!!option.description && <span className="small">{option.description}</span>}
                        </span>
                    </label>
                );
           })}
        </div>
    )
}

export default SingleQuestionSet;