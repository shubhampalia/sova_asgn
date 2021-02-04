import { AWSMySQLConnector } from "../connectors";
import { configs } from "../configs";

const { tables } = configs.services.aws.rds;
const {
  INVALID_TABLE_NAME_ERROR,
  MYSQL_SELECT_INTERNAL_ERROR,
} = configs.errors.database;

export const dbSelect = async ({ table_name, columns, conditions }) => {
  const dbSelectPromise = new Promise((resolve) => {
    try {
      if (!(table_name in tables)) {
        return resolve({
          error: INVALID_TABLE_NAME_ERROR,
          payload: {},
        });
      }
      AWSMySQLConnector.select(columns)
        .from(table_name)
        .where(conditions)
        .then((rows) => {
          return resolve({
            error: false,
            payload: { rows },
          });
        })
        .catch((error) => {
          console.log(MYSQL_SELECT_INTERNAL_ERROR, error);
          return resolve({
            error: MYSQL_SELECT_INTERAL_ERROR,
            payload: {},
          });
        });
    } catch (error) {
      console.log(MYSQL_SELECT_INTERNAL_ERROR, error);
      return resolve({
        error: MYSQL_SELECT_INTERAL_ERROR,
        payload: {},
      });
    }
  });

  const dbSelectPromiseResponse = await dbSelectPromise;
  return dbSelectPromiseResponse;
};
