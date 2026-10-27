# RideShare — Java 3

## 1. Qëllimi i javës

U ndërtua prototipi i RideShare për studentët që kërkojnë udhëtim drejt kampusit AAB. Projekti ka tri pamje të rrjedhës kryesore: listën e udhëtimeve, detajet e një udhëtimi dhe gjendjen e kërkesës pas veprimit të pasagjerit.

## 2. Çfarë u implementua

- **Lista e udhëtimeve (`/`)**: paraqet kartat me emrin e shoferit dhe makinës, orën e nisjes, numrin e vendeve dhe kohëzgjatjen. Udhëtimet paraqiten nga të dhëna shembull në kod.
- **Detajet (`/udhetimi/[id]`)**: karta e listës hap detajet sipas identifikuesit të udhëtimit. Faqja paraqet shoferin, makinën, vendet e lira, orën dhe adresën e nisjes, destinacionin dhe kohëzgjatjen. Për një identifikues që nuk ekziston shfaqet mesazhi se udhëtimi nuk u gjet dhe lidhja për t'u kthyer në listë.
- **Kërkesa**: butoni “Kërko këtë makinë” e ndryshon pamjen në të njëjtën faqe të detajeve dhe shfaq gjendjen **“Simulim: Në pritje”**. Për demonstrim, ka edhe veprime të simuluara për konfirmim ose refuzim nga shoferi. Këto nuk dërgojnë kërkesë reale.

## 3. Të dhënat dhe kufijtë e prototipit

Të gjitha udhëtimet dhe personat janë fiktivë dhe janë ruajtur si të dhëna shembull në kod. Nuk ka databazë, llogari përdoruesi, pagesë ose dërgim real të kërkesave. Gjendja e kërkesës mbahet vetëm në faqen e hapur dhe humbet pas rifreskimit.

Një udhëtim shembull ka zero vende të lira; ndërfaqja e paraqet si “Pa vende” dhe shfaq gjendjen e simuluar të refuzimit. Kjo mundëson kontrollimin e rastit kur udhëtari nuk mund të kërkojë vend.

## 4. Rrjedha e navigimit

1. Hapet lista e udhëtimeve.
2. Zgjidhet një kartë dhe hapen detajet në adresën `/udhetimi/[id]`.
3. Nëse ka vende, pasagjeri zgjedh “Kërko këtë makinë” dhe sheh kërkesën në pritje.
4. Në demonstrim mund të zgjidhet një përgjigje e shoferit: konfirmim ose refuzim. Lidhja “Të gjitha udhëtimet” kthen te lista.

## 5. Rezultati i implementimit

Kodi përmban pamjen e listës me karta, faqen dinamike të detajeve dhe kalimin në gjendjen e kërkesës. Ky është përshkrim i gjendjes së kodit, jo pretendim se aplikacioni është provuar në shfletues ose në telefon. Rezultatet e testeve më poshtë plotësohen pasi të ekzekutohen.

## 6. Testet që duhen kryer

**Gjendja aktuale e testimit: ende nuk është verifikuar.** Shëno rezultatin real pas provimit; mos shëno “kaloi” pa e ekzekutuar.

### Kontrolli automatik

- [ ] Nga dosja `rideshare-mobile-main`, instalo varësitë me `npm install`.
- [ ] Ekzekuto `npm run lint` dhe shëno nëse përfundon pa gabime.
- [ ] Ekzekuto `npm run build` dhe shëno nëse krijimi i versionit prodhimor përfundon me sukses.

### Kontrolli manual në shfletues dhe telefon

- [ ] Nise aplikacionin me `npm run dev` dhe hape adresën lokale që shfaq terminali.
- [ ] Në listë kontrollo që kartat tregojnë orën e nisjes dhe numrin e vendeve; provo kartën që tregon “Pa vende”.
- [ ] Hape një udhëtim me vende të lira; kontrollo shoferin, makinën, nisjen, destinacionin dhe kohëzgjatjen.
- [ ] Zgjidh “Kërko këtë makinë” dhe kontrollo që shfaqet saktësisht “Simulim: Në pritje”. Provo veçmas konfirmimin dhe refuzimin e simuluar.
- [ ] Hape udhëtimin pa vende dhe kontrollo që kërkesa nuk ofrohet e që shfaqet refuzimi i simuluar.
- [ ] Provo një identifikues të panjohur në `/udhetimi/nuk-ekziston` dhe kontrollo mesazhin e udhëtimit që nuk u gjet.
- [ ] Në telefon, hape adresën e zhvillimit nga shfletuesi i telefonit ndërsa telefoni dhe kompjuteri janë në të njëjtin rrjet Wi-Fi; nëse qasja te `localhost` nuk funksionon, përdor IP-në lokale të kompjuterit dhe portën që tregon Next.js. Kontrollo që faqet përshtaten me ekranin dhe lidhjet/butonat mund të përdoren me prekje.

**Rezultatet reale:** plotësoji këtu pasi t'i kryesh, p.sh. cilat kontrolle kaluan, çfarë gabimi u shfaq dhe në cilin hap. Nuk janë futur rezultate të sajuara në këtë dokument.
