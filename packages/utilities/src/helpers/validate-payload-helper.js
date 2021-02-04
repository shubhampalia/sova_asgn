import { configs } from "../configs";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REMOVE_NON_ALPHABETS_REGEX = /[^a-zA-Z]/g;
const MAX_EMAIL_LENGTH = 100;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 50;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;
const VALID_PHONE_LENGTH = 10;
const VALID_CITIES = ["DELHI", "BANGALORE", "MUMBAI", "OTHER"];

const {
  VALIDATE_EMAIL_HELPER_ERROR,
  VALIDATE_PASSWORD_HELPER_ERROR,
  VALIDATE_NAME_HELPER_ERROR,
  VALIDATE_PHONE_HELPER_ERROR,
  VALIDATE_CITY_HELPER_ERROR,
} = configs.errors.helpers;

export const isValidEmail = ({ email }) => {
  try {
    return email.length <= MAX_EMAIL_LENGTH && EMAIL_REGEX.test(String(email));
  } catch (error) {
    console.log(VALIDATE_EMAIL_HELPER_ERROR, error);
    return false;
  }
};

export const isValidPassword = ({ password }) => {
  try {
    return (
      password.length >= MIN_PASSWORD_LENGTH &&
      password.length <= MAX_PASSWORD_LENGTH
    );
  } catch (error) {
    console.log(VALIDATE_PASSWORD_HELPER_ERROR, error);
    return false;
  }
};

export const isValidName = ({ name }) => {
  try {
    return (
      name.length <= MAX_NAME_LENGTH &&
      name.replace(REMOVE_NON_ALPHABETS_REGEX, "").length >= MIN_NAME_LENGTH
    );
  } catch (error) {
    console.log(VALIDATE_NAME_HELPER_ERROR, error);
    return false;
  }
};

export const isValidPhone = ({ phone }) => {
  try {
    return parseInt(phone, 10).toString().length === VALID_PHONE_LENGTH;
  } catch (error) {
    console.log(VALIDATE_PHONE_HELPER_ERROR, error);
    return false;
  }
};

export const isValidCity = ({ city }) => {
  try {
    return VALID_CITIES.includes(city);
  } catch (error) {
    console.log(VALIDATE_CITY_HELPER_ERROR, error);
    return false;
  }
};
