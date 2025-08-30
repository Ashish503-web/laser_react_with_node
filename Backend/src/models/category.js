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


export const checkCategoryExits = (tableName, column, value) => {
     return new Promise((resolve, reject) => {
          const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

          pool.query(query, [value], (err, result) => {
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

export const updateCategory = (tableName, id, record) => {
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


export const deleteCategory = (tableName, id) => {
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



export const getCategoryFromDB = (tableName, page = 1, limit = 10, search = "") => {
     return new Promise((resolve, reject) => {
          const currentPage = Math.max(Number(page), 1);
          const currentLimit = Math.max(Number(limit), 1);
          const offset = (currentPage - 1) * currentLimit;

          let dataQuery = `SELECT name, status FROM ??`;
          let countQuery = `SELECT COUNT(*) AS total FROM ??`;
          const countParams = [tableName];
          const dataParams = [tableName];

          if (search) {
               dataQuery += " WHERE name LIKE ?";
               countQuery += " WHERE name LIKE ?";
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
