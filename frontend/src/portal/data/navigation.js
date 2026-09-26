/* Route table and the extra Speaker-shell links. Module labels stay in the shell markup taken from the prototype. */

export const speakerRoutes = {
  "files-and-documents": "files",
  "follow-up-of-directions": "directions",
  "official-meetings": "meetings",
  "schedule-management": "schedule",
  "speeches-and-tours": "speeches",
  "telephone-calls": "calls",
  "remote-approval": "approvals",
  "press-and-media": "press",
  "greeting-cards": "cards",
};

export const speakerExtras = [
  {
    id: "desk",
    icon: "account_balance",
    label: "Speaker's Desk",
    urdu: "اسپیکر ڈیسک",
    place: "start",
  },
  {
    id: "follow-up",
    icon: "assignment_turned_in",
    label: "Follow-up Review",
    urdu: "جائزہ تعمیل",
    place: "after:follow-up-of-directions",
  },
  {
    id: "ai",
    icon: "auto_awesome",
    label: "AI Assistant",
    urdu: "معاونِ اسپیکر",
    place: "end",
  },
];

export const shellSwitch = {
  speaker: "Speaker View",
  secretariat: "Staff View",
};

export const titles = {
  dashboard: "Executive Chamber Dashboard",
  files: "Files & Documents",
  directions: "Directions & Decisions",
  meetings: "Official Meetings",
  schedule: "Daily Schedule",
  speeches: "Speeches & Engagements",
  calls: "Telephone Log",
  approvals: "Remote Approvals",
  press: "Media & Press",
  cards: "Greeting Cards",
  desk: "Speaker's Desk",
  "follow-up": "Follow-up of Directions",
  ai: "AI Assistant",
};
