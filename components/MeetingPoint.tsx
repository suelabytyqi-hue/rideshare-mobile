"use client";

import { useState } from "react";

type LocationState = "idle" | "loading" | "success" | "denied" | "timeout" | "unavailable";

export default function MeetingPoint() {
  const [meetingText, setMeetingText] = useState("");
  const [confirmedMeeting, setConfirmedMeeting] = useState("");
  const [meetingError, setMeetingError] = useState("");
  const [locationState, setLocationState] = useState<LocationState>("idle");
  const [accuracy, setAccuracy] = useState<number | null>(null);

  function confirmMeeting() {
    const meeting = meetingText.trim();

    if (!meeting) {
      setMeetingError("Shkruaj vendtakimin para se ta konfirmosh.");
      return;
    }

    setConfirmedMeeting(meeting);
    setMeetingError("");
  }

  function locateMe() {
    setAccuracy(null);

    if (!navigator.geolocation) {
      setLocationState("unavailable");
      return;
    }

    setLocationState("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setAccuracy(position.coords.accuracy);
        setLocationState("success");
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationState("denied");
        } else if (error.code === error.TIMEOUT) {
          setLocationState("timeout");
        } else {
          setLocationState("unavailable");
        }
      },
      { timeout: 10000 },
    );
  }

  const locationMessage: Record<LocationState, string> = {
    idle: "",
    loading: "Po kërkojmë vendndodhjen…",
    success: "Pozicioni u mor. Zgjidh vetë emrin e vendtakimit.",
    denied: "Leja u refuzua. Shkruaj vendtakimin vetë.",
    timeout: "Koha mbaroi. Provo sërish ose shkruaj vendtakimin vetë.",
    unavailable: "Vendndodhja nuk është e disponueshme. Shkruaj vendtakimin vetë.",
  };

  return (
    <section className="meeting-point" aria-label="Zgjedh vendtakimin">
      <h3>Vendtakimi yt</h3>
      <label className="meeting-label" htmlFor="meeting-input">Shkruaj vendtakimin</label>
      <input
        id="meeting-input"
        data-testid="meeting-input"
        className="meeting-input"
        type="text"
        value={meetingText}
        onChange={(event) => {
          setMeetingText(event.target.value);
          setMeetingError("");
        }}
        placeholder="p.sh. Biblioteka"
      />
      <p className="meeting-error" data-testid="meeting-error" role="alert">{meetingError}</p>
      <button
        className="meeting-confirm-button"
        data-testid="confirm-meeting"
        type="button"
        onClick={confirmMeeting}
      >
        Konfirmo në telefon
      </button>
      <p className="confirmed-meeting-label">Vendtakimi i konfirmuar</p>
      <p className="confirmed-meeting" data-testid="confirmed-meeting" aria-live="polite">
        {confirmedMeeting || "Ende nuk është konfirmuar."}
      </p>

      <button
        className="meeting-location-button"
        data-testid="locate-me"
        type="button"
        onClick={locateMe}
        disabled={locationState === "loading"}
      >
        {locationState === "loading" ? "Po kërkojmë vendndodhjen…" : "Përdor vendndodhjen time"}
      </button>
      <p
        className="location-status"
        data-testid="location-status"
        data-state={locationState}
        role="status"
        aria-live="polite"
      >
        {locationMessage[locationState]}
      </p>
      <p className="location-accuracy" data-testid="location-accuracy">
        {accuracy === null ? "" : `Saktësia: ${Math.round(accuracy)} m`}
      </p>
      <p className="meeting-location-note">
        Vendndodhja nuk e zgjedh automatikisht emrin e pikës. Shkruaje dhe konfirmoje vetë.
      </p>
    </section>
  );
}
