import express from 'express';
import bodyParser from 'body-parser';
var cors = require('cors');
import { RegisterRoutes } from "./routes/routes";

// 创建一个express实例
const app: express.Application = express();

var corsOptions = {
    credentials:true,
    origin:'http://localhost:3000',
    optionsSuccessStatus:200
};
app.use(cors(corsOptions));

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);
app.use(bodyParser.json());

RegisterRoutes(app); // 添加路由

app.listen(5000, ()=> {
    console.log('Example app listening on port 5000!');
});