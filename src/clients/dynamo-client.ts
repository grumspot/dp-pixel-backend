import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { config } from "../config.js";

export const dynamoDb = new DynamoDBClient({
  region: config.env.AWS_REGION,
  credentials: {
    accessKeyId: config.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.env.AWS_SECRET_ACCESS_KEY,
  },
});
