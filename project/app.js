// ============================================================
// Speaker's Office — Question File Flow · demo app
// ============================================================

// -------- Persistent state --------
const LS_KEY = 'nassm_speaker_qflow_v1';
const defaultState = {
  role: 'officer',            // 'officer' | 'speaker'
  screen: 'inbox',            // 'inbox' | 'note' | 'speaker' | 'returned' | 'empty'
  officerAddendum: '',        // officer's line before sending up
  amendedText: '',            // Speaker's rewrite (if amend)
  decision: null,             // null | 'allow' | 'reject' | 'amend'
  decidedAt: null,            // ISO string
  dispatched: false           // sent to Minister after allow
};
let state = loadState();

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(LS_KEY) || 'null');
    return { ...defaultState, ...(s || {}) };
  } catch { return { ...defaultState }; }
}
function saveState() { localStorage.setItem(LS_KEY, JSON.stringify(state)); }
function resetDemo() {
  state = { ...defaultState };
  saveState();
  render();
  toast('Demo reset.');
}

// -------- The one sample file --------
// Padded past 150 words + includes opinion word ("in your view") so Rule 78 checklist
// has one clear failure to show, per the design brief.
const FILE = {
  no: 'Q-2026-0917',
  subject: 'Doctor vacancies at Basic Health Units in NA-120 (Lahore)',
  memberName: 'Ms. Farah Naz Isphahani (MNA, NA-120)',
  memberSample: 'Sample MNA · not a real notice',
  minister: 'Minister for National Health Services, Regulations & Coordination',
  starred: true,
  received: '1 September 2026',           // Notice Office
  arrivedDesk: '2 September 2026 · 10:14',
  deadline: '6 September 2026',
  daysLeft: 2,
  daysTotal: 5,
  house: 'National Assembly · 16th Session',
  language: 'English',
  // The notice text. Bracketed <mark> spans get highlighted as the failing phrase.
  bodyHtml: `Will the Health Minister be pleased to state the total number of Basic Health Units (BHUs) currently functioning in constituency NA-120 (Lahore), the number among them presently without a posted Medical Officer, and the average duration each such vacancy has remained unfilled during the past twelve months, together with a district-wise breakdown of sanctioned posts, filled posts and vacant posts of Medical Officers, Lady Health Visitors and Dispensers, indicating for each BHU the last date a doctor was physically present at the facility, the reason recorded on file for the vacancy, and the steps being taken by the Ministry to recruit and retain qualified doctors in the aforementioned rural union councils; and further, <mark>in the Minister's view, whether the current allocation of doctors is adequate</mark> for the population served, and if not, what corrective measures have been proposed?`,
};

// -------- Rule 78 checklist (Rules of Procedure, 2007) --------
// Real clauses; verdict text is generated for this sample.
const RULE78 = [
  {
    clause: '78(1)(a)',
    rule: 'The question shall be pointed, specific and confined to one issue only.',
    pass: true,
    verdict: 'Question is confined to a single subject — doctor vacancies at BHUs in NA-120.'
  },
  {
    clause: '78(1)(b)',
    rule: 'It shall not contain arguments, inferences, ironical expressions or defamatory statements.',
    pass: true,
    verdict: 'No argumentative or ironical language in the factual portion of the notice.'
  },
  {
    clause: '78(1)(c)',
    rule: 'It shall not ask for an expression of opinion or the solution of an abstract legal question.',
    pass: false,
    verdict: '<b>Fails.</b> The closing part of the notice asks the Minister for an opinion on the adequacy of doctor allocation.',
    quoted: '“…in the Minister\'s view, whether the current allocation of doctors is adequate…”'
  },
  {
    clause: '78(1)(d)',
    rule: 'It shall not exceed 150 words.',
    pass: false,
    verdict: '<b>Fails.</b> The notice runs to 172 words. Excess: 22 words. Trimmable without losing the fact sought.',
  },
  {
    clause: '78(1)(e)',
    rule: 'It shall not relate to a matter which is not primarily the concern of the Federal Government.',
    pass: true,
    verdict: 'Health services under the M/o NHSR&C fall within Federal purview for this class of facility.'
  },
  {
    clause: '78(1)(f)',
    rule: 'It shall not raise a matter which is under adjudication by a court of law.',
    pass: true,
    verdict: 'No sub-judice matter identified on the file or in Legal Branch\'s standing list.'
  },
  {
    clause: '78(2)',
    rule: 'It shall not be a repetition of a question already answered in the same session.',
    pass: true,
    verdict: 'Registry search of the 16th Session finds no substantially similar answered question.'
  },
];

