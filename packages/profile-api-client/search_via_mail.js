const Hapi = require('@hapi/hapi')
const QS = require('qs')

import pkg1 from '../utilities/src/helpers/sanitize-payload-helper.js';
const { sanitizeEmail } = pkg1;

import pkg2 from '../utilities/src/helpers/validate-payload-helper.js';
const { isValidEmail } = pkg2;

//import { sanitizeEmail } from  "../utilities/src/helpers/sanitize-payload-helper.js";
//import { isValidEmail } from "../utilities/src/helpers/validate-payload-helper.js";
import {dbSelect} from "./select-query.js";

export const check_via_mail = async (request, h) => {
    const check_via_mail_promise = new Promise(async (resolve) => {
      try {
        if (
          !(
            request.payload &&
            request.payload.email 
            
          )
        ) {
          return resolve({
            error: "MAIL_PAYLOAD_VALIDATION_ERROR",
            payload: {},
          });
        }
  
        const errors = { status: false };
  
        const sanitizedEmail = sanitizeEmail({
          email: request.payload.email,
        });
  
        if (
          !(sanitizedEmail)
        ) {
          return resolve({
            error: "MAIL_PAYLOAD_VALIDATION_ERROR",
            payload: {},
          });
        }
  
        if (!isValidEmail({ email: sanitizedEmail })) {
          errors.status = true;
          errors.email = true;
        }

        
  
        if (errors.status) {
          return resolve({
            error: "MAIL_PAYLOAD_VALIDATION_ERROR",
            payload: {
              ...errors,
              message: "Please enter valid details for the highlighted fields.",
            },
          });
        }

        

        const profile = dbSelect('PROFILES', columns, {email : sanitizedEmail});
        console.log(profile);

      } catch (error) {
        console.log("SIGNUP_SERVICE_ERROR", error);
        return resolve({
          error: "SIGNUP_ERROR",
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


startServer();
