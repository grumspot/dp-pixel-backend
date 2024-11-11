import AutoLoad from "@fastify/autoload";
import fastify from "fastify";
import { repopulateCache } from "./cache.js";
import { logger } from "./logger.js";

const server = fastify({ loggerInstance: logger });

server.register(AutoLoad, {
  dir: `${import.meta.dirname}/routes`,
});

(async () => {
  await repopulateCache();
  await server.listen({ port: 3000 });
})();
