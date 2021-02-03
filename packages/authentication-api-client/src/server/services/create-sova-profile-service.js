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
exports.createSovaProfileService = void 0;
var generate_id_helper_1 = require("../../../../utilities/src/helpers/generate-id-helper");
var configs_1 = require("../../../configs");
var insert_query_1 = require("../../../../utilities/src/database/insert-query");
var PROFILES_TABLE = configs_1.configs.services.aws.rds.tables.PROFILES_TABLE;
var createSovaProfileService = function (_a) {
    var accountId = _a.accountId, name = _a.name, email = _a.email, phone = _a.phone, city = _a.city, promotionCode = _a.promotionCode;
    return __awaiter(void 0, void 0, void 0, function () {
        var createSovaProfileServicePromise, createSovaProfileServiceResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    createSovaProfileServicePromise = new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
                        var sovaId, customerId, referralCode, data, dbInsertResponse, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    sovaId = generate_id_helper_1.generateSovaIdHelper();
                                    customerId = generate_id_helper_1.generateCustomerIdHelper({ sovaId: sovaId });
                                    referralCode = generate_id_helper_1.generateReferralCodeHelper({ name: name });
                                    data = {
                                        account_id: accountId,
                                        sova_id: sovaId,
                                        customer_id: customerId,
                                        name: name,
                                        email: email,
                                        phone: phone,
                                        city: city,
                                        referral_code: referralCode,
                                        promotion_code: promotionCode,
                                    };
                                    return [4 /*yield*/, insert_query_1.dbInsert({
                                            table_name: PROFILES_TABLE,
                                            data: data,
                                        })];
                                case 1:
                                    dbInsertResponse = _a.sent();
                                    if (dbInsertResponse.error) {
                                        console.log("CREATE_SOVA_PROFILE_DATABASE_ERROR", dbInsertResponse.error);
                                        resolve({
                                            error: "CREATE_SOVA_PROFILE_DATABASE_ERROR",
                                            payload: {},
                                        });
                                    }
                                    else {
                                        resolve({
                                            error: false,
                                            payload: {
                                                sovaId: sovaId,
                                                customerId: customerId,
                                                name: name,
                                                email: email,
                                                phone: phone,
                                                city: city,
                                                referralCode: referralCode,
                                                promotionCode: promotionCode,
                                            },
                                        });
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    console.log("CREATE_SOVA_PROFILE_SERVICE_ERROR", error_1);
                                    resolve({ error: "CREATE_SOVA_PROFILE_SERVICE_ERROR", payload: {} });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, createSovaProfileServicePromise];
                case 1:
                    createSovaProfileServiceResponse = _b.sent();
                    return [2 /*return*/, createSovaProfileServiceResponse];
            }
        });
    });
};
exports.createSovaProfileService = createSovaProfileService;
exports.default = exports.createSovaProfileService;
//# sourceMappingURL=create-sova-profile-service.js.map