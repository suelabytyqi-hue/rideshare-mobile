# RideShare — Java 6 · PWA dhe lexim offline

## Çfarë ndërtova

Shtova manifestin e RideShare AAB, ikonat 192×192 dhe 512×512, endpoint-in publik `GET /api/udhetimet`, service worker-in dhe faqen `public/offline.html` për lexim. Endpoint-i përdor query-n ekzistuese të Neon dhe kthen vetëm ID-në, nisjen, destinacionin, orën, vendtakimin dhe numrin e vendeve. Service worker-i ruan vetëm faqen offline, ikonat dhe listën publike; nuk ruan hyrjen, panelin ose kërkesat POST. Komponenti PWA është lidhur në layout-in ekzistues pa hequr metadata-n.

## Tri provat

### Prova 1 · Manifesti dhe vizita online

- **Pritja:** Manifesti tregon emrin RideShare AAB dhe ikonat me madhësi 192×192 dhe 512×512. Service worker-i regjistrohet, lista merret nga serveri dhe faqja offline shfaq udhëtimet.
- **Rezultati:** Kaloi në shfletues lokal: manifesti, ikonat, `/sw.js` dhe `/api/udhetimet` u përgjigjën me HTTP 200. Manifesti tregoi emrin dhe madhësitë e kërkuara; API-ja ktheu tri udhëtime me vetëm gjashtë fushat publike. Service worker-i u aktivizua dhe `rideshare-public-v1` përmbante kopjen e listës.

### Prova 2 · Pa internet, edhe pas rifreskimit

- **Pritja:** Pas vizitës online, `/` shërben faqen e lexuesit offline dhe listën e ruajtur pas rifreskimit; rezervimi mbetet i çaktivizuar.
- **Rezultati:** Kaloi në shfletues me rrjetin Offline dhe pas rifreskimit: `/` shfaqi faqen offline, tri udhëtimet nga cache dhe burimin “cache”; butoni për kërkim vendi ishte i çaktivizuar.

### Prova 3 · Rikthe lidhjen dhe kërko të dhënat e reja

- **Pritja:** Pas ndryshimit të orës së udhëtimit 2 në Neon nga 08:15 në 08:25, Rifresko listën merr vlerën e re nga serveri dhe e shënon burimin si rrjet.
- **Rezultati:** U përditësua ID 2 në Neon me kushtin që ora e mëparshme të ishte 08:15; databaza konfirmoi `08:25`. Pastaj `/api/udhetimet` u përgjigj me HTTP 200 dhe tri udhëtime; udhëtimi 2 u kthye me orën `08:25` dhe vetëm fushat publike. Ora lihet në `08:25` për provën e Javës 6, sipas kërkesës.

## Kufizimet dhe verifikimi

Lista offline është kopje publike vetëm për lexim; ajo mund të jetë e vjetruar dhe nuk konfirmon rezervime. `npm run lint` dhe `npm run build` përfunduan pa gabime. Instalimi në telefon dhe dorëzimi në GitHub mbeten hapa manualë.

## Ndihma nga AI

Përdora GitHub Copilot për të zbatuar hapat teknikë. Verifikova lint/build, sjelljen online/offline në shfletues dhe përditësimin në Neon përmes API-së lokale.
