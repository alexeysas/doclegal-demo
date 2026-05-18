'use client';

import type { FormValues, PartyValues } from '@/lib/nda-types';

type Props = {
  values: FormValues;
  onChange: (next: FormValues) => void;
};

export function NDAForm({ values, onChange }: Props) {
  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    onChange({ ...values, [key]: value });
  };

  const updateParty = (party: 'party1' | 'party2', patch: Partial<PartyValues>) => {
    onChange({ ...values, [party]: { ...values[party], ...patch } });
  };

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <header>
        <h2 className="text-lg font-semibold">Agreement details</h2>
        <p className="text-sm text-slate-500">Fill in the cover-page variables. The preview updates as you type.</p>
      </header>

      <div>
        <label className="field-label" htmlFor="purpose">Purpose</label>
        <textarea
          id="purpose"
          rows={2}
          className="field-textarea"
          value={values.purpose}
          onChange={(e) => update('purpose', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="effective-date">Effective Date</label>
          <input
            id="effective-date"
            type="date"
            className="field-input"
            value={values.effectiveDate}
            onChange={(e) => update('effectiveDate', e.target.value)}
          />
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="field-label">MNDA Term</legend>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="mndaTermMode"
              checked={values.mndaTermMode === 'years'}
              onChange={() => update('mndaTermMode', 'years')}
            />
            Expires after
          </label>
          <input
            type="number"
            min={0}
            className="field-input w-24"
            value={values.mndaTermYears}
            disabled={values.mndaTermMode !== 'years'}
            onChange={(e) => update('mndaTermYears', Number(e.target.value))}
          />
          <span className="text-sm text-slate-600">year(s) from Effective Date</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="mndaTermMode"
              checked={values.mndaTermMode === 'untilTerminated'}
              onChange={() => update('mndaTermMode', 'untilTerminated')}
            />
            Continues until terminated
          </label>
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="field-label">Term of Confidentiality</legend>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="confidentialityMode"
              checked={values.confidentialityMode === 'years'}
              onChange={() => update('confidentialityMode', 'years')}
            />
            For
          </label>
          <input
            type="number"
            min={0}
            className="field-input w-24"
            value={values.confidentialityYears}
            disabled={values.confidentialityMode !== 'years'}
            onChange={(e) => update('confidentialityYears', Number(e.target.value))}
          />
          <span className="text-sm text-slate-600">year(s) from Effective Date</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="confidentialityMode"
              checked={values.confidentialityMode === 'perpetuity'}
              onChange={() => update('confidentialityMode', 'perpetuity')}
            />
            In perpetuity
          </label>
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="governing-law">Governing Law (state)</label>
          <input
            id="governing-law"
            className="field-input"
            placeholder="e.g. Delaware"
            value={values.governingLawState}
            onChange={(e) => update('governingLawState', e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="jurisdiction">Jurisdiction</label>
          <input
            id="jurisdiction"
            className="field-input"
            placeholder="e.g. New Castle County, Delaware"
            value={values.jurisdiction}
            onChange={(e) => update('jurisdiction', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="modifications">MNDA Modifications (optional)</label>
        <textarea
          id="modifications"
          rows={2}
          className="field-textarea"
          placeholder="List any modifications to the standard terms"
          value={values.modifications}
          onChange={(e) => update('modifications', e.target.value)}
        />
      </div>

      <PartyFieldset
        title="Party 1"
        party={values.party1}
        onChange={(patch) => updateParty('party1', patch)}
      />
      <PartyFieldset
        title="Party 2"
        party={values.party2}
        onChange={(patch) => updateParty('party2', patch)}
      />
    </form>
  );
}

function PartyFieldset({
  title,
  party,
  onChange,
}: {
  title: string;
  party: PartyValues;
  onChange: (patch: Partial<PartyValues>) => void;
}) {
  return (
    <fieldset className="rounded-md border border-slate-200 p-4">
      <legend className="px-2 text-sm font-semibold text-slate-700">{title}</legend>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="field-label">Company</label>
          <input
            className="field-input"
            value={party.company}
            onChange={(e) => onChange({ company: e.target.value })}
          />
        </div>
        <div>
          <label className="field-label">Print name</label>
          <input
            className="field-input"
            value={party.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </div>
        <div>
          <label className="field-label">Title</label>
          <input
            className="field-input"
            value={party.title}
            onChange={(e) => onChange({ title: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">Notice address (email or postal)</label>
          <input
            className="field-input"
            value={party.noticeAddress}
            onChange={(e) => onChange({ noticeAddress: e.target.value })}
          />
        </div>
        <div>
          <label className="field-label">Signature date</label>
          <input
            type="date"
            className="field-input"
            value={party.date}
            onChange={(e) => onChange({ date: e.target.value })}
          />
        </div>
      </div>
    </fieldset>
  );
}
