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
        code: "CER-TURK-2026-01",
        chip: "Türkiye",
        occasion: "Republic of Türkiye Republic Day",
        longTitle: "101st Anniversary of the Proclamation of the Republic of Türkiye",
        date: day(5, 9),
        priority: true,
        stage: "active",
        stageLabel: "Campaign Active",
        targetLine: "Target: H.E. Turkish Speaker & Parliamentary Group",
        targets: 32,
        channel: "Diplomatic bag and print",
        status: "submitted",
        focusId: "r1",
        selectAll: true,
        en: "On the auspicious occasion of the Republic Day of the Republic of Türkiye, I have the distinct honor to convey, on behalf of the National Assembly of Pakistan and the people of Pakistan, our warmest felicitations and heartfelt fraternal greetings to Your Excellency, the members of the Grand National Assembly, and the brotherly people of Türkiye.",
        en2: "The enduring bond between our two parliaments reflects the deep-rooted brotherhood and strategic partnership that our nations cherish. May the Republic of Türkiye continue to prosper under your distinguished leadership, and may our parliamentary solidarity ever deepen in service of global peace and bilateral fraternity.",
        antalya: "We also recall with warmth our bilateral discussions during the 14th APA Plenary in Antalya.",
        ur: "جمہوریہ ترکیہ کے یومِ جمہوریہ کے پرمسرت موقع پر، مجھے قومی اسمبلی پاکستان اور عوام کی جانب سے عزت مآب، اراکینِ پارلیمان اور ترک عوام کے لیے دلی مبارکباد اور اخوت کے جذبات پیش کرنے کا اعزاز حاصل ہے۔ پاک ترک لازوال برادرانہ تعلقات دونوں قوموں کے پختہ عزم کی ترجمانی کرتے ہیں۔",
        lang: {
          name: "Türkçe",
          dir: "ltr",
          text: "Türkiye Cumhuriyeti'nin Cumhuriyet Bayramı münasebetiyle, Pakistan Millî Meclisi ve Pakistan halkı adına Zat-ı Âlinize, Türkiye Büyük Millet Meclisi üyelerine ve kardeş Türkiye halkına en içten kutlamalarımı sunarım. İki meclisimiz arasındaki kardeşlik bağının daim olmasını dilerim.",
        },
        recipients: [{ group: "Tier-1 foreign speakers", count: 32 }],
        roster: [
          { id: "r1", name: "H.E. Prof. Dr. Numan Kurtulmuş", tier: 1, role: "Speaker of Grand National Assembly of Türkiye", place: "Ankara • GNAT/2024/09", salute: "Excellency, Prof. Dr. Numan Kurtulmuş", line: "President of the Grand National Assembly of the Republic of Türkiye, Ankara", mark: "AI Draft Ready", tone: "green", selected: true, tongue: "Türkçe" },
          { id: "r2", name: "H.E. Dr. Mehmet Paçacı", tier: 2, role: "Ambassador of Republic of Türkiye to Pakistan", place: "Diplomatic Enclave, Islamabad", salute: "Excellency, Dr. Mehmet Paçacı", line: "Ambassador of the Republic of Türkiye, Islamabad", mark: "AI Draft Ready", tone: "green", selected: true, tongue: "Türkçe" },
          { id: "r3", name: "Ch. Pakistan-Türkiye Friendship Group", tier: 3, role: "Parliamentary Friendship Group • National Assembly", place: "Chamber Wing C, Parliament House", salute: "Honourable Members of the Friendship Group", line: "Pakistan–Türkiye Parliamentary Friendship Group, National Assembly", mark: "Custom Note Added", tone: "green", selected: true, tongue: "Türkçe" },
          { id: "r4", name: "Hon. Speaker of Federal National Council", tier: 1, role: "Federal National Council • United Arab Emirates", place: "Abu Dhabi / UAE Secretariat", salute: "Honourable Speaker", line: "Federal National Council, Abu Dhabi", mark: "Queued", tone: "muted", selected: false },
          { id: "r5", name: "H.E. Speaker of Lok Sabha", tier: 1, role: "Parliament of India • Diwali Felicitations", place: "New Delhi / MoFA Desk", salute: "Honourable Speaker", line: "Lok Sabha, New Delhi", mark: "Under Policy Review", tone: "gold", selected: false },
        ],
        touches: [
          { id: "locale", label: "Addressee language · Türkçe", note: "The card carries a Turkish draft for the Speaker in Ankara.", on: true },
          { id: "antalya", label: "Include Antalya bilateral note", note: "Reference bilateral discussions during 14th APA Plenary in Antalya.", on: true },
          { id: "urdu", label: "Urdu parallel calligraphy block", note: "Include verified official Urdu translation insert on the fold.", on: true },
          { id: "seal", label: "Digital Signature Seal", note: "Apply Hon. Speaker's embossed Gold Foil seal stamp.", on: true },
          { id: "mofa", label: "Copy to MoFA Enclave Desk", note: "Direct archive dispatch to Ministry of Foreign Affairs Turkey Desk.", on: false },
        ],
        log: [],
      },
      {
        id: "GC-2026-16",
        code: "CER-KSA-2026-05",
        chip: "Saudi Arabia",
        occasion: "National Day of the Kingdom of Saudi Arabia",
        longTitle: "National Day greeting to the Speaker of the Shura Council",
        date: day(12, 9),
        priority: false,
        stage: "drafting",
        stageLabel: "Arabic draft ready",
        targetLine: "Target: H.E. Speaker of the Shura Council, Riyadh",
        targets: 18,
        channel: "Diplomatic bag",
        status: "draft",
        focusId: "s1",
        selectAll: false,
        en: "On the National Day of the Kingdom of Saudi Arabia, I convey, on behalf of the National Assembly of Pakistan and the people of Pakistan, our warmest felicitations to Your Excellency, the Shura Council, and the brotherly people of the Kingdom.",
        en2: "May the long friendship between our two countries, and the cooperation between our parliaments, continue to deepen.",
        antalya: "",
        ur: "مملکتِ سعودی عرب کے یومِ قومی کے موقع پر قومی اسمبلی پاکستان کی جانب سے معزز اسپیکر، شوریٰ کونسل اور بھائی چارے والے سعودی عوام کو دلی مبارکباد۔",
        lang: {
          name: "العربية",
          dir: "rtl",
          text: "يسعدني، باسم الجمعية الوطنية الباكستانية وشعب باكستان، أن أتقدم إلى معاليكم وإلى مجلس الشورى والشعب السعودي الشقيق بخالص التهاني بمناسبة اليوم الوطني للمملكة العربية السعودية، داعيًا الله أن يديم أواصر الأخوة بين بلدينا ومجلسينا.",
        },
        recipients: [{ group: "Saudi counterparts", count: 18 }],
        roster: [
          { id: "s1", name: "H.E. Speaker of the Shura Council", tier: 1, role: "Majlis ash-Shura • Kingdom of Saudi Arabia", place: "Riyadh", salute: "Excellency", line: "Speaker of the Shura Council, Riyadh", mark: "Arabic draft ready", tone: "green", selected: true, tongue: "العربية" },
          { id: "s2", name: "H.E. Ambassador of the Kingdom of Saudi Arabia", tier: 2, role: "Ambassador to Pakistan", place: "Diplomatic Enclave, Islamabad", salute: "Excellency", line: "Embassy of the Kingdom of Saudi Arabia, Islamabad", mark: "Arabic draft ready", tone: "green", selected: true, tongue: "العربية" },
        ],
        touches: [
          { id: "locale", label: "Addressee language · العربية", note: "The card carries an Arabic draft for Riyadh.", on: true },
          { id: "urdu", label: "Urdu parallel calligraphy block", note: "Include the Urdu insert on the fold.", on: true },
          { id: "seal", label: "Digital Signature Seal", note: "Apply the Speaker's seal after he signs.", on: false },
        ],
        log: [],
      },
      {
        id: "GC-2026-13",
        code: "CER-IQB-2026-02",
        chip: "Iqbal Day",
        occasion: "Iqbal Day (National Occasion)",
        longTitle: "Iqbal Day message to the House and the diplomatic corps",
        date: day(16, 9),
        priority: false,
        stage: "drafting",
        stageLabel: "Drafting Stage",
        targetLine: "Target: Nationwide & Diplomatic Corps",
        targets: 184,
        channel: "Print",
        status: "draft",
        focusId: "q1",
        selectAll: false,
        en: "On Iqbal Day, the National Assembly remembers the poet who dreamt of a homeland built on self-respect and service. We send this greeting to every Member, and to the missions accredited in Islamabad.",
        en2: "The words are a draft from Protocol. The Speaker approves the batch before a single card is printed.",
        antalya: "",
        ur: "یومِ اقبال پر قومی اسمبلی اس شاعر کو یاد کرتی ہے جس نے خودی اور خدمت پر مبنی وطن کا خواب دیکھا۔",
        recipients: [{ group: "Members and missions", count: 184 }],
        roster: [
          { id: "q1", name: "Members of the National Assembly", tier: 3, role: "All sitting Members", place: "Parliament House", salute: "Honourable Members", line: "National Assembly of Pakistan", mark: "Draft", tone: "gold", selected: true },
          { id: "q2", name: "Dean of the Diplomatic Corps", tier: 2, role: "Diplomatic corps in Islamabad", place: "Diplomatic Enclave", salute: "Excellency", line: "Dean of the Diplomatic Corps", mark: "Draft", tone: "gold", selected: false },
        ],
        touches: [
          { id: "urdu", label: "Urdu parallel calligraphy block", note: "Iqbal's verse is set in Nastaliq on the fold.", on: true },
          { id: "seal", label: "Digital Signature Seal", note: "Apply the Speaker's seal after approval.", on: false },
          { id: "mofa", label: "Copy to MoFA Enclave Desk", note: "Send the diplomatic copy through the Ministry of Foreign Affairs.", on: false },
        ],
        log: [],
      },
      {
        id: "GC-2026-14",
        code: "CER-OMN-2026-03",
        chip: "Oman",
        occasion: "National Day of Sultanate of Oman",
        longTitle: "National Day greeting to the Speaker of the Consultative Assembly of Oman",
        date: day(25, 9),
        priority: false,
        stage: "scheduled",
        stageLabel: "Scheduled",
        targetLine: "Target: Speaker Consultative Assembly Oman",
        targets: 12,
        channel: "Diplomatic bag",
        status: "scheduled",
        focusId: "o1",
        selectAll: false,
        en: "The National Assembly of Pakistan sends its warmest wishes on the National Day of the Sultanate of Oman, and its regards to the Consultative Assembly.",
        en2: "This dossier is on the calendar. Drafting has not started.",
        antalya: "",
        ur: "سلطنتِ عمان کے یومِ قومی کے موقع پر قومی اسمبلی پاکستان دلی مبارکباد پیش کرتی ہے۔",
        lang: {
          name: "العربية",
          dir: "rtl",
          text: "أتقدم، باسم الجمعية الوطنية الباكستانية، بأطيب التهاني إلى معاليكم وإلى مجلس الشورى بمناسبة العيد الوطني لسلطنة عُمان. دامت علاقات الأخوة بين بلدينا.",
        },
        recipients: [{ group: "Omani counterparts", count: 12 }],
        roster: [
          { id: "o1", name: "Speaker of the Consultative Assembly", tier: 1, role: "Majlis A'Shura • Sultanate of Oman", place: "Muscat", salute: "Honourable Speaker", line: "Consultative Assembly, Muscat", mark: "Scheduled", tone: "muted", selected: false, tongue: "العربية" },
        ],
        touches: [
          { id: "locale", label: "Addressee language · العربية", note: "Arabic draft for Muscat. Protocol has not put this up yet.", on: true },
          { id: "urdu", label: "Urdu parallel calligraphy block", note: "Urdu insert is not drafted yet.", on: false },
          { id: "seal", label: "Digital Signature Seal", note: "Seal is applied only after the Speaker signs.", on: false },
        ],
        log: [],
      },
      {
        id: "GC-2026-15",
        code: "CER-QAD-2026-04",
        chip: "Quaid-e-Azam",
        occasion: "Quaid-e-Azam Birthday & Christmas",
        longTitle: "Quaid-e-Azam Day and Christmas greetings",
        date: day(62, 9),
        priority: false,
        stage: "queued",
        stageLabel: "Dossier Queued",
        targetLine: "Target: Christian Members of NA & Heads of State",
        targets: 96,
        channel: "Print and diplomatic bag",
        status: "queued",
        focusId: "d1",
        selectAll: false,
        en: "On the birthday of Quaid-e-Azam Mohammad Ali Jinnah, and at Christmas, the Speaker sends the greetings of the National Assembly.",
        en2: "The list is queued. Protocol has not opened the draft.",
        antalya: "",
        ur: "یومِ ولادتِ قائد اعظم اور کرسمس کے موقع پر قومی اسمبلی کی جانب سے نیک تمنائیں۔",
        recipients: [{ group: "Members and heads of state", count: 96 }],
        roster: [
          { id: "d1", name: "Christian Members of the National Assembly", tier: 3, role: "Members • Christmas greeting", place: "Parliament House", salute: "Honourable Members", line: "National Assembly of Pakistan", mark: "Queued", tone: "muted", selected: false },
        ],
        touches: [
          { id: "urdu", label: "Urdu parallel calligraphy block", note: "Not drafted.", on: false },
          { id: "seal", label: "Digital Signature Seal", note: "Not applied.", on: false },
        ],
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
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.cards?.[0]?.lang) parsed.cards = seed().cards;
      return parsed;
    }
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
