import Link from "next/link";

export default function TopBar() {
  return (
    <header className="topbar">
      <Link className="brand" href="/" aria-label="RideShare, faqja kryesore">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 15.5 5.3 10c.2-.9 1-1.5 1.9-1.5h9.6c.9 0 1.7.6 1.9 1.5l1.3 5.5v3H4v-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M6.2 14h11.6M7 18.5v1m10-1v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="7.5" cy="15.7" r=".8" fill="currentColor" /><circle cx="16.5" cy="15.7" r=".8" fill="currentColor" />
          </svg>
        </span>
        <span>RideShare</span>
      </Link>
      <span className="topbar-label">Udhëtime për në AAB</span>
    </header>
  );
}
