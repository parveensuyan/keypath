import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import Optionlist from "./Optionlist";
import "./css/category.css";
import { Link } from "react-router-dom";

function Category(props) {
    let category_id;
    const [state, setData] = useState({
        users: [],
    });
    const path = `/api/question/${props.category_id}`;
    const fetchData = async () => {
        
        console.log(props.category_id);
        if (props.category_id != undefined) {
           const api = `/api/question/`;
        } 

        const api = await fetch(path);
        setData({
            users: await api.json(),
        });
    console.log(api);

    };
    useEffect(() => {
        fetchData();
    }, [path]);
    const list = [];
    const option = [];
    console.log(state.users);
    if (state.users.length > 0) {
        category_id = state.users[0].category_id;
        }
    return (
        <div className="question-outer-main">
            {state.users.map((item, key) => (
                <div className="qtn-div-inner-main" key={item.qtn_id}>
                    <div className="qtn-div-inner">{item.question}</div>
                    <div className="qtn-option-div">
                        {item.option.map((sub, keys) => (
                            <div
                                className="qtn-option-list"
                                key={sub.option_value}
                            >
                                <input
                                    name={"question" + item.qtn_id}
                                    type={
                                        item.question_type == "radio"
                                            ? "radio"
                                            : "checkbox"
                                    }
                                    value={sub.option_value}
                                />
                                <label>{sub.option_value}</label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <Link className="start-quiz-btn" to={"/category/" + category_id}>
                Get Started
            </Link>
        </div>
    );
}
export default Category;
