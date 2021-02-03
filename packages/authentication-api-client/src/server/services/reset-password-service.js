import { CognitoUser } from "amazon-cognito-identity-js";
import { AWSCognitoConnector } from "../../../../utilities/src/connectors";

import {
  sanitizeEmail,
  sanitizeOTP,
} from "../../../../utilities/src/helpers/sanitize-payload-helper";
import {
  isValidEmail,
  isValidPassword,
} from "../../../../utilities/src/helpers/validate-payload-helper";

export const resetPasswordService = async (request, h) => {
  const resetPasswordPromise = new Promise((resolve) => {
    try {
      if (
        !(
          request.payload &&
          request.payload.email &&
          request.payload.password &&
          request.payload.otp
        )
      ) {
        return {
          error: "RESET_PASSWORD_PAYLOAD_VALIDATION_ERROR",
          payload: {},
        };
      }

      const sanitizedEmail = sanitizeEmail({
        email: request.payload.email,
      });

      const sanitizedOTP = sanitizeOTP({
        otp: request.payload.otp,
      });

      if (!(sanitizedEmail && sanitizedOTP)) {
        return {
          error: "RESET_PASSWORD_PAYLOAD_VALIDATION_ERROR",
          payload: {},
        };
      }

      const errors = { status: false };

      if (!isValidEmail({ email: sanitizedEmail })) {
        errors.status = true;
        errors.email = true;
      }

      if (!isValidPassword({ password: request.payload.password })) {
        errors.status = true;
        errors.password = true;
      }

      if (errors.status) {
        return {
          error: "RESET_PASSWORD_PAYLOAD_VALIDATION_ERROR",
          payload: {
            ...errors,
            message: "Please enter valid details for the highlighted fields.",
          },
        };
      }

      const cognitoContext = {
        Username: sanitizedEmail,
        Pool: AWSCognitoConnector,
      };

      const cognitoUser = new CognitoUser(cognitoContext);

      cognitoUser.confirmPassword(sanitizedOTP, request.payload.password, {
        onSuccess: () => {
          resolve({ error: false, payload: {} });
        },
        onFailure: (resetPasswordError) => {
          console.log("COGNITO_RESET_PASSWORD_ERROR", resetPasswordError);
          switch (resetPasswordError.code) {
            case "InvalidParameterException": {
              resolve({
                error: "RESET_PASSWORD_SERVICE_INVALID_PAYLOAD_ERROR",
                payload: {},
              });
              break;
            }
            case "CodeMismatchException": {
              resolve({
                error: "RESET_PASSWORD_SERVICE_INCORRECT_OTP_ERROR",
                payload: {},
              });
              break;
            }
            case "ExpiredCodeException": {
              resolve({
                error: "RESET_PASSWORD_SERVICE_EXPIRED_OTP_ERROR",
                payload: {},
              });
              break;
            }
            case "LimitExceededException": {
              resolve({
                error: "RESET_PASSWORD_SERVICE_MAXIMUM_RETRY_LIMIT_ERROR",
                payload: {},
              });
              break;
            }
            default: {
              resolve({ error: "RESET_PASSWORD_SERVICE_ERROR", payload: {} });
              break;
            }
          }
        },
      });
    } catch (error) {
      console.log("RESET_PASSWORD_SERVICE_ERROR", error);
      return {
        error: "RESET_PASSWORD_ERROR",
        payload: {
          message: "Something went wrong. Please try again later.",
        },
      };
    }
  });

  const resetPasswordServiceResponse = await resetPasswordPromise;
  return resetPasswordServiceResponse;
};

export default resetPasswordService;
