/**
 * Connection for Endoctus MySQL DB
 *
 * See config.json for database config variables.
 * If you only have a config.example.json file, please contact 
 * Jeremy del-Guidici or Lisa Nöth at Endocode for config details.
 *
 * To protect sensitive data, 
 */

var mysql = require('mysql');
var config = require('../config.js');

module.exports = mysql.createPool({
    connectionLimit : 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB
});