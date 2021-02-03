import Hapi from "@hapi/hapi";
import QS from "qs";
import routes from "./routes";

const startServer = async () => {
  const server = Hapi.server({
    host: "127.0.0.1",
    port: "5000",
    query: {
      parser: (query) => QS.parse(query),
    },
    router: {
      isCaseSensitive: true,
      stripTrailingSlash: true,
    },
    routes: {
      security: true,
    },
  });

  routes(server);

  await server.start();

  console.log("Server started");
};

process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection", error);
  process.exit(1);
});

startServer();
