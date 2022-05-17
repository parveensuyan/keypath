import React from "react";
import Start from "./Start";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./Category";

function App(){

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/category/" element={<Category />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;