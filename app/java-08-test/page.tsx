import Link from "next/link";
import TopBar from "@/components/TopBar";
import MeetingPoint from "@/components/MeetingPoint";

export default function Java08TestPage() {
  return (
    <div className="app-shell">
      <TopBar />
      <main className="detail-wrap">
        <Link className="back-link" href="/">
          <span aria-hidden="true">←</span> Të gjitha udhëtimet
        </Link>
        <div className="detail-heading">
          <p className="eyebrow"><span className="eyebrow-dot" /> Java 8 · Faqja e provës</p>
          <h1>Vendtakimi i Artës</h1>
          <p>Provë lokale me të dhëna fiktive. Nuk lidhet me databazën.</p>
        </div>
        <section className="detail-card" aria-label="Udhëtim prove i Dritonit">
          <div className="driver-row">
            <span className="avatar" aria-hidden="true">DR</span>
            <div className="driver-info">
              <h2>Ferizaj → AAB</h2>
              <p>Udhëtimi prove · Dritoni</p>
            </div>
            <span className="trip-time">08:15</span>
          </div>
          <MeetingPoint />
        </section>
      </main>
    </div>
  );
}
