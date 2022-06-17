import run from "../app";
import request from "supertest";
import { Server } from "http";

describe("network", () => {
  let server: Server;
  beforeAll(() => {
    server = run(8888);
  });
  it("GET /admin", () => {
    return request(server)
      .post("/admin")
      .expect(200)
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  afterAll(() => {
    server.close();
  });
});
