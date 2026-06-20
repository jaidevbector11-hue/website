# New Look Mowing & Landscaping — Website

A modern, fast, mobile-friendly marketing website for **New Look Mowing & Landscaping**,
a family-owned landscaping and lawn care business in **Bethlehem, PA** (serving since 2007).

The site is built as a lightweight, dependency-free static site (HTML + CSS + a little
JavaScript), so it loads fast, ranks well, and can be hosted anywhere for free.

## 📁 Files

| File | Purpose |
|------|---------|
| `index.html` | All page content + local-SEO structured data |
| `styles.css` | Styling, layout, and responsive/mobile design |
| `script.js`  | Mobile menu, scroll animations, and the quote form |
| `google-apps-script.gs` | Backend for the quote form (Sheet + email alerts) — paste into Apps Script |
| `images/`    | Drop project photos here for the gallery (see `images/README.md`) |

## 🌿 Features

- **Conversion-focused** — sticky "Call Now" button, click-to-call/text links everywhere,
  and a sticky bottom call bar on phones.
- **Quote request form** that works out of the box (see below).
- **Mobile-first responsive** design that looks great on any screen.
- **Local SEO ready** — page title, meta description, Open Graph tags, and
  `LandscapingBusiness` [structured data](https://schema.org/LandscapingBusiness)
  so Google understands the business, location, and services.
- **Accessible** — semantic HTML, skip link, keyboard-friendly menu, and
  reduced-motion support.
- **Self-contained** — no build step, no frameworks, no image downloads required.

## 🚀 Publish it (free options)

Pick any one — no build step is needed.

- **GitHub Pages:** push this repo, then in **Settings → Pages**, set the source to your
  branch / root. Your site goes live at `https://<user>.github.io/<repo>/`.
- **Netlify / Vercel / Cloudflare Pages:** drag-and-drop the folder, or connect the repo.
- **Any web host:** upload `index.html`, `styles.css`, and `script.js` to the web root.

## 📨 Quote form / where leads go

The form posts submissions to a **Google Sheet** via a free **Google Apps Script**
web app (no third-party service). The script (`google-apps-script.gs`) does three
things on every submission:

1. Appends a row to the Sheet — **Timestamp, Name, Phone, Email, Address, Service, Details**
2. Emails **you** (`jaidevbector11@gmail.com`) an alert, with reply-to set to the customer
3. Emails the **customer** a "we received your request" confirmation

The visitor sees an inline *"Thanks, …! Your request was sent."* confirmation.

**Wiring:** the deployed script's `/exec` URL goes in the `action="…"` of
`<form id="quote-form">` in `index.html`. Setup/redeploy steps are in the header
comment of `google-apps-script.gs`.

> Because Apps Script returns an opaque (CORS) response, the success message is shown
> optimistically — the Google Sheet is the source of truth. If the endpoint is ever
> blank/unreachable, `script.js` falls back to a pre-filled text/email to
> `(646) 824-0022` / `jaidevbector11@gmail.com`, so a lead is never silently lost.

## ✏️ Updating content

Everything is plain text in `index.html`:

- **Phone number:** search for `6468240022` (used in `tel:`/`sms:` links and on-page text).
- **Email:** search for `jaidevbector11@gmail.com`.
- **Services, About, Reviews:** edit the text inside the matching `<section>`.
- **Add real reviews:** duplicate a `<figure class="review">` block and edit the quote.

### Gallery photos

The **Our Work** gallery shows polished colored placeholders until you add photos.
Drop your real project pictures into `images/` named `gallery-1.jpg` … `gallery-6.jpg`
and they appear automatically — see `images/README.md` for the per-tile mapping.

### Service-area map

The map under **Service Area** is a keyless Google Maps embed centered on Bethlehem, PA.
To recenter it, edit the `q=Bethlehem,Pennsylvania` part of the `<iframe src>` in the
`#area` section of `index.html`.

### Brand colors

Colors live as CSS variables at the top of `styles.css` under `:root`
(`--green-600` is the main brand green, `--amber-500` is the call-to-action color).

---

© New Look Mowing & Landscaping · Bethlehem, Pennsylvania · Established 2007