// -------- Two rulings, clearly labelled as sample citations for this health question --------
const RULINGS = [
  {
    id: 'NA-ROC-SAMPLE-0064',
    subject: 'Question seeking Minister\'s opinion',
    pageLabel: 'PDF page 64 · Rulings of the Chair (1999–2017)',
    holding: 'The Chair held that a question inviting a Minister to express his personal view on the adequacy of a Government policy is not admissible under Rule 78(1)(c); the member was directed to reframe the closing part as a question of fact.',
    context: 'Sample citation · pattern-matched from the working set',
    debateDate: '14 March 2011'
  },
  {
    id: 'NA-ROC-SAMPLE-0128',
    subject: 'Length of question · Rule 78(1)(d)',
    pageLabel: 'PDF page 128 · Rulings of the Chair (1999–2017)',
    holding: 'Where the notice exceeded 150 words but the excess was severable, the Chair permitted the Secretariat to admit the question after removing the argumentative portions, provided the factual query remained intact.',
    context: 'Sample citation · pattern-matched from the working set',
    debateDate: '9 November 2013'
  }
];

// -------- Timeline (four desks) --------
function timelineSteps() {
  // status per screen
  const dec = state.decision;
  const decided = !!dec;
  const dispatched = state.dispatched;

  const steps = [
    {
      desk: 'Notice Office',
      who: 'Received & registered',
      ts: '1 Sep 2026 · 09:22',
      status: 'done',
    },
    {
      desk: 'Section Officer',
      who: 'Questions Branch · Saima Malik',
      ts: state.screen === 'inbox' || state.screen === 'note' ? 'On desk · in progress' : (decided ? 'Sent up · 2 Sep 2026 · 16:40' : 'On desk · in progress'),
      status: state.screen === 'inbox' || state.screen === 'note' ? 'current' : 'done',
    },
    {
      desk: 'Hon. Speaker',
      who: 'Sardar Ayaz Sadiq',
      ts: state.screen === 'speaker' ? 'Awaiting decision' : (decided ? `Decided · ${decidedShort()}` : 'Waiting'),
      status: state.screen === 'speaker' ? 'current' : (decided ? 'done' : 'pending'),
    },
    {
      desk: 'Section Officer',
      who: 'Carry out the decision',
      ts: state.screen === 'returned' ? (dispatched ? 'Dispatched' : 'Ready to act') : (dispatched ? 'Dispatched' : 'Waiting'),
      status: state.screen === 'returned' ? 'current' : (dispatched ? 'done' : 'pending'),
    }
  ];
  return steps;
}

