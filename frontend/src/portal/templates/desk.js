/* Layout taken from the prototype. Copy lives in the data module. */
export const template = `<main class="relative pt-16 bg-surface min-h-screen"><div class="flex flex-col w-full">
<div class="w-full max-w-[1440px] mx-auto px-margin md:px-margin-desktop py-space-lg space-y-space-xl">
<!-- Top Section: Institutional Greeting & State Context -->
<section class="bg-surface-container-lowest p-space-lg md:p-space-xl rounded border border-outline-variant/60 relative overflow-hidden shadow-sm">
<div class="absolute -right-8 -top-8 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg relative z-10">
<div class="space-y-1.5 min-w-0">
<div class="flex items-center gap-space-sm flex-wrap">
<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-primary-container font-semibold uppercase tracking-wider">
<span class="material-symbols-outlined text-[14px]">{{t1}}</span>{{t2}}</span>
<span class="text-outline-variant">{{t3}}</span>
<span class="font-body-sm text-body-sm text-secondary">{{t4}}</span>
<span class="text-outline-variant">{{t5}}</span>
<span class="font-body-sm text-body-sm text-secondary font-medium">{{t6}}</span>
</div>
<div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 pt-1">
<h1 class="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">{{t7}}</h1>
<span class="font-headline-sm text-headline-sm text-primary-container font-semibold font-['Noto_Nastaliq_Urdu'] leading-relaxed" dir="rtl">{{t8}}</span>
</div>
<p class="font-body-sm text-body-sm text-secondary flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-tertiary-container">{{t9}}</span>{{t10}}</p>
</div>
<!-- Quick Executive Actions -->
<div class="flex items-center gap-space-sm flex-wrap shrink-0">
<button class="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors cursor-pointer active:translate-y-px" type="button">
<span class="material-symbols-outlined text-[18px]">{{t11}}</span>
<span>{{t12}}</span>
</button>
<button class="inline-flex items-center gap-2 px-3 py-2 rounded bg-surface-container-lowest text-on-surface font-label-md text-label-md border border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer" type="button">
<span class="material-symbols-outlined text-[18px] text-secondary">{{t13}}</span>
<span>{{t14}}</span>
</button>
<button class="inline-flex items-center gap-2 px-3 py-2 rounded bg-surface-container-lowest text-on-surface font-label-md text-label-md border border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer" type="button">
<span class="material-symbols-outlined text-[18px] text-secondary">{{t15}}</span>
<span>{{t16}}</span>
</button>
</div>
</div>
</section>
<!-- Institutional Metric Cards (4 Tiles) -->
<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
<!-- Card 1 -->
<div class="bg-surface-container-lowest p-space-lg rounded border border-outline-variant/70 border-t-[3px] border-t-primary-container flex flex-col justify-between h-full shadow-sm">
<div class="flex items-start justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">{{t17}}</span>
<span class="material-symbols-outlined text-[20px] text-primary-container">{{t18}}</span>
</div>
<div class="my-space-md">
<span class="font-display text-display font-bold text-on-surface tracking-tight">{{t19}}</span>
<p class="font-body-sm text-body-sm text-secondary mt-1 flex items-center gap-1.5">
<span class="h-2 w-2 rounded-full bg-error"></span>{{t20}}</p>
</div>
<div class="pt-space-xs border-t border-surface-container flex items-center justify-between text-label-sm font-label-sm">
<span class="text-secondary">{{t21}}</span>
<span class="text-primary-container font-semibold">{{t22}}</span>
</div>
</div>
<!-- Card 2 -->
<div class="bg-surface-container-lowest p-space-lg rounded border border-outline-variant/70 border-t-[3px] border-t-primary-container flex flex-col justify-between h-full shadow-sm">
<div class="flex items-start justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">{{t23}}</span>
<span class="material-symbols-outlined text-[20px] text-primary-container">{{t24}}</span>
</div>
<div class="my-space-md">
<span class="font-display text-display font-bold text-on-surface tracking-tight">{{t25}}</span>
<p class="font-body-sm text-body-sm text-secondary mt-1 truncate">{{t26}}</p>
</div>
<div class="pt-space-xs border-t border-surface-container flex items-center justify-between text-label-sm font-label-sm">
<span class="text-secondary">{{t27}}</span>
<span class="text-primary-container font-semibold">{{t28}}</span>
</div>
</div>
<!-- Card 3: Urgency State -->
<div class="bg-surface-container-lowest p-space-lg rounded border border-outline-variant/70 border-t-[3px] border-t-on-tertiary-container flex flex-col justify-between h-full shadow-sm">
<div class="flex items-start justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-fixed-variant font-semibold">{{t29}}</span>
<span class="material-symbols-outlined text-[20px] text-on-tertiary-container">{{t30}}</span>
</div>
<div class="my-space-md">
<div class="flex items-baseline gap-2">
<span class="font-display text-display font-bold text-on-surface tracking-tight">{{t31}}</span>
<span class="px-1.5 py-0.5 rounded text-[10px] font-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-bold">{{t32}}</span>
</div>
<p class="font-body-sm text-body-sm text-secondary mt-1 truncate">{{t33}}</p>
</div>
<div class="pt-space-xs border-t border-surface-container flex items-center justify-between text-label-sm font-label-sm">
<span class="text-secondary">{{t34}}</span>
<span class="text-on-tertiary-fixed-variant font-semibold">{{t35}}</span>
</div>
</div>
<!-- Card 4 -->
<div class="bg-surface-container-lowest p-space-lg rounded border border-outline-variant/70 border-t-[3px] border-t-primary-container flex flex-col justify-between h-full shadow-sm">
<div class="flex items-start justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">{{t36}}</span>
<span class="material-symbols-outlined text-[20px] text-primary-container">{{t37}}</span>
</div>
<div class="my-space-md">
<span class="font-display text-display font-bold text-on-surface tracking-tight">{{t38}}</span>
<p class="font-body-sm text-body-sm text-secondary mt-1 truncate">{{t39}}</p>
</div>
<div class="pt-space-xs border-t border-surface-container flex items-center justify-between text-label-sm font-label-sm">
<span class="text-secondary">{{t40}}</span>
<span class="text-primary-container font-semibold">{{t41}}</span>
</div>
</div>
</section>
<!-- Two-Column Operations Layout: Left Schedule (40%), Right Decision Deck (60%) -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
<!-- Left Column: Daily Schedule -->
<div class="lg:col-span-5 bg-surface-container-lowest rounded border border-outline-variant/70 p-space-lg flex flex-col shadow-sm">
<div class="flex items-center justify-between pb-space-md border-b border-outline-variant/50">
<div>
<h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">{{t42}}</h2>
<p class="font-body-sm text-body-sm text-secondary">{{t43}}</p>
</div>
<span class="material-symbols-outlined text-[22px] text-secondary">{{t44}}</span>
</div>
<!-- Vertical Timeline Feed -->
<div class="relative mt-space-md pl-6 space-y-space-lg before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-3 before:w-0.5 before:bg-surface-container-highest">
<!-- Event 1 (Completed) -->
<div class="relative group">
<span class="absolute -left-6 top-1 h-4 w-4 rounded-full bg-surface-container-lowest border-2 border-primary-container flex items-center justify-center">
<span class="h-1.5 w-1.5 rounded-full bg-primary-container"></span>
</span>
<div class="space-y-1">
<div class="flex items-center justify-between text-label-sm font-label-sm">
<span class="text-secondary font-medium">{{t45}}</span>
<span class="px-2 py-0.5 rounded bg-surface-container text-primary-container font-semibold">{{t46}}</span>
</div>
<p class="font-headline-sm text-label-md font-bold text-on-surface">{{t47}}</p>
<p class="font-body-sm text-body-sm text-secondary">{{t48}}</p>
</div>
</div>
<!-- Event 2 (In Progress / Next) -->
<div class="relative group p-2.5 rounded bg-surface-container-low border-l-2 border-primary-container">
<span class="absolute -left-[31px] top-3 h-4 w-4 rounded-full bg-surface-container-lowest border-2 border-on-tertiary-container flex items-center justify-center">
<span class="h-1.5 w-1.5 rounded-full bg-on-tertiary-container animate-ping"></span>
</span>
<div class="space-y-1.5">
<div class="flex items-center justify-between text-label-sm font-label-sm">
<span class="text-on-surface font-bold">{{t49}}</span>
<span class="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">{{t50}}</span>
</div>
<p class="font-headline-sm text-label-md font-bold text-on-surface">{{t51}}</p>
<p class="font-body-sm text-body-sm text-secondary">{{t52}}</p>
<div class="flex items-center gap-1.5 pt-1 text-label-sm font-label-sm text-primary-container">
<span class="material-symbols-outlined text-[15px]">{{t53}}</span>
<span class="underline">{{t54}}</span>
</div>
</div>
</div>
<!-- Event 3 (Confirmed) -->
<div class="relative group">
<span class="absolute -left-6 top-1 h-4 w-4 rounded-full bg-surface-container-lowest border-2 border-secondary flex items-center justify-center"></span>
<div class="space-y-1">
<div class="flex items-center justify-between text-label-sm font-label-sm">
<span class="text-secondary font-medium">{{t55}}</span>
<span class="px-2 py-0.5 rounded bg-surface-container-high text-secondary font-medium">{{t56}}</span>
</div>
<p class="font-headline-sm text-label-md font-bold text-on-surface">{{t57}}</p>
<p class="font-body-sm text-body-sm text-secondary">{{t58}}</p>
</div>
</div>
<!-- Event 4 (Confirmed) -->
<div class="relative group">
<span class="absolute -left-6 top-1 h-4 w-4 rounded-full bg-surface-container-lowest border-2 border-secondary flex items-center justify-center"></span>
<div class="space-y-1">
<div class="flex items-center justify-between text-label-sm font-label-sm">
<span class="text-secondary font-medium">{{t59}}</span>
<span class="px-2 py-0.5 rounded bg-surface-container-high text-secondary font-medium">{{t60}}</span>
</div>
<p class="font-headline-sm text-label-md font-bold text-on-surface">{{t61}}</p>
<p class="font-body-sm text-body-sm text-secondary">{{t62}}</p>
</div>
</div>
<!-- Event 5 (Tentative) -->
<div class="relative group">
<span class="absolute -left-6 top-1 h-4 w-4 rounded-full bg-surface-container-lowest border-2 border-outline-variant flex items-center justify-center"></span>
<div class="space-y-1">
<div class="flex items-center justify-between text-label-sm font-label-sm">
<span class="text-secondary font-medium">{{t63}}</span>
<span class="px-2 py-0.5 rounded bg-surface-container text-secondary font-medium">{{t64}}</span>
</div>
<p class="font-headline-sm text-label-md font-bold text-on-surface">{{t65}}</p>
<p class="font-body-sm text-body-sm text-secondary">{{t66}}</p>
</div>
</div>
</div>
<div class="mt-space-lg pt-space-md border-t border-outline-variant/50 text-center">
<a class="inline-flex items-center gap-1.5 text-label-md font-label-md text-primary-container font-semibold hover:underline" href="#">
<span>{{t67}}</span>
<span class="material-symbols-outlined text-[16px]">{{t68}}</span>
</a>
</div>
</div>
<!-- Right Column: Awaiting Speaker Decision (Decision Deck) -->
<div class="lg:col-span-7 space-y-space-md">
<div class="bg-surface-container-lowest rounded border border-outline-variant/70 p-space-lg flex items-center justify-between shadow-sm">
<div>
<div class="flex items-center gap-2">
<h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">{{t69}}</h2>
<span class="px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-primary-container text-on-primary font-bold">{{t70}}</span>
</div>
<p class="font-body-sm text-body-sm text-secondary">{{t71}}</p>
</div>
<span class="text-label-sm font-label-sm text-secondary">{{t72}}</span>
</div>
<!-- File Cards Stack -->
<!-- Decision Item 1 -->
<div class="bg-surface-container-lowest rounded border border-outline-variant/70 p-space-lg space-y-space-md relative shadow-sm border-l-4 border-l-on-tertiary-container">
<div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-space-xs border-b border-surface-container">
<div>
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm font-mono font-bold text-primary-container">{{t73}}</span>
<span class="px-2 py-0.2 rounded text-[10px] font-label-sm uppercase bg-tertiary-fixed text-on-tertiary-fixed font-bold">{{t74}}</span>
</div>
<h3 class="font-headline-sm text-label-md font-bold text-on-surface mt-1">{{t75}}</h3>
<p class="font-body-sm text-body-sm text-secondary">{{t76}}</p>
</div>
<span class="text-label-sm font-label-sm text-secondary shrink-0">{{t77}}</span>
</div>
<!-- AI Summary Box -->
<div class="p-space-md rounded bg-surface-container-low border border-outline-variant/40 space-y-1">
<div class="flex items-center gap-1.5 text-primary-container">
<span class="material-symbols-outlined text-[16px]">{{t78}}</span>
<span class="font-label-sm text-label-sm font-bold tracking-wide uppercase">{{t79}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface leading-relaxed">{{t80}}<strong class="font-bold">{{t81}}</strong>{{t82}}</p>
</div>
<!-- Action Footbar -->
<div class="flex items-center justify-between pt-1 flex-wrap gap-space-sm">
<div class="flex items-center gap-2">
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors cursor-pointer" type="button">
<span class="material-symbols-outlined text-[16px]">{{t83}}</span>
<span>{{t84}}</span>
</button>
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors cursor-pointer" type="button">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t85}}</span>
<span>{{t86}}</span>
</button>
</div>
<button class="text-label-sm font-label-sm text-primary-container font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer" type="button">
<span>{{t87}}</span>
<span class="material-symbols-outlined text-[14px]">{{t88}}</span>
</button>
</div>
</div>
<!-- Decision Item 2 -->
<div class="bg-surface-container-lowest rounded border border-outline-variant/70 p-space-lg space-y-space-md relative shadow-sm border-l-4 border-l-primary-container">
<div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-space-xs border-b border-surface-container">
<div>
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm font-mono font-bold text-primary-container">{{t89}}</span>
<span class="px-2 py-0.2 rounded text-[10px] font-label-sm uppercase bg-surface-container text-primary-container font-bold">{{t90}}</span>
</div>
<h3 class="font-headline-sm text-label-md font-bold text-on-surface mt-1">{{t91}}</h3>
<p class="font-body-sm text-body-sm text-secondary">{{t92}}</p>
</div>
<span class="text-label-sm font-label-sm text-secondary shrink-0">{{t93}}</span>
</div>
<!-- AI Summary Box -->
<div class="p-space-md rounded bg-surface-container-low border border-outline-variant/40 space-y-1">
<div class="flex items-center gap-1.5 text-primary-container">
<span class="material-symbols-outlined text-[16px]">{{t94}}</span>
<span class="font-label-sm text-label-sm font-bold tracking-wide uppercase">{{t95}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface leading-relaxed">{{t96}}</p>
</div>
<!-- Action Footbar -->
<div class="flex items-center justify-between pt-1 flex-wrap gap-space-sm">
<div class="flex items-center gap-2">
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors cursor-pointer" type="button">
<span class="material-symbols-outlined text-[16px]">{{t97}}</span>
<span>{{t98}}</span>
</button>
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors cursor-pointer" type="button">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t99}}</span>
<span>{{t100}}</span>
</button>
</div>
<button class="text-label-sm font-label-sm text-primary-container font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer" type="button">
<span>{{t101}}</span>
<span class="material-symbols-outlined text-[14px]">{{t102}}</span>
</button>
</div>
</div>
<!-- Decision Item 3 -->
<div class="bg-surface-container-lowest rounded border border-outline-variant/70 p-space-lg space-y-space-md relative shadow-sm border-l-4 border-l-secondary">
<div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-space-xs border-b border-surface-container">
<div>
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm font-mono font-bold text-primary-container">{{t103}}</span>
<span class="px-2 py-0.2 rounded text-[10px] font-label-sm uppercase bg-surface-container text-secondary font-bold">{{t104}}</span>
</div>
<h3 class="font-headline-sm text-label-md font-bold text-on-surface mt-1">{{t105}}</h3>
<p class="font-body-sm text-body-sm text-secondary">{{t106}}</p>
</div>
<span class="text-label-sm font-label-sm text-secondary shrink-0">{{t107}}</span>
</div>
<!-- AI Summary Box -->
<div class="p-space-md rounded bg-surface-container-low border border-outline-variant/40 space-y-1">
<div class="flex items-center gap-1.5 text-primary-container">
<span class="material-symbols-outlined text-[16px]">{{t108}}</span>
<span class="font-label-sm text-label-sm font-bold tracking-wide uppercase">{{t109}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface leading-relaxed">{{t110}}</p>
</div>
<!-- Action Footbar -->
<div class="flex items-center justify-between pt-1 flex-wrap gap-space-sm">
<div class="flex items-center gap-2">
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors cursor-pointer" type="button">
<span class="material-symbols-outlined text-[16px]">{{t111}}</span>
<span>{{t112}}</span>
</button>
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors cursor-pointer" type="button">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t113}}</span>
<span>{{t114}}</span>
</button>
</div>
<button class="text-label-sm font-label-sm text-primary-container font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer" type="button">
<span>{{t115}}</span>
<span class="material-symbols-outlined text-[14px]">{{t116}}</span>
</button>
</div>
</div>
</div>
</div>
<!-- Bottom Section: Official Audit Log / Recent Secretariat Activity Feed -->
<section class="bg-surface-container-lowest rounded border border-outline-variant/70 overflow-hidden shadow-sm">
<div class="p-space-lg border-b border-outline-variant/50 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div>
<h2 class="font-headline-sm text-headline-sm font-bold text-on-surface">{{t117}}</h2>
<p class="font-body-sm text-body-sm text-secondary">{{t118}}</p>
</div>
<!-- Filter Tabs -->
<div class="flex items-center bg-surface-container p-0.5 rounded border border-outline-variant/50 overflow-x-auto">
<button class="px-3 py-1 text-label-sm font-label-sm rounded bg-surface-container-lowest text-on-surface font-semibold shadow-none" type="button">{{t119}}</button>
<button class="px-3 py-1 text-label-sm font-label-sm rounded text-secondary hover:text-on-surface" type="button">{{t120}}</button>
<button class="px-3 py-1 text-label-sm font-label-sm rounded text-secondary hover:text-on-surface" type="button">{{t121}}</button>
<button class="px-3 py-1 text-label-sm font-label-sm rounded text-secondary hover:text-on-surface" type="button">{{t122}}</button>
<button class="px-3 py-1 text-label-sm font-label-sm rounded text-secondary hover:text-on-surface" type="button">{{t123}}</button>
</div>
</div>
<!-- Institutional Tabular Log -->
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-low border-b border-outline-variant/60 font-label-sm text-label-sm text-secondary uppercase tracking-wider">
<th class="py-2.5 px-4 font-semibold">{{t124}}</th>
<th class="py-2.5 px-4 font-semibold">{{t125}}</th>
<th class="py-2.5 px-4 font-semibold">{{t126}}</th>
<th class="py-2.5 px-4 font-semibold">{{t127}}</th>
<th class="py-2.5 px-4 font-semibold">{{t128}}</th>
<th class="py-2.5 px-4 font-semibold text-right">{{t129}}</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
<!-- Row 1 -->
<tr class="hover:bg-surface-container-low/60 transition-colors">
<td class="py-3 px-4 font-mono text-secondary text-[12px] whitespace-nowrap">{{t130}}</td>
<td class="py-3 px-4 font-medium text-on-surface">{{t131}}</td>
<td class="py-3 px-4 text-secondary">{{t132}}</td>
<td class="py-3 px-4">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-label-sm bg-surface-container text-primary-container">{{t133}}</span>
</td>
<td class="py-3 px-4 font-mono text-xs font-semibold text-primary-container">{{t134}}</td>
<td class="py-3 px-4 text-right">
<span class="inline-flex items-center gap-1 text-[11px] font-label-sm text-primary-container font-semibold">
<span class="material-symbols-outlined text-[14px]">{{t135}}</span>{{t136}}</span>
</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-surface-container-low/60 transition-colors">
<td class="py-3 px-4 font-mono text-secondary text-[12px] whitespace-nowrap">{{t137}}</td>
<td class="py-3 px-4 font-medium text-on-surface">{{t138}}</td>
<td class="py-3 px-4 text-secondary">{{t139}}</td>
<td class="py-3 px-4">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-label-sm bg-surface-container text-secondary">{{t140}}</span>
</td>
<td class="py-3 px-4 font-mono text-xs font-semibold text-primary-container">{{t141}}</td>
<td class="py-3 px-4 text-right">
<span class="inline-flex items-center gap-1 text-[11px] font-label-sm text-primary-container font-semibold">
<span class="material-symbols-outlined text-[14px]">{{t142}}</span>{{t143}}</span>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-container-low/60 transition-colors">
<td class="py-3 px-4 font-mono text-secondary text-[12px] whitespace-nowrap">{{t144}}</td>
<td class="py-3 px-4 font-medium text-on-surface">{{t145}}</td>
<td class="py-3 px-4 text-secondary">{{t146}}</td>
<td class="py-3 px-4">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-label-sm bg-tertiary-fixed text-on-tertiary-fixed">{{t147}}</span>
</td>
<td class="py-3 px-4 font-mono text-xs font-semibold text-primary-container">{{t148}}</td>
<td class="py-3 px-4 text-right">
<span class="inline-flex items-center gap-1 text-[11px] font-label-sm text-primary-container font-semibold">
<span class="material-symbols-outlined text-[14px]">{{t149}}</span>{{t150}}</span>
</td>
</tr>
<!-- Row 4 -->
<tr class="hover:bg-surface-container-low/60 transition-colors">
<td class="py-3 px-4 font-mono text-secondary text-[12px] whitespace-nowrap">{{t151}}</td>
<td class="py-3 px-4 font-medium text-on-surface">{{t152}}</td>
<td class="py-3 px-4 text-secondary">{{t153}}</td>
<td class="py-3 px-4">
<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-label-sm bg-surface-container text-secondary">{{t154}}</span>
</td>
<td class="py-3 px-4 font-mono text-xs font-semibold text-primary-container">{{t155}}</td>
<td class="py-3 px-4 text-right">
<span class="inline-flex items-center gap-1 text-[11px] font-label-sm text-primary-container font-semibold">
<span class="material-symbols-outlined text-[14px]">{{t156}}</span>{{t157}}</span>
</td>
</tr>
</tbody>
</table>
</div>
<div class="p-space-md border-t border-outline-variant/40 bg-surface-container-low/30 flex items-center justify-between text-label-sm font-label-sm">
<span class="text-secondary font-mono text-xs">{{t158}}</span>
<a class="text-primary-container font-semibold hover:underline inline-flex items-center gap-1" href="#">
<span>{{t159}}</span>
<span class="material-symbols-outlined text-[14px]">{{t160}}</span>
</a>
</div>
</section>
</div>
</div></main>`;
