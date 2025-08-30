import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";

const CategoryForm = ({ category, mode, onSubmit }) => {
    const [name, setName] = useState("");
    const [status, setStatus] = useState(true);
    const [id, setId] = useState(null);

    useEffect(() => {
        if (category) {
            setName(category.name || "");
            setStatus(category.status === 1);
            setId(category.id || null);
        }
    }, [category]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id: id,
            name,
            status: status ? 1 : 0,
        };

        if (onSubmit) onSubmit(formData, mode);

    };

    return (
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">
                {mode === "edit" ? "Edit Category" : "Create New Category"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
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
                        placeholder="Enter category name"
                        className="p-inputtext-sm flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-gray-100"
                        required
                    />
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="status"
                        className="font-medium text-gray-700 dark:text-gray-300 w-32 text-right pr-4"
                    >
                        Status
                    </label>
                    <div className="flex items-center gap-3 flex-1">
                        <InputSwitch
                            id="status"
                            checked={status}
                            onChange={(e) => setStatus(e.value)}
                        />
                        <span
                            className={`text-sm font-semibold ${status ? "text-green-600" : "text-red-500"
                                }`}
                        >
                            {status ? "Active" : "Inactive"}
                        </span>
                    </div>
                </div>

                {/* Submit */}
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

export default CategoryForm;