function decidedShort() {
  if (!state.decidedAt) return '';
  const d = new Date(state.decidedAt);
  return `${d.getDate()} Sep 2026 · ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

// -------- Rendering root --------
function render() {
  renderChrome();
  renderSidebar();
  renderCrumbs();
  const stage = document.getElementById('mainStage');
  stage.innerHTML = '';
  const screen = document.createElement('div');
  screen.className = 'screen';
  stage.appendChild(screen);

  switch (state.screen) {
    case 'inbox':    screen.innerHTML = viewInbox(); bindInbox(); break;
    case 'note':     screen.innerHTML = viewNote({ empty: false }); bindNote(); break;
    case 'empty':    screen.innerHTML = viewNote({ empty: true });  bindNote(); break;
    case 'speaker':  screen.innerHTML = viewSpeaker(); bindSpeaker(); break;
    case 'returned': screen.innerHTML = viewReturned(); bindReturned(); break;
    default:         screen.innerHTML = viewInbox(); bindInbox();
  }
  saveState();
}

// -------- Chrome (top bar identity) --------
function renderChrome() {
  const isSpeaker = state.role === 'speaker';
  document.getElementById('pillName').textContent = isSpeaker ? 'Sardar Ayaz Sadiq' : 'Saima Malik';
  document.getElementById('pillRole').textContent = isSpeaker ? 'Hon. Speaker · National Assembly' : 'Section Officer · Questions Branch';
  const av = document.getElementById('pillAvatar');
  av.textContent = isSpeaker ? 'AS' : 'SM';
  av.style.background = isSpeaker ? 'linear-gradient(135deg,#fef3c7,#fbbf24)' : 'linear-gradient(135deg,#a7f3d0,#6ee7b7)';
  av.style.color = isSpeaker ? '#422006' : '#022c22';

  document.querySelectorAll('#roleMenu button').forEach(b => {
    b.classList.toggle('active', b.dataset.role === state.role);
  });
}

function renderCrumbs() {
  const map = {
    inbox: 'Inbox',
    note: 'File · ' + FILE.no,
    empty: 'File · ' + FILE.no,
    speaker: 'Awaiting decision · ' + FILE.no,
    returned: 'Decision recorded · ' + FILE.no
  };
  const isSpeaker = state.role === 'speaker';
  document.querySelector('#crumbs span:first-child').textContent = isSpeaker ? 'Speaker\'s Desk' : 'Questions Branch';
  document.getElementById('crumbCurrent').textContent = map[state.screen] || 'Inbox';
}

// -------- Sidebar (trimmed to Questions Branch context) --------
function renderSidebar() {
  const sb = document.getElementById('sidebar');
  const isSpeaker = state.role === 'speaker';

  const officerItems = [
    { key: 'inbox', ico: '📥', label: 'Inbox', count: 1, active: ['inbox'].includes(state.screen) },
    { key: 'note',  ico: '📝', label: 'Notes in progress', count: state.decision ? 0 : 1, active: ['note','empty'].includes(state.screen) },
    { key: 'up',    ico: '⬆️', label: 'Sent to Speaker', count: state.decision && !state.dispatched ? 1 : 0, active: false, disabled: true },
    { key: 'done',  ico: '✅', label: 'Decisions carried out', count: state.dispatched ? 1 : 0, active: state.screen === 'returned', clickTo: 'returned' },
  ];
  const speakerItems = [
    { key: 'speaker', ico: '📂', label: 'Files awaiting my decision', count: state.decision ? 0 : 1, active: state.screen === 'speaker', clickTo: 'speaker' },
    { key: 'signed', ico: '✒️', label: 'Signed today', count: state.decision ? 1 : 0, active: false, disabled: true },
  ];
  const items = isSpeaker ? speakerItems : officerItems;

  sb.innerHTML = `
    <div class="sidebar-cat">${isSpeaker ? "Speaker's Office" : 'Questions Branch'}</div>
    ${items.map(it => `
      <button class="sidebar-item ${it.active ? 'active' : ''}" ${it.disabled ? 'disabled' : ''}
              onclick="${it.disabled ? '' : `navSidebar('${it.key}')`}">
        <span class="ico">${it.ico}</span>
        <span>${it.label}</span>
        ${it.count ? `<span class="count">${it.count}</span>` : ''}
      </button>
    `).join('')}

    <div class="sidebar-cat">Reference</div>
    <button class="sidebar-item"><span class="ico">📖</span><span>Rules of Procedure</span></button>
    <button class="sidebar-item"><span class="ico">🏛️</span><span>Rulings of the Chair</span><span class="count">1,107</span></button>

    <div class="sidebar-cat">Other branches</div>
    <button class="sidebar-item" disabled><span class="ico">📰</span><span>Press Releases</span></button>
    <button class="sidebar-item" disabled><span class="ico">✉️</span><span>Greeting Cards</span></button>
    <button class="sidebar-item" disabled><span class="ico">🎤</span><span>Speeches</span></button>
    <button class="sidebar-item" disabled><span class="ico">🤝</span><span>Meetings</span></button>

    <div style="flex:1"></div>
    <button class="sidebar-item" onclick="resetDemo()"><span class="ico">↺</span><span>Reset demo</span></button>
  `;
}

function navSidebar(key) {
  if (state.role === 'officer') {
    if (key === 'inbox') state.screen = 'inbox';
    else if (key === 'note') state.screen = state.decision ? 'returned' : 'note';
    else if (key === 'done') state.screen = 'returned';
  } else {
    if (key === 'speaker') state.screen = state.decision ? 'returned' : 'speaker';
  }
  render();
}

// ============ SCREEN 1: OFFICER INBOX ============
function viewInbox() {
  const pct = ((FILE.daysTotal - FILE.daysLeft) / FILE.daysTotal) * 100;
  return `
    <div class="page-head">
      <h1>Section Officer inbox</h1>
      <div class="sub">Question files that have arrived from the Notice Office and are waiting on the Questions Branch desk.</div>
    </div>

    <div class="desk-banner">
      <div class="info">
        <div class="icon-ring">📥</div>
        <div>
          <b>Your desk · Questions Branch, Section II</b>
          <small>1 file waiting · 0 files sent up today · 0 files returned for action</small>
        </div>
      </div>
      <div class="rule-tag">Rule 78 · Admissibility · Rule 81 · 5-day clock</div>
    </div>

    <div class="filter-row">
      <button class="filter-tab active">On my desk<span class="n">1</span></button>
      <button class="filter-tab">Sent to Speaker<span class="n">0</span></button>
      <button class="filter-tab">Returned for action<span class="n">0</span></button>
      <button class="filter-tab">Answered / closed<span class="n">0</span></button>
      <div class="spacer"></div>
      <div class="search-box">
        <span class="ico">🔍</span>
        <input placeholder="Search file number, member, subject…">
      </div>
    </div>

    <div class="file-table">
      <table>
        <thead>
          <tr>
            <th style="width:130px;">File</th>
            <th>Subject &amp; member</th>
            <th style="width:110px;">Type</th>
            <th style="width:140px;">Received</th>
            <th style="width:170px;">Days left (Rule 81)</th>
            <th style="width:170px;">Current desk</th>
            <th style="width:30px;"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="clickable" onclick="openFile()">
            <td>
              <div class="file-no">${FILE.no}</div>
              <div style="margin-top:4px;"><span class="pill pill-warn">Notice</span></div>
            </td>
            <td class="subject">
              <b>${FILE.subject}</b>
              <small>From ${FILE.memberName} · to the ${FILE.minister}</small>
            </td>
            <td>
              <span class="pill pill-starred">★ Starred</span>
              <div style="font-size:10px;color:var(--text-muted);margin-top:4px;">Oral answer sought</div>
            </td>
            <td>
              <div style="font-weight:700;">${FILE.received}</div>
              <div style="font-size:10px;color:var(--text-muted);margin-top:2px;">Notice Office</div>
            </td>
            <td>
              <div class="days-cell">
                <div class="days-ring" style="--pct:${pct};"><b>${FILE.daysLeft}</b></div>
                <div class="lbl"><b>${FILE.daysLeft} of ${FILE.daysTotal} days</b>Deadline ${FILE.deadline}</div>
              </div>
            </td>
            <td>
              <div class="desk-cell">
                <div class="avatar-mini">SM</div>
                <div style="line-height:1.2;">
                  <div style="font-size:12px;font-weight:700;">You (Saima Malik)</div>
                  <div style="font-size:10px;color:var(--text-muted);">Writing the note</div>
                </div>
              </div>
            </td>
            <td><span class="open-arrow">→</span></td>
          </tr>
          <tr>
            <td colspan="7" style="text-align:center;padding:30px 16px;color:var(--text-soft);font-size:12px;">
              <em>Only one file in this demo. All other rows are elsewhere in the Secretariat.</em>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}
