import { list } from "postcss";
import React from "react";
const lists = [];
let i = 0;
function Optionlist(props){
  props.option.forEach((product, key) => {
      if(props.qtn_id == product.qtn_id ){
          
      console.log(props.qtn_id);
            lists.push(
                <div key={product.option_id}>
                    <input
                        type={product.type == "radio" ? "radio" : "checkbox"}
                        value={product.option_value}
                    />
                    <label> {product.option_value}</label>

                </div>
            );
            i++;
      }
  });
  return <div>{lists}</div>;
}

export default Optionlist;