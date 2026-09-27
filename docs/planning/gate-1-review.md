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

## Verified refinements

The shared opening now states the fictional teaching frame and entry requirements
before the illustration or semester route. At 390×844 the complete paragraph is
within the first screen: A approximately y=451–556, B y=399–505. The hook now asks
"Why would anyone log in again?" instead of asserting that a single crisis ended
all difficulties. The week-one question refers to the historical Full-Dive promise.
The Ordinal Scale synopsis link is labelled for AR, which that page directly covers.

The new page-local navigation handler uses the existing theme toggle. Actual
browser cases:

| Case | Observed result |
| --- | --- |
| A, 390×844, keyboard open then Tab through Course/Weeks/Assessment and Enter | Menu collapsed; focus and URL hash reached assessment; wrapper became inert |
| A, destination after scroll settled | Navigation bottom about y=90; assessment heading about y=138, visibly below it |
| A, Escape while menu has focus | Menu collapsed and focus returned to Menu |
| B, 390×844, pointer-select Twelve weeks | Menu collapsed; focus and hash reached weeks; all twelve outline rows present |
| B, select the final semester section | Hash reached legacies and the Ordinal Scale question was present |
| Open mobile menu, resize through 800 and 1920, return to 390 | Navigation remained available at desktop widths; no horizontal overflow in the inspected states |
| A, open menu, resize 390 -> 800 -> 390, press Escape after focus moved to BODY | A follow-up defect was reproduced with the nav-scoped handler. After moving only Escape handling to document with the existing mobile/open guard, menu collapsed, wrapper became inert and focus returned to Menu |
| A and B, exact desktop and phone sizes | Visual inspection and width measurements completed; no horizontal overflow found |
| Inspected tabs, warning/error console query | No entries returned |

The independent reviewer checked the follow-up diff and the final Escape-listener
scope; no actionable defect was reported. It explicitly withdrew the unconfirmed
heading-occlusion claim. The parent ran the browser checks rather than treating
that review as execution evidence.

The browser's new tab initially used 1280×720 despite a previous tab's override.
The actual viewport was measured, reset to 1920×1080 and measured again before the
final B desktop capture. Screenshot labels refer to verified sizes.

Final `pnpm check`: exit 1, four passed / one existing twelve-week-coverage failure.
Typecheck had zero errors/warnings/hints; production accessibility, base paths,
internal links and deck structure passed. Local log:
`/tmp/a2-gate1-final-5h32ccho.log`. `pnpm check:evidence` also remains red for actual
starter material/images and PROCESS.md's unfilled template/sample citations.

CLAUDE.md now asks for destination visibility, focus and mobile-menu-state checks
when navigation stays on a page. This is the compact reusable lesson from this
observed failure; implementation details and measurements remain here.

## Human review package

- A: `http://127.0.0.1:4321/comp4020-ass2-Naaeeen/review/a/`
- B: `http://127.0.0.1:4321/comp4020-ass2-Naaeeen/review/b/`
- [Dated course map](course-map.md) and [detailed goals](implementation-goals.md).
- Parent recommendation: A's archival visual direction fits the historical premise;
  its first-screen course orientation is now explicit. B offers earlier semester
  navigation. This recommendation is editorial judgement, not measured preference.

The university crest retains its inherited link to the starter root page. Use the
A/B switcher to compare these unlisted prototypes. The selected direction will
become the actual homepage after feedback. Production course metadata and weekly
content are still the starter; the preview's twelve outline rows do not satisfy
the twelve authored session requirement. Slow-network and complete-course testing
remain for later gates. No deployment has been attempted.

Status: Gate 1 ready for human review. No user preference has yet been recorded.
Do not start Gate 2 until that feedback arrives.
