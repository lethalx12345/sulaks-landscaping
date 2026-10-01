# Sulak's Landscaping

Static marketing site for Sulak's Landscaping, Niles, MI.

Business: 1314 Barron Lake Rd, Niles, MI 49120 · (269) 462-1598 · Mon–Sun 7:00 AM–9:00 PM

## Structure

    index.html          all content, semantic sections
    css/style.css       design tokens, layout, responsive rules
    js/main.js          mobile nav, lightbox, quote-form validation
    assets/             full-size project photos + hero image
    assets/thumbs/      gallery thumbnails (lazy-loaded)

## Sections

1. Hero
2. Services
3. Recent Work — finished projects
4. On the Job — mid-project prep, grading, and drainage photos
5. Why Us / business details
6. Process
7. FAQ
8. Quote form

Photos open in a lightbox (Escape, the X, or a backdrop click closes it).

## Known gaps

- `js/main.js` mailto target is a placeholder: info@sulakslandscaping.com
  — replace with the real inbox.
- The quote form has no server; it composes an email in the visitor's mail client.
  Swap in a real form endpoint (Formspree, Netlify Forms, a small backend) if
  submissions need to arrive without an email client installed.
- The six services listed are a placeholder set pending confirmation.

## Run locally

    python3 -m http.server 8891

Then open http://127.0.0.1:8891/