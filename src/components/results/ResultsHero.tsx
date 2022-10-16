import { FC, useContext } from "react";
import AppContext from "../../store/app-context";
import FadeIn from 'react-fade-in';

type propTypes = {
    heading: string;
    subHeading: string;
    buttonURL?: string;
}

const ResultHero:FC<propTypes> = ({heading, subHeading, buttonURL}) => {
    const {addUserInput, setTabIndex} = useContext(AppContext);

    const resetTest = () => {
        setTabIndex(0);
        addUserInput(null);
    }

    return (
        <header className="self-test-hero">
            <FadeIn>
                <h1>{heading}</h1>
                <p>{subHeading}</p>
                <div className="buttons">
                    <button className="rest-test self-here-button" onClick={resetTest}>Take the test again</button>
                    {!!buttonURL && <a href={buttonURL} className="self-here-button">See all treatments</a>}
                </div>
            </FadeIn>
        </header>
    );
}

export default ResultHero;