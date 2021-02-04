import AWSSignUpService from "./aws-signup-service";
import createSovaProfileService from "./create-sova-profile-service";

import { configs } from "../../../../utilities/src/configs";
import {
  sanitizeEmail,
  sanitizeName,
  sanitizePhone,
  sanitizeCity,
  sanitizePromotionCode,
} from "../../../../utilities/src/helpers/sanitize-payload-helper";
import {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidPhone,
  isValidCity,
} from "../../../../utilities/src/helpers/validate-payload-helper";

const {
  SIGNUP_PAYLOAD_VALIDATION_ERROR,
  SIGNUP_SERVICE_INVALID_PAYLOAD_ERROR,
  SIGNUP_SERVICE_ACCOUNT_EXISTS_ERROR,
  SIGNUP_ERROR,
} = configs.errors.authentication;

export const signUpService = async (request, h) => {
  const signUpServicePromise = new Promise(async (resolve) => {
    try {
      if (
        !(
          request.payload &&
          request.payload.email &&
          request.payload.password &&
          request.payload.name &&
          request.payload.phone &&
          request.payload.city
        )
      ) {
        return resolve({
          error: SIGNUP_PAYLOAD_VALIDATION_ERROR,
          payload: {},
        });
      }

      const errors = { status: false };

      const sanitizedEmail = sanitizeEmail({
        email: request.payload.email,
      });
      const sanitizedName = sanitizeName({ name: request.payload.name });
      const sanitizedPhone = sanitizePhone({
        phone: request.payload.phone,
      });
      const sanitizedCity = sanitizeCity({ city: request.payload.city });
      const sanitizedPromotionCode = sanitizePromotionCode({
        promotionCode: request.payload.promotionCode,
      });

      if (
        !(sanitizedEmail && sanitizedName && sanitizedPhone && sanitizedCity)
      ) {
        return resolve({
          error: SIGNUP_PAYLOAD_VALIDATION_ERROR,
          payload: {},
        });
      }

      if (!isValidEmail({ email: sanitizedEmail })) {
        errors.status = true;
        errors.email = true;
      }

      if (!isValidPassword({ password: request.payload.password })) {
        errors.status = true;
        errors.password = true;
      }

      if (!isValidName({ name: sanitizedName })) {
        errors.status = true;
        errors.name = true;
      }

      if (!isValidPhone({ phone: sanitizedPhone })) {
        errors.status = true;
        errors.phone = true;
      }

      if (!isValidCity({ city: sanitizedCity })) {
        errors.status = true;
        errors.city = true;
      }

      if (errors.status) {
        return resolve({
          error: SIGNUP_PAYLOAD_VALIDATION_ERROR,
          payload: {
            ...errors,
            message: "Please enter valid details for the highlighted fields.",
          },
        });
      }

      const userAccount = await AWSSignUpService({
        email: sanitizedEmail,
        password: request.payload.password,
      });

      if (userAccount.error) {
        switch (userAccount.error) {
          case SIGNUP_SERVICE_INVALID_PAYLOAD_ERROR: {
            return resolve({
              error: SIGNUP_SERVICE_INVALID_PAYLOAD_ERROR,
              payload: {
                message: "Please enter valid email and password.",
              },
            });
          }
          case SIGNUP_SERVICE_ACCOUNT_EXISTS_ERROR: {
            return resolve({
              error: SIGNUP_SERVICE_ACCOUNT_EXISTS_ERROR,
              payload: {
                message:
                  "This email address is already registered with Sova. Please try to log in or recover your password.",
              },
            });
          }
          default: {
            return resolve({
              error: SIGNUP_ERROR,
              payload: {
                message: "Something went wrong. Please try again later.",
              },
            });
          }
        }
      }

      const userProfile = await createSovaProfileService({
        accountId: userAccount.payload,
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        city: sanitizedCity,
        promotionCode: sanitizedPromotionCode,
      });

      if (userProfile.error) {
        return resolve({
          error: SIGNUP_ERROR,
          payload: {
            message: "Something went wrong. Please try again later.",
          },
        });
      }

      return resolve({
        error: false,
        payload: {},
      });
    } catch (error) {
      console.log(SIGNUP_ERROR, error);
      return resolve({
        error: SIGNUP_ERROR,
        payload: {
          message: "Something went wrong. Please try again later.",
        },
      });
    }
  });

  const signUpServicePromiseResponse = await signUpServicePromise;
  return signUpServicePromiseResponse;
};

export default signUpService;
