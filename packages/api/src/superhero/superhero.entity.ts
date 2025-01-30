import { generateID, Optional } from "../utils";

export type Superhero = {
  superheroId: string;
  name: string;
  superpower: string;
  humilityScore: number;
  createdAt: string;
  updatedAt: string;
};

export class SuperheroEntity {
  superheroId: string;
  name: string;
  superpower: string;
  humilityScore: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    params: Optional<Superhero, "createdAt" | "updatedAt" | "superheroId">
  ) {
    this.name = params.name;
    this.superpower = params.superpower;
    this.humilityScore = params.humilityScore;

    const date = new Date();
    this.superheroId = params.superheroId
      ? params.superheroId
      : generateID(date);
    this.createdAt = params.createdAt ? new Date(params.createdAt) : date;
    this.updatedAt = params.updatedAt ? new Date(params.updatedAt) : date;
  }

  get PK() {
    return `SUPERHERO#${this.superheroId}`;
  }

  get SK() {
    return `SUPERHERO#${this.superheroId}`;
  }

  get GSI1PK() {
    return `SUPERHEROES`;
  }

  get GSI1SK() {
    return `SCORE#${String(this.humilityScore).padStart(2, "0")}`;
  }

  toDto(): Superhero {
    return {
      superheroId: this.superheroId,
      name: this.name,
      superpower: this.superpower,
      humilityScore: this.humilityScore,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  toItem() {
    return {
      ...this.toDto(),
      PK: this.PK,
      SK: this.SK,
      GSI1PK: this.GSI1PK,
      GSI1SK: this.GSI1SK,
      type: "Superhero",
    };
  }
}
