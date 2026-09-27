# Implementation research and decision record

Updated: 27 September 2026. Scope: After Aincrad, COMP4020 Assignment 2.
This is an English working record, updated when evidence changes a decision.
[Detailed goals](planning/implementation-goals.md) define the human review gates;
[PLAN.md](../PLAN.md) holds the current state. Research is evidence to evaluate,
not permission to change tools, settings or assignment requirements.

## Delivery position

The student traced their interest in computing to Sword Art Online. That gives
this course a specific question: why keep building and inhabiting virtual worlds
after their failures? A historical sequence can hold technical explanations,
ordinary relationships and institutional conflict together. A franchise recap
would describe what happened; each teaching week must also ask students to use
sources to explain a consequence or challenge an interpretation.

The first review compares two homepage treatments with the same outline. The
course remains a proposal until the student has reviewed its representative unit.
The public website is not yet complete. Review routes are explicitly marked and
unlisted; existing starter pages are not evidence of completed curriculum.

## What the assignment rewards

Primary authority: the live [A2 brief](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/)
and [assessment rubric](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/),
checked 27 September. A2 weights process 45%, artefact 20%, response 35%. The HD
bands call for corroborated decisions, robustness in use and a distinctive,
sustained response. They do not specify a number of research papers or agent runs.

| Contract | Where it will be realised | Verification |
| --- | --- | --- |
| Twelve dated teaching weeks | sessions collection and timetable | Distinct week numbers and date bounds in generated API; human review of progression |
| Course identity and assigned digits | course-config.ts | Existing schema and suffix test |
| Assessment weights total 100% | Three connected briefs, 20/30/50 | Generated API total; human workload/alignment review |
| Lecture links to a real deck | Representative unit, then chosen lecture set | Built lecture link, real deck route, actual slide reading |
| Fixed platform and Slop identity | Existing build, keys, API, crest and brand tokens | Diff inspection and build; no stack replacement |
| Replaced starter material | Authored content and course-specific artwork | Evidence gate plus direct reading |
| Usable at both marking sizes | All student journeys | Build accessibility checks plus browser at 1920×1080 and 390×844 |
| Account supported by history | PROCESS.md, CLAUDE.md, spec and commits | Real commit citations and student-confirmed reasoning |
| Public working submission | Course GitHub Pages URL | Verify deployed URL after explicit shipping authorization |

The supplied README and installed theme are the authority for local implementation
contracts. Astro is 7.2.x, university theme 0.13.2 and Slop theme 0.1.0 in the current
manifest/installation. No new dependency is needed for the first comparison.

## Course teaching: techniques to carry forward

These are the actual HTML lecture decks, not summaries of their titles.

| Primary course source | Evidence and application |
| --- | --- |
| [Week 3: Backpressure](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/lectures/week-3/) | Useful checks identify a particular defect and remain trustworthy. Verify production output and base paths. Do not add a test merely to increase the count. |
| [Week 4: Context engineering](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/lectures/week-4/) | Persistent guidance and on-demand procedures serve different needs. Keep current decisions in the plan and detailed research outside the standing harness. |
| [Week 5: Verification](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/lectures/week-5/) | Inspect actual runtime evidence and turn observed behavioral defects into appropriate regression checks. Keyboard use, screenshots and the console reveal different failures. |
| [Week 6: Evidence of practice](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/lectures/week-6/) | Trace decisions through history, then retain useful corrections and prune stale rules. The final A2 process account connects course-design choices to encoded rules and deliberate human judgement. |

Our extension of these ideas is project-specific: compare shared-content design
alternatives, independently inspect the evaluator, maintain adaptation-level
source provenance, and use actual human review to calibrate editorial and visual
judgements. This is a proposed workflow, not a measured claim that it exceeds all
classroom practice.

## Research beyond the course

