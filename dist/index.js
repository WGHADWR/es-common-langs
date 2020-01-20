"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClients_1 = require("./http/HttpClients");
const finance_1 = require("./util/finance");
exports.default = {
    http: HttpClients_1.http,
    util: {
        finance: finance_1.finance,
    }
};
