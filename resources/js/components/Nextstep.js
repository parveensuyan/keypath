import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import Optionlist from "./Optionlist";
import "./css/category.css";
import Category from "./Category";
import { Link, useParams } from "react-router-dom";
function Nextstep(props){
const {catId} = useParams();
return  <Category category_id = {catId }></Category> ;
}

export default Nextstep;