'use client';

import { useState } from 'react';
import { NDAForm } from '@/components/NDAForm';
import { NDAPreview } from '@/components/NDAPreview';
import { DownloadButton } from '@/components/DownloadButton';
import { defaultFormValues, type FormValues } from '@/lib/nda-types';

const PREVIEW_ID = 'nda-preview';

export default function Page() {
  const [values, setValues] = useState<FormValues>(defaultFormValues);
  return (
    <main className="mx-auto max-w-screen-2xl px-6 py-8">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Mutual NDA Generator</h1>
          <p className="text-sm text-slate-600">
            Common Paper Mutual NDA v1.0 &mdash; fill the form, review the live preview, download as PDF.
          </p>
        </div>
        <DownloadButton
          targetId={PREVIEW_ID}
          party1Company={values.party1.company}
          party2Company={values.party2.company}
        />
      </header>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <NDAForm values={values} onChange={setValues} />
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <NDAPreview id={PREVIEW_ID} values={values} />
        </section>
      </div>
      <footer className="mt-8 text-center text-xs text-slate-500">
        Source template:{' '}
        <a
          className="underline hover:text-slate-700"
          href="https://github.com/CommonPaper/Mutual-NDA"
          target="_blank"
          rel="noreferrer"
        >
          github.com/CommonPaper/Mutual-NDA
        </a>{' '}
        &middot; CC BY 4.0
      </footer>
    </main>
  );
}
