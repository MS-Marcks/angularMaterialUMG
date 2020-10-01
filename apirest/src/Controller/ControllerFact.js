import Connect from '../Config/Connect'
import mysql from 'mysql'

class ControllerFact {
    static Create(req, res) {
        try {
            var body = req.body;
            var connection = mysql.createConnection(Connect);
            connection.connect();
            connection.query("INSERT INTO facturas (cliente_id,empleado_id,creado,estado) VALUES (?,?,CURDATE(),'CREADO') ", [body.cliente_id, body.empleado_id], function (error, results, fields) {
                if (error) { res.json(error) };
                connection.end();
                res.json("CREATED SUCCESFULY")
            });
        } catch (error) {
            res.json(error);
        }
    }
    static SearchFact(req, res) {
        try {
            var connection = mysql.createConnection(Connect);
            connection.connect();
            connection.query(`SELECT 
            f.empleado_id,f.cliente_id,f.id,DATE_FORMAT(f.creado, '%d/%m/%Y') as creado,SUM(pf.subtotal) AS total,e.nombre AS empleado,f.estado,c.nombre AS cliente
            FROM facturas AS f 
            LEFT JOIN productos_facturas AS pf ON f.id=pf.factura_id
            LEFT JOIN productos AS p ON p.id=pf.producto_id
            JOIN empleados AS e ON e.id=f.empleado_id
            JOIN clientes AS c ON c.id=f.cliente_id
            group by f.id,f.creado,e.nombre,c.nombre, f.estado`, function (error, results, fields) {
                if (error) { res.json(error) };
                res.json(results)
                connection.end();
            });
        } catch (error) {
            res.json(error);
        }
    }
    static SearchFactClient(req, res) {
        try {
            var id = req.params.id;
            var connection = mysql.createConnection(Connect);
            connection.connect();
            connection.query(`SELECT f.id,DATE_FORMAT(f.creado, '%d/%m/%Y') as creado,SUM(pf.subtotal) AS total,e.nombre AS empleado,f.estado FROM facturas AS f JOIN productos_facturas AS pf ON f.id=pf.factura_id
                            JOIN productos AS p ON p.id=pf.producto_id
                            JOIN empleados AS e ON e.id=f.empleado_id
                            where f.cliente_id = ?
                            group by f.id,f.creado,e.nombre, f.estado`, [id], function (error, results, fields) {
                if (error) { res.json(error) };
                res.json(results)
                connection.end();
            });
        } catch (error) {
            res.json(error);
        }
    }
    static SearchFactEmployee(req, res) {
        try {
            var id = req.params.id;
            var connection = mysql.createConnection(Connect);
            connection.connect();
            connection.query("SELECT * FROM facturas WHERE empleado_id= ? ", [id], function (error, results, fields) {
                if (error) { res.json(error) };
                res.json(results)
                connection.end();
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
            connection.query("SELECT * FROM facturas WHERE id= ? ", [id], function (error, results, fields) {
                if (error) { res.json(error) };
                res.json(results)
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
            connection.query("UPDATE facturas SET cliente_id=?,empleado_id=? WHERE id= ? ", [body.cliente_id, body.empleado_id, req.params.id], function (error, results, fields) {
                if (error) { res.json(error) };
                connection.end();
                res.json("UPDATED SUCCESFULY")
            });
        } catch (error) {
            res.json(error);
        }
    }
    static ChangeStatusFact(req, res) {
        try {
            var body = req.body;
            var connection = mysql.createConnection(Connect);
            connection.connect();
            connection.query("UPDATE facturas SET estado=? WHERE id= ? ", [body.estado, req.params.id], function (error, results, fields) {
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
            connection.query("UPDATE facturas SET estado='ANULADA' WHERE id= ? ", [id], function (error, results, fields) {
                if (error) { res.json(error) };
                connection.end();
                res.json("DELETED SUCCESFULY")
            });
        } catch (error) {
            res.json(error);
        }

    }
}
export default ControllerFact;