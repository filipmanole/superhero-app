import { Injectable } from "@nestjs/common";
import { documentClient } from "../utils";
import { Superhero, SuperheroEntity } from "./superhero.entity";
import { Resource } from "sst";
import { CreateSuperheroDto, ListSuperheroesDto } from "./superhero.dto";

type ListSuperheroesResponse = {
  nodes: Superhero[];
  lastKey?: string;
};

@Injectable()
export class SuperheroService {
  async list(params: ListSuperheroesDto): Promise<ListSuperheroesResponse> {
    const { limit, startKey, ascending } = params;

    try {
      const getResponse = await documentClient.query({
        TableName: Resource.SuperHeroTable.name,
        ScanIndexForward: ascending ?? false,
        IndexName: "GSI1",
        KeyConditionExpression: "#gsi1pk = :gsi1pk",
        ExpressionAttributeNames: { "#gsi1pk": "GSI1PK" },
        ExpressionAttributeValues: { ":gsi1pk": "SUPERHEROES" },
        Limit: limit ? parseInt(limit as any) : 10,
        ...(startKey && { ExclusiveStartKey: JSON.parse(startKey) }),
      });

      return {
        nodes: (getResponse.Items ?? []) as Superhero[],
        lastKey: getResponse.LastEvaluatedKey
          ? JSON.stringify(getResponse.LastEvaluatedKey)
          : null,
      };
    } catch (error) {
      console.log(error);
      throw Error("Error listing superheroes");
    }
  }

  async create(params: CreateSuperheroDto): Promise<Superhero> {
    const superhero = new SuperheroEntity(params);
    try {
      await documentClient.put({
        TableName: Resource.SuperHeroTable.name,
        Item: {
          ...superhero.toItem(),
          ttl: Math.floor(Date.now() / 1000) + 30 * 60,
        },
        ConditionExpression: "attribute_not_exists(PK)",
      });

      return superhero.toDto();
    } catch (error) {
      console.log(error);
      throw Error("Error creating superhero");
    }
  }
}
