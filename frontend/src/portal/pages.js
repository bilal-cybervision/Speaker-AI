import { slots as dashboardSlots } from "./data/dashboard.js";
import { template as dashboardTemplate } from "./templates/dashboard.js";
import { mount as mountDashboard } from "./behaviors/dashboard.js";
import { slots as filesSlots } from "./data/files.js";
import { template as filesTemplate } from "./templates/files.js";
import { mount as mountFiles } from "./behaviors/files.js";
import { slots as directionsSlots } from "./data/directions.js";
import { template as directionsTemplate } from "./templates/directions.js";
import { mount as mountDirections } from "./behaviors/directions.js";
import { slots as meetingsSlots } from "./data/meetings.js";
import { template as meetingsTemplate } from "./templates/meetings.js";
import { mount as mountMeetings } from "./behaviors/meetings.js";
import { slots as scheduleSlots } from "./data/schedule.js";
import { template as scheduleTemplate } from "./templates/schedule.js";
import { mount as mountSchedule } from "./behaviors/schedule.js";
import { slots as speechesSlots } from "./data/speeches.js";
import { template as speechesTemplate } from "./templates/speeches.js";
import { mount as mountSpeeches } from "./behaviors/speeches.js";
import { slots as callsSlots } from "./data/calls.js";
import { template as callsTemplate } from "./templates/calls.js";
import { mount as mountCalls } from "./behaviors/calls.js";
import { slots as approvalsSlots } from "./data/approvals.js";
import { template as approvalsTemplate } from "./templates/approvals.js";
import { mount as mountApprovals } from "./behaviors/approvals.js";
import { slots as pressSlots } from "./data/press.js";
import { template as pressTemplate } from "./templates/press.js";
import { mount as mountPress } from "./behaviors/press.js";
import { slots as cardsSlots } from "./data/cards.js";
import { template as cardsTemplate } from "./templates/cards.js";
import { mount as mountCards } from "./behaviors/cards.js";
import { slots as deskSlots } from "./data/desk.js";
import { template as deskTemplate } from "./templates/desk.js";
import { mount as mountDesk } from "./behaviors/desk.js";
import { slots as followSlots } from "./data/follow-up.js";
import { template as followTemplate } from "./templates/follow-up.js";
import { mount as mountFollow } from "./behaviors/follow-up.js";
import { slots as aiSlots } from "./data/ai.js";
import { template as aiTemplate } from "./templates/ai.js";
import { mount as mountAi } from "./behaviors/ai.js";
import { slots as drawerSlots } from "./data/ai-drawer.js";
import { template as drawerTemplate } from "./templates/ai-drawer.js";

function page(slots, template, mount, theme, speakerOnly) {
  return { slots, template, mount, theme, speakerOnly };
}

export const pages = {
  dashboard: page(dashboardSlots, dashboardTemplate, mountDashboard, "a", false),
  files: page(filesSlots, filesTemplate, mountFiles, "a", false),
  directions: page(directionsSlots, directionsTemplate, mountDirections, "a", false),
  meetings: page(meetingsSlots, meetingsTemplate, mountMeetings, "a", false),
  schedule: page(scheduleSlots, scheduleTemplate, mountSchedule, "a", false),
  speeches: page(speechesSlots, speechesTemplate, mountSpeeches, "a", false),
  calls: page(callsSlots, callsTemplate, mountCalls, "a", false),
  approvals: page(approvalsSlots, approvalsTemplate, mountApprovals, "a", false),
  press: page(pressSlots, pressTemplate, mountPress, "a", false),
  cards: page(cardsSlots, cardsTemplate, mountCards, "a", false),
  desk: page(deskSlots, deskTemplate, mountDesk, "b", true),
  "follow-up": page(followSlots, followTemplate, mountFollow, "b", true),
  ai: page(aiSlots, aiTemplate, mountAi, "b", true),
};

export const drawer = { slots: drawerSlots, template: drawerTemplate };
