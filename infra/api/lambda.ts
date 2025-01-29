import { SuperHeroTable } from "./dynamo";

export const superHeroFunction = new sst.aws.Function("SuperHeroApi", {
  url: true,
  link: [SuperHeroTable],
  handler: "packages/api/src/main.handler",
  nodejs: {
    install: [
      "@nestjs/common",
      "@nestjs/core",
      "@nestjs/platform-express",
      "reflect-metadata",
      "rxjs",
    ],
    esbuild: {
      external: [
        "@nestjs/common",
        "@nestjs/core",
        "@nestjs/platform-express",
        "reflect-metadata",
        "rxjs",
      ],
    },
  },
  runtime: "nodejs22.x",
});
