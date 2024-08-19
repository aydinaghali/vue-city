import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
 
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const cityName = request.query.cityName as string;
    if (!cityName) throw new Error('Name required');
    await sql`SELECT * FROM geoname WHERE name = '${cityName}';`;
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  //const pets = await sql`SELECT * FROM Pets;`;
  return response.status(200).json({});
}