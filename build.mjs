import { readFile, writeFile } from 'node:fs/promises';

const htmlPath = new URL('./index.html', import.meta.url);
const figuresPath = new URL('./figure-manifest.json', import.meta.url);
const on = process.env.SHOW_COHORT_DATES === 'true';
let html = await readFile(htmlPath, 'utf8');
const manifest = JSON.parse(await readFile(figuresPath, 'utf8'));

const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const dates = on ? [process.env.COHORT_OPEN_DATE, process.env.COHORT_CLOSE_DATE, process.env.COHORT_KICKOFF_DATE] : [];
if (on && dates.some(value => !value || !value.trim())) {
  throw new Error('Confirmed COHORT_OPEN_DATE, COHORT_CLOSE_DATE and COHORT_KICKOFF_DATE are required with SHOW_COHORT_DATES=true');
}
html = html.replace(/data-dates="(?:on|off)"/, `data-dates="${on ? 'on' : 'off'}"`);
const datesMarkup = on ? `<p>Enrolment opens ${escapeHtml(dates[0])} and closes ${escapeHtml(dates[1])} at 23:59 UTC or when the 30 places are filled. The cohort kicks off ${escapeHtml(dates[2])}.</p>` : '';
html = html.replace(/(<div id="cohort-dates-slot">)[\s\S]*?(<\/div>)/, `$1${datesMarkup}$2`);
const destination = on ? process.env.COHORT_CHECKOUT_URL : process.env.COHORT_LIST_URL;
const actionLabel = on ? 'Reserve my founding place' : 'Join the founding cohort list';
const action = destination ? `<a class="button cohort-action" href="${escapeHtml(destination)}">${actionLabel}</a>` : `<button class="button cohort-action" type="button" aria-disabled="true">${actionLabel}</button>`;
html = html.replace(/(<div id="price-action-group">)[\s\S]*?(?=<p class="action-caption">)/, `$1${action}`);

for (const [key, figure] of Object.entries(manifest.figures)) {
  const placeholder = `${figure.subject}. Australian teaching example. ${figure.missing ? 'Asset and permission pending.' : 'Permission pending.'}`;
  const ready = figure.permission === 'approved' && manifest.captureMonthConfirmed && figure.asset;
  const frame = ready ? `<img src="${escapeHtml(figure.asset)}" alt="${escapeHtml(figure.alt)}" loading="lazy"><figcaption><span>${escapeHtml(manifest.captionPrefix)}</span><span>${escapeHtml(figure.captionSuffix)}</span></figcaption>` : `<div class="figure-placeholder">${escapeHtml(placeholder)}</div>`;
  const pattern = new RegExp(`(<figure class="teaching-figure figure-${key}" data-figure="${key}" data-permission=")[^"]+("[^>]*>)[\\s\\S]*?(<\\/figure>)`);
  html = html.replace(pattern, `$1${ready ? 'approved' : 'pending'}$2${frame}$3`);
}
await writeFile(htmlPath, html);
console.log(`Built site/index.html with SHOW_COHORT_DATES=${on}`);
