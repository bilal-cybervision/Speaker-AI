# AI working context

Read this before designing or coding the Speaker’s Office work. It is the memory of the decisions already made. Update it when a decision changes. Last updated 29 September 2026.

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
| `data/rulings/rulings-1999-2017.jsonl` | Clean set. 234 rulings, numbers 1–234. Queried with the older book. |
| `data/rulings/rulings-1947-1997.jsonl` | Scan. 873 rulings. Numbers restart and some text is misread. Queried with the clean book. Verify with the page in the id. |
| `data/rulings/catalog.json` | Counts and known holes. |
| `data/rulings/pages/` | Raw page dump, including covers. Do not query. |
| `data/rulings/sources/` | Official PDFs. |
| `Portal Application/rulings/` | Copy of the JSONL for handover. Catalog there still points PDFs at `data/rulings/sources/`. |
| `Portal Application/frontend/src/data/rulings-1999-2017.jsonl` | Clean copy the screen queries. Lives inside the Vite/Vercel root so search works on deploy. |
| `Portal Application/frontend/src/data/rulings-1947-1997.jsonl` | Scan copy the screen queries with the clean book. Same folder, so deploy can read it. |
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

- From 28 September 2026 the frontend loads `frontend/src/app/` (plain JS and one stylesheet, no Tailwind). It is a desk-first MVP: the Speaker's queue, the file with the officer's note, and a fixed decision bar (Allow, Reject, Fix the wording, then sign; keys A, R, F, Enter; 5-second undo). From 29 September 2026 Gemini is authorised for this prototype. The key is `VITE_GEMINI_API_KEY` in the environment (Vercel project settings, or `frontend/.env` on a machine). It is not stored in source. Text calls `gemini-3.8-flash` (then 3.6 / 3.5 Flash) via `generateContent`; Live uses `gemini-3.8-live`. Gemini 2.5/2.0 Flash 404 for new keys. Speaker AI retrieves both rulings books from `frontend/src/data/` (234 clean records, 1999–2017, and 873 scan records, 1947–1997). Each hit keeps its own volume and PDF. The older book is a scan, so the officer confirms that PDF page before relying on it. Gemini writes the answer and must cite ruling id and PDF page; if search finds nothing it says so. A single coincidental noun is not a citation. Privilege, adjournment and Question Hour are matched on subject and headnote, not only an exact subject label. Gemini 429 is retried once, then the archive answer is kept. Live must not overwrite a cited ruling with the morning desk. MIC is tap-to-listen on the same orb (not hold). While listening or while a reply is speaking, the orb reads STOP and a Stop control is shown; either cuts the mic and the spoken reply. Live setup puts `responseModalities` under `generationConfig`. If Live is down, Gemini Flash answers the transcript and ElevenLabs speaks the short reply (English `eleven_flash_v2_5`, Urdu `eleven_v3`, voice Daniel). The key is `ELEVENLABS_API_KEY` in `frontend/.env`. The Vite server, and on Vercel `api/elevenlabs/speak.js`, sends it as the `xi-api-key` header. It is not in the browser bundle. This key is a free account, 10,000 characters. If ElevenLabs does not answer, the browser speech API speaks. ElevenLabs does not write the note, search rulings, or decide. Gemini Live is listen-only; it does not play its own audio. Every Send, Listen and Replay uses Daniel. Document intelligence (`#/intake`) OCRs print and Nastaliq. The schedule runs a conflict engine (overlap, travel buffers, sitting-day clashes). Directions is a kanban with an AI evidence check before close. The Speaker's file shows the signature and seal beside the AI brief; the model still does not sign. Voice never executes a change. Demo data only. The old nine-module portal in `frontend/src/portal/` is no longer loaded; `demo.js` and `portal/rulings-search.js` are still used. The paragraph below describes the retired portal.
- The office the Speaker sees runs entirely in the Vite frontend. The nine-module portal is that app: Staff View uses the Secretariat shell (Inter) and Speaker View uses the other shell (Public Sans and Noto Nastaliq Urdu). The switch is stored in the browser only. Sample records live in `frontend/src/portal/data/` and are drawn into the pages there. Nothing in that portal calls an API, a model, or the rulings archive, on your machine or on Vercel. The earlier question-file screen (`frontend/src/main.js`, `frontend/src/demo.js`) is not loaded by this build.
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
