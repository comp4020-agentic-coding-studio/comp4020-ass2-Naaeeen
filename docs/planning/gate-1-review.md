# Gate 1 review record

Date: 27 September 2026. Scope: unlisted `/review/a/` and `/review/b/` prototypes.
These pages do not replace the catalogue record or complete the teaching units.

## First implementation

A uses an archival title and original floating-plateau illustration. B brings
three semester sections forward. Both render one shared content dataset. Neither
contains a new external media download or a changed platform configuration.

`pnpm check` on the first implementation: exit 1. Typecheck: zero errors, warnings
or hints. Production build: 18 pages, no reported accessibility violations or
broken internal links. Spec: four pass, one fails for the existing weeks [1, 2]
coverage gap. Full log: local `/tmp/a2-gate1-check-wm3chymm.log`.

Actual Chromium browser at 1920×1080 and 390×844:

- Both desktop alternatives load. The archival title and image are prominent in A;
  B exposes the three course sections earlier. This is an observation, not a user
  preference result.
- On mobile A, the central-question heading starts around y=1071 and prerequisite
  information around y=1495 on an 844px-tall viewport. The illustration delays
  basic orientation. Move the concise premise and prerequisites into the opening.
- Mobile navigation remains expanded after choosing Assessment. After scrolling
  settles, the navigation bottom is around y=297 and the assessment heading y=327.
  The reviewer predicted an obscured heading; that exact claim was not confirmed
  on this route. The retained menu still occupies substantial reading space and
  should close after selection. Focus was on BODY, not the destination.
- No error/warning console entries were returned for the inspected tab.

A read-only independent reviewer checked base-aware links, unlisted behavior,
platform preservation and the documentation. Its one actionable concern was the
mobile fragment-navigation behavior. The parent inspected the actual runtime
before accepting the finding and narrowed the claim to what was observed.

## Refinement to verify

Keep the site's ordinary navigation semantics; do not add a menu widget role.
Close an expanded mobile disclosure after an ordinary same-page link activation,
move focus to its target, and support Escape returning to the toggle. Reference:
[W3C disclosure navigation example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/).
The example informs semantics; our installed theme and actual browser determine
implementation. Recheck pointer, keyboard, resizing and both alternatives.

Human feedback: pending. No participant timing or preference has been measured.
