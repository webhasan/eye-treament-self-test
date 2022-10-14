import { FC } from "react"
type propsType = {
    src: string;
    alt: string;
}

const QuestionImage:FC<propsType> = ({src, alt}) => {
    return (
        <div className="question-image-wrap">
            <img src={src} alt={alt} />
        </div>
    )
}

export default QuestionImage;