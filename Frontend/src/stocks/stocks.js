import React, { useState, useEffect, useRef, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import NewStocks from "./stockForm";
import { Dialog } from 'primereact/dialog';
import { toast } from "react-toastify";
import { confirmDialog } from "primereact/confirmdialog";
import { ConfirmDialog } from 'primereact/confirmdialog';

import { Toast } from "primereact/toast";


const Stocks = () => {

     const token = localStorage.getItem("access_token");
     const API_BASE_URL = "http://localhost:5000/api";

     const [stocks, setStocks] = useState([]);
     const [loading, setLoading] = useState(false);
     const [totalRecords, setTotalRecords] = useState(0);

     const [first, setFirst] = useState(0);
     const [rows, setRows] = useState(10);
     const [globalFilter, setGlobalFilter] = useState("");

     const searchRef = useRef(null);
     const [upsert, setEdit] = useState(false);
     const [categories, setCategories] = useState([]);
     const [visible, setVisible] = useState(false);
     const [mode, setMode] = useState(null);
     const [selectedStock, setSelectedStock] = useState(null);

     const fetchStocks = useCallback(async (page, limit, search) => {

          setLoading(true);
          try {
               const url = `${API_BASE_URL}/stocks`;
               const res = await axios.get(url, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                         "Cache-Control": "no-store",
                    },
                    params: { page, limit, search },
               });

               setStocks(res.data.data);
               setTotalRecords(res.data.total);

          } catch (err) {
               toast.error(err);
          } finally {
               setLoading(false);
          }
     }, [token]);

     const onPage = (event) => {
          setFirst(event.first);
          setRows(event.rows);
          const currentPage = Math.floor(event.first / event.rows) + 1;
          fetchStocks(currentPage, event.rows, globalFilter);

     };

     const onSearchChange = (e) => {
          const value = e.target.value;
          setGlobalFilter(value);
          if (searchRef.current) clearTimeout(searchRef.current);
          searchRef.current = setTimeout(() => {
               setFirst(0);
          }, 500);
     };
     const fetchCategories = async (req, res) => {
          const response = await axios.get(`${API_BASE_URL}/stock/categories`, {
               headers: {
                    Authorization: `Bearer ${token}`,
                    "Cache-Control": "no-store",
               },
          });
          setCategories(response.data);
     }

     const handleEdit = (rowData, mode) => {
          fetchCategories();
          setMode(mode);
          if (mode === "add") {
               setSelectedStock(null);
          } else {
               setSelectedStock(rowData);
          }
          setVisible(true);
     };

     const handleNewStock = () => {
          setSelectedStock(null);
          fetchCategories();
          setMode("add");
          setVisible(true);
     };

     const handleDelete = (rowData) => {
          confirmDialog({
               message: `Delete stock "${rowData.name}"?`,
               header: "Confirmation",
               icon: "pi pi-exclamation-triangle",
               accept: () => acceptDelete(rowData),
               reject: () => {
                    toast.error("Delete cancelled");
               },
          });
     };

     const acceptDelete = async (rowData) => {
          try {
               const response = await axios.delete(`${API_BASE_URL}/stock/${rowData.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
               });
               fetchStocks(Math.floor(first / rows) + 1, rows, globalFilter);
               toast.success(response.data.message);
          } catch (error) {
               toast.error("Delete failed", error.response.data.error)
          }
     };

     const handleCreate = async (newStock) => {
          try {
               const response = await axios.post(
                    `${API_BASE_URL}/stock`,
                    newStock,
                    {
                         headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`
                         }
                    }
               );
               fetchStocks(Math.floor(first / rows) + 1, rows, globalFilter);
               setVisible(false);
               toast.success(response.data.message);
               return response.data;
          } catch (error) {
               console.error("Create failed:", error);
               toast.error(
                    error.response?.data?.error || "Failed to create category"
               );

          }
     };

     const handleUpdate = async (updatedStock) => {
          try {
               const response = await axios.put(
                    `${API_BASE_URL}/stock/${updatedStock.id}`,
                    updatedStock,
                    {
                         headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`
                         }
                    }
               );
               fetchStocks(Math.floor(first / rows) + 1, rows, globalFilter);
               setVisible(false);
               toast.success(response.data.message);
               return response.data;
          } catch (error) {
               toast.error(
                    error.response.data.error || "Failed to update stock"
               );
          }
     };

     useEffect(() => {
          const currentPage = Math.floor(first / rows) + 1;
          fetchStocks(currentPage, rows, globalFilter);
     }, [first, rows, globalFilter, fetchStocks]);

     const headerTemplate = (
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-lg">
               <span className="p-input-icon-left w-full md:w-1/3">
                    <i className="pi pi-search text-white" />
                    <InputText
                         type="search"
                         placeholder="Search stock..."
                         value={globalFilter}
                         onChange={onSearchChange}
                         className="p-inputtext-sm w-full bg-white rounded-md px-3 py-2 border border-green-light focus:ring-2 focus:ring-indigo-400"
                    />
               </span>
               <Button
                    label="➕ New Stock"
                    className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-indigo-50 transition"
                    onClick={handleNewStock}
               />
          </div>
     );

     return (
          <div className="p-6 w-full min-h-screen bg-gray-50">
               <div className="mx-auto">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                         <Toast ref={toast} />
                         <ConfirmDialog />
                         <DataTable
                              value={stocks}
                              paginator
                              first={first}
                              rows={rows}
                              totalRecords={totalRecords}
                              onPage={onPage}
                              rowsPerPageOptions={[5, 10, 20, 50]}
                              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                              loading={loading}
                              responsiveLayout="scroll"
                              header={headerTemplate}
                              className="text-sm"
                              rowClassName={() => "hover:bg-indigo-50 transition-colors duration-200"}
                              lazy
                         >
                              <Column
                                   header="#"
                                   body={(rowData, { rowIndex }) => first + rowIndex + 1}
                                   className="font-semibold"
                              />
                              <Column field="name" header="name" sortable />
                              <Column field="category_name" header="category_name" sortable />
                              <Column field="quantity" header="quantity" />
                              <Column
                                   header="Action"
                                   body={(rowData) => (
                                        <div className="flex gap-2 font-semibold">
                                             <button
                                                  onClick={() => handleEdit(rowData, 'edit')}
                                                  className="px-3 py-1 bg-blue-500 border-green-dark rounded hover:bg-blue-600"
                                             >
                                                  <i className="pi pi-pencil"></i>
                                             </button>
                                             <button
                                                  onClick={() => handleDelete(rowData)}
                                                  className="px-3 py-1 bg-red-500 bg-red-dark hover:bg-red rounded hover:bg-red-600"
                                             >
                                                  <i className="pi pi-trash"></i>
                                             </button>
                                        </div>
                                   )}
                              />
                         </DataTable>
                    </div>
               </div>

               {/* new request form */}
               <Dialog header="Header" visible={visible} onHide={() => { if (!visible) return; setVisible(false); }}>
                    <NewStocks
                         stock={selectedStock}
                         categories={categories.data || []}
                         mode={mode}
                         onSubmit={(data, mode) => {
                              if (mode === "edit") {
                                   handleUpdate(data);
                              } else {
                                   handleCreate(data);
                              }
                         }}
                    />
               </Dialog>

          </div>
     );
};

export default Stocks;