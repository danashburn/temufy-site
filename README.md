# Temufy sales page review build

Serve `site/` as the static web root. The page makes no external requests. The five labelled HTML frames are placeholders for permission cleared photographs. The Andrew portrait, publisher entity, legal destinations, delivery claims and checkout are pending confirmation; this is a dark review build.

## Cohort dates

Run `node site/build.mjs` from the repository root to produce the default date omitted page. To produce the dated version, run `SHOW_COHORT_DATES=true node site/build.mjs`. This one build time flag controls all three date fragments in the generated HTML. Return to the default build before committing or distributing an undated page. The committed HTML is the undated build and remains correct without JavaScript.

## Checkout

The price card action is the anchor inside `#price-action-group` in `index.html`; it points to `#join`, the placeholder anchor above the card. Set its `href` to the verified checkout URL when checkout is ready. The hero, close and sticky actions point to `#price` so visitors can review the offer first.

## Assets

The Route C symbol and both lockups are copied from `brand/v3/`. Fonts and OFL notices are copied from `brand/v3/fonts/`; local WOFF2 versions were converted from those variable TTF files. `assets/fonts/` mirrors the WOFF2 files to retain the exact font URLs in the design token sheet. The five pending photographs use labelled HTML frames. No Temu artwork is used.

## Production register

- Confirm 22 recorded lessons, the blocker queue owner and the 2 business day response, and the 60 minute call roster.
- Obtain Andrew's written approval for his name and any replacement portrait; retain the labelled placeholder until then.
- Review the launch credit and promoter disclosure, plus the name and presentation with counsel.
- Confirm the publishing entity and create working Terms, Privacy, Refunds and Affiliate disclosure destinations.
- Set a real checkout URL, verify payment flow, and confirm the delivery roster and China cover before enabling dates.
