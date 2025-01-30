import { secretKey } from "../secrets";
import { SuperHeroTable } from "./dynamo";

export const superHeroFunction = new sst.aws.Function("SuperHeroApi", {
  url: true,
  link: [SuperHeroTable, secretKey],
  handler: "packages/api/src/main.handler",
  nodejs: {
    install: [
      "@nestjs/common",
      "@nestjs/core",
      "@nestjs/platform-express",
      "reflect-metadata",
      "rxjs",
      "class-transformer",
      "class-validator",
    ],
    esbuild: {
      external: [
        "@nestjs/common",
        "@nestjs/core",
        "@nestjs/platform-express",
        "reflect-metadata",
        "rxjs",
        "class-transformer",
        "class-validator",
      ],
    },
  },
  runtime: "nodejs22.x",
});
