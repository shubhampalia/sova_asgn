"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbInsert = void 0;
const connectors_1 = require("../connectors");
const configs_1 = require("../configs");
const { tables } = configs_1.configs.services.aws.rds;
const dbInsert = async ({ table_name, data }) => {
    const dbInsertPromise = new Promise((resolve) => {
        try {
            if (!(table_name in tables)) {
                return resolve({
                    error: "INVALID_TABLE_NAME_ERROR",
                    payload: {},
                });
            }
            connectors_1.AWSMySQLConnector.insert([data])
                .into(table_name)
                .then(() => {
                console.log("Inside then");
                return resolve({
                    error: false,
                    payload: {},
                });
            })
                .catch((error) => {
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
    const dbInsertPromiseResponse = await dbInsertPromise;
    return dbInsertPromiseResponse;
};
exports.dbInsert = dbInsert;
