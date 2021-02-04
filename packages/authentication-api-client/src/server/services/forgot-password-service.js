import { CognitoUser } from "amazon-cognito-identity-js";

import { AWSCognitoConnector } from "../../../../utilities/src/connectors";
import { configs } from "../../../../utilities/src/configs";
import { sanitizeEmail } from "../../../../utilities/src/helpers/sanitize-payload-helper";
import { isValidEmail } from "../../../../utilities/src/helpers/validate-payload-helper";

const {
  FORGOT_PASSWORD_PAYLOAD_VALIDATION_ERROR,
  COGNITO_REQUEST_OTP_ERROR,
  FORGOT_PASSWORD_SERVICE_REQUEST_OTP_ERROR,
  FORGOT_PASSWORD_ERROR,
} = configs.errors.authentication;

export const forgotPasswordService = async (request, h) => {
  const forgotPasswordServicePromise = new Promise((resolve) => {
    try {
      if (!(request.payload && request.payload.email)) {
        return resolve({
          error: FORGOT_PASSWORD_PAYLOAD_VALIDATION_ERROR,
          payload: {},
        });
      }
      const sanitizedEmail = sanitizeEmail({
        email: request.payload.email,
      });

      if (!sanitizedEmail) {
        return resolve({
          error: FORGOT_PASSWORD_PAYLOAD_VALIDATION_ERROR,
          payload: {},
        });
      }

      const errors = { status: false };

      if (!isValidEmail({ email: sanitizedEmail })) {
        errors.status = true;
        errors.email = true;
      }

      if (errors.status) {
        return resolve({
          error: FORGOT_PASSWORD_PAYLOAD_VALIDATION_ERROR,
          payload: {
            ...errors,
            message: "Please enter valid details for the mentioned fields.",
          },
        });
      }

      const cognitoContext = {
        Username: sanitizedEmail,
        Pool: AWSCognitoConnector,
      };
      const cognitoUser = new CognitoUser(cognitoContext);
      cognitoUser.forgotPassword({
        onSuccess: () => {
          return resolve({ error: false, payload: {} });
        },
        onFailure: (requestOTPError) => {
          console.log(COGNITO_REQUEST_OTP_ERROR, requestOTPError);
          return resolve({
            error: FORGOT_PASSWORD_SERVICE_REQUEST_OTP_ERROR,
            payload: {},
          });
        },
      });
    } catch (error) {
      console.log(FORGOT_PASSWORD_ERROR, error);
      return resolve({
        error: FORGOT_PASSWORD_ERROR,
        payload: {
          message: "Something went wrong. Please try again later.",
        },
      });
    }
  });

  const forgotPasswordServicePromiseResponse = await forgotPasswordServicePromise;
  return forgotPasswordServicePromiseResponse;
};

export default forgotPasswordService;
