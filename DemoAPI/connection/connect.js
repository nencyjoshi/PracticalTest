var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user: 'sa',
        password: 'admin123',
        server: 'localhost',
        database: 'PracticalTest'
    });

    return conn;
};

module.exports = connect;