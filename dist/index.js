"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
const serverHttp = http_1.default.createServer(app);
app.get("/", (req, res) => {
    console.log("teste de teste topo do mal");
});
serverHttp.listen(3004, () => {
    console.log("Escutando na porta 3004");
});
