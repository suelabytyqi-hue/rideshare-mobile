# RideShare — Java 9 · Udhëtimet e preferuara

## Çfarë ndërtova

Shtova ruajtjen e një udhëtimi te preferimet e përdoruesit të kyçur me GitHub. Preferimi është personal dhe nuk krijon kërkesë rezervimi. Ylli dhe numri përditësohen menjëherë; gjatë kërkesës shfaqet pritja. Serveri e konfirmon ruajtjen vetëm pasi Neon përgjigjet me sukses. Në gabim, pamja rikthehet te vlerat e mëparshme dhe ofrohet riprovimi.

Çdo çift përdorues–udhëtim ruhet vetëm një herë. Pas rifreskimit, faqja lexon gjendjen dhe numrin e preferimeve nga Neon. Heqja e preferimit nuk është përfshirë.

## Skema e Neon

Ekzekutova `schema-java09.sql` në Neon, në projektin `neon-amethyst-window`, branch-in `main` dhe databazën `neondb`. Branch-i ishte i arkivuar; pas miratimit u çarkivua nga Neon për ekzekutimin e query-ve. Tabela `udhetimet_preferuara` u shfaq në pamjen Tables pranë `profilet` dhe `udhetimet`. Çelësi primar përbëhet nga `github_id` dhe `udhetim_id`; prandaj e njëjta llogari nuk mund të ruajë dy herë të njëjtin udhëtim.

## Provat

### Prova 1: Ruajtja dhe rifreskimi

- **Hapat:** Hyr me GitHub, hap `/udhetimi/2`, ruaje udhëtimin dhe prit përgjigjen e serverit. Rifresko faqen dhe kontrollo edhe tabelën `udhetimet_preferuara` në Neon.
- **Pritshmëria:** Gjatë kërkesës shfaqet “Po ruhet…” dhe numri rritet menjëherë. Pas suksesit shfaqet “I ruajtur”; pas rifreskimit ylli dhe numri lexohen nga databaza.
- **Rezultati real:** Skema u ekzekutua dhe tabela u verifikua në Neon. Rrjedha e aplikacionit me hyrjen GitHub dhe ruajtjen e preferimit nuk u provua; kërkon konfigurimin lokal të hyrjes dhe databazës.

### Prova 2: Refuzimi dhe rikthimi i pamjes

- **Hapat:** Në mjedisin lokal të zhvillimit, shëno “Simulo refuzimin para shkrimit (vetëm zhvillim)” dhe kliko ruajtjen. Pastaj çshënoje dhe provo përsëri.
- **Pritshmëria:** Refuzimi kthehet para shkrimit në databazë; ylli dhe numri rikthehen te gjendja fillestare dhe shfaqet mesazhi për riprovim. Pas çaktivizimit të provës, ruajtja duhet të funksionojë.
- **Rezultati real:** Duhet plotësuar pas provës lokale. Kontrolli i refuzimit është aktiv vetëm në `development`; në prodhim nuk pranohet.

### Prova 3: Klikimet e përsëritura

- **Hapat:** Kliko disa herë shpejt gjatë pritjes. Pastaj, kur preferimi është ruajtur, rifresko faqen dhe kontrollo rreshtat për çiftin përdorues–udhëtim në Neon.
- **Pritshmëria:** Butoni çaktivizohet gjatë pritjes dhe pas suksesit. Edhe nëse kërkesat përsëriten, kufizimi unik në databazë lë vetëm një rresht.
- **Rezultati real:** Duhet plotësuar pas provës me llogarinë tënde dhe Neon. Kjo provë nuk u krye nga ky ambient.

## Skedarët

- `schema-java09.sql` — tabela e preferimeve, lidhjet me përdoruesit dhe udhëtimet, dhe kufizimi unik.
- `lib/favorites.ts` — query-t për leximin e gjendjes dhe ruajtjen idempotente.
- `app/api/udhetimet/[id]/preferim/route.ts` — API e mbrojtur nga hyrja për lexim dhe ruajtje.
- `app/udhetimi/[id]/page.tsx` dhe `components/TripDetails.tsx` — leximi fillestar dhe ndërfaqja optimiste me pritje, sukses, gabim dhe rikthim.
- `app/globals.css` — stilet e preferimit.

## Kufizimet dhe dorëzimi

Preferimi kërkon hyrjen ekzistuese me GitHub. Heqja e preferimit nuk është përfshirë. Para dorëzimit, konfiguro hyrjen dhe databazën lokalisht, kryej provat e sjelljes që mungojnë, plotëso rezultatet reale më sipër, pastaj bëj commit dhe push në repository-n tënd. Mos publiko `.env`, kredenciale ose të dhëna personale.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora Copilot për të zbatuar ruajtjen, endpoint-in dhe ndërfaqen. `npm run lint`, `npx tsc --noEmit` dhe build-i i Next.js kaluan. Build-i u ekzekutua me Node 20 sepse Node-i i parazgjedhur në ambient është më i vjetër se versioni minimal i Next.js. Skema e Neon u ekzekutua dhe u verifikua; hyrja reale me GitHub dhe provat e ndërfaqes nuk u kryen.
