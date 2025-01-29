export const SuperHeroTable = new sst.aws.Dynamo("SuperHeroTable", {
  fields: {
    PK: "string",
    SK: "string",
    GSI1PK: "string",
    GSI1SK: "string",
  },
  ttl: "expiry",
  primaryIndex: {
    hashKey: "PK",
    rangeKey: "SK",
  },
  globalIndexes: {
    GSI1: {
      hashKey: "GSI1PK",
      rangeKey: "GSI1SK",
      projection: "all",
    },
  },
});
