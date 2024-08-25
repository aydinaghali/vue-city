import { connect } from '@tidbcloud/serverless'
 
export default async function handler(request, response) {
  try {
	  const conn = connect({url: process.env.DATABASE_URL});
    let cityName = request.query.cityName;
    if(!cityName) return response.status(200).json({result: []});
	  //const result = await conn.execute(`SELECT * FROM cities WHERE name LIKE '${cityName}%'`);
	  const result = await conn.execute(`SELECT * FROM cities WHERE (LOWER(NAME) LIKE LOWER('${cityName}%'))`);
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
