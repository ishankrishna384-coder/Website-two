# Vexlyn Studio — Website

Static site, no build step required. Files:

- `index.html` — page structure and content
- `style.css` — all styling
- `script.js` — nav, FAQ accordion, lead form, chatbot
- `ishan.jpg` — founder photo (About section)

## Deploy on GitHub Pages

1. Create a new GitHub repo (or use an existing one).
2. Upload all four files above into the **root** of the repo — keep the filenames exactly as they are, since `index.html` links to `style.css`, `script.js` and `ishan.jpg` by those names.
3. Go to the repo's **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`.
5. Save — GitHub will give you a live URL within a minute or two. Connect your own domain from the same Pages settings screen once you're ready.

## Still open

- **Testimonials** — the section currently shows an honest "coming soon" placeholder, since the images sent alongside this request were WhatsApp/payment screenshots and a personal photo, not written testimonial quotes. Send the actual client quotes (name + what they said, at minimum) whenever you have them and they can be dropped straight in.
- **Instagram link** — footer currently says "link coming soon" since no handle/URL was given.
- **Project archive** — both "Featured Project" cards are intentionally left as placeholders, matching your original copy. If you want to feature a specific completed project (e.g. one of the clinic sites), send the business category, the challenge/solution, and the result you'd want shown, and it can replace a placeholder.
- The lead capture form saves submissions locally in the visitor's browser only — nothing is actually emailed or sent to you yet. Worth wiring to something like a Google Form, email service, or WhatsApp API before relying on it for real leads.
