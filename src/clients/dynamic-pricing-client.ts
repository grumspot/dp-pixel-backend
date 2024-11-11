import axios from "axios";
import { config } from "../config.js";
import { buildUrl } from "../utils/build-url.js";

export const dynamicPricingClient = (() => {
  const instance = axios.create();

  instance.interceptors.request.use((req) => {
    req.headers["Api-Page-Views-Access-Key"] =
      config.env.DYNAMIC_PRICING_API_KEY;
    return req;
  });

  return {
    getActiveVariants: async () => {
      type GetActiveVariantsResponse = {
        shopVariants: Record<string, string[]>;
      };

      return instance
        .post<GetActiveVariantsResponse>(
          buildUrl("/api-page-views/GetShopVariants")
        )
        .then((resp) => resp.data.shopVariants);
    },
  };
})();
