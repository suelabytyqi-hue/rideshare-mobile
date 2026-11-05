"use client";

import { useState } from "react";
import type { Trip } from "@/lib/trips";
import MeetingPoint from "@/components/MeetingPoint";

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

export default function TripDetails({ trip }: { trip: Trip }) {
  const [requestStatus, setRequestStatus] = useState<"not-requested" | "pending" | "confirmed" | "rejected">("not-requested");
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requesting, setRequesting] = useState(false);

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
