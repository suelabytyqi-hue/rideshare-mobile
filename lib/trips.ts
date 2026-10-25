import "server-only";

import { neon } from "@neondatabase/serverless";

export type Trip = {
  id: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  vendtakimi: string;
  vende: number;
};

export function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("Mungon DATABASE_URL. Vendose në .env.local dhe rinise Next.js.");
  }

  return neon(databaseUrl);
}

export async function lexoUdhetimet(): Promise<Trip[]> {
  const sql = getSql();
  const trips = await sql`
    SELECT id, nisja, destinacioni, ora, vendtakimi, vende
    FROM udhetimet
    ORDER BY id
  `;

  return trips as Trip[];
}

export async function getTrip(id: string): Promise<Trip | null> {
  const sql = getSql();
  const trips = await sql`
    SELECT id, nisja, destinacioni, ora, vendtakimi, vende
    FROM udhetimet
    WHERE id = ${id}
    LIMIT 1
  `;

  return (trips[0] as Trip | undefined) ?? null;
}
