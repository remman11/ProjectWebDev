/**
 * Load the 'mysql' module to enable connection to a MySQL database
 */
var mysql = require('mysql');

/**
 * Declare an undefined 'pool' variable
 */
var pool;

/**
 * Export a function that returns the pool variable
 */
module.exports = () => {
    /**
     * If pool already has a value, return it.
     */
    if (pool) return pool;

    /**
     * Otherwise, create a new pool (https://github.com/mysqljs/mysql#pooling-connections)
     * 
     * Notice that the values for the options object of the createPool() function all comes
     * from process.env. Check your .env file. :)
     */
    pool = mysql.createPool({
        host: `sql12.freemysqlhosting.net`,
        user: `sql12231850`,
        password: `PPIESjyWaF`,
        database: `sql12231850`
    });

    /**
     * Return the pool variable
     */
    return pool;
};