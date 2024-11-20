# DynamicPricing AI Pixel Backend

## Environment Variables

The following environment variables must be set for the backend to function correctly:

| Variable Name              | Description                                        | Example Value                              | Required              |
|----------------------------|----------------------------------------------------|--------------------------------------------|-----------------------|
| `DYNAMODB_TABLE_NAME`      | DynamoDB table name for storing analytics data.    | `analytics_table`                          | yes                   |
| `DYNAMIC_PRICING_API_HOST` | Host URL for the dynamic pricing API.              | `https://api.example.com`                  | yes                   |
| `AWS_ACCESS_KEY_ID`        | AWS access key for authentication.                 | `RANdomAccesSkEyId`                        | yes                   |
| `AWS_SECRET_ACCESS_KEY`    | AWS secret key for authentication.                 | `RanDomSecrETaCCESsKey`                    | yes                   |
| `AWS_REGION`               | AWS region of the DynamoDB table.                  | `us-east-1`                                | yes                   |
| `PORT`                     | The port to run the server on                      | `3000`                                     | no  (default: `3000`) |
| `LOG_LEVEL`                | AWS region of the DynamoDB table.                  | `debug`                                    | no  (default: `info`) |

## Package manager

The project is using pnpm, so run `pnpm install` in order to install all dependencies as per the lockfile.

## How to run for development

1. Open a tab and run `pnpm run build:watch` to continuously build the project
2. Open another tab and run `pnpm run dev` to run the development server in watch mode
3. Change the files accordingly