| Source and evidence type | Finding used here | Limits and decision |
| --- | --- | --- |
| [Anthropic, Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents), engineering experiment | Incremental work, progress records and browser checks addressed observed agent failures. | Model/task-specific experience; use a representative teaching slice and compact handoffs, not an assumed universal initializer architecture. |
| [Anthropic, Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), engineering guidance | Deterministic, model and human judgements cover different properties; model judges need calibration. | A second model is not a student. Require evidence for review findings and retain the user's own decisions at each gate. |
| [Simon Willison, Agentic manual testing](https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/), practitioner account | Running and visually inspecting the result can expose gaps in automated tests; preserve demonstrated outcomes. | Adopt the method with existing browser tools, without installing the author's preferred utilities. |
| [W3C WAI, Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/), standards-body guidance | Titles, headings, image alternatives and keyboard access require examination of the real page. | These are preliminary checks, not a claim of full accessibility certification. |
| [Australian Government, plain language guide](https://www.stylemanual.gov.au/style-manual-resources/quick-guides/quick-guide-plain-language), editorial guidance | Put reader needs first, use familiar terms and make actions easy to identify. | Evaluate the student's task and comprehension, not a rigid sentence-length score. |
| [Kobak et al., excess vocabulary, v5](https://arxiv.org/abs/2406.07016v5), empirical paper | Large-scale biomedical abstract vocabulary changed alongside LLM adoption. | Population-level evidence is not an authorship detector for an individual passage or a blacklist of forbidden words. |

The parent re-opened these primary sources and inspected relevant passages after
receiving bounded research reports. Reports are leads, not authority. Research on
OpenAI, Claude Code, empirical instruction-file studies, practitioner settings and
an official webinar is already recorded in the [earlier source register](harness-research/sources.md)
and [harness report](harness-research/REPORT.md); retain their model/version and
experimental limits rather than repeating the entire survey.

### Earlier experiments that remain relevant

The existing [results summary](harness-research/results-summary.json) records 18
scored trials: six original-versus-v2 pairs, then three original-versus-final-v3
pairs. All passed their mechanical grader. This does not mean 18 semantic
successes, a full six-case rerun of v3, a Claude-versus-Codex comparison, or universal
speed improvement. Independent review found a false-positive pattern in a
generated deck-link regex; evaluator scope also needed correction during the pilot.

The revised [AGENTS.md study](https://arxiv.org/html/2602.11988v2) and
[efficiency study](https://arxiv.org/html/2601.20404v2) are already analysed there.
They do not establish one best instruction length, compaction percentage or agent
count. The practical decision is to preserve the current concise harness and make
small justified changes. The user-requested [practitioner repository](https://github.com/shanraisshan/claude-code-best-practice/tree/b70072cc2fed48b710ddb555b66c3d0ad7c40641)
is an idea index, not a permission or settings preset.

## Writing review

Look for empty promises, abstract praise, repeated section rhythms, vague actors,
unearned certainty, redundant disclaimers and conclusions that merely repeat the
opening. Those are editorial problems whether a human or model wrote the words.
Keep qualifications that affect source interpretation or an actual decision.

For each weekly page ask: what happened, whose account supports it, what is the
question, and what does a student do next? Keep a historical voice after a concise
statement of the fictional premise. Do not repeat implementation details to
students. Explain Full-Dive, AR and artificial life at the point where each concept
helps explain an event. Avoid replacing the course's distinctive interests with
generic warnings about technology.

A later paired editorial comparison will hold evidence and intended meaning
constant while comparing an abstract opening with a concrete one. Only real user
responses will count as comprehension evidence. Model comments will be labelled
editorial review.

## SAO source and media decisions

| Primary source | What it currently supports | Boundary |
| --- | --- | --- |
| [Official series portal](https://www.swordart-online.net/) | Identifying the chosen television arcs and films | A navigation page is not enough evidence for detailed episode claims. |
| [Progressive: Aria introduction](https://sao-p.net/aria/story-character/) | Return to early Aincrad, with Asuna's perspective | Compare adaptations explicitly; do not treat the films as sequels after Alicization. |
| [Ordinal Scale story](https://sao-movie.net/us/story/story.html) | The 2026 setting and Augma's AR distinction from Full-Dive | Do not infer every memory mechanism from promotional synopsis. |
| [War of Underworld introduction](https://sao-alicization.com/intro/) | Underworld conflict and artificial intelligence as central stakes | Add episode/scene-level sources before teaching more detailed claims. |

These pages were checked directly. The course year 2035 is an invented teaching
frame; event dates and publication dates remain separate. Selected scenes should
be identifiable without requiring viewers to purchase or watch the entire series;
short background notes and open official material support access. Readings and
claims will receive specific references when the representative unit is authored.

The first preview uses original vector artwork, drawn in the Slop palette, as an
interpretive illustration. It carries no claim to reproduce a canonical map.
Official source pages are linked. Their images have not been downloaded or
relicensed. Later media decisions will record the creator, URL, use and reuse basis;
attribution alone will not be treated as permission for public republication.

## Comparison protocol: Gate 1

Question: should the homepage lead with an archival narrative or immediate course
orientation? A and B use one shared course outline, assessments and source set.
Both preserve the institutional identity. Information order and composition vary;
this is a paired design comparison, not an isolated-variable causal experiment.

Tasks for inspection:

1. Identify the course, audience and central question.
2. Find the week about Ordinal Scale and its historical question.
3. Find what the exhibition is worth and whether coding is required.
4. Locate the source/continuity boundary and navigate between A and B.

Inspect desktop and mobile layout, headings, focus, navigation, overflow and console.
Record actual observations and refinements in the Gate 1 review note. The user then
judges appeal and clarity. No fabricated timing, participant count, preference or
statistical significance will be reported.

## Decision log

| ID | Decision | Evidence | State / next check |
| --- | --- | --- | --- |
| R01 | Preserve the gold/bronze Slop identity and create original archival artwork | README and installed slop.css; approved historical course premise | Implement preview; inspect contrast and mobile composition |
| R02 | Use unlisted preview routes before selecting a homepage | User requires review before expansion; avoids presenting unfinished curriculum as complete | Compare A/B in browser, then await real feedback |
| R03 | Reuse current harness study; add precise review-gate and research pointers | Existing paired results and this explicit user request | Diff-review CLAUDE.md; no new benchmark claim |
| R04 | Stage the full curriculum after a complete sample unit | User's gates and incremental-delivery evidence | Gate 2 begins only after Gate 1 feedback |
| R05 | Keep the existing checkout with exclusive file ownership | Known planning changes and no conflicting implementation worker | Reassess isolation if edits overlap; no mechanical worktree creation |

## Next review triggers

Update this record when a new API is needed, a source contradicts the course text,
a browser/test failure changes the approach, a comparison changes the design, or
human feedback alters the goal. For a routine known edit, check the relevant local
contract instead of reopening a broad literature survey. Log the question, evidence,
choice, observed result and unresolved limit. Keep this file useful to the next
implementation step rather than accumulating unrelated references.
