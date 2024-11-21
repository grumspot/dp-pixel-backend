import { PutCommand } from "@aws-sdk/lib-dynamodb";
import fastifyCors from "@fastify/cors";
import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { shopToCampaignVariants } from "../cache.js";
import { dynamoDb } from "../clients/dynamo-client.js";
import { config } from "../config.js";

const products: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.register(fastifyCors);
  fastify.options("/products/view", (_, reply) => {
    reply.status(200);
  });

  fastify.post(
    "/products/view",
    {
      schema: {
        body: Type.Object({
          variantId: Type.String(),
          shop: Type.String(),
        }),
      },
    },
    async (req, reply) => {
      const { variantId, shop } = req.body;

      const shopVariantIds = shopToCampaignVariants.get<string[]>(shop);
      if (!shopVariantIds?.includes(variantId)) {
        return { code: "VARIANT_NOT_IN_A_CAMPAIGN" };
      }

      try {
        await dynamoDb.send(
          new PutCommand({
            Item: {
              shop,
              variantId,
              timestamp: new Date().toISOString(),
            },
            TableName: config.env.DYNAMODB_TABLE_NAME,
          })
        );

        return { code: "SUCCESSFULLY_RECORDED" };
      } catch (err) {
        reply.log.error(
          err,
          "Could not write product viewed event to the DynamoDB table."
        );

        reply.code(502);
        reply.send({ code: "COULD_NOT_WRITE_PRODUCT_EVENT" });
      }
    }
  );
};

export default products;
