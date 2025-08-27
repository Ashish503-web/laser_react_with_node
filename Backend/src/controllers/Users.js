import {
     getUsersFromDB
} from "../models/User.js"

export const getUsersLIst = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const response = await getUsersFromDB("demo_users", page, limit, search);

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

