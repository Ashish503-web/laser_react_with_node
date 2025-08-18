import mysql from "mysql2/promise";

let pool;

const connectDB = async () => {
  try {
    pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log("✅ Connected to MySQL database");

    // Auto-create ta
        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        await pool.query(`
     CREATE TABLE IF NOT EXISTS demo_user_data (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- unique ID
    first_name VARCHAR(100) NOT NULL,         -- first name
    last_name VARCHAR(100) NOT NULL,          -- last name
    email VARCHAR(150) NOT NULL UNIQUE,       -- unique email
    gender ENUM('male','female','other'),     -- gender
    password VARCHAR(255) NOT NULL,           -- hashed password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

    `);

    console.log("✅ Users table is ready");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

export { connectDB, pool };
