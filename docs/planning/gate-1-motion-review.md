# Gate 1 motion revision: acceptance and review

Status: implementation in progress, 27 September 2026. Candidate C will be
compared with the preserved A/B previews. No human preference has been recorded.

## Declared acceptance cases

| Case | Expected observable outcome | Result |
| --- | --- | --- |
| Normal desktop 1920×1080 | Course orientation, scene, controls and course links readable; no horizontal overflow | Pending |
| Phone 390×844 | Orientation before illustration; useful touch targets and normal document scrolling | Pending |
| Chapter selection with pointer and keyboard | Selected control/panel agree; arrows/Home/End behave correctly; link to chosen week works | Pending |
| Scene view and rotate controls | World/citadel/settlement views differ meaningfully; buttons retain focus; canvas does not trap page scrolling | Pending |
| Pause and resume | Nonessential motion stops while the rest of the page remains usable; resumes only on request | Pending |
| Reduced motion, initial and changed while open | No ambient/camera/reveal animation; state changes and navigation still work | Pending |
| Menu navigation then resize | Menu state, target visibility and focus remain correct | Pending |
| JavaScript disabled | Course text, source links, all chapter content and useful static artwork remain available | Pending |
| Scene module unavailable | Static artwork/content survive; remaining interactions continue | Pending |
| Slow connection | Course does not wait for the illustration to become usable | Pending |
| Leave/return to the page and offscreen scene | No duplicate scene or stale disposed callbacks; loop suspension checked at supported evidence level | Pending |
| Build and outgoing diff | No new type/build/accessibility/link regression; packages and outgoing files intentional | Pending |

Run the real browser cases against production preview. Record actual viewport
sizes rather than assuming a new tab inherits an earlier override. Keep browser
emulation and request-blocking scoped to the test tab and reset it afterwards.
Screenshots show a state; they do not establish animation smoothness or frame-rate
performance. Do not claim those properties without corresponding measurements.

## Comparison question

Does the new inspectable scene and chapter explorer make the historical premise
more engaging while leaving course orientation and weekly navigation clear?
Compare the same course proposition with static A/B. The user's actual judgement
will decide the direction; model review supplies findings to check, not that answer.

## Remaining scope

Full teaching units, revised catalogue metadata, real course decks, final media,
PROCESS.md and public shipping are still later work. Existing twelve-week data
coverage and submission-evidence failures are not hidden by the new preview.
