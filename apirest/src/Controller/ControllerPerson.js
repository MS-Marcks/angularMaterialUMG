import Connect from '../Config/Connect'
import mysql from 'mysql'

class ControllerPerson {
    static Login(req, res) {
        try {
            var body = req.body;
            console.log(body);
            var connection = mysql.createConnection(Connect);
            connection.connect();
            connection.query("SELECT * FROM usuarios WHERE nombre= ? ", [body.nombre], function (error, results, fields) {
                if (error) { res.json(error) };
                connection.end();
                try {
                    if (body.password == results[0].password) {
                        res.json({ auth: false, "token": req.GenerateToken(results[0]) })
                    } else {
                        res.json({ mensaje: "USER AND/OR PASSWORD INCORRECT" });
                    }
                } catch (error) {
                    res.json({ mensaje: "USER AND/OR PASSWORD INCORRECT" });
                }
            });
        } catch (error) {
            res.json(error);
        }

    }
}
export default ControllerPerson;