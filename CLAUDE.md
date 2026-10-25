# Polák Weby – portfolio web

Skutečný portfolio web Ondřeje Poláka (Ostrava, IČO 29589673, neplátce DPH). Nabízí tvorbu moderních webů pro živnostníky a malé podniky.

- Živě: https://ondrej-polak-weby-web.polakondrej14.workers.dev/
- GitHub: https://github.com/polakondrej14-del/ondrej-polak-weby-web
- Hosting: Cloudflare Workers (statické assety), konfigurace ve `wrangler.jsonc`

## Struktura

- `public/index.html` – celý web (jedna stránka, sekce: hero, ukázky, co dostanete, postup, ceník, o mně, FAQ, kontakt, patička)
- `public/styles.css` – styly (barvy a fonty v `:root`)
- `public/script.js` – menu, animace při scrollu, akordeon, validace formuláře a odeslání přes `mailto:`
- `public/images/` – screenshoty ukázek (WebP), fotka `ondrej-polak.webp`, OG obrázek `og.jpg` (1200×630)
- `public/favicon.svg`
- `foto.jpg` – originál fotky (není v `public/`, nezveřejňuje se jako asset)

Žádný build krok, čisté HTML/CSS/JS. Design: pozadí #FBFBF9, text #1A1A2E, akcent indigo #4F46E5 → fialová #7C3AED, fonty Plus Jakarta Sans (nadpisy) a Inter (text). Texty česky, vykat návštěvníkovi, nic si nevymýšlet (žádné smyšlené reference, roky praxe ani počty klientů).

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
5. Mřížka má 2 sloupce – při lichém počtu karet zvaž, jak to vypadá (případně přidej kartu „Váš web může být další“).
6. Commit, push, `npx wrangler deploy` a kontrola živého webu.

Web kavárny Novákova zahrada (repo `uzrnka-web`) do portfolia nepatří.
