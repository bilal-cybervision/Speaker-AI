# Build approach

Decision for the Speaker’s Office proof of concept. Written 24 September 2026.

## Short answer

Copy the prototype’s look. Do not keep building inside the prototype file.

`First meeting/National Assembly E Office.html` is the visual reference: green secretariat theme, top bar, left menu, file list, and the desk-by-desk timeline. Take that look into Genspark and add the screens in `docs/02-genspark-design-brief.md`.

The working system is a new, small application that follows those screens. The HTML file stays as the design source. It is one page, the data disappears on refresh, and its sample files are things like hardware purchases and press releases. The first real job is a member’s question, which that file does not contain.

## What “on top of the prototype” means

| Layer | What we do |
|---|---|
| Look | Reuse the prototype. Genspark extends it. |
| Screens | Add the question-file path only. Leave greeting cards, press releases, and the other menu items out of this cut. |
| Code | New application. Do not pile the model into the existing HTML. |
| Data | Use the rulings already extracted. Store rule 78 beside them. Demo notices are made up. |

## What the first build is

One file. One question.

1. A made-up question lands on the section officer’s desk.
2. The model writes the note: what the member is asking, which part of rule 78 it hits, the closest old ruling with its id and PDF page, and how many of the five days are left.
3. The file walks up to the Speaker. He types Allow, Reject, or Fix the wording. The model does not type that.
4. The file walks back down. The officer’s next step is either “send this to the Minister” or “tell the member.”

The Minister’s answer is not reviewed by the Speaker and is not part of this build.

## What comes after the design returns

Genspark comes back with screens. Implementation follows those screens, in the order in `docs/03-ai-working-context.md`. The first implemented screen is the officer’s note on the question file.
