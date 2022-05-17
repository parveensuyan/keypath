import React, {useEffect, useState} from "react";
import "./css/category.css";

function Category(props) {

    const [result, setResult] = useState(null);

    const [submitted, setSubmitted] = useState({
        questions: {}
    });

    const [state, setData] = useState({
        questions: [],
        category_id: 0,
        final_category: false,
    });

    const fetchData = async () => {
        const path = `/api/question/${state.category_id}`;
        const response = await fetch(path).then(response => response.json());
        setData({
            questions: response.questions,
            category_id: response.category_id,
            final_category: response.final_category,
        });
    };
    useEffect(() => {
        fetchData();
    }, []);

    const selectedCheckbox = (isChecked, option) => {
        const questions = {...submitted.questions};
        if (isChecked) {
            if (typeof questions[option.qtn_id] == "undefined") {
                questions[option.qtn_id] = {};
            }
            questions[option.qtn_id][option.option_id] = option;
        } else {
            delete questions[option.qtn_id][option.option_id];
        }
        updateSubmitState(questions);
    }

    const selectRadioBox = (option) => {
        const questions = {...submitted.questions};
        questions[option.qtn_id] = {};
        questions[option.qtn_id][option.option_id] = option;
        updateSubmitState(questions);
    }

    const updateSubmitState = (questions) => {
        setSubmitted({
            ...submitted,
            questions: questions
        });
    }

    const submit = async () => {
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const url = `/api/submit`;
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": token
            },
            method: 'post',
            credentials: "same-origin",
            body: JSON.stringify(submitted)
        }).then(response => response.json())

        setResult(response.result);
    }

    function ucFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const renderResult = () => {
        return (
            <div className="question-outer-main">
                <div className="qtn-div-inner-main">
                    <h1>
                        Final Result!
                    </h1>
                    {result.map(category => {
                        return (
                            <div className="qtn-div-inner">
                                <div className={`result-row`}>
                                    <p>
                                        {ucFirst(category.name)} :
                                    </p>
                                    <p className={`percentage`}>
                                        {category.result}%
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }

    const renderList = () => {
        return (
            <div className="question-outer-main">
                {state.questions.map((item, key) => (
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
                                        onClick={(e) => {
                                            if (item.question_type == "checkbox") {
                                                selectedCheckbox(e.target.checked, sub);
                                            } else if (item.question_type == "radio") {
                                                selectRadioBox(sub);
                                            }
                                        }}
                                    />
                                    <label>{sub.option_value}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button
                    className="start-quiz-btn"
                    onClick={async () => {
                        if (state.final_category) {
                            await submit();
                        } else {
                            await fetchData();
                        }
                    }}>
                    {`${state.final_category ? 'Submit' : 'Next'}`}
                </button>
            </div>
        );
    }

    if (result === null) {
        return renderList();
    } else {
        return renderResult();
    }
}

export default Category;
