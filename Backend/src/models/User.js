import mysql from "mysql2";
import config from "../config/index.js";

const pool = mysql.createPool(config);

export const createTable = (schema) => {
     return new Promise((resolve, reject) => {
          pool.query(schema, (err, result) => {
               if(err){
                    reject(err);
               }else{
                    resolve(result);
               }
          });
     });
};


export const checkRecordExits = (tableName, column, value) => {
     return new Promise((resolve, reject) => {
          const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

          pool.query(query, [value], (err, result ) => {
               if(err){
                    reject(err);
               }else{
                    resolve(result.length ? result[0] : null);
               }
          });
    });
};

export const insertRecord = (tableName, record) => {
     return new Promise((resolve, reject) => {
          const query = `INSERT INTO ${tableName} SET ?`;

          pool.query(query, [record], (err, result) => {
               if(err){
                    reject(err);
               }else{
                    resolve(resolve);
               }
          });
     });
};


export const getUsersFromDB = (tableName, page = 1, limit = 10, search = "") => {
  return new Promise((resolve, reject) => {
    const currentPage = Math.max(Number(page), 1);
    const currentLimit = Math.max(Number(limit), 1);
    const offset = (currentPage - 1) * currentLimit;

    let dataQuery = `SELECT first_name, last_name, gender, id, email FROM ??`;
    let countQuery = `SELECT COUNT(*) AS total FROM ??`;
    const countParams = [tableName];
    const dataParams = [tableName];

    if (search) {
      dataQuery += " WHERE first_name LIKE ?";
      countQuery += " WHERE first_name LIKE ?";
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