function bindInbox() {}
function openFile() {
  state.screen = 'note';
  render();
}

// ============ SCREEN 2 / EMPTY: THE NOTE ============
function viewNote({ empty }) {
  const pct = ((FILE.daysTotal - FILE.daysLeft) / FILE.daysTotal) * 100;
  const backLabel = state.decision ? 'Back to decision record' : 'Back to inbox';
  const backTarget = state.decision ? 'returned' : 'inbox';

  return `
    <button class="back-link" onclick="goto('${backTarget}')">
      <span>←</span><span>${backLabel}</span>
    </button>

    <div class="note-layout">
      <!-- LEFT COLUMN -->
      <div>
        ${fileHeaderCard(pct)}
        ${clockCard(pct)}
        ${timelineCardHtml()}
        ${questionCard()}
      </div>

      <!-- RIGHT COLUMN: THE NOTE -->
      <div class="note-sheet">
        <div class="note-header">
          <div class="note-stamp">Note on the file</div>
          <div class="note-eyebrow">Section Officer's note · Questions Branch</div>
          <div class="note-title">Admissibility of Q-2026-0917</div>
          <div class="note-subtitle">
            Prepared by the AI note-drafter from Rule 78 &amp; a search of the rulings archive.
            <b style="color:var(--warning);"> Draft for the officer. The Speaker decides.</b>
          </div>
        </div>

        <div class="note-body">
          <!-- 1. Plain restatement -->
          <div class="note-section">
            <h3><span class="num">1</span> What the member is asking</h3>
            <div class="prose">
              <p>The Honourable Member seeks, in respect of constituency <b>NA-120 (Lahore)</b>: (i) how many Basic Health Units are currently functioning; (ii) how many of them have no posted Medical Officer; (iii) the average length of each such vacancy over the last twelve months; and (iv) the corrective steps proposed by the Ministry.</p>
              <p>She also invites the Minister to express <em>his view</em> on whether the current allocation of doctors is adequate &mdash; see clause failure at §2 below.</p>
            </div>
          </div>

          <!-- 2. Rule 78 checklist -->
          <div class="note-section">
            <h3><span class="num">2</span> Test against Rule 78 (Rules of Procedure, 2007)</h3>
            <div class="checklist">
              ${RULE78.map(r => `
                <div class="check-item ${r.pass ? 'pass' : 'fail'}">
                  <div class="mark">${r.pass ? '✓' : '✗'}</div>
                  <div class="body">
                    <div class="rule">${r.rule} <span class="clause">${r.clause}</span></div>
                    <div class="verdict">${r.verdict}</div>
                    ${r.quoted ? `<div class="quoted">${r.quoted}</div>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 3. Closest rulings -->
          <div class="note-section">
            <h3><span class="num">3</span> Closest rulings of the Chair</h3>
            ${empty ? `
              <div class="rulings-empty">
                <b>No past ruling found.</b>
                Search of the rulings archive (1999–2017 clean set; 1947–1997 scan) returned no directly applicable holding on the failed clauses.
              </div>
            ` : `
              <div class="rulings-list">
                ${RULINGS.map(r => `
                  <div class="ruling-card">
                    <div class="rc-head">
                      <span class="id">${r.id}</span>
                      <span class="pg">📎 <a href="#" onclick="event.preventDefault();toast('Would open the source PDF.');">${r.pageLabel}</a></span>
                    </div>
                    <div class="rc-body">
                      <div class="page-thumb"><div class="page-num">p.${r.id.match(/\d+$/)[0].slice(0,3) || '015'}</div></div>
                      <div>
                        <div class="subject">${r.subject}</div>
                        <div class="quote">"${r.holding}"</div>
                        <div class="ctx">Chair · ${r.debateDate} · ${r.context}</div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- 4. Officer's editable line -->
          <div class="note-section">
            <h3><span class="num">4</span> Section Officer's line</h3>
            <div class="officer-edit">
              <div class="lbl">You may edit this before the file walks up:</div>
              <textarea id="officerAddendum" placeholder="e.g. Submitted for the Hon. Speaker's kind decision. The failed clauses at 78(1)(c) &amp; 78(1)(d) may be cured by asking the Member to amend the closing sentence and trim the notice by 22 words.">${state.officerAddendum || `Submitted for the Hon. Speaker's kind decision. The failed clauses at 78(1)(c) & 78(1)(d) may be cured by asking the Member to amend the closing sentence and trim the notice by ~22 words. Two rulings of the Chair (see §3) support each course.`}</textarea>
            </div>
          </div>

          <!-- Ask-about-note (optional flourish per brief) -->
          <div class="ask-box">
            <span class="ico">💬</span>
            <input placeholder="Ask about this note… (e.g. 'is 172 words the strictest count of Rule 78(1)(d)?')">
            <button class="send-btn" onclick="toast('Would query the note-drafter with grounded citations.')">Ask</button>
          </div>
        </div>

        <div class="note-actions">
          <div class="caveat">
            <b>The AI does not decide.</b> This note is a working aid. The Hon. Speaker's decision on the file is final under Rule 28.
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-ghost" onclick="toast('Would save a working draft.')">Save draft</button>
            <button class="btn btn-primary" onclick="sendToSpeaker()">
              <span>Send file to the Speaker</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function fileHeaderCard(pct) {
  return `
    <div class="file-header-card">
      <div class="top-strip">
        <div class="file-no">FILE ${FILE.no}</div>
        <h2>${FILE.subject}</h2>
      </div>
      <div class="body">
        <div class="meta-row"><span class="k">Type</span><span class="v"><span class="pill pill-starred">★ Starred</span></span></div>
        <div class="meta-row"><span class="k">Member</span><span class="v">${FILE.memberName}</span></div>
        <div class="meta-row"><span class="k">Addressed to</span><span class="v" style="max-width:200px;font-size:11px;">${FILE.minister}</span></div>
        <div class="meta-row"><span class="k">Received</span><span class="v">${FILE.received}</span></div>
        <div class="meta-row"><span class="k">On this desk since</span><span class="v">${FILE.arrivedDesk}</span></div>
        <div class="meta-row"><span class="k">House</span><span class="v">${FILE.house}</span></div>
      </div>
    </div>
  `;
}

function clockCard(pct) {
  const isUrgent = FILE.daysLeft <= 2;
  return `
    <div class="clock-card">
      <div class="clock-viz" style="--pct:${pct};">
        <div class="num"><b>${FILE.daysLeft}</b><span>Days left</span></div>
      </div>
      <div class="clock-info">
        <b>Deadline ${FILE.deadline}</b>
        <small>Rule 81 requires the Speaker's decision on admissibility within five clear days of receipt.</small>
        <div class="rule">${isUrgent ? '⚠ Urgent · walk this file up today' : 'On track'}</div>
      </div>
    </div>
  `;
}

function timelineCardHtml() {
  const steps = timelineSteps();
  return `
    <div class="timeline-card">
      <h4>Desk-by-desk timeline</h4>
      <div class="timeline">
        ${steps.map((s, i) => `
          <div class="timeline-step ${s.status}">
            <div class="dot">${s.status === 'done' ? '✓' : (s.status === 'current' ? String(i+1) : String(i+1))}</div>
            <div class="desk">${s.desk}</div>
            <div class="who">${s.who}</div>
            <div class="ts">${s.ts}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function questionCard() {
  return `
    <div class="question-card">
      <h4>The notice · as received</h4>
      <div class="question-body">${FILE.bodyHtml}</div>
      <div class="question-meta">
        <div><div class="k">Word count</div><div class="v" style="color:var(--danger);">172 words <span style="font-weight:500;color:var(--text-muted);font-size:10px;">(limit 150)</span></div></div>
        <div><div class="k">Language</div><div class="v">${FILE.language}</div></div>
        <div><div class="k">Type</div><div class="v">Starred (oral)</div></div>
        <div><div class="k">Question Hour</div><div class="v">Not on a Tuesday</div></div>
      </div>
    </div>
  `;
}

function bindNote() {
  const t = document.getElementById('officerAddendum');
  if (t) {
    t.addEventListener('input', e => { state.officerAddendum = e.target.value; saveState(); });
  }
}

function sendToSpeaker() {
  toast('File dispatched to the Speaker\'s desk.');
  // Auto-switch role for demo continuity
  state.role = 'speaker';
  state.screen = 'speaker';
  render();
}

// ============ SCREEN 3: SPEAKER'S DESK ============
function viewSpeaker() {
  const pct = ((FILE.daysTotal - FILE.daysLeft) / FILE.daysTotal) * 100;
  const now = new Date();
  const nowStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')} · Islamabad`;

  return `
    <div class="speaker-header-card">
      <div class="speaker-avatar">AS</div>
      <div class="who">
        <h2>Sardar Ayaz Sadiq</h2>
        <div class="role">Speaker of the National Assembly · elected 1 March 2024</div>
        <div class="now">${nowStr}</div>
      </div>
      <div class="rule-cite">
        <b>RULE 28</b>
        <p>"The decision of the Speaker on the file or from the Chair shall be final unless the House rescinds it."</p>
      </div>
    </div>

    <div class="note-layout">
      <div>
        ${fileHeaderCard(pct)}
        ${clockCard(pct)}
        ${timelineCardHtml()}
        ${questionCard()}
      </div>

      <div>
        <!-- Officer's note, read-only mode -->
        <div class="note-sheet">
          <div class="note-header">
            <div class="note-stamp" style="border-color:rgba(4,120,87,0.5);color:rgba(4,120,87,0.7);">Received on Speaker's desk</div>
            <div class="note-eyebrow">Section Officer's note · from Saima Malik, Questions Branch</div>
            <div class="note-title">Admissibility of Q-2026-0917</div>
            <div class="note-subtitle">Reviewed by the officer &amp; forwarded on 2 September 2026 · 16:40</div>
          </div>
          <div class="note-body">
            <div class="note-section">
              <h3><span class="num">1</span> What the member is asking</h3>
              <div class="prose"><p>Doctor vacancies at Basic Health Units in NA-120 (Lahore). Four factual asks &mdash; count, vacancies, average duration, corrective steps. Notice also invites the Minister\'s <em>view</em> on adequacy of allocation.</p></div>
            </div>
            <div class="note-section">
              <h3><span class="num">2</span> Rule 78 — two failures noted</h3>
              <div class="checklist">
                ${RULE78.filter(r => !r.pass).map(r => `
                  <div class="check-item fail">
                    <div class="mark">✗</div>
                    <div class="body">
                      <div class="rule">${r.rule} <span class="clause">${r.clause}</span></div>
                      <div class="verdict">${r.verdict}</div>
                      ${r.quoted ? `<div class="quoted">${r.quoted}</div>` : ''}
                    </div>
                  </div>
                `).join('')}
                <div style="padding-top:6px;font-size:11px;color:var(--text-muted);">Five other clauses of Rule 78 &mdash; pointed &amp; single issue, no arguments, Federal subject, not sub judice, not a repetition &mdash; all pass.</div>
              </div>
            </div>
            <div class="note-section">
              <h3><span class="num">3</span> Rulings of the Chair on point</h3>
              <div class="rulings-list">
                ${RULINGS.map(r => `
                  <div class="ruling-card">
                    <div class="rc-head">
                      <span class="id">${r.id}</span>
                      <span class="pg">📎 ${r.pageLabel}</span>
                    </div>
                    <div class="rc-body">
                      <div class="page-thumb"><div class="page-num">p.${r.id.match(/\d+$/)[0].slice(0,3) || '015'}</div></div>
                      <div>
                        <div class="subject">${r.subject}</div>
                        <div class="quote">"${r.holding}"</div>
                        <div class="ctx">Chair · ${r.debateDate}</div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="note-section">
              <h3><span class="num">4</span> Section Officer's line</h3>
              <div class="officer-edit">
                <div style="padding:12px 14px;background:rgba(255,255,255,0.7);border:1px solid var(--note-line);border-radius:8px;font-family:'Fraunces',serif;font-size:13px;line-height:1.6;color:var(--ink);">
                  ${(state.officerAddendum || '').trim() || `Submitted for the Hon. Speaker's kind decision. The failed clauses at 78(1)(c) & 78(1)(d) may be cured by asking the Member to amend the closing sentence and trim the notice by ~22 words. Two rulings of the Chair (see §3) support each course.`}
                </div>
                <div style="font-size:10px;color:var(--text-soft);margin-top:6px;font-family:'JetBrains Mono',monospace;">— Saima Malik, Section Officer · Questions Branch · 2 Sep 2026 · 16:40</div>
              </div>
            </div>
          </div>
        </div>

        <!-- The Speaker's decision panel -->
        <div class="decision-panel">
          <h3>Your decision, Speaker</h3>
          <div class="sub">Under Rule 28, your decision on the file is final. The AI does not sign.</div>

          <div class="decision-choices">
            <div class="decision-choice allow" data-choice="allow" onclick="selectDecision('allow')">
              <div class="verdict">Allow</div>
              <div class="rule-ref">Rule 78 · admitted for the roll</div>
              <div class="desc">Admit the question. It will be placed on the notice paper for the Health Minister\'s oral answer.</div>
            </div>
            <div class="decision-choice reject" data-choice="reject" onclick="selectDecision('reject')">
              <div class="verdict">Reject</div>
              <div class="rule-ref">Disallow · Rule 78</div>
              <div class="desc">Disallow the notice. The Member will be informed and may re-submit within the current session.</div>
            </div>
            <div class="decision-choice amend" data-choice="amend" onclick="selectDecision('amend')">
              <div class="verdict">Fix the wording</div>
              <div class="rule-ref">Amend in form · Rule 78(4)</div>
              <div class="desc">Rewrite the notice below. The amended text is what will be sent to the Minister.</div>
            </div>
          </div>

          <div class="amend-box" id="amendBox">
            <label>Amended wording (in your words)</label>
            <textarea id="amendText" placeholder="Write the wording as it should stand…">${state.amendedText || `Will the Minister for National Health Services, Regulations & Coordination be pleased to state, in respect of constituency NA-120 (Lahore): (a) the number of Basic Health Units presently functioning; (b) the number among them without a posted Medical Officer; (c) the average duration each such vacancy has remained unfilled during the past twelve months; and (d) the steps being taken by the Ministry to recruit and retain qualified doctors?`}</textarea>
          </div>

          <div class="sign-block">
            <div>
              <div class="caption">Signature</div>
              <div class="signature-preview" id="sigPreview">Ayaz Sadiq</div>
              <div style="font-size:10px;color:var(--text-muted);margin-top:2px;font-family:'JetBrains Mono',monospace;">Will bear the seal of the Office of the Speaker</div>
            </div>
            <div class="stamp">Office of<b>Speaker</b>NA</div>
            <button class="btn-sign" id="signBtn" onclick="signDecision()" disabled>
              <span>✒</span><span>Sign &amp; record on file</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindSpeaker() {
  const ta = document.getElementById('amendText');
  if (ta) ta.addEventListener('input', e => { state.amendedText = e.target.value; saveState(); });
}

let pendingChoice = null;
function selectDecision(choice) {
  pendingChoice = choice;
  document.querySelectorAll('.decision-choice').forEach(c => c.classList.remove('active'));
  document.querySelector(`.decision-choice[data-choice="${choice}"]`).classList.add('active');
  document.getElementById('amendBox').classList.toggle('show', choice === 'amend');
  document.getElementById('signBtn').disabled = false;
}

function signDecision() {
  if (!pendingChoice) return;
  state.decision = pendingChoice;
  state.decidedAt = new Date().toISOString();
  saveState();
  toast(pendingChoice === 'allow' ? 'Signed. Question admitted.' :
        pendingChoice === 'reject' ? 'Signed. Question disallowed.' :
        'Signed. Wording amended.');
  // walk file back down to the officer
  state.role = 'officer';
  state.screen = 'returned';
  render();
}

// ============ SCREEN 4: BACK WITH OFFICER ============
function viewReturned() {
  const dec = state.decision || 'allow';
  const decidedAt = state.decidedAt ? new Date(state.decidedAt) : new Date();
  const pct = ((FILE.daysTotal - FILE.daysLeft) / FILE.daysTotal) * 100;

  const decisionText = dec === 'allow'
    ? 'Admitted. Let the question be placed on the notice paper for oral answer by the Health Minister.'
    : dec === 'reject'
      ? 'Disallowed under Rule 78(1)(c) & (d). The Member may re-submit an amended notice within the current Session.'
      : `Admitted in the following amended form —\n\n"${(state.amendedText || '').trim()}"`;

  const banner = dec === 'allow' ? '✓ Admitted' : dec === 'reject' ? '✗ Disallowed' : '✎ Amended in form';

  return `
    <button class="back-link" onclick="goto('note')"><span>←</span><span>Re-open the note</span></button>

    <div class="page-head">
      <h1>File returned to your desk</h1>
      <div class="sub">The Speaker has signed. Carry out the decision.</div>
    </div>

    <div class="note-layout">
      <div>
        ${fileHeaderCard(pct)}
        ${clockCard(pct)}
        ${timelineCardHtml()}
      </div>

      <div>
        <div class="decision-record ${dec}">
          <span class="verdict-banner">${banner}</span>
          <div class="quoted-decision" style="white-space:pre-wrap;">${decisionText}</div>
          <div class="sig-row">
            <div class="sig-left">
              <div class="signature">Ayaz Sadiq</div>
              <div class="printed">Sardar Ayaz Sadiq · Speaker of the National Assembly</div>
              <div class="ts">Signed ${decidedAt.toDateString()} · ${String(decidedAt.getHours()).padStart(2,'0')}:${String(decidedAt.getMinutes()).padStart(2,'0')}</div>
            </div>
            <div class="sig-right">
              <div class="stamp">Office of<b>Speaker</b>NA</div>
            </div>
          </div>
        </div>

        ${nextStepCard(dec)}
      </div>
    </div>
  `;
}

function nextStepCard(dec) {
  if (state.dispatched) {
    return `
      <div class="next-step-card">
        <div class="icon-big" style="background:#ecfdf5;color:var(--success);">✓</div>
        <div class="body">
          <h4>Decision carried out</h4>
          <p>The file has been actioned. Under Rule 82, the Minister\'s answer &mdash; when it comes &mdash; will be printed with the question if it arrives at least 48 hours before Question Hour. It does not return to the Speaker for approval.</p>
        </div>
      </div>
    `;
  }

  if (dec === 'allow' || dec === 'amend') {
    return `
      <div class="next-step-card">
        <div class="icon-big">↗</div>
        <div class="body">
          <h4>Next step: send this question to the Health Minister</h4>
          <p>The admitted ${dec === 'amend' ? 'amended ' : ''}text will be transmitted to the Ministry of National Health Services for a starred (oral) answer at the next available Question Hour.</p>
        </div>
        <button class="btn btn-primary" onclick="dispatchToMinister()">
          <span>Dispatch to Minister</span><span>↗</span>
        </button>
      </div>
    `;
  }

  return `
    <div class="next-step-card reject">
      <div class="icon-big">✉</div>
      <div class="body">
        <h4>Next step: inform the Member</h4>
        <p>Draft a letter to ${FILE.memberName} noting the question will not be asked, citing Rule 78(1)(c) and (1)(d), and inviting an amended notice within this Session.</p>
      </div>
      <button class="btn btn-primary" onclick="dispatchToMinister()">
        <span>Send letter to Member</span><span>↗</span>
      </button>
    </div>
  `;
}

function bindReturned() {}

function dispatchToMinister() {
  state.dispatched = true;
  saveState();
  toast(state.decision === 'reject' ? 'Letter sent to the Member.' : 'Question dispatched to the Health Minister.');
  render();
}

// ============ Login / role plumbing ============
function selectLoginRole(role) {
  document.querySelectorAll('.role-chip').forEach(c => c.classList.toggle('active', c.dataset.role === role));
  document.getElementById('loginEmail').value = role === 'speaker' ? 'speaker@na.gov.pk' : 'so.questions@na.gov.pk';
  state.role = role;
}
function doLogin() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('app').classList.add('show');
  // land the officer on inbox, the speaker on the pending file
  state.screen = state.role === 'speaker'
    ? (state.decision ? 'returned' : 'speaker')
    : (state.decision ? 'returned' : 'inbox');
  render();
}
function logout() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('app').classList.remove('show');
}
function toggleRoleMenu() {
  document.getElementById('roleMenu').classList.toggle('show');
}
document.addEventListener('click', e => {
  if (!e.target.closest('#rolePill') && !e.target.closest('#roleMenu')) {
    document.getElementById('roleMenu').classList.remove('show');
  }
});
function switchRole(role) {
  state.role = role;
  // where does this role land right now?
  if (role === 'speaker') {
    state.screen = state.decision ? 'returned' : 'speaker';
  } else {
    state.screen = state.decision ? 'returned' : (state.screen === 'speaker' ? 'note' : state.screen === 'inbox' ? 'inbox' : 'note');
  }
  document.getElementById('roleMenu').classList.remove('show');
  render();
}

function goto(screen) { state.screen = screen; render(); }

// ============ Toast ============
function toast(msg) {
  const holder = document.getElementById('toastHolder');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span class="ico">✓</span><span>${msg}</span>`;
  holder.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(20px)'; t.style.transition = 'all 0.3s'; }, 2600);
  setTimeout(() => t.remove(), 3000);
}

// If we reloaded mid-flow, auto-land on the app (skip login) if there's already progress
if (state.decision || state.screen !== 'inbox') {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('app').classList.add('show');
    render();
  });
}
