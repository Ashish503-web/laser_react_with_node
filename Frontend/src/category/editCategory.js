import React from "react";

const EditCategory = ({ category }) => {
    if (!category) return <div>No category selected</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-3">Edit Category</h2>
            <p><strong>ID:</strong> {category.id}</p>
            <p><strong>Name:</strong> {category.name}</p>
            <p><strong>Status:</strong> {category.status === 1 ? "Active" : "Inactive"}</p>
        </div>
    );
};

export default EditCategory;
