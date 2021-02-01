import {
  signUpService,
  logInService,
  forgotPasswordService,
  resetPasswordService,
} from "../services";

import { dbInsert } from "../../../../utilities/database/insert-query";

export const routes = (server) => {
  server.route({
    method: "POST",
    path: "/api/auth/signup",
    config: {
      handler: signUpService,
    },
  });

  server.route({
    method: "POST",
    path: "/api/auth/login",
    config: {
      handler: logInService,
    },
  });

  server.route({
    method: "POST",
    path: "/api/auth/forgot-password",
    config: {
      handler: forgotPasswordService,
    },
  });

  server.route({
    method: "POST",
    path: "/api/auth/reset-password",
    config: {
      handler: resetPasswordService,
    },
  });

  server.route({
    method: "GET",
    path: "/api/auth/test",
    config: {
      handler: dbInsert,
    },
  });
};

export default routes;
