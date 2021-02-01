"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSovaProfileService = void 0;
const generate_id_helper_1 = require("../../../../utilities/helpers/generate-id-helper");
const configs_1 = require("../../../configs");
const insert_query_1 = require("../../../../utilities/database/insert-query");
const { PROFILES_TABLE } = configs_1.configs.services.aws.rds.tables;
const createSovaProfileService = async ({ accountId, name, email, phone, city, promotionCode, }) => {
    const createSovaProfileServicePromise = new Promise(async (resolve) => {
        try {
            const sovaId = generate_id_helper_1.generateSovaIdHelper();
            const customerId = generate_id_helper_1.generateCustomerIdHelper({ sovaId });
            const referralCode = generate_id_helper_1.generateReferralCodeHelper({ name });
            // Make an interface or Typescript for each table - Typescript type definition
            const data = {
                account_id: accountId,
                sova_id: sovaId,
                customer_id: customerId,
                name,
                email,
                phone,
                city,
                referral_code: referralCode,
                promotion_code: promotionCode,
            };
            const dbInsertResponse = await insert_query_1.dbInsert({
                table_name: PROFILES_TABLE,
                data,
            });
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
                        sovaId,
                        customerId,
                        name,
                        email,
                        phone,
                        city,
                        referralCode,
                        promotionCode,
                    },
                });
            }
        }
        catch (error) {
            console.log("CREATE_SOVA_PROFILE_SERVICE_ERROR", error);
            resolve({ error: "CREATE_SOVA_PROFILE_SERVICE_ERROR", payload: {} });
        }
    });
    const createSovaProfileServiceResponse = await createSovaProfileServicePromise;
    return createSovaProfileServiceResponse;
};
exports.createSovaProfileService = createSovaProfileService;
exports.default = exports.createSovaProfileService;
