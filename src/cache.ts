import NodeCache from "node-cache";
import { dynamicPricingClient } from "./clients/dynamic-pricing-client.js";
import { logger } from "./logger.js";

export const shopToCampaignVariants = new NodeCache({ stdTTL: Infinity });

export const repopulateCache = async () => {
  logger.info("[Re]populating active variants cache");
  shopToCampaignVariants.flushAll();
  const variantsByShop = await dynamicPricingClient.getActiveVariants();
  Object.entries(variantsByShop).forEach(([shop, variants]) => {
    shopToCampaignVariants.set(shop, variants);
  });
  logger.info("Cache [re]populated");
};

export const repopulateShopCache = async (shop: string) => {
  logger.info(`Repopulating active variants cache for ${shop}`);
  const variantsByShop = await dynamicPricingClient.getActiveVariants();

  logger.info(`Cache for ${shop} busted`);
  shopToCampaignVariants.del(shop);
  const shopVariants = Object.entries(variantsByShop).find(
    ([fetchedShop]) => fetchedShop === shop
  );

  if (!shopVariants) {
    logger.info(`${shop} has no active variants to repopulate`);
    return;
  }

  shopToCampaignVariants.set(shop, shopVariants[1]);
  logger.info(`Cache for ${shop} repopulated`);
};
