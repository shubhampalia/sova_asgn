import {
  generateSovaIdHelper,
  generateCustomerIdHelper,
  generateReferralCodeHelper,
} from "../../../../utilities/src/helpers/generate-id-helper";
import { configs } from "../../../../utilities/src/configs";
import { dbInsert } from "../../../../utilities/src/database/insert-query";
import { Profiles } from "../../../../utilities/src/database/table-interfaces";

const { PROFILES_TABLE } = configs.services.aws.rds.tables;
const { CREATE_SOVA_PROFILE_DATABASE_ERROR } = configs.errors.authentication;

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

      const dbInsertResponse: any = await dbInsert({
        table_name: PROFILES_TABLE,
        data,
      });

      if (dbInsertResponse.error) {
        console.log(CREATE_SOVA_PROFILE_DATABASE_ERROR, dbInsertResponse.error);
        resolve({
          error: CREATE_SOVA_PROFILE_DATABASE_ERROR,
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
      console.log(CREATE_SOVA_PROFILE_DATABASE_ERROR, error);
      resolve({ error: CREATE_SOVA_PROFILE_DATABASE_ERROR, payload: {} });
    }
  });

  const createSovaProfileServiceResponse = await createSovaProfileServicePromise;

  return createSovaProfileServiceResponse;
};

export default createSovaProfileService;
