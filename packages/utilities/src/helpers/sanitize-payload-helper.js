import { configs } from "../configs";

const MAX_PASSWORD_LENGTH = 50;
const MAX_PROMOTION_CODE_LENGTH = 20;
const MAX_OTP_LENGTH = 10;

export const sanitizeEmail = ({ email }) => {
  try {
    return email && email.trim().toLowerCase();
  } catch (error) {
    console.log("SANITIZE_EMAIL_HELPER_ERROR", error);
    return "";
  }
};

export const sanitizePassword = ({ password }) => {
  try {
    return password && password.substring(0, MAX_PASSWORD_LENGTH);
  } catch (error) {
    console.log("SANITIZE_PASSWORD_HELPER_ERROR", error);
    return "";
  }
};

export const sanitizeName = ({ name }) => {
  try {
    return name && encodeURIComponent(name.trim());
  } catch (error) {
    console.log("SANITIZE_NAME_HELPER_ERROR", error);
    return "";
  }
};

export const sanitizePhone = ({ phone }) => {
  try {
    return phone && encodeURIComponent(phone.toString().trim());
  } catch (error) {
    console.log("SANITIZE_PHONE_HELPER_ERROR", error);
    return "";
  }
};

export const sanitizeCity = ({ city }) => {
  try {
    return city && encodeURIComponent(city.trim().toUpperCase());
  } catch (error) {
    console.log("SANITIZE_CITY_HELPER_ERROR", error);
    return "";
  }
};

export const sanitizePromotionCode = ({ promotionCode }) => {
  try {
    return (
      promotionCode &&
      encodeURIComponent(promotionCode.trim()).substring(
        0,
        MAX_PROMOTION_CODE_LENGTH
      )
    );
  } catch (error) {
    console.log("SANITIZE_PROMOTION_CODE_HELPER_ERROR", error);
    return "";
  }
};

export const sanitizeOTP = ({ otp }) => {
  try {
    return otp && encodeURIComponent(otp).substring(0, MAX_OTP_LENGTH);
  } catch (error) {
    console.log("SANITIZE_OTP_HELPER_ERROR", error);
    return "";
  }
};
