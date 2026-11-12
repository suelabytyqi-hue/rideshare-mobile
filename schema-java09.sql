-- Preferimet jane personale dhe nuk krijojne kerkese rezervimi.
-- Ekzekutoje ne databazen tende Neon pasi ekzistojne tabelat profilet dhe udhetimet.
CREATE TABLE IF NOT EXISTS udhetimet_preferuara (
  github_id TEXT NOT NULL REFERENCES profilet(github_id) ON DELETE CASCADE,
  udhetim_id TEXT NOT NULL REFERENCES udhetimet(id) ON DELETE CASCADE,
  krijuar_me TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (github_id, udhetim_id)
);

CREATE INDEX IF NOT EXISTS udhetimet_preferuara_udhetim_id_idx
  ON udhetimet_preferuara (udhetim_id);
