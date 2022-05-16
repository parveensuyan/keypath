import React from "react";
import ReactDOM from "react-dom";
import Start from "./Start";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./Category";
import Nextstep from "./Nextstep";

function App(){

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/category/:catId" element={<Nextstep />} />
                <Route path="/category/" element={<Category />} />
                {/* <Route path="/fetch/:catId" element={<Start />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;