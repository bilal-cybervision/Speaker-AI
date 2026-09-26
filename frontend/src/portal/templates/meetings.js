/* Layout taken from the prototype. Copy lives in the data module. */
export const template = `<main class="w-full pt-2 bg-surface px-space-lg py-space-lg"><div class="flex flex-col w-full">
<!-- Top Sovereign Header Bar -->
<header class="flex flex-col gap-space-sm pb-space-md mb-space-lg shadow-sm bg-surface-container-lowest p-space-lg rounded-xl">
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-space-xs">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">{{t1}}</span>
<span class="font-code-md text-[10px] text-outline px-1.5 py-0.5 bg-surface-container-low rounded">{{t2}}</span>
</div>
<div class="flex items-baseline gap-space-sm flex-wrap">
<h1 class="font-headline-xl text-headline-xl text-on-surface tracking-tight">{{t3}}</h1>
<span class="font-headline-md text-headline-md text-secondary font-medium tracking-wide">{{t4}}</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant max-w-3xl">{{t5}}</p>
</div>
<div class="flex items-center gap-space-sm self-start lg:self-center">
<button class="flex items-center gap-space-xs px-3 py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors" type="button">
<span class="material-symbols-outlined text-[18px] text-outline">{{t6}}</span>
<span class="font-label-md text-label-md">{{t7}}</span>
</button>
<button class="flex items-center gap-space-xs px-4 py-2 rounded-lg bg-primary-container text-on-primary hover:bg-tertiary-container shadow-md transition-all" type="button">
<span class="material-symbols-outlined text-[18px]">{{t8}}</span>
<span class="font-label-lg text-label-lg font-semibold">{{t9}}</span>
</button>
</div>
</div>
<!-- Tab Strip & Filter Controls -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-sm mt-space-xs bg-surface-container-low p-2 rounded-lg">
<div class="flex items-center gap-1.5">
<button class="tab-btn px-4 py-2 rounded-lg font-label-md text-label-md bg-primary-container text-on-primary font-semibold shadow-sm transition-all flex items-center gap-2" id="tab-btn-1" onclick="switchTab(1)" type="button">
<span class="material-symbols-outlined text-[18px]">{{t10}}</span>
<span>{{t11}}</span>
<span class="px-1.5 py-0.2 bg-secondary text-surface-container-lowest font-code-md text-[10px] rounded-full font-bold">{{t12}}</span>
</button>
<button class="tab-btn px-4 py-2 rounded-lg font-label-md text-label-md bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-2" id="tab-btn-2" onclick="switchTab(2)" type="button">
<span class="material-symbols-outlined text-[18px]">{{t13}}</span>
<span>{{t14}}</span>
<span class="w-2 h-2 rounded-full bg-secondary"></span>
</button>
</div>
<div class="flex items-center gap-2 px-2">
<span class="font-label-sm text-label-sm text-outline">{{t15}}</span>
<select class="bg-surface-container-lowest text-on-surface font-label-sm text-label-sm px-2.5 py-1.5 rounded-lg outline-none cursor-pointer">
<option>{{t16}}</option>
<option>{{t17}}</option>
<option>{{t18}}</option>
</select>
</div>
</div>
</header>
<!-- TAB 1 CONTENT: Protocol Queue & Conflict Validation -->
<div class="flex flex-col gap-space-lg" id="tab-content-1">
<!-- Queue Metric Summary Strip -->
<section class="grid grid-cols-2 md:grid-cols-4 gap-space-md">
<div class="flex items-center justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">{{t19}}</span>
<div class="flex items-baseline gap-2 mt-1">
<span class="font-display-lg text-display-lg text-primary font-bold">{{t20}}</span>
<span class="font-label-sm text-label-sm text-secondary font-semibold">{{t21}}</span>
</div>
</div>
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary-container">
<span class="material-symbols-outlined text-[20px]">{{t22}}</span>
</div>
</div>
<div class="flex items-center justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">{{t23}}</span>
<div class="flex items-baseline gap-2 mt-1">
<span class="font-display-lg text-display-lg text-primary font-bold">{{t24}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">{{t25}}</span>
</div>
</div>
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary-container">
<span class="material-symbols-outlined text-[20px]">{{t26}}</span>
</div>
</div>
<div class="flex items-center justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">{{t27}}</span>
<div class="flex items-baseline gap-2 mt-1">
<span class="font-display-lg text-display-lg text-primary font-bold">{{t28}}</span>
<span class="font-label-sm text-label-sm text-error font-medium">{{t29}}</span>
</div>
</div>
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary-container">
<span class="material-symbols-outlined text-[20px]">{{t30}}</span>
</div>
</div>
<div class="flex items-center justify-between p-space-md bg-surface-container-lowest rounded-xl shadow-sm">
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">{{t31}}</span>
<div class="flex items-baseline gap-2 mt-1">
<span class="font-display-lg text-display-lg text-primary font-bold">{{t32}}</span>
<span class="font-label-sm text-label-sm text-outline">{{t33}}</span>
</div>
</div>
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary-container">
<span class="material-symbols-outlined text-[20px]">{{t34}}</span>
</div>
</div>
</section>
<!-- Queue Dossier Cards List -->
<section class="flex flex-col gap-space-md">
<!-- Card 1: Diplomatic Protocol Tier-1 (Turkiye) -->
<article class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div class="flex flex-col lg:flex-row lg:items-start justify-between gap-space-md">
<div class="flex items-start gap-space-md">
<div class="relative shrink-0">
<img class="w-16 h-16 rounded-xl object-cover shadow-sm bg-surface-container" data-alt="Official portrait photograph of His Excellency Dr. Mehmet Pacaci, Ambassador Extraordinary and Plenipotentiary of Turkey to Pakistan in formal attire with Turkish diplomatic seal backdrop." src="/assets/proto-03.jpg"/>
<span class="absolute -bottom-1 -right-1 px-1 py-0.5 bg-primary-container text-on-primary font-code-md text-[9px] rounded font-bold">{{t35}}</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-space-xs flex-wrap">
<span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold tracking-wider uppercase">{{t36}}</span>
<span class="font-code-md text-[11px] text-outline">{{t37}}</span>
<span class="font-label-sm text-label-sm text-secondary font-medium">{{t38}}</span>
</div>
<h2 class="font-headline-md text-headline-md text-on-surface mt-1">{{t39}}</h2>
<div class="flex items-center gap-space-md mt-1 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t40}}</span>
<strong>{{t41}}</strong>
</span>
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t42}}</span>{{t43}}</span>
<span class="flex items-center gap-1 font-code-md text-[11px] text-outline">
<span class="material-symbols-outlined text-[15px]">{{t44}}</span>{{t45}}</span>
</div>
</div>
</div>
<!-- Conflict Status Pill -->
<div class="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-lg self-start">
<span class="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-on-surface font-semibold">{{t46}}</span>
<span class="font-code-md text-[10px] text-primary-container">{{t47}}</span>
</div>
</div>
</div>
<!-- Purpose & Summary Strip -->
<div class="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1">
<span class="font-label-sm text-label-sm text-outline font-semibold uppercase tracking-wider">{{t48}}</span>
<p class="font-body-md text-body-md text-on-surface">{{t49}}</p>
</div>
<!-- AI Generated Dossier Card -->
<div class="p-space-md bg-surface-container rounded-xl flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5 text-primary-container">
<span class="material-symbols-outlined text-[18px] text-secondary">{{t50}}</span>
<span class="font-label-sm text-label-sm uppercase font-bold tracking-wide">{{t51}}</span>
</div>
<span class="font-code-md text-[10px] text-outline font-medium">{{t52}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
<strong>{{t53}}</strong>{{t54}}</p>
<div class="flex items-center gap-space-md pt-1 flex-wrap font-label-sm text-label-sm text-outline">
<span>{{t55}}<strong>{{t56}}</strong></span>
<span>{{t57}}<strong>{{t58}}</strong></span>
<span>{{t59}}<strong>{{t60}}</strong></span>
</div>
</div>
<!-- Action Command Bar -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs">
<div class="flex items-center gap-2 text-outline font-code-md text-[11px]">
<span class="material-symbols-outlined text-[16px]">{{t61}}</span>
<span>{{t62}}</span>
</div>
<div class="flex items-center gap-space-sm flex-wrap">
<button class="px-3.5 py-1.5 rounded-lg bg-surface-container text-error hover:bg-error-container transition-colors font-label-md text-label-md font-semibold" type="button">{{t63}}</button>
<button class="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-primary-container hover:bg-surface-container font-label-md text-label-md font-semibold transition-colors" type="button">{{t64}}</button>
<button class="px-4 py-1.5 rounded-lg bg-primary-container text-on-primary hover:bg-tertiary-container shadow-sm font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5" type="button">
<span class="material-symbols-outlined text-[16px]">{{t65}}</span>{{t66}}</button>
</div>
</div>
</article>
<!-- Card 2: Parliamentary Delegation (PRA) with Conflict Warning -->
<article class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div class="flex flex-col lg:flex-row lg:items-start justify-between gap-space-md">
<div class="flex items-start gap-space-md">
<div class="relative shrink-0">
<img class="w-16 h-16 rounded-xl object-cover shadow-sm bg-surface-container" data-alt="Documentary style shot of the Parliamentary Reporters Association media briefing room in Islamabad, Pakistan with journalists, microphones, and official press badges." src="/assets/proto-04.jpg"/>
<span class="absolute -bottom-1 -right-1 px-1 py-0.5 bg-secondary text-surface-container-lowest font-code-md text-[9px] rounded font-bold">{{t67}}</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-space-xs flex-wrap">
<span class="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold tracking-wider uppercase">{{t68}}</span>
<span class="font-code-md text-[11px] text-outline">{{t69}}</span>
<span class="font-label-sm text-label-sm text-secondary font-medium">{{t70}}</span>
</div>
<h2 class="font-headline-md text-headline-md text-on-surface mt-1">{{t71}}</h2>
<div class="flex items-center gap-space-md mt-1 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t72}}</span>
<strong>{{t73}}</strong>
</span>
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t74}}</span>{{t75}}</span>
<span class="flex items-center gap-1 font-code-md text-[11px] text-outline">
<span class="material-symbols-outlined text-[15px]">{{t76}}</span>{{t77}}</span>
</div>
</div>
</div>
<!-- Conflict Status Pill: Warning -->
<div class="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-lg self-start">
<span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-on-surface font-semibold">{{t78}}</span>
<span class="font-code-md text-[10px] text-secondary">{{t79}}</span>
</div>
</div>
</div>
<div class="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1">
<span class="font-label-sm text-label-sm text-outline font-semibold uppercase tracking-wider">{{t80}}</span>
<p class="font-body-md text-body-md text-on-surface">{{t81}}</p>
</div>
<div class="p-space-md bg-surface-container rounded-xl flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5 text-primary-container">
<span class="material-symbols-outlined text-[18px] text-secondary">{{t82}}</span>
<span class="font-label-sm text-label-sm uppercase font-bold tracking-wide">{{t83}}</span>
</div>
<span class="font-code-md text-[10px] text-outline font-medium">{{t84}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
<strong>{{t85}}</strong>{{t86}}</p>
</div>
<!-- Action Command Bar -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs">
<span class="text-secondary font-label-sm text-label-sm flex items-center gap-1">
<span class="material-symbols-outlined text-[16px]">{{t87}}</span>{{t88}}</span>
<div class="flex items-center gap-space-sm flex-wrap">
<button class="px-3.5 py-1.5 rounded-lg bg-surface-container text-outline hover:text-on-surface font-label-md text-label-md font-semibold transition-colors" type="button">{{t89}}</button>
<button class="px-3.5 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-semibold transition-colors" type="button">{{t90}}</button>
<button class="px-4 py-1.5 rounded-lg bg-secondary text-surface-container-lowest hover:bg-on-secondary-container shadow-sm font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5" type="button">
<span class="material-symbols-outlined text-[16px]">{{t91}}</span>{{t92}}</button>
</div>
</div>
</article>
<!-- Card 3: Inter-Provincial Dignitary -->
<article class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div class="flex flex-col lg:flex-row lg:items-start justify-between gap-space-md">
<div class="flex items-start gap-space-md">
<div class="relative shrink-0">
<img class="w-16 h-16 rounded-xl object-cover shadow-sm bg-surface-container" data-alt="Official architectural seal and insignia of the Provincial Assembly of Balochistan, set within an elegant parliamentary certificate framing with green and gold tones." src="/assets/proto-05.jpg"/>
<span class="absolute -bottom-1 -right-1 px-1 py-0.5 bg-primary-container text-on-primary font-code-md text-[9px] rounded font-bold">{{t93}}</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-space-xs flex-wrap">
<span class="px-2 py-0.5 rounded bg-surface-container-high text-primary-container font-label-sm text-label-sm font-semibold tracking-wider uppercase">{{t94}}</span>
<span class="font-code-md text-[11px] text-outline">{{t95}}</span>
<span class="font-label-sm text-label-sm text-secondary font-medium">{{t96}}</span>
</div>
<h2 class="font-headline-md text-headline-md text-on-surface mt-1">{{t97}}</h2>
<div class="flex items-center gap-space-md mt-1 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t98}}</span>
<strong>{{t99}}</strong>
</span>
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t100}}</span>{{t101}}</span>
<span class="flex items-center gap-1 font-code-md text-[11px] text-primary-container">
<span class="material-symbols-outlined text-[15px]">{{t102}}</span>{{t103}}</span>
</div>
</div>
</div>
<!-- Conflict Status Pill: Cleared -->
<div class="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-lg self-start">
<span class="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-on-surface font-semibold">{{t104}}</span>
<span class="font-code-md text-[10px] text-primary-container">{{t105}}</span>
</div>
</div>
</div>
<div class="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1">
<span class="font-label-sm text-label-sm text-outline font-semibold uppercase tracking-wider">{{t106}}</span>
<p class="font-body-md text-body-md text-on-surface">{{t107}}</p>
</div>
<!-- Action Command Bar -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs">
<div class="flex items-center gap-2 font-code-md text-[11px] text-outline">
<span>{{t108}}</span>
<span>{{t109}}</span>
<span>{{t110}}</span>
</div>
<div class="flex items-center gap-space-sm flex-wrap">
<button class="px-3.5 py-1.5 rounded-lg bg-surface-container text-outline hover:text-on-surface font-label-md text-label-md font-semibold transition-colors" type="button">{{t111}}</button>
<button class="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-primary-container hover:bg-surface-container font-label-md text-label-md font-semibold transition-colors" type="button">{{t112}}</button>
<button class="px-4 py-1.5 rounded-lg bg-primary-container text-on-primary hover:bg-tertiary-container shadow-sm font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5" type="button">
<span class="material-symbols-outlined text-[16px]">{{t113}}</span>{{t114}}</button>
</div>
</div>
</article>
</section>
</div>
<!-- TAB 2 CONTENT / COLLAPSIBLE LOWER PANEL: Post-Meeting Minutes & Direct Action Item Converter -->
<section class="mt-space-xl flex flex-col gap-space-lg" id="tab-content-2">
<!-- Header of Section -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[22px]">{{t115}}</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-2">
<h2 class="font-headline-md text-headline-md text-on-surface">{{t116}}</h2>
<span class="font-code-md text-[10px] px-1.5 py-0.5 bg-surface-container text-outline rounded font-semibold">{{t117}}</span>
</div>
<span class="font-label-sm text-label-sm text-outline">{{t118}}</span>
</div>
</div>
<div class="flex items-center gap-space-xs">
<button class="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors flex items-center gap-1" type="button">
<span class="material-symbols-outlined text-[16px]">{{t119}}</span>{{t120}}</button>
<button class="px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-tertiary-container transition-all flex items-center gap-1" type="button">
<span class="material-symbols-outlined text-[16px]">{{t121}}</span>{{t122}}</button>
</div>
</div>
<!-- AI Transcription Audio Sync Console -->
<div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md p-space-md bg-surface-container-low rounded-xl">
<div class="flex items-center gap-space-md">
<button class="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:bg-tertiary-container transition-transform active:scale-95 shadow-sm" type="button">
<span class="material-symbols-outlined text-[24px]">{{t123}}</span>
</button>
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-label-lg text-label-lg text-on-surface font-semibold">{{t124}}</span>
<span class="font-code-md text-[11px] text-secondary font-bold">{{t125}}</span>
<span class="px-1.5 py-0.5 rounded bg-primary-fixed-dim/40 text-on-primary-fixed-variant font-code-md text-[9px] font-bold">{{t126}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{{t127}}<strong>{{t128}}</strong>{{t129}}</p>
</div>
</div>
<!-- Inline Audio Waveform SVG Data-Viz -->
<div class="w-full md:w-64 flex flex-col gap-1">
<div class="flex justify-between font-code-md text-[10px] text-outline">
<span>{{t130}}</span>
<span>{{t131}}</span>
</div>
<svg class="w-full h-8 text-primary-container" fill="none" viewbox="0 0 240 32">
<rect fill="currentColor" height="12" opacity="0.6" rx="1" width="3" x="2" y="10"></rect>
<rect fill="currentColor" height="20" rx="1" width="3" x="8" y="6"></rect>
<rect fill="currentColor" height="8" opacity="0.5" rx="1" width="3" x="14" y="12"></rect>
<rect fill="currentColor" height="24" rx="1" width="3" x="20" y="4"></rect>
<rect fill="currentColor" height="16" opacity="0.8" rx="1" width="3" x="26" y="8"></rect>
<rect fill="currentColor" height="4" opacity="0.4" rx="1" width="3" x="32" y="14"></rect>
<rect fill="currentColor" height="28" rx="1" width="3" x="38" y="2"></rect>
<rect fill="currentColor" height="18" opacity="0.7" rx="1" width="3" x="44" y="7"></rect>
<rect fill="currentColor" height="10" opacity="0.5" rx="1" width="3" x="50" y="11"></rect>
<rect fill="currentColor" height="22" rx="1" width="3" x="56" y="5"></rect>
<rect fill="currentColor" height="14" opacity="0.7" rx="1" width="3" x="62" y="9"></rect>
<rect fill="currentColor" height="6" opacity="0.3" rx="1" width="3" x="68" y="13"></rect>
<rect fill="currentColor" height="26" rx="1" width="3" x="74" y="3"></rect>
<rect fill="currentColor" height="16" opacity="0.8" rx="1" width="3" x="80" y="8"></rect>
<rect fill="currentColor" height="12" opacity="0.6" rx="1" width="3" x="86" y="10"></rect>
<rect fill="currentColor" height="22" rx="1" width="3" x="92" y="5"></rect>
<rect fill="currentColor" height="8" opacity="0.4" rx="1" width="3" x="98" y="12"></rect>
<rect fill="currentColor" height="24" rx="1" width="3" x="104" y="4"></rect>
<rect fill="currentColor" height="14" opacity="0.7" rx="1" width="3" x="110" y="9"></rect>
<rect fill="currentColor" height="4" opacity="0.3" rx="1" width="3" x="116" y="14"></rect>
<rect fill="currentColor" height="28" rx="1" width="3" x="122" y="2"></rect>
<rect fill="currentColor" height="20" rx="1" width="3" x="128" y="6"></rect>
<rect fill="currentColor" height="10" opacity="0.5" rx="1" width="3" x="134" y="11"></rect>
<rect fill="currentColor" height="18" opacity="0.8" rx="1" width="3" x="140" y="7"></rect>
<rect fill="currentColor" height="6" opacity="0.4" rx="1" width="3" x="146" y="13"></rect>
<rect fill="currentColor" height="24" rx="1" width="3" x="152" y="4"></rect>
<rect fill="currentColor" height="16" opacity="0.7" rx="1" width="3" x="158" y="8"></rect>
<rect fill="currentColor" height="12" opacity="0.6" rx="1" width="3" x="164" y="10"></rect>
<rect fill="currentColor" height="20" rx="1" width="3" x="170" y="6"></rect>
<rect fill="currentColor" height="8" opacity="0.5" rx="1" width="3" x="176" y="12"></rect>
<rect fill="currentColor" height="22" rx="1" width="3" x="182" y="5"></rect>
<rect fill="currentColor" height="14" opacity="0.7" rx="1" width="3" x="188" y="9"></rect>
<rect fill="currentColor" height="4" opacity="0.3" rx="1" width="3" x="194" y="14"></rect>
<rect fill="currentColor" height="26" rx="1" width="3" x="200" y="3"></rect>
<rect fill="currentColor" height="18" opacity="0.8" rx="1" width="3" x="206" y="7"></rect>
<rect fill="currentColor" height="10" opacity="0.5" rx="1" width="3" x="212" y="11"></rect>
<rect fill="currentColor" height="20" rx="1" width="3" x="218" y="6"></rect>
<rect fill="currentColor" height="12" opacity="0.6" rx="1" width="3" x="224" y="10"></rect>
<rect fill="currentColor" height="6" opacity="0.4" rx="1" width="3" x="230" y="13"></rect>
<rect fill="currentColor" height="16" rx="1" width="3" x="236" y="8"></rect>
</svg>
</div>
</div>
<!-- Key Discussion Highlights -->
<div class="flex flex-col gap-1 p-space-md bg-surface-container rounded-xl">
<span class="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">{{t132}}</span>
<p class="font-body-md text-body-md text-on-surface">{{t133}}</p>
</div>
<!-- Action Items Extracted by AI Table/Stack -->
<div class="flex flex-col gap-space-sm pt-space-xs">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-secondary">{{t134}}</span>
<span class="font-headline-sm text-headline-sm text-on-surface">{{t135}}</span>
</div>
<span class="font-label-sm text-label-sm text-outline">{{t136}}</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md mt-1">
<!-- Item 1 -->
<div class="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between gap-space-md">
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="px-2 py-0.5 rounded bg-surface-container text-secondary font-code-md text-[10px] font-bold">{{t137}}</span>
<span class="flex items-center gap-1 font-label-sm text-label-sm text-secondary font-semibold">
<span class="w-2 h-2 rounded-full bg-secondary"></span>{{t138}}</span>
</div>
<p class="font-body-md text-body-md text-on-surface font-medium leading-snug">{{t139}}</p>
<div class="flex flex-col gap-1 pt-1 font-label-sm text-label-sm text-outline">
<div class="flex items-center justify-between">
<span>{{t140}}</span>
<strong class="text-on-surface">{{t141}}</strong>
</div>
<div class="flex items-center justify-between">
<span>{{t142}}</span>
<strong class="text-on-surface font-code-md">{{t143}}</strong>
</div>
</div>
</div>
<div class="flex items-center justify-between pt-space-xs">
<button class="text-outline hover:text-on-surface font-label-sm text-label-sm flex items-center gap-1" type="button">
<span class="material-symbols-outlined text-[15px]">{{t144}}</span>{{t145}}</button>
<button class="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary hover:bg-tertiary-container shadow-sm font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1.5" id="push-btn-1" onclick="executePush(1)" type="button">
<span class="material-symbols-outlined text-[16px]">{{t146}}</span>{{t147}}</button>
</div>
</div>
<!-- Item 2 -->
<div class="p-space-md bg-surface-container-low rounded-xl flex flex-col justify-between gap-space-md">
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="px-2 py-0.5 rounded bg-surface-container text-primary-container font-code-md text-[10px] font-bold">{{t148}}</span>
<span class="flex items-center gap-1 font-label-sm text-label-sm text-primary-container font-semibold">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>{{t149}}</span>
</div>
<p class="font-body-md text-body-md text-on-surface font-medium leading-snug">{{t150}}</p>
<div class="flex flex-col gap-1 pt-1 font-label-sm text-label-sm text-outline">
<div class="flex items-center justify-between">
<span>{{t151}}</span>
<strong class="text-on-surface">{{t152}}</strong>
</div>
<div class="flex items-center justify-between">
<span>{{t153}}</span>
<strong class="text-on-surface font-code-md">{{t154}}</strong>
</div>
</div>
</div>
<div class="flex items-center justify-between pt-space-xs">
<span class="font-code-md text-[11px] text-outline">{{t155}}</span>
<button class="px-3 py-1.5 rounded-lg bg-surface-container text-primary-container font-label-sm text-label-sm font-semibold flex items-center gap-1.5 cursor-default" disabled="" type="button">
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t156}}</span>{{t157}}</button>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Persistent Floating AI Assistant Launcher -->
<div class="fixed bottom-6 right-6 z-40">
<button class="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-lg hover:bg-tertiary-container transition-all group relative" onclick="toggleSecretariatAI()" type="button">
<span class="material-symbols-outlined text-[24px]">{{t158}}</span>
<span class="sr-only">{{t159}}</span>
<span class="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full"></span>
</button>
</div>
</div>
</main>`;
