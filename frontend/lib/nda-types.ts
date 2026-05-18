export type PartyValues = {
  company: string;
  name: string;
  title: string;
  noticeAddress: string;
  date: string;
};

export type FormValues = {
  purpose: string;
  effectiveDate: string;
  mndaTermMode: 'years' | 'untilTerminated';
  mndaTermYears: number;
  confidentialityMode: 'years' | 'perpetuity';
  confidentialityYears: number;
  governingLawState: string;
  jurisdiction: string;
  modifications: string;
  party1: PartyValues;
  party2: PartyValues;
};

const today = (): string => new Date().toISOString().slice(0, 10);

export const defaultFormValues: FormValues = {
  purpose: 'Evaluating whether to enter into a business relationship with the other party.',
  effectiveDate: today(),
  mndaTermMode: 'years',
  mndaTermYears: 1,
  confidentialityMode: 'years',
  confidentialityYears: 1,
  governingLawState: 'Delaware',
  jurisdiction: 'New Castle County, Delaware',
  modifications: '',
  party1: { company: '', name: '', title: '', noticeAddress: '', date: today() },
  party2: { company: '', name: '', title: '', noticeAddress: '', date: today() },
};

export function formatDateLong(isoDate: string): string {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function describeMndaTerm(values: FormValues): string {
  if (values.mndaTermMode === 'untilTerminated') {
    return 'Continues until terminated in accordance with the terms of the MNDA.';
  }
  const n = Math.max(0, values.mndaTermYears || 0);
  return `Expires ${n} year${n === 1 ? '' : 's'} from the Effective Date.`;
}

export function describeConfidentialityTerm(values: FormValues): string {
  if (values.confidentialityMode === 'perpetuity') {
    return 'In perpetuity.';
  }
  const n = Math.max(0, values.confidentialityYears || 0);
  return `${n} year${n === 1 ? '' : 's'} from the Effective Date, but in the case of trade secrets until the Confidential Information is no longer considered a trade secret under applicable laws.`;
}
