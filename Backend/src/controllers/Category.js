import {
     getCategoryFromDB,
     insertRecord,
     checkCategoryExits,
     updateCategory,
     deleteCategory
} from "../models/category.js";


export const getCategoryList = async (req, res) => {
     try {
          const { page = 1, limit = 10, search = "" } = req.query;

          const response = await getCategoryFromDB("categories", page, limit, search);

          if (!response || response.data.length === 0) {
               return res.status(404).json({ message: "No data found!" });
          }

          return res.status(200).json({
               data: response.data,
               total: response.total,
          });
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};


export const addCategory = async (req, res) => {
     const { name } = req.body;
     if (!name) {
          res.
               status(400).
               json({ error: "name fields cannot be empty" });
          return;
     }
     const category = {
          name: name,
          status: 1
     }

     try {

          const categoryAlreadyExits = await checkCategoryExits("categories", "name", name);
          if (categoryAlreadyExits) {
               res.status(400).json({ error: "category name already exits" });
          } else {
               await insertRecord("categories", category);
               res.status(201).json({ message: "category created successfully!" });
          }

     } catch (error) {
          res.status(500).json({ error: error.message });
     }
}

export const updateCategories = async (req, res) => {
     const { id } = req.params;
     const { name, status } = req.body;

     if (!name) {
          return res.status(400).json({ error: "Name field cannot be empty" });
     }

     try {

          const categoryAlreadyExists = await checkCategoryExits("categories", "name", name);

          if (categoryAlreadyExists && categoryAlreadyExists.id != id) {
               return res.status(400).json({ error: "Category name already exists." });
          }

          const category = { name, status };


          const updated = await updateCategory("categories", id, category);

          if (!updated) {
               return res.status(404).json({ error: "Category not found." });
          }

          return res.status(200).json({ message: "Category updated successfully", category });
     } catch (error) {
          return res.status(500).json({ error: error.message });
     }
};

export const deleteCategories = async (req, res) => {

     const { id } = req.params;
     try {
          const stockExists = await checkCategoryExits("categories", "id", Number(id));

          if (!stockExists) {
               return res.status(404).json({ error: "Category not found!" });
          }

          await deleteCategory("categories", Number(id));

          return res.status(200).json({ message: "Category deleted successfully!" });
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

export const getCategoryRecord = async (req, res) => {
     const { id } = req.params;

     try {
          const getRecord = await checkCategoryExits("categories", "id", id);

          if (!getRecord) {
               res.status(400).json({ message: "Record not found" });
               return;
          }
          return res.status(200).json(getRecord);
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
}