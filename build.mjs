import { readFile, writeFile } from 'node:fs/promises';

// Set at build time. The committed review page and the default build omit dates.
const SHOW_COHORT_DATES = process.env.SHOW_COHORT_DATES === 'true';
const htmlPath = new URL('./index.html', import.meta.url);
let html = await readFile(htmlPath, 'utf8');

const variants = [
  {
    off: '$497, 30 places. 14 day refund, no questions asked.',
    on: '$497, 30 places, enrolment closes 15 October. 14 day refund, no questions asked.'
  },
  {
    off: 'Enrolment closes when they are filled. The next cohort price is $997. No payment plan, no subscription unless you choose one later.',
    on: 'Enrolment closes when they are filled or on 15 October, whichever comes first. The next cohort price is $997. No payment plan, no subscription unless you choose one later.'
  },
  {
    off: '30 founding places, $497 once, a path already walked, and people to walk it with.',
    on: '30 founding places, $497 once, a path already walked, and people to walk it with. Enrolment closes 15 October.'
  }
];

for (const { off, on } of variants) {
  const current = html.includes(on) ? on : off;
  if (!html.includes(current)) throw new Error(`Missing date copy: ${off}`);
  html = html.replace(current, SHOW_COHORT_DATES ? on : off);
}

await writeFile(htmlPath, html);
console.log(`Built site/index.html with SHOW_COHORT_DATES=${SHOW_COHORT_DATES}`);
