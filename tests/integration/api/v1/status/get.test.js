test("GET `/api/v1/status`should return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();

  // date is valid
  expect(responseBody.update_at).toEqual(parsedUpdateAt);

  // database version is valid
  expect(responseBody.dependencies.database.version).toEqual("16.0");

  // current connections is valid
  expect(
    responseBody.dependencies.database.connections.current_connections,
  ).toEqual(1);

  // max connections is valid
  expect(
    responseBody.dependencies.database.connections.max_connections,
  ).toEqual(100);
});
