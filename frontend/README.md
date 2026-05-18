# doclegal-demo · frontend

Prototype web app for KAN-4: generate a Mutual NDA from a form and download it as a PDF.

Tech stack: Next.js 14 (app router) · TypeScript · Tailwind CSS · `html2pdf.js` for client-side PDF.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Layout

- `app/` — Next.js app router entry (`layout.tsx`, `page.tsx`, `globals.css`)
- `components/`
  - `NDAForm.tsx` — controlled form for every cover-page variable
  - `NDAPreview.tsx` — live preview that mirrors the Common Paper Mutual NDA
  - `DownloadButton.tsx` — uses `html2pdf.js` to render the preview to a PDF
- `lib/nda-types.ts` — `FormValues` type and helpers (default values, date formatting, term description)

The NDA source template lives at the repo root in `templates/Mutual-NDA.md` and `templates/Mutual-NDA-coverpage.md` (CC BY 4.0, attributed to [Common Paper](https://github.com/CommonPaper/Mutual-NDA)). The TypeScript preview component reproduces that content with the user&rsquo;s values interpolated.

## Notes

- All PDF generation runs in the browser — no server-side rendering required.
- The preview element (`#nda-preview`) is what gets converted to PDF. Styling lives in `app/globals.css` under the `.nda-doc` class so the on-screen and downloaded versions look the same.
