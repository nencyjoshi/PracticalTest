var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("../connection/connect")();

var routes = function () {
    router.route('/users')
        .get(function (req, res) {
            debugger
            conn.connect().then(function () {
                debugger
                var sqlQuery = "Select * from t_users u inner join t_roles r on u.roleid = r.id inner join t_regions re on u.regionid = re.id";
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function (recordset) {
                    res.json(recordset.recordset);
                    conn.close();
                })
                    .catch(function (err) {
                        debugger
                        conn.close();
                        res.status(400).send("Error while inserting data");
                    });
            })
                .catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while inserting data");
                });
        });

            router.route('/getRoles')
        .get(function (req, res) {
            debugger
            conn.connect().then(function () {
                debugger
                var sqlQuery = "SELECT * FROM t_roles";
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function (recordset) {
                    res.json(recordset.recordset);
                    conn.close();
                })
                    .catch(function (err) {
                        debugger
                        conn.close();
                        res.status(400).send("Error while inserting data");
                    });
            })
                .catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while inserting data");
                });
        });

            router.route('/getRegions')
        .get(function (req, res) {
            debugger
            conn.connect().then(function () {
                debugger
                var sqlQuery = "SELECT * FROM t_regions";
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function (recordset) {
                    res.json(recordset.recordset);
                    conn.close();
                })
                    .catch(function (err) {
                        debugger
                        conn.close();
                        res.status(400).send("Error while inserting data");
                    });
            })
                .catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while inserting data");
                });
        });

    router.route('/addUser')
        .post(function (req, res) {
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("username", sql.VarChar(50), req.body.username)
                    request.input("email", sql.Decimal(18, 0), req.body.email)
                    request.input("roleid", sql.Decimal(18, 0), req.body.roleid)
                    request.input("regionid", sql.Decimal(18, 0), req.body.regionid)
                    request.execute("sp_addusers").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).send(req.body);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send("Error while inserting data");
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while inserting data");
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while inserting data");
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send("Error while inserting data");
            });
        });



    return router;
};
module.exports = routes;