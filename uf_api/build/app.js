"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
var cors = require('cors');
const routes_1 = require("./routes/routes");
// 创建一个express实例
const app = express_1.default();
var corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
routes_1.RegisterRoutes(app); // 添加路由
app.listen(5000, () => {
    console.log('Example app listening on port 5000!');
});
