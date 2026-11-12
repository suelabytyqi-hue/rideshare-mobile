import "server-only";

import { getSql } from "@/lib/trips";

export type FavoriteSummary = {
  isFavorite: boolean;
  count: number;
};

export async function getFavoriteSummary(
  userId: string,
  tripId: string,
): Promise<FavoriteSummary> {
  const sql = getSql();
  const rows = await sql`
    SELECT
      EXISTS (
        SELECT 1
        FROM udhetimet_preferuara
        WHERE github_id = ${userId} AND udhetim_id = ${tripId}
      ) AS is_favorite,
      (
        SELECT COUNT(*)::int
        FROM udhetimet_preferuara
        WHERE github_id = ${userId}
      ) AS count
  `;
  const row = rows[0];

  if (!row) {
    throw new Error("Përmbledhja e preferimeve nuk u kthye nga databaza.");
  }

  return {
    isFavorite: Boolean(row.is_favorite),
    count: Number(row.count),
  };
}

export async function saveFavorite(userId: string, tripId: string) {
  const sql = getSql();
  await sql`
    INSERT INTO udhetimet_preferuara (github_id, udhetim_id)
    VALUES (${userId}, ${tripId})
    ON CONFLICT (github_id, udhetim_id) DO NOTHING
  `;
}
