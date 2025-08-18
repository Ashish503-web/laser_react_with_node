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




export const getUsersFromDB = (tableName) => {
     return new Promise((resolve, reject) => {
          const query = `SELECT * FROM vue_with_node.demo_user_data`;

          pool.query(query, (err, result ) => {
               if(err){
                    reject(err);
               }else{
                    resolve(result);
               }
          });
    });
};