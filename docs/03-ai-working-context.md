# AI working context

Read this before designing or coding the Speaker’s Office work. It is the memory of the decisions already made. Update it when a decision changes. Last updated 26 September 2026.

## What this project is

A proof of concept for the Honourable Speaker’s Office, National Assembly of Pakistan. Speaker: Sardar Ayaz Sadiq, elected 1 March 2024. The Secretariat examines papers. The Speaker signs. Under rule 28 of the Rules of Procedure, 2007 (modified to 22 October 2024), his decision on the file or from the Chair is final unless the House rescinds it.

The model prepares a note. It does not sign, and it does not speak as the Speaker.

## The first build

One made-up question file.

1. Notice arrives at the Notice Office and sits with a section officer in the Questions Branch.
2. The model writes the note from rule 78 plus a search of the rulings JSONL: plain meaning, failed clauses, closest rulings with id and PDF page, days left of the five-day clock in rule 81.
3. The file walks up. The Speaker chooses Allow, Reject, or Fix the wording.
4. The file walks back down. Next step is “send to the Minister” or “tell the member.”

The Minister’s answer does not come back to the Speaker for approval. Rule 82 only says the answer is printed with the question if it arrives at least 48 hours before Question Hour. Do not build an answer-review feature.

Search the records and give those records to the model. Do not fine-tune on the JSONL as the first step. If search finds nothing, the note says no ruling was found.

## Words that matter

- A question is a member’s formal request for information from a Minister, filed in advance with the Secretary. It is not the Speaker asking the Minister how work is going.
- Starred question: oral answer in Question Hour. Unstarred: written answer. No Question Hour on Tuesday.
- Admissible: the Speaker allows it to be asked. Disallow: he rejects it. Amend in form: he rewrites the wording.
- The note is the officer’s writing on the file. That is the gap the model fills.
- A ruling of the Chair is a past decision, one JSONL record.
- An adjournment motion and a point of order are different papers. Do not treat them as questions.

## Where the files are

| Path | Use |
|---|---|
| `data/rulings/rulings-1999-2017.jsonl` | Clean set. 234 rulings, numbers 1–234. Query this. |
| `data/rulings/rulings-1947-1997.jsonl` | Scan. 873 rulings. Numbers restart and some text is misread. Verify with the page in the id. |
| `data/rulings/catalog.json` | Counts and known holes. |
| `data/rulings/pages/` | Raw page dump, including covers. Do not query. |
| `data/rulings/sources/` | Official PDFs. |
| `Portal Application/rulings/` | Copy of the JSONL for handover. Catalog there still points PDFs at `data/rulings/sources/`. |
| `First meeting/National Assembly E Office.html` | Visual prototype only. Not the app to extend. |
| `First meeting/CISO_DG_ITReport_for_currentBaseline.pdf` | Constraints below. |
| `docs/01-build-approach.md` | Prototype look, new code. |
| `docs/02-genspark-design-brief.md` | Screens to design before build. |

Record id shape: `NA-ROC-1999-2017-p0015-r0010` means the 1999–2017 book, PDF page 15, printed ruling 10. Trust `full_text` over `decision`. The `decision` field is a best-effort quote.

Clean-book subjects, roughly: 58 points of order, 42 conduct, about 24 questions and Question Hour, 7 adjournment motions. The old book is heavier on adjournment motions, privilege, and questions, with dirty labels.

Rule 78 is not in the repo yet. A question note is incomplete until those clauses are stored as data. Source used so far: the Rules of Procedure PDF on na.gov.pk, read in the earlier research session, not checked into this project.

## Later, in this order

1. Same note for an adjournment motion (rule 111) and a privilege notice.
2. Point of order while he is in the Chair. Same search, must answer in seconds. This is where the 1999 book is strongest.
3. Morning page of papers waiting for his decision.
4. Meetings: speech-to-text, then a short record of decisions and owners. Separate input. The rulings file does not cover a visitor meeting.

Leave press releases, greeting cards, and the teleprompter. They are in the prototype and they are not the hard daily decision.

## Constraints from the baseline note

The Speaker’s Office platform is greenfield. Secretariat staff use NITB e-Office for some work, and NAS Smart Office is an internal effort. This proof of concept does not depend on their APIs.

- The public Vercel site is the Vite frontend only. Sign-in and the sample files run in the browser from `frontend/src/demo.js`. That build does not call the API, the model, or the rulings archive. `npm run dev` on a machine still uses the backend on port 8787.
- Demo and pilot on the Assembly’s internal network. An existing IP5 server may host the first demo.
- No dedicated GPU today. Say so if a model needs one.
- Assembly data, prompts, and model outputs stay inside an Assembly-controlled environment. No public AI service or external cloud without explicit authorization.
- Demo data is sanitized or made up. No live confidential papers.
- Architecture stays open for a later link to NAS Smart Office.

## Do not drift

- SUPACE, in `First meeting/India_AI_Judiciary_Case_Study.pdf`, is a meeting precedent: a court tool that retrieves and organises and does not decide. It is not the specification. Do not copy its four-stage product. Keep its boundary: the model does not decide.
- SUVAS is not this archive’s problem. These rulings are already in English. Urdu on a notice is a later translation step.
- The prototype login ignores the password and the Speaker inbox shows every file. Do not copy those behaviours into the new app.
- Do not describe the model as reviewing the Minister’s answer.
