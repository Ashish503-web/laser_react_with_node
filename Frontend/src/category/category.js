import React, { useState, useEffect, useRef, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { InputSwitch } from "primereact/inputswitch";
import EditCategory from "./editCategory";
import { Dialog } from "primereact/dialog";

const Categories = () => {
  const token = localStorage.getItem("access_token");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");
  const [edit, setEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const searchRef = useRef(null);

  const fetchUsers = useCallback(
    async (page, limit, search) => {
      setLoading(true);
      try {
        const url = "http://localhost:5000/api/categories";
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-store",
          },
          params: { page, limit, search },
        });

        setUsers(res.data.data);
        setTotalRecords(res.data.total);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const onPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    const currentPage = Math.floor(event.first / event.rows) + 1;
    fetchUsers(currentPage, event.rows, globalFilter);
  };

  const onSearchChange = (e) => {
    const value = e.target.value;
    setGlobalFilter(value);
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      setFirst(0);
      fetchUsers(1, rows, value);
    }, 500);
  };

  const handleEdit = (rowData) => {
    setSelectedCategory(rowData);
    setEdit(true);
  };

  const handleDelete = async (rowData) => {
    if (window.confirm(`Delete category "${rowData.name}"?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${rowData.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers(Math.floor(first / rows) + 1, rows, globalFilter);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleStatusToggle = async (rowData, newValue) => {
    try {
      await axios.put(
        `http://localhost:5000/api/categories/${rowData.id}`,
        { ...rowData, status: newValue ? 1 : 0 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers(Math.floor(first / rows) + 1, rows, globalFilter);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

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
        onClick={() => alert("New user clicked")}
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
            rowClassName={() =>
              "hover:bg-indigo-50 transition-colors duration-200"
            }
            lazy
          >
            <Column
              header="#"
              body={(rowData, { rowIndex }) => first + rowIndex + 1}
              className="font-semibold"
            />
            <Column field="name" header="Name" sortable />
            <Column
              field="status"
              header="Status"
              sortable
              body={(rowData) => (
                <InputSwitch
                  checked={rowData.status === 1}
                  onChange={(e) => handleStatusToggle(rowData, e.value)}
                />
              )}
            />
            <Column
              header="Action"
              body={(rowData) => (
                <div className="flex gap-2 font-semibold">
                  <button
                    onClick={() => handleEdit(rowData)}
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

      <Dialog
        header="Edit Category"
        visible={edit}
        style={{ width: "50vw" }}
        onHide={() => setEdit(false)}
      >
        {selectedCategory && <EditCategory category={selectedCategory} />}
      </Dialog>
    </div>
  );
};

export default Categories;
