import AutoLoad from "@fastify/autoload";
import fastify from "fastify";
import { repopulateCache } from "./cache.js";
import { config } from "./config.js";
import { logger } from "./logger.js";

const server = fastify({ loggerInstance: logger });

server.register(AutoLoad, {
  dir: `${import.meta.dirname}/routes`,
});

(async () => {
  await repopulateCache();

  let port = 3000;
  if (config.env.PORT && !isNaN(Number(config.env.PORT))) {
    port = Number(config.env.PORT);
  }

  await server.listen({ port });
})();
