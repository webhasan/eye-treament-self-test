import { useContext } from "react";
import AppContext from "../store/app-context";
import { getTestResult } from "../utils/functions";
import ResultHero from "./results/ResultsHero";
import SingleResult from "./results/SingleResult";

const Result = () => {
    const {answers, treatments, selfTest, pageData} = useContext(AppContext);


    if(!answers) {
        return null;
    }

    const results = getTestResult(selfTest, treatments, answers);

    return (
        <section className="result-sections-wrap">
            <ResultHero 
                heading={pageData.selfTestResultsHeading} 
                subHeading = {pageData.selfTestResultDescription}
                buttonURL={pageData.allTreatmentUrl}
            />

            <div className="test-results">
                {results.map(result => (
                    <SingleResult
                        key={result.name}
                        resultData={result}
                    />
                ))}
            </div>

        </section>
    )
}

export default Result;