type result = {
    name: string; 
    description: string;
    url: string;
    score: number;
    price: string;
    reasons: string[];
    warnings: string[];
    applicable: boolean;
}
type selfTestType =  {
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
}[];

type treatmentsType =  {
    slug: string;
    priority: number;
    name: string;
    description: string;
    price: string;
}[];


type answersType = Record<string, string | boolean>;

export const getTestResult = (selfTest: selfTestType, treatments: treatmentsType, answers: answersType) => {

    const results = treatments.map(treatment => {

        const treatmentResult: result  =  {
            name: treatment.name,
            description: treatment.description,
            url: '#',
            score: 0,
            price: treatment.price,
            reasons: [],
            warnings: [],
            applicable: true
        }

        selfTest.forEach((item, index) => {
            item.answers.forEach((ansItem) => {
                if(!!answers[ansItem.name]) {
                    const choseOption = ansItem.options.find(option => option.value === answers[ansItem.name]);

                    if(choseOption && choseOption.results[treatment.slug]) {
                        let treatmentData =  choseOption.results[treatment.slug];

                        if(treatmentData.score === 0) {
                            treatmentResult.applicable = false;
                        }

                        if(treatmentResult.score === 0 ) {
                            treatmentResult.score = treatmentData.score
                        }else {
                            treatmentResult.score = (treatmentResult.score + treatmentData.score) / 2;
                        }
                        
                        if(treatmentData.warning) {
                            treatmentResult.warnings.push(treatmentData.warning)
                        }

                        if(treatmentData.reason) {
                            treatmentResult.reasons.push(treatmentData.reason)
                        }
                    }else if(choseOption && !choseOption.results[treatment.slug]) {
                        treatmentResult.applicable = false;
                    }
                }
            });
        });

        return treatmentResult;
    });

    return results
           .filter(result => result.applicable)
           .sort((a,b) => b.score - a.score)
           .map(item =>  {
                const {applicable, ...rest} = item;
            return {...rest, score: Math.ceil(item.score)}
           });
}
