import Connect from '../Config/Connect'
import mysql from 'mysql'

class ControllerProduct {
    static Create(req, res) {
        try {
            var body = req.body;
            var connection = mysql.createConnection(Connect);
            connection.connect();
            connection.query("INSERT INTO productos (nombre,precio,creado_por) VALUES (?,?,?) ", [body.nombre, body.precio, body.creado_por], function (error, results, fields) {
                if (error) { res.json(error) };
                connection.end();
                res.json("CREATED SUCCESFULY")
            });
        } catch (error) {
            res.json(error);
        }


    }
    static SearchAll(req, res) {
        try {
            var connection = mysql.createConnection(Connect);
            connection.connect();
            connection.query("SELECT * FROM productos", function (error, results, fields) {
                if (error) { res.json(error) };
                connection.end();
                res.json(results)
            });
        } catch (error) {
            res.json(error);
        }

    }
    static SearchSingle(req, res) {
        try {
            var id = req.params.id;
            var connection = mysql.createConnection(Connect);
            connection.connect();
            connection.query("SELECT * FROM productos WHERE id= ? ", [id], function (error, results, fields) {
                if (error) { res.json(error) };
                res.json(results[0])
                connection.end();
            });
        } catch (error) {
            res.json(error);
        }

    }
    static Update(req, res) {
        try {
            var body = req.body;
            var connection = mysql.createConnection(Connect);
            connection.connect();
            connection.query("UPDATE productos SET nombre=?,precio=? WHERE id= ? ", [body.nombre, body.precio, req.params.id], function (error, results, fields) {
                if (error) { res.json(error) };
                connection.end();
                res.json("UPDATED SUCCESFULY")
            });
        } catch (error) {
            res.json(error);
        }

    }
    static Delete(req, res) {
        try {
            var id = req.params.id
            var connection = mysql.createConnection(Connect);
            connection.connect();
            connection.query("DELETE FROM productos WHERE id= ? ", [id], function (error, results, fields) {
                if (error) { res.json(error) };
                connection.end();
                res.json("DELETE SUCCESFULY");
            });
        } catch (error) {
            res.json(error);
        }

    }
}
export default ControllerProduct;