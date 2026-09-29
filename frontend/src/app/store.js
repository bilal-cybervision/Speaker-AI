const KEY = "speaker-office-modules-v1";

function day(offset, hour = 10, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

function seed() {
  return {
    meetings: [
      {
        id: "MTG-2026-118",
        visitor: "H.E. Ambassador of the Republic of Korea",
        category: "Diplomat",
        purpose: "Courtesy call; parliamentary friendship group and a visit by the Korean National Assembly Speaker.",
        preferred: day(2, 11),
        venue: "Diplomatic Lounge",
        screening: "cleared",
        conflict: null,
        status: "requested",
        brief: {
          status: "draft",
          points: [
            "Pakistan–Korea Parliamentary Friendship Group was re-formed in April 2026.",
            "Last Speaker-level visit was in 2019; a return visit is pending.",
            "Talking points from the Ministry of Foreign Affairs are on file.",
          ],
          sources: ["MoFA talking points, 21 Sep 2026", "Meeting record MTG-2019-044"],
        },
        minutes: "",
        actions: [],
      },
      {
        id: "MTG-2026-121",
        visitor: "Delegation of the Chamber of Commerce, Sialkot",
        category: "Public delegation",
        purpose: "Present a memorandum on export facilitation for the Standing Committee on Commerce.",
        preferred: day(3, 15),
        venue: "Speaker's Lounge",
        screening: "pending",
        conflict: "Overlaps the Business Advisory Committee",
        status: "requested",
        brief: { status: "none", points: [], sources: [] },
        minutes: "",
        actions: [],
      },
      {
        id: "MTG-2026-109",
        visitor: "Chief Whip and Leader of the House",
        category: "Member",
        purpose: "Seating plan and time allocation for the joint sitting.",
        preferred: day(-3, 12),
        venue: "Speaker's Chamber",
        screening: "cleared",
        conflict: null,
        status: "held",
        brief: { status: "approved", points: ["Joint sitting on 2 October.", "Opposition requested equal time."], sources: ["Business Advisory Committee note"] },
        minutes: "Agreed time split 55:45. Legislation Branch to share the revised seating plan with both Whips. Secretary to confirm galleries with the Serjeant-at-Arms.",
        actions: [
          { text: "Share the revised seating plan with both Whips.", owner: "Legislation Branch", sent: true },
          { text: "Confirm gallery arrangements with the Serjeant-at-Arms.", owner: "Secretary", sent: false },
        ],
      },
    ],
    speeches: [
      {
        id: "SP-2026-031",
        event: "Convocation, Pakistan Institute for Parliamentary Services",
        date: day(5, 11),
        audience: "Graduating parliamentary staff and MNAs",
        role: "Chief guest",
        minutes: 7,
        lang: "en",
        status: "draft",
        text: "",
        sources: ["PIPS annual report 2025–26", "Speaker's address to PIPS, 2024", "Rules of Procedure, 2007"],
        comments: [{ by: "Director Speeches", text: "Keep it under seven minutes." }],
      },
      {
        id: "SP-2026-029",
        event: "Opening of the Parliamentary Youth Forum",
        date: day(1, 10),
        audience: "University students, Islamabad",
        role: "Keynote",
        minutes: 5,
        lang: "en",
        status: "submitted",
        text: "Young friends, this House belongs to you. Every rule we follow in this Chamber was written so that a voice from the smallest constituency is heard as clearly as any other. Today I ask you to study those rules, to question them, and to use them. Democracy is not a spectator's seat. It is work, done in public, and it is yours to continue.",
        sources: ["Youth Forum concept note", "Speaker's speech at NUST, 2025"],
        comments: [],
      },
    ],
    calls: [
      { id: "C-3391", dir: "in", caller: "Mr. Asif Rehman", org: "Ministry of Parliamentary Affairs", number: "051-920••••", at: day(0, 9, 12), subject: "Supplementary agenda for Thursday", outcome: "message", callback: "pending", link: "" },
      { id: "C-3390", dir: "in", caller: "Protocol Officer", org: "Embassy of the Maldives", number: "051-227••••", at: day(0, 8, 40), subject: "Return visit dates", outcome: "connected", callback: null, link: "LTR-2026-019" },
      { id: "C-3386", dir: "out", caller: "Chief Whip's office", org: "National Assembly", number: "Ext. 4410", at: day(-1, 16, 5), subject: "Joint sitting seating plan", outcome: "connected", callback: null, link: "D-2026-0415" },
      { id: "C-3384", dir: "in", caller: "Ms. Nadia Khan", org: "Daily Dawn", number: "0300-51•••••", at: day(-1, 14, 30), subject: "Request for comment on the Peshawar motion", outcome: "message", callback: "pending", link: "AM-2026-0441" },
    ],
    remote: {
      device: { name: "Speaker's iPad (managed)", enrolled: true, vpn: true, mfa: true, revoked: false },
      items: [
        {
          id: "RM-2026-007",
          title: "Sanction of travel for the Pakistan delegation to the IPU Assembly",
          from: "International Relations Wing",
          deadline: day(0, 21),
          summary: "Five-member delegation, 12–16 October, Geneva. Costs met from the IPU budget line. Needs sanction tonight for visa appointments.",
          status: "pending",
          channel: null,
          decidedAt: null,
          synced: false,
        },
      ],
    },
    media: [
      { id: "MD-901", source: "Daily Dawn", type: "Print", headline: "Speaker refers Secretaries' absence to Establishment Division", snippet: "The Chair directed an inquiry into the absence of Secretaries from the official gallery…", at: day(0, 7), relevance: "high", state: "new" },
      { id: "MD-902", source: "PTV News", type: "TV", headline: "Question Hour: federal education vacancies raised", snippet: "Members sought figures on vacant teaching posts in federal schools…", at: day(0, 8), relevance: "medium", state: "new" },
      { id: "MD-903", source: "X (Twitter)", type: "Social", headline: "Clip of the Speaker's remarks on decorum trends in Islamabad", snippet: "A 40-second clip from yesterday's sitting is widely shared…", at: day(0, 9), relevance: "high", state: "new" },
      { id: "MD-904", source: "The News", type: "Print", headline: "Cricket board announces new selectors", snippet: "Unrelated sports coverage.", at: day(0, 6), relevance: "low", state: "new" },
    ],
    releases: [
      {
        id: "PR-2026-044",
        title: "Speaker to host the Parliamentary Youth Forum",
        text: "Speaker National Assembly Sardar Ayaz Sadiq will inaugurate the Parliamentary Youth Forum at Parliament House tomorrow. Students from twelve universities will attend sessions on the Rules of Procedure and the committee system.",
        status: "submitted",
        sources: ["Youth Forum concept note", "Schedule entry SP-2026-029"],
        releasedAt: null,
      },
    ],
    cards: [
      {
        id: "GC-2026-12",
        occasion: "Independence Day of Türkiye (Republic Day)",
        date: day(31, 9),
        recipients: [
          { group: "Speakers of parliaments", count: 6 },
          { group: "Ambassadors in Islamabad", count: 1 },
          { group: "Friendship group members", count: 14 },
        ],
        channel: "Email and print",
        en: "On behalf of the National Assembly of Pakistan, warm felicitations on Republic Day. May the friendship between our two parliaments continue to deepen.",
        ur: "قومی اسمبلی پاکستان کی جانب سے یومِ جمہوریہ کی دلی مبارکباد۔ دعا ہے کہ ہماری پارلیمانوں کے درمیان دوستی مزید مضبوط ہو۔",
        status: "submitted",
        log: [],
      },
      {
        id: "GC-2026-13",
        occasion: "Iqbal Day",
        date: day(40, 9),
        recipients: [{ group: "Members of the National Assembly", count: 336 }],
        channel: "Print",
        en: "On Iqbal Day, we remember the poet who dreamt of a homeland built on self-respect and service.",
        ur: "یومِ اقبال پر ہم اس شاعر کو یاد کرتے ہیں جس نے خودی اور خدمت پر مبنی وطن کا خواب دیکھا۔",
        status: "draft",
        log: [],
      },
    ],
    week: [
      { day: 0, items: ["Question Hour sitting", "PRA delegation", "Rules Committee"], sitting: true },
      { day: 1, items: ["Youth Forum keynote", "Sitting of the House"], sitting: true },
      { day: 2, items: ["Korean Ambassador (requested)"], sitting: false },
      { day: 3, items: ["Business Advisory Committee", "Sialkot Chamber (requested)"], sitting: true },
      { day: 4, items: ["Joint sitting"], sitting: true },
      { day: 5, items: ["PIPS convocation, chief guest"], sitting: false },
      { day: 6, items: [], sitting: false },
    ],
  };
}

let data = load();

function load() {
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    /* fresh sample set */
  }
  return seed();
}

