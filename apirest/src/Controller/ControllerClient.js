import Connect from '../Config/Connect'
import mysql from 'mysql'

class ControllerClient {
    static Create(req, res) {
        try {
            var body = req.body;
            var connection = mysql.createConnection(Connect);
            connection.connect();
            connection.query("INSERT INTO clientes (nombre,direccion,nit,creado_por) VALUES (?,?,?,?) ", [body.nombre, body.direccion, body.nit, body.creado_por], function (error, results, fields) {
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
            connection.query("SELECT * FROM clientes", function (error, results, fields) {
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
            connection.query("SELECT * FROM clientes WHERE id= ? ", [id], function (error, results, fields) {
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
            connection.query("UPDATE clientes SET nombre=?,direccion=?,nit=? WHERE id= ? ", [body.nombre, body.direccion, body.nit, req.params.id], function (error, results, fields) {
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
            connection.query("DELETE FROM clientes WHERE id= ? ", [id], function (error, results, fields) {
                if (error) { res.json(error) };
                connection.end();
                res.json("DELETE SUCCESFULY");
            });
        } catch (error) {
            res.json(error);
        }

    }
}
export default ControllerClient;