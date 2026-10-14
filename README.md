# Temufy sales page v3 review build

Serve `site/` as a static web root. Run `node site/build.mjs` from the repository root for the committed dates off review page. Local fonts, scripts, diagrams and images are under `site/`. The page makes no external requests.

## Cohort state

The default build sets `data-dates="off"`, removes the dates line from the document and shows "Join the founding cohort list". To build the dates on state, set `SHOW_COHORT_DATES=true` and provide confirmed values for `COHORT_OPEN_DATE`, `COHORT_CLOSE_DATE` and `COHORT_KICKOFF_DATE`. The on build inserts those values into the approved sentence and shows "Reserve my founding place". Rebuild without the flag before committing a review page.

Configure separate `COHORT_LIST_URL` and `COHORT_CHECKOUT_URL` destinations when verified. Until configured, the relevant button is inert with `aria-disabled="true"`. Dates alone do not enable checkout.

## Teaching figures

`figure-manifest.json` keeps each subject, cropped asset, source crop, display width, alt text, caption suffix and permission status together. All permissions currently default to pending. The build renders plain placeholders. Even an approved asset stays hidden until `captureMonthConfirmed` is true. Confirm the source capture month and obtain written permission before changing either setting. The registration walkthrough and GMV Booster rules assets are missing. The settlement export masks all monetary values with opaque Ink and excludes buyer contact information.

## Release gates

The Risk Check form has `data-form="not-connected"`, no action endpoint and a type button that cannot submit. Connect it to a team reviewed destination and test delivery before external release. Confirm the publisher entity and working Terms, Privacy, Refunds and Affiliate disclosure links. Confirm the cohort dates, roster, list destination and checkout. Obtain Andrew's written approval for his name and any screen. Complete the FTC review of launch credit and promoter disclosure. These gates remain open in this review build.
