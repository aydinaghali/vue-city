import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
 
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const result =
      await sql`create table geoname (
         geonameid       int,
         name            varchar(200),
         asciiname        varchar(200),
         alternatenames  varchar(6000),
         latitude        float,
         longitude       float,
         fclass  char(1),
         fcode   varchar(10),
         country varchar(2),
         cc2 varchar(60),
         admin1  varchar(20),
         admin2  varchar(80),
         admin3  varchar(20),
         admin4  varchar(20),
         population      bigint,
         elevation       int,
         gtopo30         int,
         timezone varchar(40),
         moddate         date
 );`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}