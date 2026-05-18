'use client';

import { useState } from 'react';

type Props = {
  targetId: string;
  party1Company?: string;
  party2Company?: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 40);
}

function buildFilename(p1?: string, p2?: string): string {
  const parts = [slugify(p1 ?? ''), slugify(p2 ?? '')].filter(Boolean);
  const stem = parts.length ? `Mutual-NDA-${parts.join('-and-')}` : 'Mutual-NDA';
  return `${stem}.pdf`;
}

export function DownloadButton({ targetId, party1Company, party2Company }: Props) {
  const [busy, setBusy] = useState(false);

  const download = async () => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById(targetId);
    if (!el) return;
    setBusy(true);
    try {
      const mod = await import('html2pdf.js');
      const html2pdf = (mod as { default: (...args: unknown[]) => Html2PdfChain }).default;
      await html2pdf()
        .from(el)
        .set({
          filename: buildFilename(party1Company, party2Company),
          margin: [0.5, 0.5, 0.5, 0.5],
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        })
        .save();
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={download}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {busy ? 'Preparing PDF…' : 'Download PDF'}
    </button>
  );
}

type Html2PdfChain = {
  from: (el: HTMLElement) => Html2PdfChain;
  set: (opts: Record<string, unknown>) => Html2PdfChain;
  save: () => Promise<void>;
};
