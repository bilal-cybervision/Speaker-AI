# Design brief for Genspark

Paste this with a copy of the prototype. The prototype to copy is `First meeting/National Assembly E Office.html`.

## What to keep

Keep the existing look. Do not invent a new product.

- Dark green left sidebar (`#022c22`), darker green top bar (`#064e3b`), white content area, emerald buttons (`#047857`).
- Font: Plus Jakarta Sans.
- National Assembly of Pakistan branding. Title in the prototype: “Secretariat E-Office Suite.”
- Split login: photo panel on the left, sign-in card on the right, role chips for a demo.
- Inside the app: top bar with the person’s name and branch, left menu, white panels, small status badges, and the vertical file timeline (done, current, waiting).

Roles on the login chips for this cut: Section Officer (Questions Branch) and Speaker. The other chips in the prototype can stay visible but are not part of these new screens.

## What to add

Design only the path of one question file. Do not redesign greeting cards, press releases, speeches, the teleprompter, or remote sign-off.

Use this made-up notice on every screen so the flow is obvious:

> How many basic health units in NA-120 have no doctor?
>
> From: a made-up MNA. To: the Health Minister. Starred question, so he wants an oral answer. Received by the Notice Office 1 September 2026. Five-day decision clock ends 6 September 2026. Label the whole demo “Sample data.”

### Screen 1. Section officer inbox

Question files waiting on the Questions Branch desk. One row is the sample above. Columns: file number, subject, received date, days left, current desk. Opening the row goes to Screen 2.

### Screen 2. The note, on the officer’s desk

This is the important screen. Two columns.

Left: the question text, who sent it, starred or unstarred, the five-day clock, and the timeline. Timeline order for this file:

1. Notice Office, received. Done.
2. Section Officer, Questions Branch. Current. He is writing the note.
3. Speaker. Waiting.
4. Back to the Section Officer, to carry out the decision. Waiting.

Right: the model’s note, clearly marked “Draft for the officer. The Speaker decides.”

The note shows:

- Plain restatement of what the member is asking.
- Rule 78 checklist. Each clause is pass or fail, with the failing words from the notice quoted. Leave one clause failed in the sample so the screen has something to show. Example failure: the notice is longer than 150 words, or it asks for an opinion. Pick one and show it.
- Closest past rulings. For each: ruling id, year range, subject, one sentence of what the Chair held, debate date, and “PDF page 15” style source. Two rulings is enough. One of them can be the real record `NA-ROC-1999-2017-p0015-r0010` only if the sample is about an adjournment motion. For this health question, use clearly labelled sample citations, not a fake ruling number.
- A line for the officer to edit before the file moves up.
- Button: “Send file to the Speaker.”

No button that says the model allows or rejects the question.

### Screen 3. Speaker’s desk

Same file, timeline step 3 current. He sees the question and the officer’s note, including the rulings and their pages.

His only actions:

- Allow
- Reject
- Fix the wording, with a box for the new wording

After he chooses, he signs. The screen records his words, not the model’s.

### Screen 4. File back with the officer

Timeline step 4 current. Show the Speaker’s decision in his own words.

- If he allowed it: next step text is “Send this question to the Health Minister.” A button does that. Do not show the Minister’s answer, and do not ask the Speaker to approve an answer.
- If he rejected it: next step text is “Tell the member the question will not be asked.”

### Screen 5. Empty state

Same note panel when no ruling is found. The panel says “No past ruling found.” It does not invent a ruling number.

## What not to draw

- A chat bubble as the product. A small “ask about this note” box is optional. The note is the product.
- A screen where the Health Minister’s answer comes back to the Speaker for approval.
- Live Question Hour. That is a later design.
- Meetings, speech-to-text, morning brief, points of order.

## Done when

A person who has not seen the prototype can follow one sample question from the officer’s desk, up to the Speaker’s signature, and back down, and can see which rule failed and which page to open in the rulings book.
