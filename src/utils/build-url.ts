import { config } from "../config.js";

const getSanitizedBase = () => {
  const base = config.env.DYNAMIC_PRICING_API_HOST;

  if (base.endsWith("/")) {
    return base.slice(0, -1);
  }

  return base;
};

const getSanitizedPath = (path: string) =>
  path.startsWith("/") ? path.slice(1) : path;

export const buildUrl = (path: string) => {
  return `${getSanitizedBase()}/${getSanitizedPath(path)}`;
};
