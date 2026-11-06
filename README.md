# Siyakha Productions website

## Run locally
1. Open the folder in Visual Studio Code.
2. Install the "Live Server" extension, right-click `index.html`, choose "Open with Live Server".
   (Or double-click `index.html`.)

## Structure
- Five pages: index, about, technical-sound, printing, contact (all built).
- `css/style.css` - design tokens (top of file), layout, responsive rules and motion.
- `js/main.js` (menu, year) and `js/forms.js` (validation + submission).
- `assets/logos/siyakha-logo.jpg` - supplied logo, unaltered.
- `assets/images/` - add real photos here (file names are shown in each placeholder).

## Still needed
- Genuine photographs of Siyakha's work (hero, both divisions, portfolio).
- Verified phone, email, address and social links.
- Final domain (for canonical URL, Open Graph, sitemap).
- Form service decision for the contact page (e.g. Formspree or Web3Forms).

## Hero photos
Drop `assets/images/hero-sound.jpg` and `assets/images/hero-print.jpg` into place; they replace the built-in artwork on each side of the diagonal split automatically. Use your own photos or free-licence stock (e.g. Unsplash, Pexels). Keep a note of each source and licence, and don't present stock as Siyakha's own work.

## Contact form
In `contact.html`, replace `YOUR_FORM_ID` in the form's `data-endpoint` with your Formspree (or similar) form URL. Until then the form shows an honest "not connected" message and sends nothing.

## Before launch
Add the verified phone/email/address (footer + contact page), canonical URLs, an og:image, and a sitemap.xml (see robots.txt).
