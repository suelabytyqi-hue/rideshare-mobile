import Link from "next/link";
import type { Trip } from "@/lib/trips";

function CarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 40" className="car-icon" fill="none">
      <path d="m12 24 4-10c1-3 3-4 7-4h17c4 0 6 1 8 5l5 9 4 3v8H7v-8l5-3Z" fill="currentColor" opacity=".18" />
      <path d="m12 24 4-10c1-3 3-4 7-4h17c4 0 6 1 8 5l5 9 4 3v8H7v-8l5-3Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="m19 22 3-8h18l5 9H19Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="18" cy="34" r="4" fill="white" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="47" cy="34" r="4" fill="white" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link className="trip-card" href={`/udhetimi/${trip.id}`}>
      <div className="car-badge sky">
        <CarIcon />
      </div>
      <div className="trip-card-content">
        <div className="trip-card-topline">
          <h3>{trip.nisja} → {trip.destinacioni}</h3>
          <span className="trip-time">{trip.ora}</span>
        </div>
        <p className="trip-driver">Nisja nga: {trip.vendtakimi}</p>
        <div className="trip-card-meta">
          <span className={trip.vende === 0 ? "seats-unavailable" : ""}>
            <span className="meta-icon">♙</span> {trip.vende === 0 ? "Pa vende" : `${trip.vende} vende`}
          </span>
          <span><span className="meta-icon">↗</span> Udhëtim drejt {trip.destinacioni}</span>
        </div>
      </div>
      <span className="card-chevron" aria-hidden="true">›</span>
    </Link>
  );
}
