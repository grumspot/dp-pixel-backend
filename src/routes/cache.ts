import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { repopulateCache, repopulateShopCache } from "../cache.js";

const cache: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "/cache/bust",
    {
      schema: {
        querystring: Type.Object({
          shop: Type.Optional(Type.String()),
        }),
      },
    },
    async (req, reply) => {
      const { shop } = req.query;

      if (!shop) {
        await repopulateCache();
        return { success: true };
      }

      if (!shop?.endsWith("myshopify.com")) {
        reply.status(400);
        reply.send({ error: "INVALID_SHOP_ARGUMENT" });
        return;
      }

      await repopulateShopCache(shop);
      return { success: true };
    }
  );
};

export default cache;
