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
web app. Paste your script's `/exec` URL into the `action="…"` of
`<form id="quote-form">` in `index.html`. Each submission appends a row
(Timestamp, Name, Phone, Address, Service, Details) to the Sheet, and the visitor
sees an inline *"Thanks, …! Your request was sent."* confirmation.

> Until a real endpoint is set in `action`, `script.js` automatically falls back to
> opening a pre-filled text/email to `(646) 824-0022` / `jaidevbector11@gmail.com`,
> so a lead is never silently lost.

## ✏️ Updating content

Everything is plain text in `index.html`:

- **Phone number:** search for `6468240022` (used in `tel:`/`sms:` links and on-page text).
- **Email:** search for `jaidevbector11@gmail.com`.
- **Services, About, Reviews:** edit the text inside the matching `<section>`.
- **Add real reviews:** duplicate a `<figure class="review">` block and edit the quote.

### Want real photos?

The design uses clean illustrations so it always renders perfectly. To feature real
project photos (lawns, patios, tree work), add your images to the repo and either set
them as section backgrounds in `styles.css` or drop `<img>` tags into the relevant
sections. Photos of your actual work convert best.

### Brand colors

Colors live as CSS variables at the top of `styles.css` under `:root`
(`--green-600` is the main brand green, `--amber-500` is the call-to-action color).

---

© New Look Mowing & Landscaping · Bethlehem, Pennsylvania · Established 2007
