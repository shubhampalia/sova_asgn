import { AWSCognitoConnector } from "../../../../utilities/connectors";

import { configs } from "../../../configs";

const {
  InvalidParameterException,
  UsernameExistsException,
  SIGNUP_SERVICE_INVALID_PAYLOAD_ERROR,
  SIGNUP_SERVICE_ACCOUNT_EXISTS_ERROR,
} = configs.errors.authentication;

export const AWSSignUpService = async ({ email, password }) => {
  const AWSSignUpServicePromise = new Promise((resolve) => {
    try {
      AWSCognitoConnector.signUp(
        email,
        password,
        [],
        null,
        (signUpError, account) => {
          if (signUpError) {
            console.log("COGNITO_SIGNUP_ERROR", signUpError);
            switch (signUpError.code) {
              case InvalidParameterException: {
                resolve({
                  error: SIGNUP_SERVICE_INVALID_PAYLOAD_ERROR,
                  payload: {},
                });
                break;
              }
              case UsernameExistsException: {
                resolve({
                  error: SIGNUP_SERVICE_ACCOUNT_EXISTS_ERROR,
                  payload: {},
                });
                break;
              }
              default: {
                resolve({ error: "SIGNUP_SERVICE_ERROR", payload: {} });
              }
            }
          } else {
            const accountId = account.userSub;
            resolve({
              error: false,
              payload: accountId,
            });
          }
        }
      );
    } catch (error) {
      console.log("SIGNUP_SERVICE_ERROR", error);
      resolve({ error: "SIGNUP_SERVICE_ERROR", payload: {} });
    }
  });

  const AWSSignUpServiceResponse = await AWSSignUpServicePromise;

  return AWSSignUpServiceResponse;
};

export default AWSSignUpService;
