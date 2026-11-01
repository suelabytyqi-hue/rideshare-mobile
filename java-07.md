# RideShare · Java 7

## Rasti im
GitHub: suelabytyqi-hue  
Kodi: P7-799  
Skenari i zgjedhur: Rasti 2 · Pa vende  
ID i udhëtimit në skenarin e provës: 2  
Të dhënat fiktive të rastit: Ferizaj; ora fillestare 09:05; 2 vende; kufiri i provës 0 vende.

## Parashikimi
Kur udhëtimi ka 0 vende, lista duhet ta shënojë si “Pa vende” dhe detajet nuk duhet të lejojnë kërkesë. Edhe nëse faqja është e vjetër, POST-i duhet ta kontrollojë përsëri gjendjen në server dhe të kthejë gabim kur nuk ka vende.

## Dy problemet para korrigjimit
Këto u identifikuan duke lexuar kodin para ndryshimit; nuk pretendohet se u vëzhguan në një provë runtime:
1. Butoni e kalonte kërkesën drejtpërdrejt në simulimin “Në pritje”, pa kontrolluar përsëri numrin e vendeve në server.
2. Nuk kishte endpoint POST për kontrollin e rezervimit, prandaj nuk ekzistonte kontroll serveror për një faqe të vjetër ose një kërkesë të dërguar drejtpërdrejt.

## Korrigjimi
Skedarët: `components/TripDetails.tsx` dhe `app/api/udhetimet/[id]/rezervim/route.ts`.

Butoni tani dërgon POST te `/api/udhetimet/{id}/rezervim`. Serveri e lexon udhëtimin nga Neon dhe kthen 404 kur nuk ekziston, 409 kur nuk ka vende dhe 503 kur databaza nuk mund të lexohet. Vetëm pas kontrollit të suksesshëm ndërfaqja vazhdon me simulimin “Në pritje”. Kur udhëtimi ka 0 vende, lista dhe detajet vazhdojnë ta shfaqin si të padisponueshëm dhe butoni nuk shfaqet.

Ky endpoint kontrollon disponueshmërinë, por nuk ruan rezervim dhe nuk ul numrin e vendeve. Kërkesa mbetet simulim, si në javët e mëparshme.

## Versionet
Para: nuk ka lidhje commit-i të disponueshme.  
Pas: nuk ka lidhje commit-i të disponueshme.  
Shënim: kjo dosje nuk ka metadata Git dhe komanda `git` nuk është e instaluar në ambient; nuk u krijuan commit-e.

## Provat
### Prova 1 · Kontrolli automatik i kodit
- Hapat: Ekzekutova `npm run lint`, `npm run build` dhe kontrollova diagnostikat e dy skedarëve të ndryshuar.
- Pritshmëria: Pa gabime lint ose TypeScript.
- Vëzhgimi: Lint-i dhe build-i prodhimor përfunduan me sukses; diagnostikat e skedarëve të ndryshuar nuk raportuan gabime.

### Prova 2 · Udhëtimi me 0 vende
- Hapat: Në databazën ekzistuese, udhëtimi ID 3 ishte pa vende. Hapa `/`, `/udhetimi/3` dhe dërgova POST te `/api/udhetimet/3/rezervim`.
- Pritshmëria: Lista/detajet tregojnë se nuk ka vende; POST-i kthen HTTP 409 dhe nuk kalon kërkesën në pritje.
- Vëzhgimi: Lista shfaqi “Pa vende”, detajet shfaqën “Nuk ka vende të lira” dhe butoni mungoi. POST-i u përgjigj HTTP 409 me “Nuk ka vende të lira për këtë udhëtim.” ID 2 në databazën ekzistuese kishte vende, prandaj nuk e ndryshova atë; prova e saktë me ID 2 të vendosur në 0 nuk u krye.

### Prova 3 · Udhëtim me vende, identifikues i panjohur dhe gabim databaze
- Hapat: Dërgova POST te `/api/udhetimet/2/rezervim` dhe te `/api/udhetimet/not-found/rezervim`.
- Pritshmëria: Me vende, simulimi vazhdon; ID e panjohur kthen HTTP 404; dështimi i databazës kthen HTTP 503.
- Vëzhgimi: ID 2 u përgjigj HTTP 200 me `{"available":true,"simulation":true}`; ID e panjohur u përgjigj HTTP 404. Rasti i dështimit të databazës me HTTP 503 dhe prova në telefon nuk u provuan.

## Ndryshimi i ri
Kontrolli i kapacitetit nuk mbështetet më vetëm te të dhënat e vjetra të faqes: çdo kërkesë e simulimit verifikohet edhe në server. Kjo nuk e kthen simulimin në rezervim real.

## Ndihma nga AI
Përdora GitHub Copilot për të kontrolluar kodin ekzistues, për të shtuar kontrollin POST serveror dhe për të përditësuar raportin. Verifikova lint-in dhe diagnostikat e skedarëve të ndryshuar. Nuk ndryshova të dhënat e Neon; testimi manual me llogarinë reale dhe telefoni mbeten për t’u kryer.
