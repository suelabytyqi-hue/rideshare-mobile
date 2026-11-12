import Link from "next/link";
import TopBar from "@/components/TopBar";
import TripDetails from "@/components/TripDetails";
import { getTrip } from "@/lib/trips";
import { getFavoriteSummary } from "@/lib/favorites";
import { profiliIm } from "@/lib/lejet";

export const dynamic = "force-dynamic";

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let trip = null;
  let favorite = { isFavorite: false, count: 0 };
  let signedIn = false;
  let databaseError = false;

  try {
    trip = await getTrip(id);
    if (trip) {
      const profile = await profiliIm();
      signedIn = Boolean(profile);
      if (profile) favorite = await getFavoriteSummary(profile.id, trip.id);
    }
  } catch (error) {
    console.error("Detajet ose preferimet e udhëtimit nuk mund të ngarkoheshin.", error);
    databaseError = true;
  }

  return (
    <div className="app-shell">
      <TopBar />
      <main className="detail-wrap">
        <Link className="back-link" href="/">
          <span aria-hidden="true">←</span> Të gjitha udhëtimet
        </Link>
        {databaseError ? (
          <section className="not-found-card" role="alert">
            <h1>Detajet nuk mund të ngarkoheshin</h1>
            <p>Kontrollo konfigurimin e DATABASE_URL dhe lidhjen me databazën Neon.</p>
            <Link className="request-button" href="/">Kthehu te udhëtimet</Link>
          </section>
        ) : trip ? (
          <>
            <div className="detail-heading">
              <p className="eyebrow"><span className="eyebrow-dot" /> Detajet e udhëtimit</p>
              <h1>Udhëtimi yt drejt AAB</h1>
              <p>Kontrollo informacionin para se të kërkosh një vend.</p>
            </div>
            <TripDetails
              trip={trip}
              signedIn={signedIn}
              initialFavorite={favorite}
              showFailureTest={process.env.NODE_ENV === "development"}
            />
          </>
        ) : (
          <section className="not-found-card">
            <h1>Udhëtimi nuk u gjet</h1>
            <p>Ky identifikues nuk gjendet në databazë.</p>
            <Link className="request-button" href="/">Kthehu te udhëtimet</Link>
          </section>
        )}
      </main>
    </div>
  );
}
