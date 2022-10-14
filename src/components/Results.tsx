import { useContext } from "react";
import AppContext from "../store/app-context";

const Result = () => {
    const {selfTest, currentTabIndex} = useContext(AppContext);

    if(selfTest.length !== currentTabIndex) {
        return null;
    }

    return (
        <h1>All Self Test Result will be here.</h1>
    )
}

export default Result;