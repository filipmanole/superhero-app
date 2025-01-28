export const SuperHeroTable = new sst.aws.Dynamo("SuperHeroTable", {
  fields: {
    PK: "string",
    SK: "string",
  },
  ttl: "expiry",
  primaryIndex: {
    hashKey: "PK",
    rangeKey: "SK",
  },
});
