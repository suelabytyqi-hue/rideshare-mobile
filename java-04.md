# RideShare — Java 4 · Neon dhe PostgreSQL

Ruaje këtë skedar si java-04.md pranë README, jashtë aplikacioni/.
Plotëso të gjitha përgjigjet; hiqi shenjat [PLOTËSO].
Mos vendos DATABASE_URL, pamje të kredencialeve ose të dhëna reale.

## Çfarë ndërtova
[Lidha aplikacionin RideShare me databazën e jashtme Neon PostgreSQL (`udhetimet`). Konfigurova lidhjen duke përdorur paketën `@neondatabase/serverless` dhe përditësova logjikën e kërkesave (queries) te `trips.ts` dhe `page.tsx` për të lexuar të dhënat reale.] Shpjego si lista dhe detajet i lexojnë udhëtimet nga Neon.

## Provat që bëra
### Prova 1: Ndryshimi në databazë shfaqet në aplikacion
[Ndryshova orën e ID 2 nga 08:15 në 08:25 në SQL Editor të Neon. Rifreskova faqen dhe pashë që ora u përditësua në 08:25 te detajet e udhëtimit. Më pas e ktheva përsëri në 08:15.] Ndryshova orën e ID 2 nga 08:15 në 08:25 në SQL Editor.
Shkruaj çfarë tregoi lista dhe çfarë treguan detajet pas rifreskimit.
Ktheje orën në 08:15 dhe provo përsëri.

### Prova 2: Lista bosh dhe rikthimi
[Shtova `WHERE false` vetëm te kërkesa SQL që lexon të gjitha udhëtimet (`lexoUdhetimet`). Faqja shfaqi mesazhin se nuk ka udhëtime. Hoqa `WHERE false` dhe të gjitha kartat u rikthyen.] Shtova WHERE false vetëm te pyetja e lexoUdhetimet.
Shkruaj mesazhin që u shfaq. Hoqe WHERE false dhe u kthyen tri kartat?

### Prova 3: Lidhja mungon, rikthimi dhe siguria
[Ndryshova përkohësisht emrin e variablës te `.env.local` për të simuluar mungesën e lidhjes dhe rinisa serverin. Faqja shfaqi mesazhin e gabimit se mungon `.env.local`. E ktheva emrin përsëri dhe aplikacioni punoi sërish pa problem.] Ndryshova përkohësisht emrin DATABASE_URL në .env.local,
rinisa serverin dhe shënova mesazhin. Riktheva emrin dhe rinisa serverin.
Shkruaj a punoi sërish; a mungon .env.local në listën e GitHub Desktop?

## Ku gjendet puna
[Në projekt gjenden skedarët `schema.sql`, `.env.example`, si dhe logjika e lidhjes te `lib/trips.ts`. Projektin e ruajta dhe e bëra commit në repozitorin e GitHub.] Shëno schema.sql, skedarët që ndryshove dhe linkun e repository-t.
Nëse punon në Vercel, shto linkun e aplikacionit (opsional këtë javë).

## Çfarë mbetet për përmirësim
[] Një kufizim ose gabim dhe hapi yt i ardhshëm.
Kërkesa “Në pritje” mbetet simulim; nuk ka rezervim real.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
[PLOTËSO] Çfarë ndihme more dhe çfarë verifikove vetë, ose: Nuk përdora AI.
