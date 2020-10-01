import express from 'express';
import bodyparser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import Routes from './Config/Routes'
import auth from './Tools/Middleware/auth'
import morgan from 'morgan';

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

const app = express();
const corsOptions = { origin: '*' }

const AUTHOptions = {
    UrlStart: "/api/login",
    ActiveTime: "5h",
    KEY_TOKEN: process.env.KEY_TOKEN,
    NameToken: "access-token",
}

app.set("port", process.env.PORT || 3000);
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(helmet())
app.use(morgan("combined"))
app.use(cors(corsOptions))
app.use(auth(AUTHOptions))
app.use("/api", Routes)
app.get("/", (req, res) => { res.send("API FACTURAS") })
const server = app.listen(app.get("port"), () => { console.log(`http://localhost:${server.address().port}`) })




export default server;