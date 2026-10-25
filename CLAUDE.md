# Fajne weby – portfolio web

Skutečný portfolio web značky **Fajne weby** – tvorba webových stránek Ostrava. Provozovatel: Ondřej Polák (Ostrava, IČO 29589673, neplátce DPH). Nabízí tvorbu webů na míru pro živnostníky a malé podniky z Ostravy, Moravy a Slezska.

- Hlavní hledaná fráze: „Tvorba webových stránek Ostrava“; doplňkové: „webové stránky pro živnostníky“, „tvorba webu Ostrava“, „web na míru“, „Morava a Slezsko“.
- Tón: přátelský, spisovná čeština; slovo „fajne“ jen v 1–2 nadpisech/sloganech (slogan: „Web, který je fajne. Pro vás i pro vaše zákazníky.“).
- V patičce musí zůstat: „Provozovatel: Ondřej Polák, IČO: 29589673, nejsem plátce DPH“. Sekce O mně zůstává osobní s Ondřejovým jménem.
- Logo: symbol okna prohlížeče s úsměvem v royal blue čtverci + text „Fajne weby“ (stejný symbol je ve `public/favicon.svg`).

- Živě: https://fajne-weby.polakondrej14.workers.dev/ (Worker `fajne-weby`; starý Worker `ondrej-polak-weby-web` je k smazání v Cloudflare dashboardu)
- GitHub: https://github.com/polakondrej14-del/fajne-weby-web
- Hosting: Cloudflare Workers (statické assety), konfigurace ve `wrangler.jsonc`

## Struktura

- `public/index.html` – celý web (jedna stránka, sekce: hero, ukázky, co dostanete, postup, ceník, o mně, FAQ, kontakt, patička)
- `public/styles.css` – styly (barvy a fonty v `:root`)
- `public/script.js` – menu, animace při scrollu, akordeon, validace formuláře a odeslání přes `mailto:`
- `public/images/` – screenshoty ukázek (WebP), fotka `ondrej-polak.webp`, OG obrázek `og.jpg` (1200×630)
- `public/favicon.svg`
- `foto.jpg` – originál fotky (není v `public/`, nezveřejňuje se jako asset)

Žádný build krok, čisté HTML/CSS/JS. Design (inspirovaný webem Fit s Tomášem): tmavé pozadí #08080C / #0F0F16, text #F4F5FA, šedý text #A9AFC2, royal blue #2F5BFF (plochy, tlačítka), #5B7CFF (velké nadpisy), #8FA6FF (malý modrý text na tmavém – kvůli kontrastu nikdy nepoužívat #2F5BFF pro drobný text na černé). Fonty: Bebas Neue (nadpisy, velkými písmeny) a Inter (text). Prvky: mřížka v pozadí, šikmý modrý pás s obory (marquee), číslované sekce 01–07, celomodrá sekce „Jak to probíhá“, velký nápis FAJNE WEBY v patičce. Animace respektují prefers-reduced-motion. Texty česky, vykat návštěvníkovi, nic si nevymýšlet (žádné smyšlené reference, roky praxe ani počty klientů).

## Pracovní postup

Po každé změně:

```bash
git add -A
git commit -m "Popis změny"
git push
npx wrangler deploy
```

Potom otevřít živou adresu a ověřit, že změna funguje (desktop i šířka 375 px).

Pomocné nástroje (Playwright na screenshoty, sharp na zmenšení obrázků) instalovat mimo projekt nebo jen dočasně – nesmí skončit v `public/` ani v commitu (`node_modules/` je v `.gitignore`).

## Přidání nové ukázky nebo skutečné zakázky do portfolia

1. Ověř, že web živě funguje (např. `https://<repo>.polakondrej14.workers.dev/`).
2. Udělej screenshot desktop 1440×900 (Playwright), zmenši na šířku 1200 px a ulož jako WebP do `public/images/<nazev>.webp`. Pro mobilní náhled v hero případně 390×844 → `<nazev>-mobil.webp`.
3. V `public/index.html` v sekci `#ukazky` zkopíruj jeden `<article class="work">` a uprav: odkaz (2×, `target="_blank" rel="noopener"`), obrázek, štítek `work__tag` (obor · město), název, 1–2 věty co web umí a skrytý text `sr-only` u tlačítka.
4. Skutečnou zakázku dej na začátek mřížky. U fiktivních ukázek platí poznámka pod mřížkou; až budou skutečné zakázky, uprav text poznámky (např. „Část projektů jsou ukázky fiktivních podniků“). Reference zákazníka přidávej jen se souhlasem a skutečnými slovy klienta.
5. Mřížka má 3 sloupce na desktopu, 2 na tabletu (≤ 1020 px) a 1 na mobilu (≤ 680 px). Počet karet drž tak, aby žádná nevisela sama (ideálně 6, 9…, případně 4 → zvaž úpravu sloupců). Screenshoty mají všechny stejný poměr 1200×750 a podobnou velikost (cca 40–50 kB, kvalitu WebP dolaď podle obsahu).
6. Commit, push, `npx wrangler deploy` a kontrola živého webu.

Ukázky v portfoliu (pořadí): Ostrá břitva, Vodafix Kovář, Pohyb bez bolesti, Fit s Tomášem, Penzion U Tří lip (`u-tri-lip-web`, Vysočina), Kavárna U Zrnka (`uzrnka-web`, soukromý repozitář, Opava). Všechny běží na `https://<repo>.polakondrej14.workers.dev`.

## Fotka

`public/images/ondrej-polak.webp` (sekce O mně) i `public/images/og.jpg` vznikly z Ondřejovy vlastní fotky `foto.jpg` (ořez 4:5, šířka 800 px, WebP). Na webu nesmí být nikdy stocková fotka cizího člověka podepsaná jeho jménem. Až vložím do složky foto.jpg, nahraď placeholder mou skutečnou fotkou – tzn. když se `foto.jpg` změní (nebo by fotka chyběla a byl použit placeholder s iniciálami „OP“), vygeneruj z ní znovu `ondrej-polak.webp` a OG obrázek.

## Ceny – jednotné formulace

Všechny ceny jsou „od …“. Nikde nepsat „konečné ceny“. Platí: přesnou cenu řeknu předem (po první schůzce) a už se nezmění; jiná může být jen tehdy, když si klient později sám řekne o něco navíc. Totéž držet v hero, ceníku, FAQ, meta description i ve strukturovaných datech (`priceSpecification.minPrice`).
