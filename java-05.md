# RideShare — Java 5 · Hyrja dhe lejet

## Çfarë ndërtova

Shtova hyrjen me GitHub përmes NextAuth 4.24.15. Identiteti verifikohet nga GitHub dhe ID-ja ruhet në sesion. Roli lexohet nga profili në Neon; profili i ri merr rolin `udhetar`. Pronësia përcaktohet nga `shofer_id` në udhëtim. Serveri lejon ndryshimin e orës vetëm kur sesioni, roli në databazë dhe pronësia përputhen. Lista dhe detajet e Java 4 vazhdojnë të përdorin Neon.

## Provat që bëra

### Prova 1: Hyrja, rifreskimi dhe dalja

Nuk u krye ende. Hyrja me GitHub ktheu 404. Endpoint-i lokal i NextAuth dhe lista e provider-ëve përgjigjen me HTTP 200, ndërsa `NEXTAUTH_URL` është `http://localhost:3000`. Duhet verifikuar në GitHub OAuth App që callback URL është saktësisht `http://localhost:3000/api/auth/callback/github`; rifreskimi dhe dalja nuk janë provuar.

### Prova 2: Shoferi ndryshon udhëtimin e vet

Leximi nga Neon kaloi: query-ja vetëm-lexim ktheu tri udhëtime (ID 1, 2 dhe 3); ID 1 ka shofer të caktuar, ID 2 dhe 3 jo. Faqja `/` dhe detaji `/udhetimi/2` u përgjigjën me HTTP 200. Me kërkesën e përdoruesit, krijova profilin fiktiv `TEST-JAVA5-DRIVER` me rolin `shofer` dhe caktova ID 2 si pronë të tij; ora mbeti `08:15`. Ky profil tekstual është vetëm fixture i databazës dhe nuk mund të hyjë përmes NextAuth, i cili kërkon ID numerike të GitHub. Ndryshimi i orës nga sesioni real ende nuk është provuar.

### Prova 3: Veprimi pa leje refuzohet

Nuk u krye ende. Hyrja reale me GitHub dhe veprimi i formularit nuk funksionojnë derisa të zgjidhet 404 dhe ID 2 t'i caktohet ID-së numerike të llogarisë reale. Pas kësaj duhet provuar ID 1 nga formulari dhe kontrolluar në Neon që ora e saj mbetet `08:00`.

## Ku gjendet puna

Skedarët e Java 5 dhe `schema-java05.sql` janë në projektin Next.js, pranë README. Git dhe një link publik i repository-t nuk janë të disponueshëm në këtë ambient; pasi të bëhet push, vendose këtu linkun e repository-t dhe, nëse publikohet, linkun e Vercel.

## Çfarë mbetet për përmirësim

Kërkesa për vend mbetet simulim. Hapi tjetër do të ishte ruajtja e kërkesave në databazë dhe menaxhimi i tyre nga shoferi.

## Verifikimi i kodit

Build-i prodhimor i Next.js përfundoi pa gabime, përfshirë kontrollin e lint-it dhe TypeScript-it. `npm run lint` dhe `npx tsc --noEmit` përfunduan pa gabime. `/`, `/udhetimi/2`, `/panel` dhe `/api/auth/providers` u përgjigjën me HTTP 200; provider-i i raportuar është `github`. Query-ja e Neon lexoi tri udhëtime dhe konfirmoi pronësinë provuese të ID 2. Këto kontrolle nuk provojnë hyrjen reale me GitHub ose autorizimin e ruajtjes së orës.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora GitHub Copilot për të shtuar hyrjen, kontrollin e autorizimit dhe skedarët përkatës. Verifikova query-n e Neon dhe endpoint-et lokale pa shfaqur kredencialet. Hyrja reale OAuth dhe ndryshimi i orës përmes panelit nuk janë provuar ende; profili testues nuk përfaqëson llogarinë time GitHub.
