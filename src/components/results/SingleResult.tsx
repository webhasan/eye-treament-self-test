import { FC, useContext } from "react";
import AppContext from '../../store/app-context';
import CountUp from 'react-countup';
import FadeIn from 'react-fade-in';

type propTypes = {
    resultData: {
        name: string;
        description: string;
        url: string;
        score: number;
        price: string;
        reasons: string[];
        warnings: string[];
    }
}

const SingleResult:FC<propTypes> = ({resultData}) => {
    const {pageData, answers} = useContext(AppContext);
    const { name, description, url, score, reasons, warnings, price }  = resultData;

    console.log(pageData);

    const consultationURL = (url: string) => {
        const params = {
            ...answers as Record<string, string | boolean>,
            treatment: name,
            score:  score.toString()
        }
        const query = new URLSearchParams(params);

        return url.replace(/\/$/, '') + '?' + query.toString();
    }

    return (
        <div className="single-result">
            <div className="result-treatment">
                <FadeIn>
                    <span className="badge score">
                        <CountUp end={score} suffix="% Match"  duration={1}/>
                    </span>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <div className="price"><strong>{price}</strong></div>
                    <div className="result-buttons">
                        {!!url && <a href={url} className="learn-more-btn">Learn more</a>}
                        {!!pageData.requestConsultationUrl && <a href={consultationURL(pageData.requestConsultationUrl)} className="consultation-btn">Request a consultation</a>}
                    </div>
                </FadeIn>
            </div>
            <div className="reason-warning">
                {reasons && !!reasons.length && (
                    <div className="reasons">
                        <FadeIn>
                            <h3>{pageData.reasonHeading}</h3>
                            <ul>
                                {reasons.map(reason => <li key={reason}>{reason}</li>)}
                            </ul>
                        </FadeIn>
                    </div>
                )}

                {warnings && !!warnings.length && (
                    <div className="warnings">
                        <FadeIn>
                            <h3>{pageData.warningHeading}</h3>
                            <p>{pageData.warningSubHeading}</p>
                            <ul>
                                {warnings.map(reason => <li key={reason}>{reason}</li>)}
                            </ul>
                        </FadeIn>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SingleResult;