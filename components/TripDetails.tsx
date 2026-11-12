"use client";

import Link from "next/link";
import { useState } from "react";
import type { Trip } from "@/lib/trips";
import type { FavoriteSummary } from "@/lib/favorites";
import MeetingPoint from "@/components/MeetingPoint";

type FavoriteStatus = "idle" | "pending" | "saved" | "error";

function isFavoriteSummary(value: unknown): value is FavoriteSummary {
  return (
    typeof value === "object" &&
    value !== null &&
    "isFavorite" in value &&
    typeof value.isFavorite === "boolean" &&
    "count" in value &&
    typeof value.count === "number"
  );
}

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

function PendingClock() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
      <path d="M16 9v7l5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TripDetails({
  trip,
  signedIn,
  initialFavorite,
  showFailureTest,
}: {
  trip: Trip;
  signedIn: boolean;
  initialFavorite: FavoriteSummary;
  showFailureTest: boolean;
}) {
  const [requestStatus, setRequestStatus] = useState<"not-requested" | "pending" | "confirmed" | "rejected">("not-requested");
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requesting, setRequesting] = useState(false);
  const [favorite, setFavorite] = useState(initialFavorite);
  const [favoriteStatus, setFavoriteStatus] = useState<FavoriteStatus>(
    initialFavorite.isFavorite ? "saved" : "idle",
  );
  const [favoriteError, setFavoriteError] = useState<string | null>(null);
  const [simulateFavoriteFailure, setSimulateFavoriteFailure] = useState(false);

  async function requestSeat() {
    setRequestError(null);
    setRequesting(true);

    try {
      const response = await fetch(`/api/udhetimet/${encodeURIComponent(trip.id)}/rezervim`, {
        method: "POST",
        cache: "no-store",
      });
      const result: unknown = await response.json();

      if (!response.ok) {
        const message =
          typeof result === "object" &&
          result !== null &&
          "error" in result &&
          typeof result.error === "string"
            ? result.error
            : "Kërkesa për vend nuk mund të kontrollohej.";
        throw new Error(message);
      }

      setRequestStatus("pending");
    } catch (error) {
      console.error("Kërkesa për vend nuk mund të kontrollohej.", error);
      setRequestError(
        error instanceof Error
          ? error.message
          : "Kërkesa për vend nuk mund të kontrollohej. Provo përsëri.",
      );
    } finally {
      setRequesting(false);
    }
  }

  async function saveTrip() {
    if (!signedIn || favoriteStatus === "pending" || favorite.isFavorite) return;

    const previousFavorite = favorite;
    setFavorite({ isFavorite: true, count: previousFavorite.count + 1 });
    setFavoriteStatus("pending");
    setFavoriteError(null);

    try {
      const response = await fetch(`/api/udhetimet/${encodeURIComponent(trip.id)}/preferim`, {
        method: "POST",
        cache: "no-store",
        headers: simulateFavoriteFailure ? { "x-test-failure": "true" } : undefined,
      });
      const result: unknown = await response.json();

      if (!response.ok) {
        const message =
          typeof result === "object" &&
          result !== null &&
          "error" in result &&
          typeof result.error === "string"
            ? result.error
            : "Udhëtimi nuk u ruajt. Provo përsëri.";
        throw new Error(message);
      }

      if (
        typeof result !== "object" ||
        result === null ||
        !("favorite" in result) ||
        !isFavoriteSummary(result.favorite)
      ) {
        throw new Error("Përgjigjja e serverit për preferimin nuk është e vlefshme.");
      }

      setFavorite(result.favorite);
      setFavoriteStatus("saved");
    } catch (error) {
      console.error("Preferimi i udhëtimit dështoi.", error);
      setFavorite(previousFavorite);
      setFavoriteStatus("error");
      setFavoriteError(
        error instanceof Error ? error.message : "Udhëtimi nuk u ruajt. Provo përsëri.",
      );
    }
  }

  return (
    <section className="detail-card" aria-label={`Detajet e udhëtimit nga ${trip.nisja}`}>
      <div className="driver-row">
        <span className="avatar" aria-hidden="true">{trip.nisja.slice(0, 2).toUpperCase()}</span>
        <div className="driver-info">
          <h2>{trip.nisja} → {trip.destinacioni}</h2>
          <p>Udhëtimi #{trip.id}</p>
        </div>
        <span className="trip-time">{trip.ora}</span>
      </div>

      <div className="car-detail-row">
        <div className="car-badge sky"><CarIcon /></div>
        <div>
          <h3>Nisja nga {trip.nisja}</h3>
          <p>{trip.vendtakimi}</p>
        </div>
      </div>

      <div className="route-box" aria-label="Itinerari">
        <div className="route-point">
          <span className="route-dot" aria-hidden="true" />
          <div><span className="route-label">Nisja · {trip.ora}</span><div className="route-address">{trip.vendtakimi} ({trip.nisja})</div></div>
          <span className="route-time">{trip.ora}</span>
        </div>
        <div className="route-point">
          <span className="route-dot destination" aria-hidden="true" />
          <div><span className="route-label">Destinacioni</span><div className="route-address">{trip.destinacioni}</div></div>
          <span className="route-time">{trip.destinacioni}</span>
        </div>
      </div>

      <div className="trip-facts">
        <div className="fact"><span className="fact-label">Vendet e lira</span><span className="fact-value">{trip.vende} vende</span></div>
        <div className="fact"><span className="fact-label">Ora e nisjes</span><span className="fact-value">{trip.ora}</span></div>
      </div>

      <MeetingPoint />

      <section className="favorite-panel" aria-label="Preferimi i udhëtimit">
        <div>
          <strong>Të preferuarat</strong>
          <span className="favorite-count">{favorite.count}</span>
          <p>Preferim personal · jo rezervim</p>
        </div>
        {signedIn ? (
          <div className="favorite-actions">
            <button
              className="favorite-button"
              type="button"
              onClick={saveTrip}
              disabled={favoriteStatus === "pending" || favorite.isFavorite}
              aria-pressed={favorite.isFavorite}
            >
              <span aria-hidden="true">{favorite.isFavorite ? "★" : "☆"}</span>{" "}
              {favoriteStatus === "pending"
                ? "Po ruhet…"
                : favorite.isFavorite
                  ? "I ruajtur"
                  : favoriteStatus === "error"
                    ? "Provo përsëri"
                    : "Ruaj udhëtimin"}
            </button>
            <p className="favorite-message" role={favoriteStatus === "error" ? "alert" : "status"} aria-live="polite">
              {favoriteStatus === "pending"
                ? "Po presim konfirmimin e serverit."
                : favoriteStatus === "saved"
                  ? "U ruajt te të preferuarat."
                  : favoriteError ?? "Nuk është te të preferuarat."}
            </p>
            {showFailureTest && (
              <label className="favorite-test-toggle">
                <input
                  type="checkbox"
                  checked={simulateFavoriteFailure}
                  onChange={(event) => setSimulateFavoriteFailure(event.target.checked)}
                  disabled={favoriteStatus === "pending"}
                />
                Simulo refuzimin para shkrimit (vetëm zhvillim)
              </label>
            )}
          </div>
        ) : (
          <div className="favorite-actions">
            <Link href="/panel" className="favorite-login">Hyr me GitHub për ta ruajtur</Link>
            <p className="favorite-message">Preferimet lidhen me llogarinë tënde.</p>
          </div>
        )}
      </section>

      {trip.vende <= 0 ? (
        <div className="pending-panel" role="status" aria-live="polite">
          <div className="pending-clock"><PendingClock /></div>
          <h2>Nuk ka vende të lira</h2>
          <p>Kërkesa për vend nuk është aktive për këtë udhëtim. Asnjë kërkesë nuk u dërgua.</p>
        </div>
      ) : requestStatus !== "not-requested" ? (
        <div className="pending-panel" role="status" aria-live="polite">
          <div className="pending-clock"><PendingClock /></div>
          <h2>{requestStatus === "pending" ? "Kërkesa në pritje" : requestStatus === "confirmed" ? "Vendi u konfirmua" : "Kërkesa u refuzua"}</h2>
          <p>
            {requestStatus === "pending"
              ? "Kërkesa jote u dërgua në këtë simulim. Provo përgjigjen e shoferit më poshtë."
              : requestStatus === "confirmed"
                ? "Shoferi e konfirmoi vendin në këtë simulim."
                : "Shoferi e refuzoi kërkesën në këtë simulim."}
          </p>
          <span className={`pending-status ${requestStatus === "rejected" ? "rejected-status" : requestStatus === "confirmed" ? "confirmed-status" : ""}`}>
            <i /> Simulim: {requestStatus === "pending" ? "Në pritje" : requestStatus === "confirmed" ? "E konfirmuar" : "E refuzuar"}
          </span>
          {requestStatus === "pending" && (
            <div className="driver-response" aria-label="Simulo përgjigjen e shoferit">
              <p>Si shofer/e, zgjidh një përgjigje:</p>
              <div className="driver-response-actions">
                <button type="button" className="response-button confirm-button" onClick={() => setRequestStatus("confirmed")}>
                  Konfirmo vendin
                </button>
                <button type="button" className="response-button reject-button" onClick={() => setRequestStatus("rejected")}>
                  Refuzo kërkesën
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="info-list">
            <div className="info-item"><span className="info-check">✓</span><span>Informacioni i udhëtimit lexohet nga databaza.</span></div>
            <div className="info-item"><span className="info-check">✓</span><span>Kërkesa për vend mbetet simulim lokal dhe nuk dërgohet te shoferi.</span></div>
          </div>
          <button className="request-button" type="button" onClick={requestSeat} disabled={requesting}>
            {requesting ? "Duke kontrolluar..." : <>Kërko një vend <span aria-hidden="true">→</span></>}
          </button>
          {requestError && <p role="alert">{requestError}</p>}
          <p className="request-hint">Kërkesa shfaqet vetëm këtu dhe humbet kur rifreskon faqen.</p>
        </>
      )}
      <p className="simulation-note">Të dhënat e udhëtimit ngarkohen nga databaza. Kërkesa, përgjigjja e shoferit dhe pagesa janë ende vetëm simulim.</p>
    </section>
  );
}
