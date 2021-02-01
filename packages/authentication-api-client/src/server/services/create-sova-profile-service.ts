import {
  generateSovaIdHelper,
  generateCustomerIdHelper,
  generateReferralCodeHelper,
} from "../../../../utilities/helpers/generate-id-helper";
import { configs } from "../../../configs";
import { dbInsert } from "../../../../utilities/database/insert-query";
import { Profiles } from "../../../../utilities/database/table-interfaces";

const { PROFILES_TABLE } = configs.services.aws.rds.tables;

export const createSovaProfileService = async ({
  accountId,
  name,
  email,
  phone,
  city,
  promotionCode,
}) => {
  const createSovaProfileServicePromise = new Promise(async (resolve) => {
    try {
      const sovaId = generateSovaIdHelper();
      const customerId = generateCustomerIdHelper({ sovaId });
      const referralCode = generateReferralCodeHelper({ name });
      // Make an interface or Typescript for each table - Typescript type definition
      const data: Profiles = {
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

      const dbInsertResponse = await dbInsert({
        table_name: PROFILES_TABLE,
        data,
      });

      if (dbInsertResponse.error) {
        console.log(
          "CREATE_SOVA_PROFILE_DATABASE_ERROR",
          dbInsertResponse.error
        );
        resolve({
          error: "CREATE_SOVA_PROFILE_DATABASE_ERROR",
          payload: {},
        });
      } else {
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
    } catch (error) {
      console.log("CREATE_SOVA_PROFILE_SERVICE_ERROR", error);
      resolve({ error: "CREATE_SOVA_PROFILE_SERVICE_ERROR", payload: {} });
    }
  });

  const createSovaProfileServiceResponse = await createSovaProfileServicePromise;

  return createSovaProfileServiceResponse;
};

export default createSovaProfileService;
