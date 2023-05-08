/* eslint-disable node/no-process-env */
/* eslint-disable indent */
import 'dotenv/config';
import mysql from 'mysql2/promise';

export const connection = mysql.createConnection({
    host:  'localhost',
    user: 'root',
    database: 'mirandahotel',
    namedPlaceholders: true,
});