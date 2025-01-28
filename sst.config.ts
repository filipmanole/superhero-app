/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "remindly",
      removal: input?.stage === "prod" ? "retain" : "remove",
      protect: ["prod"].includes(input?.stage),
      home: "aws",
      aws: {
        region: "eu-central-1",
        profile: "default",
      },
    };
  },
  async run() {
    await import("./infra/api");
    // await import("./infra/app");
    // await import("./infra/secrets");
  },
});
