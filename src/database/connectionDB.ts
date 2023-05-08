/* eslint-disable node/no-process-env */
/* eslint-disable indent */
import 'dotenv/config';
import mysql from 'mysql2';

export const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
});