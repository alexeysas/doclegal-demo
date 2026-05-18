'use client';

import {
  describeConfidentialityTerm,
  describeMndaTerm,
  formatDateLong,
  type FormValues,
} from '@/lib/nda-types';

type Props = {
  id: string;
  values: FormValues;
};

export function NDAPreview({ id, values }: Props) {
  const v = (text: string) => (
    <span className="nda-var">{text.trim() ? text : '___'}</span>
  );
  const effectiveDate = formatDateLong(values.effectiveDate);
  const governingLaw = values.governingLawState.trim();
  const jurisdiction = values.jurisdiction.trim();
  const purpose = values.purpose.trim();

  return (
    <div id={id} className="nda-doc px-2">
      <h1>Mutual Non-Disclosure Agreement</h1>

      <h2>Cover Page</h2>
      <p>
        This Mutual Non-Disclosure Agreement (the &ldquo;MNDA&rdquo;) consists of: (1) this Cover
        Page and (2) the Common Paper Mutual NDA Standard Terms Version 1.0, identical to those
        posted at commonpaper.com/standards/mutual-nda/1.0. Any modifications of the Standard
        Terms should be made on this Cover Page, which will control over conflicts with the
        Standard Terms.
      </p>

      <h3>Purpose</h3>
      <p>{v(purpose)}</p>

      <h3>Effective Date</h3>
      <p>{v(effectiveDate)}</p>

      <h3>MNDA Term</h3>
      <p>{v(describeMndaTerm(values))}</p>

      <h3>Term of Confidentiality</h3>
      <p>{v(describeConfidentialityTerm(values))}</p>

      <h3>Governing Law &amp; Jurisdiction</h3>
      <p>
        Governing Law: {v(governingLaw)}
        <br />
        Jurisdiction: {v(jurisdiction)}
      </p>

      <h3>MNDA Modifications</h3>
      <p>{values.modifications.trim() ? values.modifications : <span className="nda-var">None.</span>}</p>

      <p>
        By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective
        Date.
      </p>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Party 1</th>
            <th>Party 2</th>
          </tr>
        </thead>
        <tbody>
          <PartyRow label="Signature" left="" right="" />
          <PartyRow label="Print name" left={values.party1.name} right={values.party2.name} />
          <PartyRow label="Title" left={values.party1.title} right={values.party2.title} />
          <PartyRow label="Company" left={values.party1.company} right={values.party2.company} />
          <PartyRow
            label="Notice address"
            left={values.party1.noticeAddress}
            right={values.party2.noticeAddress}
          />
          <PartyRow
            label="Date"
            left={formatDateLong(values.party1.date)}
            right={formatDateLong(values.party2.date)}
          />
        </tbody>
      </table>

      <h2>Standard Terms</h2>
      <StandardTerms values={values} governingLaw={governingLaw} jurisdiction={jurisdiction} purpose={purpose} />

      <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#6b7280' }}>
        Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use under CC BY 4.0
        (https://creativecommons.org/licenses/by/4.0/).
      </p>
    </div>
  );
}

function PartyRow({ label, left, right }: { label: string; left: string; right: string }) {
  const cell = (text: string) =>
    text.trim() ? <span>{text}</span> : <span className="nda-var">___</span>;
  return (
    <tr>
      <td className="font-medium">{label}</td>
      <td>{cell(left)}</td>
      <td>{cell(right)}</td>
    </tr>
  );
}

function StandardTerms({
  values,
  governingLaw,
  jurisdiction,
  purpose,
}: {
  values: FormValues;
  governingLaw: string;
  jurisdiction: string;
  purpose: string;
}) {
  const variable = (text: string) => <span className="nda-var">{text || '___'}</span>;
  return (
    <ol>
      <li>
        <strong>Introduction.</strong> This Mutual Non-Disclosure Agreement (which incorporates
        these Standard Terms and the Cover Page) allows each party (&ldquo;Disclosing Party&rdquo;)
        to disclose or make available information in connection with the {variable(purpose)} which
        (1) the Disclosing Party identifies to the receiving party (&ldquo;Receiving
        Party&rdquo;) as &ldquo;confidential&rdquo;, &ldquo;proprietary&rdquo;, or the like or (2)
        should be reasonably understood as confidential or proprietary due to its nature and the
        circumstances of its disclosure (&ldquo;Confidential Information&rdquo;). Each party&rsquo;s
        Confidential Information also includes the existence and status of the parties&rsquo;
        discussions and information on the Cover Page. Confidential Information includes technical
        or business information, product designs or roadmaps, requirements, pricing, security and
        compliance documentation, technology, inventions and know-how.
      </li>
      <li>
        <strong>Use and Protection of Confidential Information.</strong> The Receiving Party
        shall: (a) use Confidential Information solely for the {variable(purpose)}; (b) not
        disclose Confidential Information to third parties without the Disclosing Party&rsquo;s
        prior written approval, except that the Receiving Party may disclose Confidential
        Information to its employees, agents, advisors, contractors and other representatives
        having a reasonable need to know for the {variable(purpose)}, provided these
        representatives are bound by confidentiality obligations no less protective of the
        Disclosing Party than the applicable terms in this MNDA and the Receiving Party remains
        responsible for their compliance with this MNDA; and (c) protect Confidential Information
        using at least the same protections the Receiving Party uses for its own similar
        information but no less than a reasonable standard of care.
      </li>
      <li>
        <strong>Exceptions.</strong> The Receiving Party&rsquo;s obligations in this MNDA do not
        apply to information that it can demonstrate: (a) is or becomes publicly available
        through no fault of the Receiving Party; (b) it rightfully knew or possessed prior to
        receipt from the Disclosing Party without confidentiality restrictions; (c) it rightfully
        obtained from a third party without confidentiality restrictions; or (d) it independently
        developed without using or referencing the Confidential Information.
      </li>
      <li>
        <strong>Disclosures Required by Law.</strong> The Receiving Party may disclose
        Confidential Information to the extent required by law, regulation or regulatory
        authority, subpoena or court order, provided (to the extent legally permitted) it
        provides the Disclosing Party reasonable advance notice of the required disclosure and
        reasonably cooperates, at the Disclosing Party&rsquo;s expense, with the Disclosing
        Party&rsquo;s efforts to obtain confidential treatment for the Confidential Information.
      </li>
      <li>
        <strong>Term and Termination.</strong> This MNDA commences on the{' '}
        {variable(formatDateLong(values.effectiveDate))} and expires at the end of the{' '}
        {variable(describeMndaTerm(values))} Either party may terminate this MNDA for any or no
        reason upon written notice to the other party. The Receiving Party&rsquo;s obligations
        relating to Confidential Information will survive for the{' '}
        {variable(describeConfidentialityTerm(values))} despite any expiration or termination of
        this MNDA.
      </li>
      <li>
        <strong>Return or Destruction of Confidential Information.</strong> Upon expiration or
        termination of this MNDA or upon the Disclosing Party&rsquo;s earlier request, the
        Receiving Party will: (a) cease using Confidential Information; (b) promptly after the
        Disclosing Party&rsquo;s written request, destroy all Confidential Information in the
        Receiving Party&rsquo;s possession or control or return it to the Disclosing Party; and
        (c) if requested by the Disclosing Party, confirm its compliance with these obligations
        in writing. As an exception to subsection (b), the Receiving Party may retain
        Confidential Information in accordance with its standard backup or record retention
        policies or as required by law, but the terms of this MNDA will continue to apply to the
        retained Confidential Information.
      </li>
      <li>
        <strong>Proprietary Rights.</strong> The Disclosing Party retains all of its intellectual
        property and other rights in its Confidential Information and its disclosure to the
        Receiving Party grants no license under such rights.
      </li>
      <li>
        <strong>Disclaimer.</strong> ALL CONFIDENTIAL INFORMATION IS PROVIDED &ldquo;AS IS&rdquo;,
        WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE,
        MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
      </li>
      <li>
        <strong>Governing Law and Jurisdiction.</strong> This MNDA and all matters relating
        hereto are governed by, and construed in accordance with, the laws of the State of{' '}
        {variable(governingLaw)}, without regard to the conflict of laws provisions of such{' '}
        {variable(governingLaw)}. Any legal suit, action, or proceeding relating to this MNDA
        must be instituted in the federal or state courts located in {variable(jurisdiction)}.
        Each party irrevocably submits to the exclusive jurisdiction of such{' '}
        {variable(jurisdiction)} in any such suit, action, or proceeding.
      </li>
      <li>
        <strong>Equitable Relief.</strong> A breach of this MNDA may cause irreparable harm for
        which monetary damages are an insufficient remedy. Upon a breach of this MNDA, the
        Disclosing Party is entitled to seek appropriate equitable relief, including an
        injunction, in addition to its other remedies.
      </li>
      <li>
        <strong>General.</strong> Neither party has an obligation under this MNDA to disclose
        Confidential Information to the other or proceed with any proposed transaction. Neither
        party may assign this MNDA without the prior written consent of the other party, except
        that either party may assign this MNDA in connection with a merger, reorganization,
        acquisition or other transfer of all or substantially all its assets or voting
        securities. Any assignment in violation of this Section is null and void. This MNDA will
        bind and inure to the benefit of each party&rsquo;s permitted successors and assigns.
        Waivers must be signed by the waiving party&rsquo;s authorized representative and cannot
        be implied from conduct. If any provision of this MNDA is held unenforceable, it will be
        limited to the minimum extent necessary so the rest of this MNDA remains in effect. This
        MNDA (including the Cover Page) constitutes the entire agreement of the parties with
        respect to its subject matter, and supersedes all prior and contemporaneous
        understandings, agreements, representations, and warranties, whether written or oral,
        regarding such subject matter. This MNDA may only be amended, modified, waived, or
        supplemented by an agreement in writing signed by both parties. Notices, requests and
        approvals under this MNDA must be sent in writing to the email or postal addresses on the
        Cover Page and are deemed delivered on receipt. This MNDA may be executed in
        counterparts, including electronic copies, each of which is deemed an original and which
        together form the same agreement.
      </li>
    </ol>
  );
}

