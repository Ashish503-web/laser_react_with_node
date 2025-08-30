import React from "react";

const NewStocks = (props) => {
     return (
          <div className="flex flex-1 border border-green text-white">
               <label>Quantity</label>
               <input type="text"/>
               <span className="text-red-light">*</span>

          </div>
     )
}

export default NewStocks;