/* Layout taken from the prototype. Copy lives in the data module. */
export const template = `<main class="w-full pt-2 bg-surface px-space-lg py-space-lg"><div class="flex flex-col w-full">
<!-- Persistent High-Security Enclave Bar -->
<div class="w-full bg-inverse-surface text-inverse-on-surface rounded-xl px-space-lg py-space-sm mb-space-lg shadow-sm flex flex-col lg:flex-row items-center justify-between gap-space-sm select-none">
<div class="flex items-center gap-space-sm min-w-0">
<span class="flex h-3 w-3 relative">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
<span class="relative inline-flex rounded-full h-3 w-3 bg-secondary-fixed"></span>
</span>
<div class="flex flex-col min-w-0">
<span class="font-label-md text-label-md tracking-wider uppercase text-secondary-fixed flex items-center gap-1">
<span class="material-symbols-outlined text-[16px]">{{t1}}</span>{{t2}}</span>
<span class="font-code-md text-[11px] text-surface-dim/80 truncate">{{t3}}</span>
</div>
</div>
<div class="flex items-center gap-space-md">
<div class="px-space-sm py-1 bg-surface-variant/20 rounded font-code-md text-[11px] text-surface-dim">
<span class="text-secondary-fixed-dim">{{t4}}</span>{{t5}}</div>
<div class="flex items-center gap-1.5 font-code-md text-[12px] bg-tertiary-container text-on-primary px-space-sm py-1 rounded">
<span class="material-symbols-outlined text-[16px] text-secondary-fixed">{{t6}}</span>
<span class="font-semibold text-secondary-fixed" id="remote-session-timer">{{t7}}</span>
</div>
<button class="h-9 px-space-md rounded bg-error text-on-error font-label-md text-label-md hover:bg-error-container hover:text-on-error-container transition-colors flex items-center gap-1" onclick="lockChamberSession()" type="button">
<span class="material-symbols-outlined text-[16px]">{{t8}}</span>
<span>{{t9}}</span>
</button>
</div>
</div>
<!-- Executive Remote Portal Headliner -->
<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-lg">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-space-sm">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">{{t10}}</span>
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>{{t11}}</span>
</div>
<h1 class="font-headline-xl text-headline-xl text-on-surface tracking-tight flex items-baseline gap-space-sm">{{t12}}<span class="font-headline-md text-headline-md text-outline font-normal">{{t13}}</span>
</h1>
<p class="font-body-md text-body-md text-on-surface-variant max-w-3xl">{{t14}}</p>
</div>
<!-- Live Urgent Count Status Badge -->
<div class="flex items-center gap-space-md self-start lg:self-auto bg-surface-container-lowest px-space-lg py-space-sm rounded-xl shadow-sm">
<div class="w-10 h-10 rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[24px]">{{t15}}</span>
</div>
<div class="flex flex-col">
<span class="font-headline-sm text-headline-sm text-on-surface font-bold">{{t16}}</span>
<span class="font-label-sm text-label-sm text-error font-semibold">{{t17}}</span>
</div>
</div>
</div>
<!-- Primary Working Area: 2-Column Split Console -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl">
<!-- Left Column: Spotlight Active Dossier (7 Cols) -->
<div class="lg:col-span-7 flex flex-col gap-space-md">
<div class="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-sm relative overflow-hidden flex flex-col justify-between">
<!-- Sovereign Emblem & Official Registry Metadata -->
<div>
<div class="flex items-start justify-between pb-space-md mb-space-md bg-surface-container-low/40 -mx-space-lg -mt-space-lg lg:-mx-space-xl lg:-mt-space-xl p-space-lg">
<div class="flex items-center gap-space-md">
<div class="w-12 h-12 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-sm shrink-0">
<span class="material-symbols-outlined text-[28px] text-secondary-fixed">{{t18}}</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">{{t19}}</span>
<span class="font-headline-sm text-headline-sm text-on-surface">{{t20}}</span>
<span class="font-code-md text-[11px] text-on-surface-variant">{{t21}}</span>
</div>
</div>
<div class="flex flex-col items-end gap-1">
<span class="px-space-sm py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-code-md text-[10px] tracking-wider uppercase font-bold flex items-center gap-1 shadow-sm">
<span class="material-symbols-outlined text-[13px]">{{t22}}</span>{{t23}}</span>
<span class="font-code-md text-[11px] text-outline">{{t24}}</span>
</div>
</div>
<!-- Document Meta Subject Banner -->
<div class="mb-space-md">
<div class="flex items-center gap-2 mb-1">
<span class="px-2 py-0.5 rounded bg-surface-container-high text-primary font-code-md text-[11px] font-bold">{{t25}}</span>
<span class="text-outline text-[12px]">{{t26}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">{{t27}}</span>
</div>
<h2 class="font-headline-lg text-headline-lg text-on-surface font-bold leading-snug">{{t28}}</h2>
<p class="font-body-md text-body-md text-on-surface-variant font-medium">{{t29}}</p>
</div>
<!-- AI Constitutional Digest Box -->
<div class="bg-surface-container-low rounded-xl p-space-md mb-space-md shadow-sm">
<div class="flex items-center justify-between mb-2">
<div class="flex items-center gap-space-xs text-primary">
<span class="material-symbols-outlined text-[18px] text-secondary">{{t30}}</span>
<span class="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface">{{t31}}</span>
</div>
<span class="font-code-md text-[10px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">{{t32}}</span>
</div>
<p class="font-body-md text-body-md text-on-surface leading-relaxed mb-space-sm">
<strong class="font-semibold text-primary">{{t33}}</strong>{{t34}}<span class="text-secondary font-semibold">{{t35}}</span>{{t36}}</p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-2 bg-surface-container-lowest/60 p-space-sm rounded-lg">
<div class="flex items-start gap-2">
<span class="material-symbols-outlined text-[18px] text-primary shrink-0">{{t37}}</span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm font-semibold text-on-surface">{{t38}}</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">{{t39}}</span>
</div>
</div>
<div class="flex items-start gap-2">
<span class="material-symbols-outlined text-[18px] text-primary shrink-0">{{t40}}</span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm font-semibold text-on-surface">{{t41}}</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">{{t42}}</span>
</div>
</div>
</div>
</div>
<!-- Document Pagination Visualizer / PDF Excerpt -->
<div class="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
<div class="flex items-center justify-between pb-space-xs mb-space-xs text-on-surface-variant">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[16px] text-primary">{{t43}}</span>
<span class="font-label-sm text-label-sm font-semibold">{{t44}}</span>
</div>
<div class="flex items-center gap-2 font-code-md text-[11px]">
<button aria-label="{{a1}}" class="w-6 h-6 flex items-center justify-center rounded bg-surface-container hover:bg-surface-container-high text-on-surface" type="button">
<span class="material-symbols-outlined text-[14px]">{{t45}}</span>
</button>
<span class="font-semibold text-on-surface">{{t46}}</span>
<button aria-label="{{a2}}" class="w-6 h-6 flex items-center justify-center rounded bg-surface-container hover:bg-surface-container-high text-on-surface" type="button">
<span class="material-symbols-outlined text-[14px]">{{t47}}</span>
</button>
</div>
</div>
<div class="bg-surface p-space-md rounded-lg font-code-md text-[12px] leading-relaxed text-on-surface space-y-2">
<p class="text-outline uppercase tracking-wider text-[10px]">{{t48}}</p>
<p class="text-on-surface">{{t49}}<br/>{{t50}}</p>
<div class="flex items-center justify-between pt-2 text-[10px] text-outline">
<span>{{t51}}</span>
<span class="text-secondary font-semibold">{{t52}}</span>
</div>
</div>
</div>
</div>
<!-- Speaker's Annotation Box (Optional handwritten/typed instruction) -->
<div class="mt-space-md pt-space-sm bg-surface-container-low/30 rounded-lg p-space-sm flex items-center gap-space-sm">
<span class="material-symbols-outlined text-secondary text-[20px]">{{t53}}</span>
<div class="flex-1">
<input class="w-full bg-surface-container-lowest px-3 py-2 text-body-sm font-body-sm rounded text-on-surface placeholder:text-outline outline-none focus:bg-surface-container-lowest" id="speaker-note" placeholder="{{a3}}" type="text"/>
</div>
</div>
</div>
</div>
<!-- Right Column: Touch-Optimized Decision Deck (5 Cols) -->
<div class="lg:col-span-5 flex flex-col gap-space-md">
<div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
<div>
<!-- Step 1: Action Selector Heading -->
<div class="flex items-center justify-between pb-space-sm mb-space-md">
<div class="flex items-center gap-2">
<span class="w-6 h-6 rounded-full bg-primary-container text-on-primary font-bold font-code-md text-[12px] flex items-center justify-center">{{t54}}</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">{{t55}}</h3>
</div>
<span class="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">{{t56}}</span>
</div>
<!-- Large Touch Action Targets (Min 56px height for touch ergonomics) -->
<div class="flex flex-col gap-space-sm mb-space-lg" id="action-options-group">
<!-- Option 1: Selected Positive Action -->
<button class="w-full min-h-[58px] p-space-sm rounded-lg bg-primary-container text-on-primary shadow-sm hover:bg-tertiary-container transition-all flex items-center justify-between text-left group" id="btn-action-approve" onclick="selectAction('approve')" type="button">
<div class="flex items-center gap-space-sm">
<div class="w-9 h-9 rounded bg-tertiary text-on-primary flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[20px] text-secondary-fixed">{{t57}}</span>
</div>
<div class="flex flex-col leading-snug">
<span class="font-label-lg text-label-lg font-bold">{{t58}}</span>
<span class="font-body-sm text-body-sm text-primary-fixed-dim/90">{{t59}}</span>
</div>
</div>
<span class="material-symbols-outlined text-secondary-fixed text-[22px] group-hover:translate-x-1 transition-transform">{{t60}}</span>
</button>
<!-- Option 2: Secretariat Observation -->
<button class="w-full min-h-[58px] p-space-sm rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-all flex items-center justify-between text-left group" id="btn-action-observe" onclick="selectAction('observe')" type="button">
<div class="flex items-center gap-space-sm">
<div class="w-9 h-9 rounded bg-surface-container-high text-on-surface flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[20px] text-secondary">{{t61}}</span>
</div>
<div class="flex flex-col leading-snug">
<span class="font-label-lg text-label-lg font-bold text-on-surface">{{t62}}</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">{{t63}}</span>
</div>
</div>
<span class="material-symbols-outlined text-outline text-[20px] group-hover:translate-x-1 transition-transform">{{t64}}</span>
</button>
<!-- Option 3: Morning Conference Referral -->
<button class="w-full min-h-[58px] p-space-sm rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-all flex items-center justify-between text-left group" id="btn-action-defer" onclick="selectAction('defer')" type="button">
<div class="flex items-center gap-space-sm">
<div class="w-9 h-9 rounded bg-surface-container-high text-on-surface flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[20px] text-outline">{{t65}}</span>
</div>
<div class="flex flex-col leading-snug">
<span class="font-label-lg text-label-lg font-bold text-on-surface">{{t66}}</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">{{t67}}</span>
</div>
</div>
<span class="material-symbols-outlined text-outline text-[20px] group-hover:translate-x-1 transition-transform">{{t68}}</span>
</button>
</div>
<!-- Step 2: Strict Biometric / Cryptographic Confirmation Deck -->
<div class="bg-surface-container-low rounded-xl p-space-md shadow-sm">
<div class="flex items-center gap-2 pb-2 mb-2">
<span class="w-6 h-6 rounded-full bg-secondary text-on-secondary font-bold font-code-md text-[12px] flex items-center justify-center">{{t69}}</span>
<h4 class="font-headline-sm text-headline-sm text-on-surface font-bold">{{t70}}</h4>
</div>
<!-- Warning Notice -->
<div class="p-space-sm bg-surface-container-lowest rounded-lg mb-space-md">
<p class="font-body-sm text-body-sm text-on-surface leading-normal">
<span class="font-semibold text-primary">{{t71}}</span>{{t72}}<strong>{{t73}}</strong>{{t74}}<code class="font-code-md text-secondary font-bold">{{t75}}</code>{{t76}}</p>
</div>
<!-- Hardware Security Token Indicator -->
<div class="flex items-center justify-between p-space-sm bg-surface-container rounded-lg mb-space-md">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-[22px] text-primary">{{t77}}</span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm font-bold text-on-surface uppercase">{{t78}}</span>
<span class="font-code-md text-[11px] text-primary font-semibold">{{t79}}</span>
</div>
</div>
<!-- Simulated Key Indicator Pins -->
<div class="flex items-center gap-1.5" title="{{a4}}">
<span class="w-3 h-3 rounded-full bg-primary"></span>
<span class="w-3 h-3 rounded-full bg-primary"></span>
<span class="w-3 h-3 rounded-full bg-primary"></span>
<span class="w-3 h-3 rounded-full bg-primary"></span>
</div>
</div>
<!-- Primary Dispatch Call to Action (60px Height for high clarity / no miss) -->
<button class="w-full h-[60px] rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg font-bold tracking-wide uppercase shadow-md hover:bg-tertiary-container active:scale-[0.99] transition-all flex items-center justify-center gap-space-sm" id="btn-dispatch-final" onclick="executeDigitalDispatch()" type="button">
<span class="material-symbols-outlined text-[24px] text-secondary-fixed">{{t80}}</span>
<span>{{t81}}</span>
</button>
<div class="mt-2 text-center">
<span class="font-code-md text-[10px] text-outline">{{t82}}</span>
</div>
</div>
</div>
<!-- Speaker Audit Trace Footer -->
<div class="mt-space-md pt-space-xs flex items-center justify-between text-outline font-code-md text-[10px]">
<span>{{t83}}</span>
<span class="text-secondary font-semibold">{{t84}}</span>
</div>
</div>
</div>
</div>
<!-- Bottom Row: High-Clarity Queue of Other Remote Pending Files -->
<div class="flex flex-col gap-space-sm">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-[20px]">{{t85}}</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">{{t86}}</h3>
</div>
<span class="font-label-sm text-label-sm text-outline">{{t87}}</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<!-- Queue Card 2 -->
<div class="cursor-pointer bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group" onclick="switchFile('NA-24-DEF-012')">
<div class="flex items-start justify-between gap-space-sm mb-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-2 mb-1">
<span class="px-2 py-0.5 rounded bg-surface-container font-code-md text-[10px] font-bold text-on-surface">{{t88}}</span>
<span class="font-label-sm text-label-sm text-error font-semibold flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-error"></span>{{t89}}</span>
</div>
<h4 class="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">{{t90}}</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mt-1">{{t91}}</p>
</div>
<span class="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors shrink-0">
<span class="material-symbols-outlined text-[20px]">{{t92}}</span>
</span>
</div>
<div class="flex items-center justify-between pt-space-xs bg-surface-container-low/40 px-space-sm py-1 rounded">
<span class="font-code-md text-[11px] text-outline">{{t93}}</span>
<span class="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1">{{t94}}<span class="material-symbols-outlined text-[14px]">{{t95}}</span>
</span>
</div>
</div>
<!-- Queue Card 3 -->
<div class="cursor-pointer bg-surface-container-lowest p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group" onclick="switchFile('NA-24-DIP-055')">
<div class="flex items-start justify-between gap-space-sm mb-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-2 mb-1">
<span class="px-2 py-0.5 rounded bg-surface-container font-code-md text-[10px] font-bold text-on-surface">{{t96}}</span>
<span class="font-label-sm text-label-sm text-error font-semibold flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-error"></span>{{t97}}</span>
</div>
<h4 class="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">{{t98}}</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mt-1">{{t99}}</p>
</div>
<span class="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors shrink-0">
<span class="material-symbols-outlined text-[20px]">{{t100}}</span>
</span>
</div>
<div class="flex items-center justify-between pt-space-xs bg-surface-container-low/40 px-space-sm py-1 rounded">
<span class="font-code-md text-[11px] text-outline">{{t101}}</span>
<span class="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1">{{t102}}<span class="material-symbols-outlined text-[14px]">{{t103}}</span>
</span>
</div>
</div>
</div>
</div>
<!-- Interactive JavaScript Handling Remote Confirmation & Countdown -->

</div></main>`;
