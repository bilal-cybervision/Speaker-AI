/* Chrome copied from the prototype shell. */
export const asideMarkup = `<aside id="shell-aside" class="fixed left-0 top-0 h-screen w-64 bg-primary-container z-50 flex flex-col justify-between select-none shadow-[1px_0_0_0_#163f25]">
  <div class="flex flex-col">
    <!-- Logo -->
    <div class="px-space-md py-space-md bg-tertiary flex items-center gap-space-sm">
      <img alt="National Assembly Crest" class="h-8 w-auto object-contain shrink-0" src="/assets/proto-01.jpg"/>
      <div class="flex flex-col min-w-0">
        <span class="font-label-sm text-label-sm text-on-primary uppercase tracking-wider truncate">National Assembly</span>
        <span class="font-label-sm text-label-sm text-secondary-fixed truncate">Speaker's Secretariat</span>
        <span class="font-label-sm text-label-sm text-primary-fixed-dim/80 text-[10px] leading-tight truncate">ایوانِ زیریں پاکستان</span>
      </div>
    </div>

    <!-- Module Label -->
    <div class="px-space-md py-space-xs">
      <span class="font-label-sm text-label-sm text-primary-fixed-dim/70 uppercase tracking-widest">Official Modules</span>
    </div>

    <!-- Navigation -->
    <nav id="shell-nav" class="flex flex-col gap-1 px-space-xs overflow-y-auto max-h-[calc(100vh-210px)]" id="main-nav">
      <a class="nav-link flex items-center gap-space-sm px-space-sm py-2 rounded-lg transition-colors cursor-pointer bg-tertiary-container text-on-primary font-label-lg" data-module="overview-dashboard" data-page="dashboard" href="#/secretariat/dashboard">
        <span class="material-symbols-outlined text-[18px]">dashboard</span>
        <div class="flex flex-col leading-tight min-w-0">
          <span class="font-label-md text-label-md truncate">Home / Overview</span>
          <span class="font-label-sm text-label-sm text-primary-fixed-dim/60 text-[9px]">ڈیش بورڈ</span>
        </div>
      </a>
      <a class="nav-link flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-primary-fixed-dim hover:bg-tertiary-container hover:text-on-primary transition-colors cursor-pointer" data-module="files-documents" data-page="files" href="#/secretariat/files">
        <span class="material-symbols-outlined text-[18px]">folder_open</span>
        <div class="flex flex-col leading-tight min-w-0">
          <span class="font-label-md text-label-md truncate">1. Files & Documents</span>
          <span class="font-label-sm text-label-sm text-primary-fixed-dim/60 text-[9px]">فائلز و دستاویزات</span>
        </div>
      </a>
      <a class="nav-link flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-primary-fixed-dim hover:bg-tertiary-container hover:text-on-primary transition-colors cursor-pointer" data-module="directions-decisions" data-page="directions" href="#/secretariat/directions">
        <span class="material-symbols-outlined text-[18px]">gavel</span>
        <div class="flex flex-col leading-tight min-w-0">
          <span class="font-label-md text-label-md truncate">2. Directions & Decisions</span>
          <span class="font-label-sm text-label-sm text-primary-fixed-dim/60 text-[9px]">احکامات و تعمیل</span>
        </div>
      </a>
      <a class="nav-link flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-primary-fixed-dim hover:bg-tertiary-container hover:text-on-primary transition-colors cursor-pointer" data-module="official-meetings" data-page="meetings" href="#/secretariat/meetings">
        <span class="material-symbols-outlined text-[18px]">groups</span>
        <div class="flex flex-col leading-tight min-w-0">
          <span class="font-label-md text-label-md truncate">3. Official Meetings</span>
          <span class="font-label-sm text-label-sm text-primary-fixed-dim/60 text-[9px]">سرکاری ملاقاتیں</span>
        </div>
      </a>
      <a class="nav-link flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-primary-fixed-dim hover:bg-tertiary-container hover:text-on-primary transition-colors cursor-pointer" data-module="daily-schedule" data-page="schedule" href="#/secretariat/schedule">
        <span class="material-symbols-outlined text-[18px]">calendar_today</span>
        <div class="flex flex-col leading-tight min-w-0">
          <span class="font-label-md text-label-md truncate">4. Daily Schedule</span>
          <span class="font-label-sm text-label-sm text-primary-fixed-dim/60 text-[9px]">روزنامچہ و نظام الاوقات</span>
        </div>
      </a>
      <a class="nav-link flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-primary-fixed-dim hover:bg-tertiary-container hover:text-on-primary transition-colors cursor-pointer" data-module="speeches-engagements" data-page="speeches" href="#/secretariat/speeches">
        <span class="material-symbols-outlined text-[18px]">record_voice_over</span>
        <div class="flex flex-col leading-tight min-w-0">
          <span class="font-label-md text-label-md truncate">5. Speeches & Visits</span>
          <span class="font-label-sm text-label-sm text-primary-fixed-dim/60 text-[9px]">تقاریر و دورہ جات</span>
        </div>
      </a>
      <a class="nav-link flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-primary-fixed-dim hover:bg-tertiary-container hover:text-on-primary transition-colors cursor-pointer" data-module="telephone-log" data-page="calls" href="#/secretariat/calls">
        <span class="material-symbols-outlined text-[18px]">phone_in_talk</span>
        <div class="flex flex-col leading-tight min-w-0">
          <span class="font-label-md text-label-md truncate">6. Telephone Log</span>
          <span class="font-label-sm text-label-sm text-primary-fixed-dim/60 text-[9px]">ٹیلیفون پیغامات</span>
        </div>
      </a>
      <a class="nav-link flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-primary-fixed-dim hover:bg-tertiary-container hover:text-on-primary transition-colors cursor-pointer" data-module="remote-approvals" data-page="approvals" href="#/secretariat/approvals">
        <span class="material-symbols-outlined text-[18px]">verified</span>
        <div class="flex flex-col leading-tight min-w-0">
          <span class="font-label-md text-label-md truncate">7. Remote Approvals</span>
          <span class="font-label-sm text-label-sm text-primary-fixed-dim/60 text-[9px]">ریموٹ منظوری</span>
        </div>
      </a>
      <a class="nav-link flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-primary-fixed-dim hover:bg-tertiary-container hover:text-on-primary transition-colors cursor-pointer" data-module="media-press" data-page="press" href="#/secretariat/press">
        <span class="material-symbols-outlined text-[18px]">newspaper</span>
        <div class="flex flex-col leading-tight min-w-0">
          <span class="font-label-md text-label-md truncate">8. Media & Press</span>
          <span class="font-label-sm text-label-sm text-primary-fixed-dim/60 text-[9px]">میڈیا و نشریات</span>
        </div>
      </a>
      <a class="nav-link flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-primary-fixed-dim hover:bg-tertiary-container hover:text-on-primary transition-colors cursor-pointer" data-module="greeting-cards" data-page="cards" href="#/secretariat/cards">
        <span class="material-symbols-outlined text-[18px]">mark_email_read</span>
        <div class="flex flex-col leading-tight min-w-0">
          <span class="font-label-md text-label-md truncate">9. Greeting Cards</span>
          <span class="font-label-sm text-label-sm text-primary-fixed-dim/60 text-[9px]">تہنیتی پیغامات</span>
        </div>
      </a>
    </nav>
  </div>

  <!-- Security Footer -->
  <div class="p-space-sm bg-tertiary/60 mx-space-xs mb-space-sm rounded-lg flex flex-col gap-1">
    <div class="flex items-center justify-between">
      <span class="font-code-md text-[10px] text-secondary-fixed uppercase tracking-wider font-semibold">SECURITY: LEVEL 1</span>
      <span class="font-code-md text-[10px] text-primary-fixed-dim/70">SECRET</span>
    </div>
    <div class="flex items-center justify-between text-primary-fixed-dim/60 text-[10px] font-code-md">
      <span>GovCloud PK</span>
      <span>v3.4.1 NA</span>
    </div>
  </div>
</aside>`;
export const headerMarkup = `<header id="shell-header" class="h-16 bg-surface-container-lowest z-40 flex items-center justify-between px-space-lg shadow-[0_2px_0_0_#01411c] shrink-0">
    <div class="flex items-center gap-space-sm">
      <img alt="National Assembly Crest" class="h-8 w-auto object-contain" src="/assets/proto-01.jpg"/>
      <div class="flex flex-col leading-tight">
        <span class="font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight">Speaker AI Portal</span>
        <span class="font-label-sm text-label-sm text-on-surface-variant">Chamber Secretariat | Legislative Intelligence</span>
      </div>
    </div>
    <div class="flex-1 max-w-xl mx-space-lg">
      <div class="relative flex items-center">
        <span class="material-symbols-outlined absolute left-3 text-outline text-[18px]">search</span>
        <input class="w-full pl-9 pr-14 py-1.5 bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline rounded-lg outline-none focus:ring-1 focus:ring-primary-container" placeholder="Search motions, files, rulings, gazettes, verbatim transcripts (Ctrl + K)..." type="text"/>
        <kbd class="absolute right-2 font-code-md text-[10px] bg-surface-container px-1.5 py-0.5 rounded text-secondary font-semibold">Ctrl+K</kbd>
      </div>
    </div>
    <div class="flex items-center gap-space-md">
      <button class="flex items-center gap-1 px-space-xs py-1 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface" type="button">
        <span class="material-symbols-outlined text-[16px]">translate</span>
        <span>EN | اردو</span>
      </button>
      <div class="flex items-center gap-1.5 px-2 py-1 bg-surface-container-low rounded-lg">
        <span class="w-2 h-2 rounded-full bg-secondary"></span>
        <span class="font-label-sm text-label-sm text-on-surface font-semibold">16th National Assembly</span>
      </div>
      <div class="relative flex items-center justify-center p-1 rounded-lg text-on-surface-variant hover:text-on-surface cursor-pointer">
        <span class="material-symbols-outlined text-[20px]">notifications</span>
        <span class="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full ring-2 ring-surface-container-lowest"></span>
      </div>
      <div class="flex items-center gap-space-sm pl-space-xs">
        <div class="flex flex-col text-right leading-tight">
          <span class="font-label-md text-label-md text-on-surface font-semibold">Hon. Sardar Ayaz Sadiq</span>
          <span class="font-label-sm text-label-sm text-outline">Speaker, National Assembly</span>
        </div>
        <img alt="Sardar Ayaz Sadiq, Speaker of the National Assembly" class="w-8 h-8 rounded-full object-cover object-[center_22%] ring-1 ring-outline-variant" src="/assets/speaker-ayaz-sadiq.png"/>
      </div>
    </div>
  </header>`;
export const fabMarkup = `<!-- AI FAB Button -->
<div class="fixed bottom-6 right-6 z-[60]">
  <button class="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-[0_4px_12px_rgba(1,65,28,0.35)] ring-2 ring-secondary-fixed hover:bg-tertiary-container transition-all" type="button" onclick="toggleAI()">
    <span class="material-symbols-outlined text-[24px]">auto_awesome</span>
  </button>
</div>`;
