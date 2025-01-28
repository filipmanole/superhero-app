import { SuperHeroTable } from "./dynamo";

// export const superHeroFunction = new sst.aws.Function("SuperHeroApi", {
//   url: true,
//   link: [SuperHeroTable],
//   bundle: "packages/api/dist",
//   handler: "main.handler",
//   nodejs: {
//     install: [
//       "@nestjs/common",
//       "@nestjs/core",
//       "@nestjs/platform-express",
//       "reflect-metadata",
//       "rxjs",
//     ],
//   },
//   runtime: "nodejs22.x",
// });

export const superHeroFunction = new sst.aws.Function("SuperHeroApi", {
  url: true,
  link: [SuperHeroTable],
  // handler: "packages/api/src/main.handler",
  bundle: "packages/api/dist",
  handler: "main.handler",
  nodejs: {
    // format: "cjs",
    install: [
      "@nestjs/common",
      "@nestjs/core",
      "@nestjs/platform-express",
      "reflect-metadata",
      "rxjs",
    ],
    // sourcemap: true,
    // esbuild: {
    //   tsconfig: "packages/api/tsconfig.json",
    //   bundle: false,
    //   minify: false,
    //   sourcemap: true,
    //   platform: "node",
    //   external: [
    //     "@nestjs/common",
    //     "@nestjs/core",
    //     "@nestjs/platform-express",
    //     "reflect-metadata",
    //     "rxjs",
    //   ],
    // },
  },
  runtime: "nodejs18.x",
});

// export const api = new sst.aws.Function("api", {
//   url: true,
//   link: [apiTable],
//   handler: "packages/api/dist",
//   bundle: "main.handler",
// });
