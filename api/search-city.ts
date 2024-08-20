import { createKysely } from '@vercel/postgres-kysely';
import { DB } from 'kysely-codegen';
import { VercelRequest, VercelResponse } from '@vercel/node';
 
export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    //const db = createKysely<DB>();
    let cityName = request.query.cityName as string;
    if(!cityName) throw new Error('Name required');
    //const result = await db.selectFrom("geoname").selectAll().where("name", "=", cityName).executeTakeFirst();
    const result = "hello";
    return response.status(500).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
  
  return response.status(200).json({});
}
