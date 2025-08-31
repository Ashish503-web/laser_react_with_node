import {
     checkStockExits,
     deleteStock,
     getCategories,
     getStockFromDB,
     insertRecord,
     updateStock
} from "../models/stock.js";

export const getStockList = async (req, res) => {
     try {
          const { page = 1, limit = 10, search = "" } = req.query;
          const response = await getStockFromDB("stocks", page, limit, search);

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

export const createStock = async (req, res) => {
     try {
          const { name, category_id, qty } = req.body;

          if (!name && !category_id && !qty) {
               return res.status(400).json({ error: "Please fill all the fields." });
          }

          const stockExists = await checkStockExits("stocks", "name", name);
          if (stockExists) {
               return res.status(400).json({ error: "Stock already exists" });
          }

          const stock = { name: name, category: category_id, quantity: qty };
          await insertRecord("stocks", stock);

          return res.status(201).json({ message: "Stock created successfully!" });
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

export const getByID = async (req, res) => {
     const { id } = req.params;

     try {
          const getRecord = await checkStockExits("stocks", "id", id);

          if (!getRecord) {
               return res.status(404).json({ message: "Record not found" });
          }

          return res.status(200).json(getRecord);
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

export const deleteRecord = async (req, res) => {

     const { id } = req.params;
     try {
          const stockExists = await checkStockExits("stocks", "id", Number(id));

          if (!stockExists) {
               return res.status(404).json({ error: "Stock not found!" });
          }

          await deleteStock("stocks", Number(id));

          return res.status(200).json({ message: "Stock deleted successfully!" });
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

export const updateStocks = async (req, res) => {
     const { id } = req.params;
     const { name, category_id, qty } = req.body;

     if (!name && !category_id && !qty) {
          return res.status(400).json({ error: "Please fill all the fields." });
     }

     try {
          const stockAlreadyExists = await checkStockExits("stocks", "name", name);

          if (stockAlreadyExists && stockAlreadyExists.id != id) {
               return res.status(400).json({ error: "Stock name already exists." });
          }

          const stock = { name: name, category: category_id, quantity: qty };
          const updated = await updateStock("stocks", id, stock);

          if (!updated) {
               return res.status(404).json({ error: "Stock not found." });
          }

          return res.status(200).json({ message: "Stock updated successfully", stock });
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};

export const getCategoriesList = async (req, res) => {
     try {
          const response = await getCategories("categories");
          if (!response || response.data.length === 0) {
               return res.status(404).json({ message: "No data found!" });
          }

          return res.status(200).json({ data: response.data });
     } catch (error) {
          res.status(500).json({ error: error.message });
     }
};
