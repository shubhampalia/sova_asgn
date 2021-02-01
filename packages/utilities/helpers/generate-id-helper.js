import Crypto from "crypto-js";
import { v4 as UUID } from "uuid";
import { customAlphabet } from "nanoid";
import { configs } from "../configs";

const {
  VALID_ID_CHARACTERS,
  REFERRAL_CODE_NAME_SEGMENT_LENGHT,
  REFERRAL_CODE_RANDOM_SEGMENT_LENGHT,
  BIOMARKER_ID_LENGTH,
  BIOMARKER_PROFILE_ID_LENGTH,
  FOOD_ID_LENGTH,
  NUTRIENT_ID_LENGTH,
} = configs.constants;

export const generateSovaIdHelper = () => {
  try {
    return UUID();
  } catch (error) {
    console.log("GENERATE_SOVA_ID_HELPER_ERROR", error);
    return "";
  }
};

export const generateCustomerIdHelper = ({ sovaId }) => {
  try {
    const customerId = Crypto.MD5(sovaId).toString();
    return `CID_${customerId}`;
  } catch (error) {
    console.log("GENERATE_CUSTOMER_ID_HELPER_ERROR", error);
    return "";
  }
};

export const generateReferralCodeHelper = ({ name }) => {
  try {
    /* REGEX to remove all non-alphabet characters replace(/[^a-zA-Z]/g, "") */
    const safeName = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const referralCodeNameComponent = safeName.substring(
      0,
      REFERRAL_CODE_NAME_SEGMENT_LENGHT
    );

    const referralCodeRandomComponent = customAlphabet(
      VALID_ID_CHARACTERS,
      REFERRAL_CODE_RANDOM_SEGMENT_LENGHT
    )();

    const referralCode = `${referralCodeNameComponent}${referralCodeRandomComponent}`;

    return referralCode;
  } catch (error) {
    console.log("GENERATE_REFERRAL_CODE_HELPER_ERROR", error);
    return "";
  }
};

export const generateOrderReferenceIdHelper = () => {
  try {
    return UUID();
  } catch (error) {
    console.log("GENERATE_ORDER_REFERENCE_ID_HELPER_ERROR", error);
    return "";
  }
};

export const generateJourneyIdHelper = ({ orderId }) => {
  try {
    const journeyId = Crypto.MD5(orderId).toString();
    return `JID_${journeyId}`;
  } catch (error) {
    console.log("GENERATE_JOURNEY_ID_HELPER_ERROR", error);
    return "";
  }
};

export const generateBiomarkerIdHelper = () => {
  try {
    const biomarkerId = customAlphabet(
      VALID_ID_CHARACTERS,
      BIOMARKER_ID_LENGTH
    )();
    return `BM_${biomarkerId}`;
  } catch (error) {
    console.log("GENERATE_BIOMARKER_ID_HELPER_ERROR", error);
    return "";
  }
};

export const generateBiomarkerProfileIdHelper = () => {
  try {
    const biomarkerProfileId = customAlphabet(
      VALID_ID_CHARACTERS,
      BIOMARKER_PROFILE_ID_LENGTH
    )();
    return `BMP_${biomarkerProfileId}`;
  } catch (error) {
    console.log("GENERATE_BIOMARKER_PROFILE_ID_HELPER_ERROR", error);
    return "";
  }
};

export const generateBiomarkerReportIdHelper = ({
  sovaId,
  reportTimestamp,
  reportCustomerId,
}) => {
  try {
    const reportId = Crypto.MD5(
      `${sovaId}|${reportTimestamp}|${reportCustomerId}`
    ).toString();
    return `RID_${reportId}`;
  } catch (error) {
    console.log("GENERATE_BIOMARKER_REPORT_ID_HELPER_ERROR", error);
    return "";
  }
};

export const generateProgramIdHelper = () => {
  try {
    return UUID();
  } catch (error) {
    console.log("GENERATE_PROGRAM_ID_HELPER_ERROR", error);
    return "";
  }
};

export const generateFoodIdHelper = () => {
  try {
    const foodID = customAlphabet(VALID_ID_CHARACTERS, FOOD_ID_LENGTH)();
    return `FID_${foodID}`;
  } catch (error) {
    console.log("GENERATE_BIOMARKER_PROFILE_ID_HELPER_ERROR", error);
    return "";
  }
};

export const generateNutrientIdHelper = () => {
  try {
    const nutrientId = customAlphabet(
      VALID_ID_CHARACTERS,
      NUTRIENT_ID_LENGTH
    )();
    return `NID_${nutrientId}`;
  } catch (error) {
    console.log("GENERATE_BIOMARKER_PROFILE_ID_HELPER_ERROR", error);
    return "";
  }
};

export const generateQuestionnaireIdHelper = () => {
  try {
    return UUID();
  } catch (error) {
    console.log("GENERATE_QUESTIONNAIRE_ID_HELPER_ERROR", error);
    return "";
  }
};

export const generateTestScheduleIdHelper = () => {
  try {
    return UUID();
  } catch (error) {
    console.log("GENERATE_TEST_SCHEDULE_ID_HELPER_ERROR", error);
    return "";
  }
};
