import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
function Example() {
    return (
        <div className="container-btn">
            <div className="outer-div">
                        <App></App>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('app')) {
    ReactDOM.render(<Example />, document.getElementById('app'));
}
