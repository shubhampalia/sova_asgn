import jwt from "jsonwebtoken";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

import {
  sanitizeEmail,
  sanitizePassword,
} from "../../../../utilities/src/helpers/sanitize-payload-helper";
import { configs } from "../../../../utilities/src/configs";
import { isValidEmail } from "../../../../utilities/src/helpers/validate-payload-helper";
import { AWSCognitoConnector } from "../../../../utilities/src/connectors";

const {
  LOGIN_PAYLOAD_VALIDATION_ERROR,
  COGNITO_LOGIN_ERROR,
  LOGIN_SERVICE_INVALID_PAYLOAD_ERROR,
  LOGIN_SERVICE_INCORRECT_CREDENTIALS_ERROR,
  LOGIN_ERROR,
  LOGIN_SERVICE_ACCOUNT_PARSING_ERROR,
} = configs.errors.authentication;

export const logInService = async (request, h) => {
  const logInServicePromise = new Promise((resolve) => {
    try {
      if (
        !(request.payload && request.payload.email && request.payload.password)
      ) {
        return resolve({
          error: LOGIN_PAYLOAD_VALIDATION_ERROR,
          payload: {},
        });
      }

      const sanitizedEmail = sanitizeEmail({
        email: request.payload.email,
      });

      const sanitizedPassword = sanitizePassword({
        password: request.payload.password,
      });

      if (!(sanitizedEmail && sanitizedPassword)) {
        return resolve({
          error: LOGIN_PAYLOAD_VALIDATION_ERROR,
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
          error: LOGIN_PAYLOAD_VALIDATION_ERROR,
          payload: {
            ...errors,
            message: "Please enter valid details for the mentioned fields.",
          },
        });
      }

      const authenticationPayload = new AuthenticationDetails({
        Username: sanitizedEmail,
        Password: sanitizedPassword,
      });

      const cognitoContext = {
        Username: sanitizedEmail,
        Pool: AWSCognitoConnector,
      };

      const cognitoUser = new CognitoUser(cognitoContext);

      cognitoUser.authenticateUser(authenticationPayload, {
        onFailure: (logInError) => {
          console.log(COGNITO_LOGIN_ERROR, logInError);
          switch (logInError.code) {
            case InvalidParameterException: {
              resolve({
                error: LOGIN_SERVICE_INVALID_PAYLOAD_ERROR,
                payload: {},
              });
              break;
            }
            case NotAuthorizedException: {
              resolve({
                error: LOGIN_SERVICE_INCORRECT_CREDENTIALS_ERROR,
                payload: {},
              });
              break;
            }
            default: {
              resolve({ error: LOGIN_ERROR, payload: {} });
            }
          }
        },
        onSuccess: (account) => {
          try {
            const accessToken = account.getAccessToken().getJwtToken();
            const decodedAccessToken = jwt.decode(accessToken, {
              complete: true,
            });

            resolve({
              error: false,
              payload: decodedAccessToken.payload,
            });
          } catch (accountParsingError) {
            console.log(
              LOGIN_SERVICE_ACCOUNT_PARSING_ERROR,
              accountParsingError
            );
            resolve({
              error: LOGIN_SERVICE_ACCOUNT_PARSING_ERROR,
              payload: {},
            });
          }
        },
      });
    } catch (error) {
      console.log(LOGIN_ERROR, error);
      return resolve({
        error: LOGIN_ERROR,
        payload: {
          message: "Something went wrong. Please try again later.",
        },
      });
    }
  });
  const logInServicePromiseResponse = await logInServicePromise;
  return logInServicePromiseResponse;
};

export default logInService;
