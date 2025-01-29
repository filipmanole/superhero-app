import { superHeroFunction } from "../api";

export const app = new sst.aws.StaticSite("RemindlyApp", {
  path: "./packages/app",
  build: {
    command: "npm run build",
    output: "dist",
  },
  environment: {
    VITE_API_URL: superHeroFunction.url,
  },
});
