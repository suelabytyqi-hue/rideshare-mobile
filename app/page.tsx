import Link from "next/link";
import TopBar from "@/components/TopBar";
import TripCard from "@/components/TripCard";
import { lexoUdhetimet, type Trip } from "@/lib/trips";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let trips: Trip[] = [];
  let databaseError = false;

  try {
    trips = await lexoUdhetimet();
  } catch {
    databaseError = true;
  }

  return (
    <div className="app-shell">
      <TopBar />
      <main className="main-content listing-layout">
        <section aria-labelledby="page-title">
          <div className="page-heading">
            <p className="eyebrow"><span className="eyebrow-dot" /> Udhëtime studentore</p>
            <h1 id="page-title">Shko bashkë.<br />Mbërrij në kohë.</h1>
            <p>Gjej një udhëtim për në kampusin AAB dhe udhëto me studentë të tjerë.</p>
            <p><Link href="/panel">Hyr / Paneli im</Link></p>
          </div>

          <div className="filter-bar" aria-label="Udhëtime të disponueshme">
            <span className="filter-title">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M6 12h12m-9 6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              Udhëtime të publikuara
            </span>
            <span className="filter-count">{trips.filter((trip) => trip.vende > 0).length} me vende</span>
          </div>

          <div className="trip-list">
            {databaseError ? (
              <section className="not-found-card" role="alert">
                <h2>Udhëtimet nuk mund të ngarkoheshin</h2>
                <p>Kontrollo DATABASE_URL në .env.local, lidhjen me Neon dhe nëse tabela udhetimet ekziston.</p>
              </section>
            ) : trips.length > 0 ? (
              trips.map((trip) => <TripCard key={trip.id} trip={trip} />)
            ) : (
              <section className="not-found-card">
                <h2>Nuk ka udhëtime të publikuara</h2>
                <p>Kur të shtohen udhëtime në databazë, ato do të shfaqen këtu.</p>
              </section>
            )}
          </div>
        </section>

        <aside className="side-note">
          <span className="side-note-icon" aria-hidden="true">✦</span>
          <div>
            <h2>Udhëtim i thjeshtë, bashkë</h2>
            <p>Zgjidh makinën, shiko detajet dhe dërgo kërkesën te shoferi.</p>
            <span className="demo-tag"><span aria-hidden="true">●</span> Vetëm simulim</span>
          </div>
        </aside>
      </main>
    </div>
  );
}
