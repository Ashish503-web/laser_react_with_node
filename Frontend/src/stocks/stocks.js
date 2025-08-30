import React, { useState, useEffect, useRef, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import NewStocks from "./newStocks";
import { Dialog } from 'primereact/dialog';

const Stocks = () => {

     const token = localStorage.getItem("access_token");

     const [users, setUsers] = useState([]);
     const [loading, setLoading] = useState(false);
     const [totalRecords, setTotalRecords] = useState(0);

     const [first, setFirst] = useState(0);
     const [rows, setRows] = useState(10);
     const [globalFilter, setGlobalFilter] = useState("");

     const searchRef = useRef(null);
     const [visible, setVisible] = useState(false);

     const fetchUsers = useCallback(async (page, limit, search) => {

          setLoading(true);
          try {
               const url = "http://localhost:5000/api/users";
               const res = await axios.get(url, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                         "Cache-Control": "no-store",
                    },
                    params: { page, limit, search },
               });

               setUsers(res.data.data);
               setTotalRecords(res.data.total);

               // setLoading(true);
          } catch (err) {
               console.error("Error fetching users:", err);
          } finally {
               setLoading(false);
          }
     }, [token]);

     const onPage = (event) => {
          setFirst(event.first);
          setRows(event.rows);
          const currentPage = Math.floor(event.first / event.rows) + 1;
          fetchUsers(currentPage, event.rows, globalFilter);

          console.log(currentPage);


     };

     const onSearchChange = (e) => {
          const value = e.target.value;
          setGlobalFilter(value);
          if (searchRef.current) clearTimeout(searchRef.current);
          searchRef.current = setTimeout(() => {
               setFirst(0);
          }, 500);
     };

     const newRequestForm = () => {
          setVisible(true);

          console.log('working');

     }

     useEffect(() => {
          const currentPage = Math.floor(first / rows) + 1;
          fetchUsers(currentPage, rows, globalFilter);
     }, [first, rows, globalFilter, fetchUsers]);

     const headerTemplate = (
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-lg">
               <span className="p-input-icon-left w-full md:w-1/3">
                    <i className="pi pi-search text-white" />
                    <InputText
                         type="search"
                         placeholder="Search users..."
                         value={globalFilter}
                         onChange={onSearchChange}
                         className="p-inputtext-sm w-full bg-white rounded-md px-3 py-2 border border-green-light focus:ring-2 focus:ring-indigo-400"
                    />
               </span>
               <Button
                    label="➕ New User"
                    className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-indigo-50 transition"
                    onClick={newRequestForm}
               />
          </div>
     );

     return (
          <div className="p-6 w-full min-h-screen bg-gray-50">
               <div className="mx-auto">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                         <DataTable
                              value={users}
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
                              <Column field="id" header="ID" sortable className="font-semibold" />
                              <Column field="first_name" header="first_name" sortable />
                              <Column field="last_name" header="last_name" sortable />
                              <Column field="gender" header="gender" />
                              <Column field="email" header="email" />
                         </DataTable>
                    </div>
               </div>

               {/* new request form */}
               <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                    <NewStocks/>
               </Dialog>

          </div>
     );
};

export default Stocks;