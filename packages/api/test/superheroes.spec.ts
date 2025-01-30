import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { Resource } from "sst";

const getRandomScore = () => Math.floor(Math.random() * 10) + 1;

const fetchRequest = async (url, options = {}) => {
  const response = await fetch(`${Resource.SuperHeroApi.url}${url}`, options);
  const contentType = response.headers.get("content-type");
  let body;
  if (contentType && contentType.includes("application/json")) {
    body = await response.json();
  } else {
    body = await response.text();
  }
  return { status: response.status, body };
};

describe("Superheroes API tests", () => {
  // let app: INestApplication;
  // let server;

  // beforeAll(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   app.useGlobalPipes(
  //     new ValidationPipe({
  //       transform: true,
  //       whitelist: true,
  //       forbidNonWhitelisted: true,
  //     })
  //   );

  //   await app.init();
  //   server = app.getHttpServer().listen(3000);
  // });

  // afterAll(async () => {
  //   await app.close();
  //   server.close();
  // });

  describe("GET /status", () => {
    it("should return status ok", async () => {
      const res = await fetchRequest("/status");
      expect(res.status).toBe(200);
      expect(res.body).toBe("ok");
    });
  });

  describe("POST /superheroes", () => {
    it("should create a superhero", async () => {
      const score = getRandomScore();
      const res = await fetchRequest("/superheroes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "tester",
          superpower: "fastrunner",
          humilityScore: score,
        }),
      });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("superheroId");
      expect(res.body).toHaveProperty("name", "tester");
      expect(res.body).toHaveProperty("superpower", "fastrunner");
      expect(res.body).toHaveProperty("humilityScore", score);
    });
  });

  describe("GET /superheroes", () => {
    beforeAll(async () => {
      await fetchRequest("/superheroes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "tester1",
          superpower: "fastrunner",
          humilityScore: getRandomScore(),
        }),
      });
      await fetchRequest("/superheroes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "tester2",
          superpower: "slowrunner",
          humilityScore: getRandomScore(),
        }),
      });
    });

    it("should return superheroes list with exactly 1 item", async () => {
      const res = await fetchRequest("/superheroes?limit=1");
      expect(res.status).toBe(200);
      expect(res.body.nodes.length).toBe(1);
    });

    it("should return superheroes list with at least 2 items", async () => {
      const res = await fetchRequest("/superheroes?limit=5");
      expect(res.status).toBe(200);
      expect(res.body.nodes.length).toBeGreaterThanOrEqual(2);
    });

    it("should return superheroes list with a maximum of 5 items", async () => {
      const res = await fetchRequest("/superheroes?limit=5");
      expect(res.status).toBe(200);
      expect(res.body.nodes.length).toBeGreaterThanOrEqual(2);
    });

    it("should fetch items in decreasing order", async () => {
      const res = await fetchRequest("/superheroes?limit=5&ascending=false");
      expect(res.status).toBe(200);
      const superheroes = res.body.nodes;
      for (let i = 1; i < superheroes.length; i++) {
        expect(superheroes[i].humilityScore).toBeLessThanOrEqual(
          superheroes[i - 1].humilityScore
        );
      }
    });

    it("should fetch items in ascending order", async () => {
      const res = await fetchRequest("/superheroes?limit=5&ascending=true");
      expect(res.status).toBe(200);
      const superheroes = res.body.nodes;

      console.log(superheroes);

      for (let i = 1; i < superheroes.length; i++) {
        expect(superheroes[i].humilityScore).toBeGreaterThanOrEqual(
          superheroes[i - 1].humilityScore
        );
      }
    });
  });
});
