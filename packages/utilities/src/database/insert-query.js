"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbInsert = void 0;
var connectors_1 = require("../connectors");
var configs_1 = require("../configs");
var tables = configs_1.configs.services.aws.rds.tables;
var dbInsert = function (_a) {
    var table_name = _a.table_name, data = _a.data;
    return __awaiter(void 0, void 0, void 0, function () {
        var dbInsertPromise, dbInsertPromiseResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dbInsertPromise = new Promise(function (resolve) {
                        try {
                            if (!(table_name in tables)) {
                                return resolve({
                                    error: "INVALID_TABLE_NAME_ERROR",
                                    payload: {},
                                });
                            }
                            connectors_1.AWSMySQLConnector.insert([data])
                                .into(table_name)
                                .then(function () {
                                console.log("Inside then");
                                return resolve({
                                    error: false,
                                    payload: {},
                                });
                            })
                                .catch(function (error) {
                                console.log("MYSQL_INSERT_INTERNAL_ERROR", error);
                                return resolve({
                                    error: "MYSQL_INSERT_INTERAL_ERROR",
                                    payload: {},
                                });
                            });
                        }
                        catch (error) {
                            console.log("MYSQL_INSERT_INTERNAL_ERROR", error);
                            return resolve({
                                error: "MYSQL_INSERT_INTERAL_ERROR",
                                payload: {},
                            });
                        }
                    });
                    return [4 /*yield*/, dbInsertPromise];
                case 1:
                    dbInsertPromiseResponse = _b.sent();
                    return [2 /*return*/, dbInsertPromiseResponse];
            }
        });
    });
};
exports.dbInsert = dbInsert;
//# sourceMappingURL=insert-query.js.map