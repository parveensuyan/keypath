import React from "react";
import ReactDOM from "react-dom";
import "./css/start.css";
import { Link} from "react-router-dom";
function Start(){
   
    return (
        <div className="button-quiz-div">
            <div className="paragraph-btn">
                <p>
                    This test will contain three categories - verbal
                    communication, non-verbal communication, and written
                    communication.
                </p>
            </div>
            <div className="start-quiz-inner-div">
                <Link className="start-quiz-btn"  to="/category">
                    Get Started
                </Link>
            </div>
        </div>
    );
}
 export default Start;
//   <button className="start-quiz-btn" onClick={fetchData}>
//                     Start Quiz
//                 </button>