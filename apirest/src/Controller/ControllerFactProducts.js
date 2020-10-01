import Connect from '../Config/Connect'
import mysql from 'mysql'

class ControllerFactProducts {

    static Create(req, res) {
        try {
            var body = req.body;
            var connection = mysql.createConnection(Connect);
            connection.connect();
            connection.query("INSERT INTO productos_facturas (producto_id,factura_id,cantidad,subtotal,creado_por) VALUES (?,?,?,?,?) ", [body.producto_id, req.params.id, body.cantidad, body.subtotal, body.creado_por], function (error, results, fields) {
                if (error) { res.json(error) };
                connection.end();
                res.json("CREATED SUCCESFULY")
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
            connection.query("SELECT pf.id,p.nombre,pf.cantidad,pf.subtotal,pf.creado_por FROM facturas AS f JOIN productos_facturas AS pf ON f.id=pf.factura_id JOIN productos AS p ON p.id=pf.producto_id WHERE f.id= ? ", [id], function (error, results, fields) {
                if (error) { res.json(error) };
                res.json(results)
                connection.end();
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
            connection.query("DELETE FROM productos_facturas WHERE id= ? ", [id], function (error, results, fields) {
                if (error) { res.json(error) };
                connection.end();
                res.json("DELETED SUCCESFULY")
            });
        } catch (error) {
            res.json(error);
        }

    }
}
export default ControllerFactProducts;  