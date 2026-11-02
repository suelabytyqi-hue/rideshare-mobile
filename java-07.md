# RideShare · Java 7

## Rasti im
GitHub: [suelabytyqi-hue/rideshare-mobile](https://github.com/suelabytyqi-hue/rideshare-mobile)

Kodi: P7-799

Skenari: Rasti 2 · Pa vende

ID i udhëtimit: 2

Të dhënat e rastit: Ferizaj; ora fillestare 09:05; 2 vende; kufiri i provës 0 vende.

## Parashikimi
Kur udhëtimi ka 0 vende, lista duhet ta shënojë si “Pa vende” ose ta fshehë. Detajet nuk duhet të lejojnë kërkesë; POST-i duhet ta kontrollojë përsëri gjendjen në server dhe ta refuzojë kërkesën.

## Problemet para korrigjimit
1. Kur udhëtimi kishte 0 vende, ndërfaqja e detajeve e paraqiste si “Kërkesa u refuzua” dhe “Simulim: E refuzuar”, megjithëse udhëtari nuk kishte dërguar kërkesë.
2. Për udhëtimet me vende, butoni e kalonte gjendjen vetëm lokalisht në “Në pritje”. Nuk kishte kontroll serveror të vendeve në momentin e kërkesës; një faqe e vjetër nuk mund të verifikonte disponueshmërinë aktuale.

## Korrigjimi
Skedarët: `components/TripDetails.tsx` dhe `app/api/udhetimet/[id]/rezervim/route.ts`.

Detajet tani tregojnë “Nuk ka vende të lira” dhe nuk paraqesin butonin kur udhëtimi është i mbushur. Butoni i kërkesës dërgon POST te `/api/udhetimet/{id}/rezervim`; serveri e lexon gjendjen aktuale nga Neon, kthen HTTP 409 kur nuk ka vende, 404 kur udhëtimi nuk gjendet dhe 503 kur databaza nuk mund të lexohet. Vetëm pas kontrollit të suksesshëm ndërfaqja kalon në simulimin “Në pritje”.

Kjo ende nuk ruan rezervim dhe nuk ul numrin e vendeve. Kërkesa mbetet simulim.

## Versionet në GitHub
Para · parashikimi: [6c2296e — Java 7: ruaj parashikimin P7-799](https://github.com/suelabytyqi-hue/rideshare-mobile/commit/6c2296e)

Pas · korrigjimi i kodit: [d88efc6 — Java 7: kontrollo vendet para simulimit](https://github.com/suelabytyqi-hue/rideshare-mobile/commit/d88efc6c643d7c7774514321fc36284f05d601a2)

## Provat
### Prova 1 · Kontrolli automatik
- Hapat: Ekzekutova `npm run lint` dhe `npm run build` në kopjen e repository-t.
- Pritshmëria: Kontrolli i lint-it dhe build-i prodhimor përfundojnë pa gabime.
- Vëzhgimi: Të dy komandat përfunduan me sukses. Diagnostikat për skedarët e ndryshuar nuk raportuan gabime.

### Prova 2 · ID 2 me zero vende
- Hapat: ID 2 kishte 1 vend. E vendosa përkohësisht në 0 në Neon, hapa listën dhe detajet e udhëtimit dhe dërgova POST te `/api/udhetimet/2/rezervim`.
- Pritshmëria: Lista shfaq “Pa vende”; detajet shfaqin mungesën e vendeve pa buton kërkese; POST-i kthen gabim.
- Vëzhgimi: Lista shfaqi “Pa vende”; detajet shfaqën “Nuk ka vende të lira” dhe nuk kishin buton kërkese; POST-i ktheu HTTP 409. Pas provës, ID 2 u rikthye në vlerën fillestare, 1 vend.

### Prova 3 · Rikthimi dhe identifikuesi i panjohur
- Hapat: Pasi riktheva ID 2 në 1 vend, dërgova POST për ID 2 dhe për ID-në `not-found`.
- Pritshmëria: ID 2 vazhdon si simulim; identifikuesi i panjohur refuzohet.
- Vëzhgimi: ID 2 ktheu HTTP 200 me përgjigje simulimi; ID `not-found` ktheu HTTP 404. Rasti kur databaza dështon (HTTP 503) nuk u provua.

## Ndryshimi i ri
Disponueshmëria kontrollohet në server në momentin e kërkesës, jo vetëm në gjendjen që shfaq faqja. Të dhënat e Neon u rikthyen pas provës; nuk u ruajt rezervim.

## Ndihma nga AI
Përdora GitHub Copilot për të kontrolluar sjelljen ekzistuese, për të shtuar kontrollin POST serveror dhe për të plotësuar raportin. Ekzekutova lint/build, provova rastin me ID 2 në 0 vende dhe kontrollova që numri i vendeve u rikthye në vlerën fillestare. Prova e HTTP 503 dhe prova në telefon nuk u kryen.
