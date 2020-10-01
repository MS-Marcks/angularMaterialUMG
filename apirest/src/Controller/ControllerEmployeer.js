import Connect from '../Config/Connect'
import mysql from 'mysql'

class ControllerEmployeer {
    static Create(req, res) {
        try {
            var body = req.body;
            var connection = mysql.createConnection(Connect);
            connection.connect();
            connection.query("INSERT INTO empleados (nombre,codigo,salario,creado_por) VALUES (?,?,?,?) ", [body.nombre, body.codigo, body.salario, body.creado_por], function (error, results, fields) {
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
            connection.query("SELECT * FROM empleados", function (error, results, fields) {
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
            connection.query("SELECT * FROM empleados WHERE id= ? ", [id], function (error, results, fields) {
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
            connection.query("UPDATE empleados SET nombre=?,codigo=?,salario=? WHERE id= ? ", [body.nombre, body.codigo, body.salario, req.params.id], function (error, results, fields) {
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
            connection.query("DELETE FROM empleados WHERE id= ? ", [id], function (error, results, fields) {
                if (error) { res.json(error) };
                connection.end();
                res.json("DELETE SUCCESFULY");
            });
        } catch (error) {
            res.json(error);
        }

    }
}
export default ControllerEmployeer;