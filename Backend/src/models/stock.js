import mysql from "mysql2";
import config from "../config/index.js";

const pool = mysql.createPool(config);

export const createTable = (schema) => {
     return new Promise((resolve, reject) => {
          pool.query(schema, (err, result) => {
               if (err) {
                    reject(err);
               } else {
                    resolve(result);
               }
          });
     });
};


export const checkStockExits = (tableName, column, value) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM ?? WHERE ?? = ?";
        pool.query(query, [tableName, column, value], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length ? result[0] : null);
            }
        });
    });
};




export const insertRecord = (tableName, record) => {
     return new Promise((resolve, reject) => {
          const query = `INSERT INTO ${tableName} SET ?`;

          pool.query(query, [record], (err, result) => {
               if (err) {
                    reject(err);
               } else {
                    resolve(resolve);
               }
          });
     });
};

export const updateStock = (tableName, id, record) => {
  return new Promise((resolve, reject) => {
    if (!record || Object.keys(record).length === 0) {
      return resolve({ affectedRows: 0 });
    }

    const setClause = Object.keys(record).map(() => '?? = ?').join(', ');
    
    const params = [tableName];
    Object.entries(record).forEach(([k, v]) => {
      params.push(k, v);
    });
    params.push(id);

    const sql = `UPDATE ?? SET ${setClause} WHERE id = ?`;
    pool.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


export const deleteStock = (tableName, id) => {
     return new Promise((resolve, reject) => {
          const query = `DELETE FROM ?? WHERE id = ?`;

          pool.query(query, [tableName, id], (err, result) => {
               if (err) {
                    reject(err);
               } else {
                    resolve(result);
               }
          });
     });
};



export const getStockFromDB = (tableName, page = 1, limit = 10, search = "") => {
  return new Promise((resolve, reject) => {
    const currentPage = Math.max(Number(page), 1);
    const currentLimit = Math.max(Number(limit), 1);
    const offset = (currentPage - 1) * currentLimit;

    let dataQuery = `
      SELECT s.*, c.name AS category_name
      FROM ?? AS s
      LEFT JOIN categories AS c ON s.category = c.id
    `;

    let countQuery = `SELECT COUNT(*) AS total FROM ?? AS s`;
    const countParams = [tableName];
    const dataParams = [tableName];

    if (search) {
      dataQuery += " WHERE s.name LIKE ?";
      countQuery += " WHERE s.name LIKE ?";
      dataParams.push(`%${search}%`);
      countParams.push(`%${search}%`);
    }

    dataQuery += " LIMIT ? OFFSET ?";
    dataParams.push(currentLimit, offset);

    pool.query(dataQuery, dataParams, (err, dataResult) => {
      if (err) return reject(err);

      pool.query(countQuery, countParams, (err, countResult) => {
        if (err) return reject(err);

        resolve({
          data: dataResult,
          total: countResult[0].total,
        });
      });
    });
  });
};


export const getCategories = (tableName) => {
  return new Promise((resolve, reject) => {
    const dataQuery = `SELECT * FROM ??`;
    const dataParams = [tableName];

    pool.query(dataQuery, dataParams, (err, dataResult) => {
      if (err) return reject(err);

      resolve({
        data: dataResult,
      });
    });
  });
};

