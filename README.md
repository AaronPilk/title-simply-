# Title Simply NC — Website

Full-service North Carolina title company site. Static, multi-page, no build step — just HTML, CSS, and vanilla JS. Apple-inspired design with floating dynamic cards, built on the Title Simply navy → teal brand.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero, values, why-us, stats, services preview |
| `services.html` | Residential & Land, Closing Services, Commercial + advantages |
| `homeowners.html` | Buyer/seller guidance, what title insurance is, coverage & exclusions |
| `contact.html` | Contact details + Order Title form |

## Structure
```
.
├── index.html · services.html · homeowners.html · contact.html
├── assets/
│   ├── css/styles.css      # full design system
│   ├── js/script.js        # reveals, card tilt, mobile nav, form
│   └── images/             # logo.png, icon.png, favicon.png
├── CNAME · robots.txt · sitemap.xml · .gitignore
```

## Before going live — swap the placeholders
Everything below is intentionally a clean placeholder:

- **Phone** — displayed as `(XXX) XXX-XXXX`, linked as `tel:+10000000000`. Find & replace both across all four HTML files.
- **Email** — `orders@titlesimplync.com` (update if you use a different inbox).
- **Order form** — currently a preview. Connect a destination in `assets/js/script.js` (see the `data-order-form` handler): Formspree, GoHighLevel webhook, or a serverless function.
- **Underwriter** — footer says "Backed by a national title underwriter." Replace with your actual underwriter/partner when confirmed.
- **Service area** — set to "all of North Carolina." Adjust if you also serve SC.

## Deploy
Static site — works anywhere.

- **GitHub Pages:** push to `main`, then Settings → Pages → deploy from `main` / root. The included `CNAME` points at `titlesimplync.com` — set your DNS A/CNAME records to GitHub Pages.
- **Vercel / Netlify / Cloudflare Pages:** import the repo, no build command, output = root.

## Brand
- Navy `#094584` · Blue `#126CA7` · Teal `#2DB4A5`
- Font: system (SF Pro / -apple-system) stack — no web-font dependency.
