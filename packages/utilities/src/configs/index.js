import fs from "fs";
import path from "path";

const currentDirectory = fs.realpathSync(process.cwd());

const resolvePath = (relativePath) =>
  path.resolve(currentDirectory, relativePath);

export const configs = {
  environment: process.env.NODE_ENV,
  server: {
    hostname: process.env.HOST || "0.0.0.0",
    port: parseInt(process.env.PORT, 10) || 3000,
  },

  paths: {
    sovaFavicon: resolvePath("./build/favicon.ico"),
    sovaLogo: resolvePath("./build/logo.png"),
    sovaLogoWithBackground: resolvePath("./build/logo-wbg.png"),
    indexHTML: resolvePath("./build/index.html"),
    clientBuild: resolvePath("./build/static"),
    ingestionScriptsTemplateBasePath: resolvePath(
      process.env.NODE_ENV === "production"
        ? "./src/server/models/templates/production"
        : "./src/server/models/templates/staging"
    ),
    ingestionScriptsBloodTestsBasePath: resolvePath(
      process.env.NODE_ENV === "production"
        ? "./blood-tests/production"
        : "./blood-tests/staging"
    ),
    biomarkerReportDirectory: resolvePath("./uploads/reports"),
  },

  app: {
    enableIngestionScripts: process.env.ENABLE_INGESTION === "ALLOW",
    ingestionUserId: process.env.INGESTION_USER_ID,
    exportCustomerQuestionnaireExcelBasePath: resolvePath(
      `./exports/${
        process.env.NODE_ENV === "production" ? "production" : "non-production"
      }/customer-questionnaire`
    ),
    notifyBloodTestPartnerForScheduling: process.env.NODE_ENV === "production",
    sendQuestionnaireTemplateEmail: process.env.NODE_ENV === "production",
    addLeadsToFreshmarketer: true,
    addUserToFreshmarketer: true,
    hiddenBiomarkers: process.env.HIDDEN_BIOMARKERS || "[]",
    berkowitsPromo: process.env.BERKOWITS_PROMO,
    berkowitsPlanId:
      process.env.NODE_ENV === "production" // ACHIEVE PLUS PLAN
        ? "c0483be2-cf2f-46e1-a29f-316923c7e48d"
        : "8a59a584-fb37-4fa7-bfc5-af011923aabd",
    physioActivePromo: process.env.PHYSIOACTIVE_PROMO,
    physioActivePlanId:
      process.env.NODE_ENV === "production" // ACHIEVE PLUS PLAN
        ? "c0483be2-cf2f-46e1-a29f-316923c7e48d"
        : "8a59a584-fb37-4fa7-bfc5-af011923aabd",
    authentication: {
      authenticationCookie: process.env.AUTHENTICATION_COOKIE || "customer",
      authenticationKey: process.env.AUTHENTICATION_KEY,
      unauthenticatedRedirectURL: "/login",
      isAuthenticationSecure:
        process.env.NODE_ENV === "production" &&
        process.env.ENABLE_INGESTION !== "ALLOW",
    },
    state: {
      defaults: {
        isSecure: process.env.NODE_ENV === "production",
        isHttpOnly: true,
        isSameSite: "Strict",
        path: "/",
        ignoreErrors: process.env.IGNORE_STATE_ERRORS !== "DISALLOW" && true,
        clearInvalid: process.env.CLEAR_INVALID_STATE !== "DISALLOW" && true,
        strictHeader: true,
        encoding: "none",
      },
      cookies: [
        {
          id: "CUSTOMER_CONTEXT_COOKIE",
          name: process.env.CONTEXT_COOKIE || "context",
          options: {
            isSecure: process.env.NODE_ENV === "production",
            isHttpOnly: true,
            isSameSite: "Strict",
            path: "/",
            encoding: "iron",
            password: process.env.CONTEXT_PASSWORD,
            ignoreErrors: true,
            clearInvalid: true,
            strictHeader: true,
          },
        },
      ],
    },
  },

  services: {
    aws: {
      region: process.env.AWS_REGION,
      cognito: {
        userPoolId: process.env.COGNITO_POOL,
        clientId: process.env.COGNITO_CLIENT,
      },
      rds: {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT, 10),
        connectionLimit: parseInt(process.env.MYSQL_CONNECTION_LIMIT, 10),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        connectTimeout: parseInt(process.env.MYSQL_CONNECTION_TIMEOUT, 10),
        tables: {
          PROFILES: "PROFILES",
          USERS: "USERS",
          USER_QUESTIONNAIRE: "USER_QUESTIONNAIRE",
          USER_DIET_PREFERENCE: "USER_DIET_PREFERENCE",
          USER_TEST_SCHEDULE: "USER_TEST_SCHEDULE",
          PROMOTIONS: "PROMOTIONS",
          PROMOTION_DETAILS: "PROMOTION_DETAILS",
          PROMOTION_DETAILS_TEMPORARY: "PROMOTION_DETAILS_TEMPORARY",
          PROMOTION_ATTRIBUTION: "PROMOTION_ATTRIBUTION",
          ORDERS: "ORDERS",
          PAYMENTS: "PAYMENTS",
          MODULES: "MODULES",
          MODULES_TEMPORARY: "MODULES_TEMPORARY",
          PROGRAMS: "PROGRAMS",
          PROGRAMS_TEMPORARY: "PROGRAMS_TEMPORARY",
          BIOMARKER_GLOSSARY: "BIOMARKER_GLOSSARY",
          BIOMARKER_GLOSSARY_TEMPORARY: "BIOMARKER_GLOSSARY_TEMPORARY",
          BIOMARKER_PARTNER_MAPPINGS: "BIOMARKER_PARTNER_MAPPINGS",
          BIOMARKER_PARTNER_MAPPINGS_TEMPORARY:
            "BIOMARKER_PARTNER_MAPPINGS_TEMPORARY",
          BIOMARKER_REPORT_SUMMARY: "BIOMARKER_REPORT_SUMMARY",
          BIOMARKER_REPORT_DETAILS: "BIOMARKER_REPORT_DETAILS",
          FOODS: "FOODS",
          FOODS_TEMPORARY: "FOODS_TEMPORARY",
          NUTRIENT_DRI: "NUTRIENT_DRI",
          NUTRIENT_DRI_TEMPORARY: "NUTRIENT_DRI_TEMPORARY",
          DESCRIPTION_MAPPING: "DESCRIPTION_MAPPING",
          DESCRIPTION_MAPPING_TEMPORARY: "DESCRIPTION_MAPPING_TEMPORARY",
          RECOMMENDATION_MAPPINGS: "RECOMMENDATION_MAPPINGS",
          RECOMMENDATION_MAPPINGS_TEMPORARY:
            "RECOMMENDATION_MAPPINGS_TEMPORARY",
          BIOMARKER_RECOMMENDATION_GROUP_MAPPING:
            "BIOMARKER_RECOMMENDATION_GROUP_MAPPING",
          BIOMARKER_RECOMMENDATION_GROUP_MAPPING_TEMPORARY:
            "BIOMARKER_RECOMMENDATION_GROUP_MAPPING_TEMPORARY",
          GENERATED_FOOD_RECOMMENDATIONS: "GENERATED_FOOD_RECOMMENDATIONS",
          GENERATED_FOOD_RECOMMENDATIONS_TEMPORARY:
            "GENERATED_FOOD_RECOMMENDATIONS_TEMPORARY",
          GENERATED_RECOMMENDATION_DESCRIPTION:
            "GENERATED_RECOMMENDATION_DESCRIPTION",
          GENERATED_RECOMMENDATION_DESCRIPTION_TEMPORARY:
            "GENERATED_RECOMMENDATION_DESCRIPTION_TEMPORARY",
        },
      },
      ses: {
        apiVersion: "2010-12-01",
        SES_EMAIL_SOURCE: process.env.SES_EMAIL_SOURCE || "support@sova.health",
        INTERNAL_EMAILS: process.env.INTERNAL_EMAILS || "['rahul@sova.health']",
        SIGNUP_EMAIL_RECIPIENTS: "",
        PAYMENT_EMAIL_RECIPIENTS: "",
        ONBOARDING_EMAIL_RECIPIENTS: "",
        BLOOD_TEST_SCHEDULING_EMAIL_RECIPIENTS:
          process.env.BLOOD_TEST_SCHEDULING_EMAIL_RECIPIENTS ||
          "['rahul@sova.health']",
      },
    },
    razorPay: {
      apiKey: process.env.RAZORPAY_KEY,
      apiSecret: process.env.RAZORPAY_SECRET,
    },
    freshmarketer: {
      apiKey: process.env.FRESHMARKETER_API_KEY,
      addContactToListURL:
        "https://sovahealth.freshmarketer.com/mas/api/v1/contacts",
      leadsList: process.env.FRESHMARKETER_LEADS_LIST,
      contactSource:
        process.env.NODE_ENV === "production" ? "SOVA_APP" : "TESTING_SOVA_APP",
      defaultContact:
        process.env.NODE_ENV === "production" ? "" : "nomatch_rahuk2@yahoo.com",
      programIdToListMap: {
        /* Production */
        "473598f5-6a1a-4189-ad0e-533c94fbfcb7":
          process.env.FRESHMARKETER_RCA_LIST,
        "748849a5-ad06-474b-9d27-4b0aa9f481af":
          process.env.FRESHMARKETER_RCAPLUS_LIST,
        "d26a867d-4e7b-4ff8-8ac6-b37b9ce1c2ac":
          process.env.FRESHMARKETER_PREMIUM_LIST,
        "c0483be2-cf2f-46e1-a29f-316923c7e48d":
          process.env.FRESHMARKETER_PREMIUMPLUS_LIST,
        /* Staging */
        "f9251534-4cb6-46d2-b7f8-ed2b7527aa04":
          process.env.FRESHMARKETER_RCA_LIST,
        "ea740634-8961-4d03-9539-26ec12980f45":
          process.env.FRESHMARKETER_RCAPLUS_LIST,
        "497b1851-d8a0-4ed5-8d35-bb71da1c17f4":
          process.env.FRESHMARKETER_PREMIUM_LIST,
        "8a59a584-fb37-4fa7-bfc5-af011923aabd":
          process.env.FRESHMARKETER_PREMIUMPLUS_LIST,
      },
    },
    suggestic: {
      partnerToken: process.env.SUGGESTIC_TOKEN,
    },
    sendGrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      bloodTestScheduleTemplateId:
        process.env.SENDGRID_TEST_SCHEDULE_EMAIL_TEMPLATE,
      questionnaireEmailTemplateId:
        process.env.SENDGRID_QUESTIONNAIRE_EMAIL_TEMPLATE,
      bloodTestScheduleEmailRecipients:
        process.env.SENDGRID_TEST_SCHEDULE_EMAIL_RECIPIENTS ||
        "['rahul@sova.health']",
      emailSender: process.env.SENDGRID_EMAIL_SENDER || "support@sova.health",
      questionnaireExcelBasePath: resolvePath("./questionnaire-excels"),
    },
  },

  constants: {
    EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    REMOVE_NON_ALPHABETS_REGEX: /[^a-zA-Z]/g,
    CONDENSE_WHITESPACE_REGEX: /\s\s+/g,
    BIOMARKER_REPORT_FILETYPE_REGEX: /\.(jpg|jpeg|png|pdf)$/,
    MAX_EMAIL_LENGTH: 100,
    MIN_PASSWORD_LENGTH: 6,
    MAX_PASSWORD_LENGTH: 50,
    MAX_OTP_LENGTH: 10,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 50,
    VALID_PHONE_LENGTH: 10,
    VALID_CITIES: ["DELHI", "BANGALORE", "MUMBAI", "OTHER"],
    VALID_ID_CHARACTERS:
      process.env.VALID_ID_CHARACTERS ||
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    MAX_PROMOTION_CODE_LENGTH: 20,
    REFERRAL_CODE_NAME_SEGMENT_LENGHT:
      parseInt(process.env.REFERRAL_CODE_NAME_SEGMENT_LENGHT, 10) || 4,
    REFERRAL_CODE_RANDOM_SEGMENT_LENGHT:
      parseInt(process.env.REFERRAL_CODE_RANDOM_SEGMENT_LENGHT, 10) || 4,
    NEW_JOURNEY_STATUS: "NEW_USER",
    INITIATED_JOURNEY_STATUS: "NEW_JOURNEY",
    ARCHIVED_JOURNEY_STATUS: "ARCHIVED_JOURNEY",
    ACTIVE_PROGRAM_STATUS: "ACTIVE",
    CUSTOMER_REFERRAL_PROMOTION_TYPE:
      process.env.CUSTOMER_REFERRAL_PROMOTION_TYPE || "EB_CUST_REF",
    ACTIVE_PROMOTION_STATUS: "ACTIVE",
    DEFAULT_USER_PROMOTION_ATTRIBUTION_STATUS: "PENDING",
    DEFAULT_REFERRER_PROMOTION_ATTRIBUTION_STATUS: "PENDING",
    AWAITING_FIRST_PAYMENT_ACTION: "AWAITING_FIRST_PAYMENT",
    ONE_TIME_PAYMENT_TYPE: "ONE_TIME_PAYMENT",
    SUBSCRIPTION_PAYMENT_TYPE: "SUBSCRIPTION",
    OTP_AND_SUBSCRIPTION_PAYMENT_TYPE: "BOTH",
    PRE_PAYMENT_DISCOUNT_MODE: "PRE_PAYMENT",
    POST_PAYMENT_DISCOUNT_MODE: "POST_PAYMENT",
    ACTIVE_ORDER_STATUS: "ACTIVE",
    PAYMENT_CURRENCY: "INR",
    DEFAULT_PAYMENT_CAPTURE_MODE: 1,
    DEFAULT_SUBSCRIPTION_CYCLES: 60,
    DEFAULT_SUBSCRIPTION_NOTIFICATION: 0,
    PAID_ORDER_STATUS: "PAID",
    ARCHIVED_ORDER_STATUS: "ARCHIVED",
    BIOMARKER_ID_LENGTH: 8,
    BIOMARKER_PROFILE_ID_LENGTH: 8,
    FOOD_ID_LENGTH: 12,
    NUTRIENT_ID_LENGTH: 12,
    RECOMMENDATION_TYPE_NORMAL: "NORMAL",
    RECOMMENDATION_TYPE_LOW: "LOW",
    RECOMMENDATION_TYPE_HIGH: "HIGH",
    RECOMMENDATION_TYPE_NONE: "NONE",
    GENERATED_RECOMMENDATION_DESCRIPTION_DEFAULT_KEY: "DEFAULT",
  },

  cache: {
    moduleMap: {
      expiresIn:
        parseInt(process.env.SHORT_CACHE_EXPIRES_IN, 10) || 5 * 60 * 1000,
      staleIn: parseInt(process.env.SHORT_CACHE_STALE_IN, 10) || 1 * 60 * 1000,
      staleTimeout: parseInt(process.env.SHORT_CACHE_STALE_TIMEOUT, 10) || 1,
      generateTimeout:
        parseInt(process.env.SHORT_CACHE_GENERATE_TIMEOUT, 10) || 10 * 1000,
    },
    programMap: {
      expiresIn:
        parseInt(process.env.SHORT_CACHE_EXPIRES_IN, 10) || 5 * 60 * 1000,
      staleIn: parseInt(process.env.SHORT_CACHE_STALE_IN, 10) || 1 * 60 * 1000,
      staleTimeout: parseInt(process.env.SHORT_CACHE_STALE_TIMEOUT, 10) || 1,
      generateTimeout:
        parseInt(process.env.SHORT_CACHE_GENERATE_TIMEOUT, 10) || 10 * 1000,
    },
    foodRecommendationMap: {
      expiresIn:
        parseInt(process.env.MEDIUM_CACHE_EXPIRES_IN, 10) || 30 * 60 * 1000,
      staleIn: parseInt(process.env.MEDIUM_CACHE_STALE_IN, 10) || 5 * 60 * 1000,
      staleTimeout: parseInt(process.env.MEDIUM_CACHE_STALE_TIMEOUT, 10) || 1,
      generateTimeout:
        parseInt(process.env.MEDIUM_CACHE_GENERATE_TIMEOUT, 10) ||
        1 * 60 * 1000,
    },
    recommendationDescriptionMap: {
      expiresIn:
        parseInt(process.env.MEDIUM_CACHE_EXPIRES_IN, 10) || 30 * 60 * 1000,
      staleIn: parseInt(process.env.MEDIUM_CACHE_STALE_IN, 10) || 5 * 60 * 1000,
      staleTimeout: parseInt(process.env.MEDIUM_CACHE_STALE_TIMEOUT, 10) || 1,
      generateTimeout:
        parseInt(process.env.MEDIUM_CACHE_GENERATE_TIMEOUT, 10) ||
        1 * 60 * 1000,
    },
  },

  templates: {
    DEFAULT_SHEET_INDEX: 0,
    BIOMARKER_GLOSSARY_TEMPLATE: "BIOMARKER_GLOSSARY.xlsx",
    BIOMARKER_PARTNER_MAPPINGS_TEMPLATE: "BIOMARKER_PARTNER_MAPPINGS.xlsx",
    PROGRAMS_TEMPLATE: "PROGRAMS.xlsx",
    FOODS_TEMPLATE: "FOODS.xlsx",
    FOOD_IMAGE_TEMPLATE: "FOOD_IMAGE.xlsx",
    NUTRIENT_DRI_TEMPLATE: "NUTRIENT_DRI.xlsx",
    DESCRIPTION_MAPPING_TEMPLATE: "DESCRIPTION_MAPPING.xlsx",
    RECOMMENDATION_MAPPINGS_TEMPLATE: "RECOMMENDATION_MAPPINGS.xlsx",
    BIOMARKER_RECOMMENDATION_GROUP_MAPPING_TEMPLATE:
      "BIOMARKER_RECOMMENDATION_GROUP_MAPPING.xlsx",
    MODULES_TEMPLATE: "MODULES.xlsx",
    PROMOTION_DETAILS_TEMPLATE: "PROMOTION_DETAILS.xlsx",
  },

  nextStatusInUserJourney: {
    COMPLETE_ONBOARDING: "ONB_COMPLETE",
    UPLOAD_FIRST_BLOOD_TEST: "FIRST_TEST_UPL",
    SCHEDULE_FIRST_BLOOD_TEST: "FIRST_TEST_SCH",
  },

  errors: {
    authentication: {
      InvalidParameterException: "InvalidParameterException",
      UsernameExistsException: "UsernameExistsException",
      NotAuthorizedException: "NotAuthorizedException",
      CodeMismatchException: "CodeMismatchException",
      ExpiredCodeException: "ExpiredCodeException",
      LimitExceededException: "LimitExceededException",
      SIGNUP_SERVICE_INVALID_PAYLOAD_ERROR:
        "SIGNUP_SERVICE_INVALID_PAYLOAD_ERROR",
      SIGNUP_SERVICE_ACCOUNT_EXISTS_ERROR:
        "SIGNUP_SERVICE_ACCOUNT_EXISTS_ERROR",
      LOGIN_SERVICE_INVALID_PAYLOAD_ERROR:
        "LOGIN_SERVICE_INVALID_PAYLOAD_ERROR",
      LOGIN_SERVICE_INCORRECT_CREDENTIALS_ERROR:
        "LOGIN_SERVICE_INCORRECT_CREDENTIALS_ERROR",
      RESET_PASSWORD_SERVICE_INVALID_PAYLOAD_ERROR:
        "RESET_PASSWORD_SERVICE_INVALID_PAYLOAD_ERROR",
      RESET_PASSWORD_SERVICE_INCORRECT_OTP_ERROR:
        "RESET_PASSWORD_SERVICE_INCORRECT_OTP_ERROR",
      RESET_PASSWORD_SERVICE_EXPIRED_OTP_ERROR:
        "RESET_PASSWORD_SERVICE_EXPIRED_OTP_ERROR",
      RESET_PASSWORD_SERVICE_MAXIMUM_RETRY_LIMIT_ERROR:
        "RESET_PASSWORD_SERVICE_MAXIMUM_RETRY_LIMIT_ERROR",
      SIGNUP_ERROR: "SIGNUP_ERROR",
      COGNITO_SIGNUP_ERROR: "COGNITO_SIGNUP_ERROR",
      CREATE_SOVA_PROFILE_DATABASE_ERROR: "CREATE_SOVA_PROFILE_DATABASE_ERROR",
      COGNITO_REQUEST_OTP_ERROR: "COGNITO_REQUEST_OTP_ERROR",
      FORGOT_PASSWORD_SERVICE_REQUEST_OTP_ERROR:
        "FORGOT_PASSWORD_SERVICE_REQUEST_OTP_ERROR",
      FORGOT_PASSWORD_ERROR: "FORGOT_PASSWORD_ERROR",
      LOGIN_PAYLOAD_VALIDATION_ERROR: "LOGIN_PAYLOAD_VALIDATION_ERROR",
      COGNITO_LOGIN_ERROR: "COGNITO_LOGIN_ERROR",
      LOGIN_SERVICE_INVALID_PAYLOAD_ERROR:
        "LOGIN_SERVICE_INVALID_PAYLOAD_ERROR",
      LOGIN_SERVICE_INCORRECT_CREDENTIALS_ERROR:
        "LOGIN_SERVICE_INCORRECT_CREDENTIALS_ERROR",
      LOGIN_ERROR: "LOGIN_ERROR",
      LOGIN_SERVICE_ACCOUNT_PARSING_ERROR:
        "LOGIN_SERVICE_ACCOUNT_PARSING_ERROR",
      RESET_PASSWORD_PAYLOAD_VALIDATION_ERROR:
        "RESET_PASSWORD_PAYLOAD_VALIDATION_ERROR",
      COGNITO_RESET_PASSWORD_ERROR: "COGNITO_RESET_PASSWORD_ERROR",
      RESET_PASSWORD_SERVICE_INVALID_PAYLOAD_ERROR:
        "RESET_PASSWORD_SERVICE_INVALID_PAYLOAD_ERROR",
      RESET_PASSWORD_SERVICE_INCORRECT_OTP_ERROR:
        "RESET_PASSWORD_SERVICE_INCORRECT_OTP_ERROR",
      RESET_PASSWORD_SERVICE_EXPIRED_OTP_ERROR:
        "RESET_PASSWORD_SERVICE_EXPIRED_OTP_ERROR",
      RESET_PASSWORD_SERVICE_MAXIMUM_RETRY_LIMIT_ERROR:
        "RESET_PASSWORD_SERVICE_MAXIMUM_RETRY_LIMIT_ERROR",
      RESET_PASSWORD_ERROR: "RESET_PASSWORD_ERROR",
      SIGNUP_PAYLOAD_VALIDATION_ERROR: "SIGNUP_PAYLOAD_VALIDATION_ERROR",
    },
    database: {
      INVALID_TABLE_NAME_ERROR: "INVALID_TABLE_NAME_ERROR",
      MYSQL_INSERT_INTERNAL_ERROR: "MYSQL_INSERT_INTERNAL_ERROR",
      MYSQL_SELECT_INTERNAL_ERROR: "MYSQL_SELECT_INTERNAL_ERROR",
    },
    helpers: {
      GENERATE_SOVA_ID_HELPER_ERROR: "GENERATE_SOVA_ID_HELPER_ERROR",
      GENERATE_CUSTOMER_ID_HELPER_ERROR: "GENERATE_CUSTOMER_ID_HELPER_ERROR",
      GENERATE_REFERRAL_CODE_HELPER_ERROR:
        "GENERATE_REFERRAL_CODE_HELPER_ERROR",
      GENERATE_ORDER_REFERENCE_ID_HELPER_ERROR:
        "GENERATE_ORDER_REFERENCE_ID_HELPER_ERROR",
      GENERATE_JOURNEY_ID_HELPER_ERROR: "GENERATE_JOURNEY_ID_HELPER_ERROR",
      GENERATE_BIOMARKER_ID_HELPER_ERROR: "GENERATE_BIOMARKER_ID_HELPER_ERROR",
      GENERATE_BIOMARKER_PROFILE_ID_HELPER_ERROR:
        "GENERATE_BIOMARKER_PROFILE_ID_HELPER_ERROR",
      GENERATE_BIOMARKER_REPORT_ID_HELPER_ERROR:
        "GENERATE_BIOMARKER_REPORT_ID_HELPER_ERROR",
      GENERATE_PROGRAM_ID_HELPER_ERROR: "GENERATE_PROGRAM_ID_HELPER_ERROR",
      GENERATE_BIOMARKER_PROFILE_ID_HELPER_ERROR:
        "GENERATE_BIOMARKER_PROFILE_ID_HELPER_ERROR",
      GENERATE_QUESTIONNAIRE_ID_HELPER_ERROR:
        "GENERATE_QUESTIONNAIRE_ID_HELPER_ERROR",
      GENERATE_TEST_SCHEDULE_ID_HELPER_ERROR:
        "GENERATE_TEST_SCHEDULE_ID_HELPER_ERROR",
      SANITIZE_EMAIL_HELPER_ERROR: "SANITIZE_EMAIL_HELPER_ERROR",
      SANITIZE_PASSWORD_HELPER_ERROR: "SANITIZE_PASSWORD_HELPER_ERROR",
      SANITIZE_NAME_HELPER_ERROR: "SANITIZE_NAME_HELPER_ERROR",
      SANITIZE_PHONE_HELPER_ERROR: "SANITIZE_PHONE_HELPER_ERROR",
      SANITIZE_CITY_HELPER_ERROR: "SANITIZE_CITY_HELPER_ERROR",
      SANITIZE_PROMOTION_CODE_HELPER_ERROR:
        "SANITIZE_PROMOTION_CODE_HELPER_ERROR",
      SANITIZE_OTP_HELPER_ERROR: "SANITIZE_OTP_HELPER_ERROR",
      VALIDATE_EMAIL_HELPER_ERROR: "VALIDATE_EMAIL_HELPER_ERROR",
      VALIDATE_PASSWORD_HELPER_ERROR: "VALIDATE_PASSWORD_HELPER_ERROR",
      VALIDATE_NAME_HELPER_ERROR: "VALIDATE_NAME_HELPER_ERROR",
      VALIDATE_PHONE_HELPER_ERROR: "VALIDATE_PHONE_HELPER_ERROR",
      VALIDATE_CITY_HELPER_ERROR: "VALIDATE_CITY_HELPER_ERROR",
    },
  },
};

export default configs;
