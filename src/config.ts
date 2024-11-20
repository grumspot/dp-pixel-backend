import { Type } from "@fastify/type-provider-typebox";
import { Value } from "@sinclair/typebox/value";
import { config as dotenv } from "dotenv";

dotenv();

const envSchema = Type.Object({
  DYNAMODB_TABLE_NAME: Type.String(),
  AWS_REGION: Type.String(),
  AWS_ACCESS_KEY_ID: Type.String(),
  AWS_SECRET_ACCESS_KEY: Type.String(),
  DYNAMIC_PRICING_API_HOST: Type.String(),
  DYNAMIC_PRICING_API_KEY: Type.String(),
  PORT: Type.Optional(Type.String()),
});

export const config = {
  env: Value.Parse(envSchema, process.env),
} as const;
