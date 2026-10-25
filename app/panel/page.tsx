import Link from "next/link";
import TopBar from "@/components/TopBar";
import Hyrja from "@/components/Hyrja";
import { profiliIm } from "@/lib/lejet";
import { ruajOren } from "./actions";

export const dynamic = "force-dynamic";

const mesazhet: Record<string, string> = {
  hyr: "Hyr ne llogari para se te ndryshosh udhetimin.",
  ndaluar: "Nuk ke leje per kete udhetim. Ora nuk ndryshoi.",
  fushe: "Shkruaj nje ore te vlefshme, p.sh. 08:25. ID duhet te jete 1, 2 ose 3.",
  ruajtur: "Ora u ruajt me sukses. Kontrollo listen dhe detajet.",
  databaza: "Nuk u lidh me databazen. Kontrollo Neon dhe provo perseri.",
};

export default async function Panel({ searchParams }: {
  searchParams: Promise<{ m?: string }>;
}) {
  const { m } = await searchParams;
  let profil;
  try {
    profil = await profiliIm();
  } catch {
    return <div className="app-shell"><TopBar /><main className="main-content"><h1>Paneli im</h1><p role="alert">{mesazhet.databaza}</p><Link href="/panel">Provo perseri</Link></main></div>;
  }

  return (
    <div className="app-shell">
      <TopBar />
      <main className="main-content">
        <div className="page-heading">
          <p className="eyebrow"><span className="eyebrow-dot" /> Llogaria</p>
          <h1>Paneli im</h1>
        </div>
        {m && mesazhet[m] && <p role="status">{mesazhet[m]}</p>}
        {!profil ? <p>Lista eshte publike. Per panelin hyr me llogarine tende GitHub.</p> : <>
          <p>Pershendetje, {profil.emri}. Roli: <strong>{profil.roli}</strong>.</p>
          <p>ID ime GitHub: <code>{profil.id}</code></p>
        </>}
        <Hyrja brenda={Boolean(profil)} />
        {profil?.roli === "shofer" ? (
          <form action={ruajOren} className="detail-card">
            <h2>Ndrysho oren e udhetimit tim</h2>
            <input type="hidden" name="id" value="2" />
            <label htmlFor="ora">Ora e re</label>{" "}
            <input id="ora" name="ora" type="time" defaultValue="08:15" required />{" "}
            <button className="request-button" type="submit">Ruaj oren</button>
            <p>Formulari i laboratorit provon ID 2. Serveri verifikon pronarin edhe nese ID ndryshohet.</p>
          </form>
        ) : profil && <p>Si udhetar mund t&apos;i shohesh udhetimet; nuk mund te ndryshosh oren e shoferit.</p>}
        <p><Link href="/">Kthehu te udhetimet</Link></p>
        <p>Kerkesa per vend mbetet simulim kete jave.</p>
      </main>
    </div>
  );
}