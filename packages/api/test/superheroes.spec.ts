import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("Superheroes API tests", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      })
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("GET /status", () => {
    it("should return status ok", async () => {
      const res = await request(app.getHttpServer()).get("/status");
      expect(res.status).toBe(200);
      expect(res.text).toBe("ok");
    });
  });

  describe.only("POST /superheroes", () => {
    it("should fail if name not provided", async () => {
      const res = await request(app.getHttpServer())
        .post("/superheroes")
        .send({ superpower: "fastrunner", humilityScore: 2 });

      console.log(res.status);
      console.log(res.body);
      console.log(res.text);
    });
  });

  //   it("✅ Should return superheroes list with valid limit", async () => {
  //     return request(app.getHttpServer())
  //       .get("/superheroes?limit=10") // Replace with your actual endpoint
  //       .expect(200)
  //       .expect((res) => {
  //         expect(res.body).toHaveProperty("message", "Listing superheroes");
  //         expect(res.body.params.limit).toBe(10);
  //       });
  //   });

  //   it("❌ Should return 400 for invalid limit (string instead of number)", async () => {
  //     return request(app.getHttpServer())
  //       .get("/superheroes?limit=invalid")
  //       .expect(400)
  //       .expect((res) => {
  //         expect(res.body.message).toContain("Limit must be an integer");
  //       });
  //   });

  //   it("❌ Should return 400 for extra unexpected query param", async () => {
  //     return request(app.getHttpServer())
  //       .get("/superheroes?limit=10&unknownParam=xyz")
  //       .expect(400)
  //       .expect((res) => {
  //         expect(res.body.message).toContain(
  //           "property unknownParam should not exist"
  //         );
  //       });
  //   });
});
