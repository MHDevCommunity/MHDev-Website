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
var config = require('../config');

module.exports = mysql.createPool({
    connectionLimit : 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    port: config.mysql.port,
    database: config.mysql.database
});