import oracledb from 'oracledb'

const oracleDbConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  connectionString: process.env.DB_HOST,
}

async function runQuery(query: string) {
  let connection
  try {
    // Estabilish connection wo the Oracle database
    connection = await oracledb.getConnection(oracleDbConfig)

    //Execute the query
    const result = await connection.execute(query)
    return result.rows
  } catch (err) {
    throw new Error(err)
  } finally {
    if (connection) {
      //Ensure the connection is closed after execution
      await connection.close()
    }
  }
}

export default runQuery