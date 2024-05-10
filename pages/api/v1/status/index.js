import database from "/infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const dbVersion = await database.query(`SHOW server_version;`);
  const dbVersionRow = dbVersion.rows[0].server_version;

  const databaseName = process.env.POSTGRES_DB;
  const dbCurrentConnectionsResult = await database.query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;`,
    values: [databaseName],
  });
  const dbCurrentConnectionsValue = dbCurrentConnectionsResult.rows[0].count;

  const dbMaxConnectionsResult = await database.query(`SHOW max_connections;`);
  const dbMaxConnectionsValue = dbMaxConnectionsResult.rows[0].max_connections;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: dbVersionRow,
        connections: {
          max_connections: parseInt(dbMaxConnectionsValue),
          current_connections: dbCurrentConnectionsValue,
        },
      },
    },
  });
}

export default status;