export function save() {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* still held in this tab */
  }
}

export function resetModules() {
  data = seed();
  save();
}

export function db() {
  return data;
}

export function hoursLeft(iso) {
  return Math.round((new Date(iso).getTime() - Date.now()) / 36e5);
}

export function daysLeft(iso) {
  return Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 864e5));
}

/* Everything outside the file walk that waits for the Speaker's signature. */
export function speakerApprovals() {
  const out = [];
  for (const item of data.remote.items) {
    if (item.status === "pending" && !data.remote.device.revoked) {
      out.push({ id: item.id, kind: "remote", subject: item.title, memberName: item.from, daysLeft: hoursLeft(item.deadline) <= 24 ? 1 : 2, ref: item });
    }
  }
  for (const item of data.meetings) {
    if (item.status === "submitted") out.push({ id: item.id, kind: "meeting", subject: item.visitor, memberName: item.category, daysLeft: daysLeft(item.preferred), ref: item });
  }
  for (const item of data.speeches) {
    if (item.status === "submitted") out.push({ id: item.id, kind: "speech", subject: item.event, memberName: item.role, daysLeft: daysLeft(item.date), ref: item });
  }
  for (const item of data.releases) {
    if (item.status === "submitted") out.push({ id: item.id, kind: "release", subject: item.title, memberName: "Media Wing", daysLeft: 1, ref: item });
  }
  for (const item of data.cards) {
    if (item.status === "submitted") out.push({ id: item.id, kind: "cards", subject: `Greeting cards: ${item.occasion}`, memberName: `${item.recipients.reduce((sum, r) => sum + r.count, 0)} recipients`, daysLeft: Math.min(9, daysLeft(item.date)), ref: item });
  }
  return out;
}

