import MYSQL from "mysql";
import AWS from "aws-sdk";
import { CognitoUserPool } from "amazon-cognito-identity-js";
// import { configs } from "../configs";

// const awsConfig = configs.services.aws;
// const cognitoConfig = awsConfig.cognito;
// const rdsConfig = awsConfig.rds;
// const sesConfig = awsConfig.ses;

AWS.config.update({ region: "ap-south-1" });

const cognitoUserPoolConfig = {
  UserPoolId: "ap-south-1_8rNpyFMFQ",
  ClientId: "5n92j264oiccj2al08h1bp9u5",
};

export const AWSCognitoConnector = new CognitoUserPool(cognitoUserPoolConfig);

// export const AWSMySQLConnector = MYSQL.createPool({
//   host: "sova-health-webapp-staging.ci1axpqjq3j4.ap-south-1.rds.amazonaws.com",
//   port: 3306,
//   connectionLimit: 10,
//   user: "localrahul",
//   password: "L0cAlDAbbAHA!",
//   database: "webapp",
//   connectTimeout: 60000,
// });

export const AWSSESConnector = new AWS.SES({
  apiVersion: "2010-12-01",
});

//how to do connection pool
export const AWSMySQLConnector = require("knex")({
  client: "mysql",
  connection: {
    host:
      "sova-health-webapp-staging.ci1axpqjq3j4.ap-south-1.rds.amazonaws.com",
    user: "localrahul",
    password: "L0cAlDAbbAHA!",
    database: "webapp",
  },
  pool: { min: 2, max: 10 },
  acquireConnectionTimeout: 60000,
});
