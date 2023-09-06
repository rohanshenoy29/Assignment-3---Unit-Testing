const request = require("supertest");
const app = require("./index");

describe("Express JS Application", () => {
  // POST REQUEST TESTING
  it("should post a user", async () => {
    const user = {
      name: "test_user",
      email: "newtest6@gmail.com",
      phoneNumber: 9999999999,
      address: "test",
    };

    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(200);
  });
  it("should NOT post a user", async () => {
    const user1 = {
      name: "",
      email: "",
      phoneNumber: 99,
      address: "",
    };

    const response = await request(app).post("/users").send(user1);
    expect(response.status).toBe(400);
  });

  // GET REQUEST TESTING
  it("should get all user data", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get specific user data", async () => {
    const response = await request(app).get("/users/test_user");

    expect(response.status).toBe(200);
  });

  // DELETE REQUEST TESTING 
  it("should delete a user data", async()=>{
    const response = await request(app).delete("/users/test_user");

    expect(response.status).toBe(200)
  })

  // PUT REQUEST TESTING
  it("should update a user data", async()=>{
    const user = {
      name: "updated_test_user",
      email: "updated_test_user@gmail.com",
      phoneNumber: 9999999999,
      address: "test",
    };

    const response = await request(app).put("/users/test_user").send(user)
    expect(response.status).toBe(200);
  })
});