export function decideApproval(item, choice, remark) {
  const ref = item.ref;
  const at = new Date().toISOString();
  const previous = structuredClone(ref);
  if (item.kind === "remote") {
    ref.status = choice === "allow" ? "approved" : "returned";
    ref.channel = "remote";
    ref.decidedAt = at;
    ref.synced = true;
    ref.remark = remark;
  } else if (item.kind === "meeting") {
    ref.status = choice === "allow" ? "approved" : "declined";
    ref.remark = remark;
  } else {
    ref.status = choice === "allow" ? "approved" : "draft";
    ref.remark = remark;
    if (choice !== "allow" && remark) (ref.comments ||= []).push({ by: "Hon. Speaker", text: remark });
  }
  ref.decidedAt = at;
  save();
  return () => {
    for (const key of Object.keys(ref)) delete ref[key];
    Object.assign(ref, previous);
    save();
  };
}

export function find(list, id) {
  return data[list].find((item) => item.id === id);
}

export const SPEECH_DRAFT = {
  "SP-2026-031": "Graduates of the Institute, honourable members, friends. The work you begin today is the quiet work on which a parliament stands. Members speak in the House, but it is your notes, your research and your care with the Rules that let them speak well. The Institute's report this year shows more than four hundred officers trained across all four provinces. I ask each of you to remember that a well-kept record is a form of public service. When a question is answered correctly, when a Bill is drafted clearly, when a committee report is finished on time, the citizen is served, even if no one knows your name. I congratulate you and your families, and I thank the faculty of the Institute.",
};
