import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const StockForm = ({ stock, categories, mode, onSubmit }) => {
     const [name, setName] = useState("");
     const [category, setCategory] = useState(null); 
     const [qty, setQty] = useState(null);
     const [id, setId] = useState(null);

     useEffect(() => {
          if (stock) {
               console.log(stock);
               
               setName(stock.name || "");
              
               const selectedCategory = categories.find(
                    (cat) => cat.id === Number(stock.category) || cat.id === stock.category?.id
               );
               setCategory(selectedCategory || null);
               setId(stock.id || null);
               setQty(stock.quantity || null);
          }
     }, [stock, categories]);

     const handleSubmit = (e) => {
          e.preventDefault();
          const formData = {
               id,
               name,
               category_id: category ? category.id : null, 
               qty,
          };

          if (onSubmit) onSubmit(formData, mode);
     };

     return (
          <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
               <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">
                    {mode === "edit" ? "Edit Stock" : "Create New Stock"}
               </h2>

               <form onSubmit={handleSubmit} className="space-y-6">
                
                    <div className="flex items-center justify-between">
                         <label
                              htmlFor="name"
                              className="font-medium text-gray-700 dark:text-gray-300 w-32 text-right pr-4"
                         >
                              Name
                         </label>
                         <InputText
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter stock name"
                              className="p-inputtext-sm flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-gray-100"
                              required
                         />
                    </div>

                   
                    <div className="flex items-center justify-between">
                         <label
                              htmlFor="category"
                              className="font-medium text-gray-700 dark:text-gray-300 w-32 text-right pr-4"
                         >
                              Category
                         </label>
                         <div className="flex items-center gap-3 flex-1">
                              <Dropdown
                                   id="category"
                                   value={category}
                                   options={categories || []}
                                   onChange={(e) => setCategory(e.value)}
                                   optionLabel="name"
                                   placeholder="Select a Category"
                                   className="w-full md:w-14rem border border-gray-300 dark:border-gray-600"
                              />

                         </div>
                    </div>

                    
                    <div className="flex items-center justify-between">
                         <label
                              htmlFor="qty"
                              className="font-medium text-gray-700 dark:text-gray-300 w-32 text-right pr-4"
                         >
                              Quantity
                         </label>
                         <InputText
                              id="qty"
                              type="number"
                              value={qty || ""}
                              onChange={(e) => setQty(Number(e.target.value))}
                              placeholder="Enter quantity"
                              className="p-inputtext-sm flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-gray-100"
                              required
                         />
                    </div>

                    <div className="flex justify-end pt-4">
                         <Button
                              type="submit"
                              label={mode === "edit" ? "Update" : "Create"}
                              icon="pi pi-check"
                              className="!bg-primary hover:!bg-warning text-white font-medium px-6 py-2 rounded-xl shadow-md transition-all duration-200"
                         />
                    </div>
               </form>
          </div>
     );
};

export default StockForm;
