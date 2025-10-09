// runMigrations.cjs - run SQL against a local MySQL database using mysql2
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function main() {
  const host = process.env.DB_HOST || '127.0.0.1';
  const port = parseInt(process.env.DB_PORT || '3306', 10);
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'raydb';

  // prefer the script we added under backend/ but fall back to infrastructure/create_tables.sql if present
  let sqlPath = path.resolve(__dirname, '..', 'create_tables.sql');
  const alt = path.resolve(__dirname, '..', '..', 'infrastructure', 'create_tables.sql');
  if (!fs.existsSync(sqlPath) && fs.existsSync(alt)) sqlPath = alt;

  if (!fs.existsSync(sqlPath)) {
    console.error('No SQL file found at', sqlPath);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');

  // Enable multipleStatements so the file may contain many statements (CREATE DATABASE; USE; CREATE TABLE; ...)
  const pool = mysql.createPool({ host, port, user, password, waitForConnections: true, connectionLimit: 5, multipleStatements: true });

  const conn = await pool.getConnection();
  try {
    console.log('Executing SQL file:', sqlPath);
    await conn.query(sql);
    console.log('All statements executed.');
  } catch (e) {
    console.error('Migration failed:', e.message || e);
    throw e;
  } finally {
    conn.release();
    await pool.end();
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
}