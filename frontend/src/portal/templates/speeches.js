/* Layout taken from the prototype. Copy lives in the data module. */
export const template = `<main class="w-full pt-2 bg-surface px-space-lg py-space-lg"><div class="flex flex-col w-full">
<!-- Official Module Header with Dual Identity & Primary Controls -->
<div class="flex flex-col lg:flex-row lg:items-center justify-between pb-space-lg mb-space-lg shadow-sm bg-surface-container-lowest p-space-lg rounded-xl">
<div class="flex flex-col space-y-1 mb-space-md lg:mb-0">
<div class="flex items-center gap-space-sm">
<span class="px-2 py-0.5 bg-primary-container text-on-primary font-code-md text-[10px] tracking-widest uppercase rounded">{{t1}}</span>
<span class="text-secondary font-code-md text-[11px] font-semibold tracking-wider">{{t2}}</span>
</div>
<h1 class="font-headline-xl text-headline-xl text-on-surface tracking-tight flex items-baseline gap-space-sm flex-wrap">
<span>{{t3}}</span>
<span class="font-headline-md text-headline-md text-secondary font-normal" dir="rtl">{{t4}}</span>
</h1>
<p class="font-body-md text-body-md text-on-surface-variant max-w-3xl">{{t5}}</p>
</div>
<!-- Action Buttons with strict Institutional Visual Weights -->
<div class="flex items-center gap-space-sm flex-wrap">
<button class="px-space-md py-2 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg shadow-sm hover:bg-surface-container-high transition-colors flex items-center gap-1.5" type="button">
<span class="material-symbols-outlined text-[18px] text-outline">{{t6}}</span>
<span>{{t7}}</span>
</button>
<button class="px-space-md py-2 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg shadow-sm hover:bg-surface-container-high transition-colors flex items-center gap-1.5" type="button">
<span class="material-symbols-outlined text-[18px] text-secondary">{{t8}}</span>
<span>{{t9}}</span>
</button>
<button class="px-space-md py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded-lg shadow-md hover:bg-tertiary-container transition-all flex items-center gap-2" id="btn-prompter-mode" type="button">
<span class="material-symbols-outlined text-[18px] text-secondary-fixed">{{t10}}</span>
<span>{{t11}}</span>
<span class="bg-secondary-fixed text-on-secondary-fixed px-1.5 py-0.5 rounded text-[10px] font-code-md font-bold">{{t12}}</span>
</button>
</div>
</div>
<!-- Main Institutional Workspace: 68% Drafting Desk / 32% Intelligence Bank -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
<!-- LEFT COLUMN: Speech Editor & Tour Programme Builder (68% width -> lg:col-span-8) -->
<div class="lg:col-span-8 flex flex-col space-y-space-lg">
<!-- Speech Editor Panel -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
<!-- Event Header Card -->
<div class="bg-surface-container-low p-space-lg">
<div class="flex items-start justify-between gap-space-md">
<div>
<div class="flex items-center gap-2 mb-1">
<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
<span class="w-1.5 h-1.5 rounded-full bg-primary-container"></span>{{t13}}</span>
<span class="font-code-md text-xs text-on-surface-variant">{{t14}}</span>
</div>
<h2 class="font-headline-lg text-headline-lg text-on-surface font-bold leading-tight">{{t15}}</h2>
</div>
<div class="shrink-0 text-right">
<span class="font-code-md text-xs text-secondary font-bold block uppercase tracking-wider">{{t16}}</span>
<span class="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>{{t17}}</span>
</div>
</div>
<!-- Metadata Ribbon -->
<div class="grid grid-cols-1 sm:grid-cols-3 gap-space-sm mt-space-md pt-space-sm bg-surface-container-lowest p-space-sm rounded-lg">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[20px] text-outline">{{t18}}</span>
<div class="flex flex-col leading-none">
<span class="font-label-sm text-label-sm text-outline uppercase">{{t19}}</span>
<span class="font-body-sm text-body-sm text-on-surface font-semibold truncate">{{t20}}</span>
</div>
</div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[20px] text-outline">{{t21}}</span>
<div class="flex flex-col leading-none">
<span class="font-label-sm text-label-sm text-outline uppercase">{{t22}}</span>
<span class="font-body-sm text-body-sm text-on-surface font-semibold">{{t23}}</span>
</div>
</div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[20px] text-outline">{{t24}}</span>
<div class="flex flex-col leading-none">
<span class="font-label-sm text-label-sm text-outline uppercase">{{t25}}</span>
<span class="font-body-sm text-body-sm text-on-surface font-semibold truncate">{{t26}}</span>
</div>
</div>
</div>
</div>
<!-- Teleprompter Delivery Metrics Gauge Bar -->
<div class="p-space-md bg-surface-container-high/60 flex flex-wrap items-center justify-between gap-space-md">
<div class="flex items-center gap-space-lg flex-wrap">
<div class="flex items-baseline gap-1.5">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">{{t27}}</span>
<span class="font-headline-sm text-headline-sm text-primary font-bold font-code-md" id="live-word-count">{{t28}}</span>
<span class="font-label-sm text-label-sm text-outline">{{t29}}</span>
</div>
<div class="flex items-baseline gap-1.5">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">{{t30}}</span>
<span class="font-headline-sm text-headline-sm text-secondary font-bold font-code-md">{{t31}}</span>
<span class="font-label-sm text-label-sm text-outline">{{t32}}</span>
</div>
<div class="flex items-baseline gap-1.5">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">{{t33}}</span>
<span class="font-body-sm text-body-sm text-on-surface font-medium">{{t34}}</span>
</div>
</div>
<!-- Pacing Cadence Visualization -->
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">{{t35}}</span>
<div class="w-24 h-2 bg-surface-container rounded-full overflow-hidden flex">
<div class="bg-primary-container h-full w-[65%]"></div>
<div class="bg-secondary h-full w-[25%]"></div>
<div class="bg-surface-dim h-full w-[10%]"></div>
</div>
<span class="font-code-md text-[10px] text-on-surface-variant font-semibold">{{t36}}</span>
</div>
</div>
<!-- Parliamentary AI Smart First-Draft Advisory Banner -->
<div class="mx-space-lg mt-space-md p-space-sm bg-tertiary/10 rounded-lg flex items-start gap-space-sm">
<div class="p-1 rounded bg-primary-container text-secondary-fixed mt-0.5 shrink-0">
<span class="material-symbols-outlined text-[16px]">{{t37}}</span>
</div>
<div class="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<p class="font-body-sm text-body-sm text-on-surface">
<span class="font-semibold text-primary">{{t38}}</span>{{t39}}<span class="font-code-md text-xs font-semibold">{{t40}}</span>{{t41}}</p>
<button class="shrink-0 px-2 py-1 bg-primary-container text-on-primary font-label-sm text-label-sm rounded hover:bg-tertiary-container transition-colors flex items-center gap-1" id="btn-insert-clause" type="button">
<span>{{t42}}</span>
<span class="material-symbols-outlined text-[14px]">{{t43}}</span>
</button>
</div>
</div>
<!-- Rich Speech Drafting Desk / Prompter Preview Surface -->
<div class="p-space-lg flex flex-col space-y-space-md">
<!-- Text Styling / Teleprompter Formatting Toolbar -->
<div class="flex items-center justify-between bg-surface-container-low px-space-md py-1.5 rounded-lg flex-wrap gap-2">
<div class="flex items-center gap-1">
<button class="p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded" title="{{a1}}" type="button">
<span class="material-symbols-outlined text-[18px]">{{t44}}</span>
</button>
<button class="p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded" title="{{a2}}" type="button">
<span class="material-symbols-outlined text-[18px]">{{t45}}</span>
</button>
<button class="p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded" title="{{a3}}" type="button">
<span class="material-symbols-outlined text-[18px]">{{t46}}</span>
</button>
<span class="w-px h-4 bg-outline-variant mx-1"></span>
<button class="p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded" title="{{a4}}" type="button">
<span class="material-symbols-outlined text-[18px]">{{t47}}</span>
</button>
<button class="p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded" title="{{a5}}" type="button">
<span class="material-symbols-outlined text-[18px]">{{t48}}</span>
</button>
</div>
<div class="flex items-center gap-space-sm text-outline">
<span class="font-code-md text-[11px]">{{t49}}</span>
<span class="w-2 h-2 rounded-full bg-secondary"></span>
</div>
</div>
<!-- Document Workspace Area -->
<div class="bg-surface-container-lowest p-space-lg rounded-xl shadow-inner min-h-[420px] flex flex-col space-y-space-md text-on-surface leading-relaxed focus-within:ring-1 focus-within:ring-primary-container outline-none" contenteditable="true" id="speech-editor" spellcheck="false">
<!-- Opening Arabic Invocation -->
<div class="text-center font-bold font-headline-md text-headline-md text-primary tracking-wide pt-2" dir="rtl">{{t50}}</div>
<!-- Urdu Formal Protocol Greeting -->
<p class="font-body-lg text-body-lg text-on-surface text-right font-medium" dir="rtl">{{t51}}</p>
<!-- Formal English Address Body -->
<p class="font-body-lg text-body-lg text-on-surface">{{t52}}</p>
<!-- Cue Note Component -->
<div class="my-2 p-2 bg-secondary-fixed/30 rounded text-secondary-fixed-variant font-code-md text-xs font-semibold flex items-center gap-2 select-none" contenteditable="false">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t53}}</span>
<span>{{t54}}</span>
</div>
<p class="font-body-lg text-body-lg text-on-surface">{{t55}}</p>
<p class="font-body-lg text-body-lg text-on-surface">{{t56}}</p>
<!-- Precedent Insertion Marker Container -->
<div class="my-2 p-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface flex items-start gap-2 shadow-sm" contenteditable="false" id="inserted-clause-container">
<span class="material-symbols-outlined text-primary text-[18px] mt-0.5">{{t57}}</span>
<div class="flex-1">
<span class="font-code-md text-xs text-primary font-bold uppercase tracking-wider block mb-0.5">{{t58}}</span>
<em>{{t59}}</em>
</div>
</div>
<p class="font-body-lg text-body-lg text-on-surface">{{t60}}</p>
<!-- Speaker Transition Cue -->
<div class="my-2 p-2 bg-secondary-fixed/30 rounded text-secondary-fixed-variant font-code-md text-xs font-semibold flex items-center gap-2 select-none" contenteditable="false">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t61}}</span>
<span>{{t62}}</span>
</div>
<!-- Urdu Concluding Invocations -->
<p class="font-body-lg text-body-lg text-on-surface text-right font-medium" dir="rtl">{{t63}}</p>
<p class="font-headline-sm text-headline-sm text-primary text-right font-bold" dir="rtl">{{t64}}</p>
</div>
</div>
<!-- Teleprompter Settings Drawer Footer -->
<div class="px-space-lg py-space-sm bg-surface-container-low flex items-center justify-between text-outline text-xs">
<div class="flex items-center gap-space-md">
<span>{{t65}}</span>
<span>{{t66}}<strong class="font-code-md text-on-surface">{{t67}}</strong></span>
</div>
<span class="font-code-md">{{t68}}</span>
</div>
</div>
<!-- Tab Switcher: Tour Programme Builder & Protocol Manifest -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col space-y-space-md">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[24px]">{{t69}}</span>
<div>
<h3 class="font-headline-md text-headline-md text-on-surface font-bold">{{t70}}</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">{{t71}}</p>
</div>
</div>
<div class="flex items-center gap-1.5 bg-surface-container-low px-2 py-1 rounded-lg">
<span class="font-label-sm text-label-sm text-outline font-bold uppercase">{{t72}}</span>
<span class="font-label-sm text-label-sm text-on-surface font-semibold">{{t73}}</span>
</div>
</div>
<!-- Official Tour Manifest Steps -->
<div class="overflow-x-auto">
<table class="w-full text-left font-body-sm text-body-sm">
<thead>
<tr class="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th class="py-2.5 px-space-md rounded-l">{{t74}}</th>
<th class="py-2.5 px-space-md">{{t75}}</th>
<th class="py-2.5 px-space-md">{{t76}}</th>
<th class="py-2.5 px-space-md text-right rounded-r">{{t77}}</th>
</tr>
</thead>
<tbody class="divide-y divide-transparent">
<!-- Item 1 -->
<tr class="hover:bg-surface-container-low/50 transition-colors">
<td class="py-space-sm px-space-md font-medium text-on-surface">
<div class="flex items-center gap-2">
<span class="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center font-code-md text-xs font-bold text-primary">{{t78}}</span>
<div>
<span class="font-semibold block">{{t79}}</span>
<span class="text-xs text-outline">{{t80}}</span>
</div>
</div>
</td>
<td class="py-space-sm px-space-md font-code-md text-xs text-on-surface-variant">{{t81}}</td>
<td class="py-space-sm px-space-md">
<span class="font-body-sm text-body-sm text-on-surface">{{t82}}</span>
</td>
<td class="py-space-sm px-space-md text-right">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>{{t83}}</span>
</td>
</tr>
<!-- Item 2 -->
<tr class="hover:bg-surface-container-low/50 transition-colors">
<td class="py-space-sm px-space-md font-medium text-on-surface">
<div class="flex items-center gap-2">
<span class="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center font-code-md text-xs font-bold text-secondary">{{t84}}</span>
<div>
<span class="font-semibold block">{{t85}}</span>
<span class="text-xs text-outline">{{t86}}</span>
</div>
</div>
</td>
<td class="py-space-sm px-space-md font-code-md text-xs text-on-surface-variant">{{t87}}</td>
<td class="py-space-sm px-space-md">
<span class="font-body-sm text-body-sm text-on-surface">{{t88}}</span>
</td>
<td class="py-space-sm px-space-md text-right">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold">
<span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>{{t89}}</span>
</td>
</tr>
<!-- Item 3 -->
<tr class="hover:bg-surface-container-low/50 transition-colors">
<td class="py-space-sm px-space-md font-medium text-on-surface">
<div class="flex items-center gap-2">
<span class="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center font-code-md text-xs font-bold text-primary">{{t90}}</span>
<div>
<span class="font-semibold block">{{t91}}</span>
<span class="text-xs text-outline">{{t92}}</span>
</div>
</div>
</td>
<td class="py-space-sm px-space-md font-code-md text-xs text-on-surface-variant">{{t93}}</td>
<td class="py-space-sm px-space-md">
<span class="font-body-sm text-body-sm text-on-surface">{{t94}}</span>
</td>
<td class="py-space-sm px-space-md text-right">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>{{t95}}</span>
</td>
</tr>
<!-- Item 4 -->
<tr class="hover:bg-surface-container-low/50 transition-colors">
<td class="py-space-sm px-space-md font-medium text-on-surface">
<div class="flex items-center gap-2">
<span class="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center font-code-md text-xs font-bold text-primary">{{t96}}</span>
<div>
<span class="font-semibold block">{{t97}}</span>
<span class="text-xs text-outline">{{t98}}</span>
</div>
</div>
</td>
<td class="py-space-sm px-space-md font-code-md text-xs text-on-surface-variant">{{t99}}</td>
<td class="py-space-sm px-space-md">
<span class="font-body-sm text-body-sm text-on-surface">{{t100}}</span>
</td>
<td class="py-space-sm px-space-md text-right">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>{{t101}}</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<!-- RIGHT COLUMN: Past Speeches Archive & AI Precedent Bank (32% width -> lg:col-span-4) -->
<div class="lg:col-span-4 flex flex-col space-y-space-lg">
<!-- Search Past Speeches Module -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col space-y-space-md">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[22px]">{{t102}}</span>
<div>
<h3 class="font-headline-md text-headline-md text-on-surface font-bold">{{t103}}</h3>
<span class="font-body-sm text-body-sm text-outline">{{t104}}</span>
</div>
</div>
<!-- Search Input -->
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">{{t105}}</span>
<input class="w-full bg-surface-container-low pl-9 pr-3 py-2 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline outline-none focus:ring-1 focus:ring-primary-container" placeholder="{{a6}}" type="text"/>
</div>
<!-- Retrieved Past Addresses Cards -->
<div class="flex flex-col space-y-space-sm">
<!-- Archive Card 1 -->
<div class="p-space-sm bg-surface-container-low rounded-lg hover:bg-surface-container transition-all flex flex-col space-y-1 group cursor-pointer">
<div class="flex items-center justify-between">
<span class="px-1.5 py-0.5 bg-primary-container text-on-primary font-code-md text-[9px] uppercase rounded">{{t106}}</span>
<span class="font-code-md text-[10px] text-outline">{{t107}}</span>
</div>
<h4 class="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors">{{t108}}</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{{t109}}</p>
<div class="pt-1 flex items-center justify-between text-xs text-secondary font-semibold">
<span>{{t110}}</span>
<span class="material-symbols-outlined text-[14px]">{{t111}}</span>
</div>
</div>
<!-- Archive Card 2 -->
<div class="p-space-sm bg-surface-container-low rounded-lg hover:bg-surface-container transition-all flex flex-col space-y-1 group cursor-pointer">
<div class="flex items-center justify-between">
<span class="px-1.5 py-0.5 bg-tertiary-container text-on-primary font-code-md text-[9px] uppercase rounded">{{t112}}</span>
<span class="font-code-md text-[10px] text-outline">{{t113}}</span>
</div>
<h4 class="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors">{{t114}}</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{{t115}}</p>
<div class="pt-1 flex items-center justify-between text-xs text-secondary font-semibold">
<span>{{t116}}</span>
<span class="material-symbols-outlined text-[14px]">{{t117}}</span>
</div>
</div>
<!-- Archive Card 3 -->
<div class="p-space-sm bg-surface-container-low rounded-lg hover:bg-surface-container transition-all flex flex-col space-y-1 group cursor-pointer">
<div class="flex items-center justify-between">
<span class="px-1.5 py-0.5 bg-secondary text-on-secondary font-code-md text-[9px] uppercase rounded">{{t118}}</span>
<span class="font-code-md text-[10px] text-outline">{{t119}}</span>
</div>
<h4 class="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors">{{t120}}</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{{t121}}</p>
<div class="pt-1 flex items-center justify-between text-xs text-secondary font-semibold">
<span>{{t122}}</span>
<span class="material-symbols-outlined text-[14px]">{{t123}}</span>
</div>
</div>
</div>
</div>
<!-- AI Quote & Constitutional Citation Suggester -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col space-y-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-secondary text-[20px]">{{t124}}</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">{{t125}}</h3>
</div>
<span class="px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-code-md text-[10px]">{{t126}}</span>
</div>
<!-- Featured High-Authority Quote Card -->
<div class="p-space-md bg-surface-container-low rounded-lg flex flex-col space-y-space-sm">
<div class="flex items-center gap-2">
<div class="w-8 h-8 rounded-full bg-primary-container text-secondary-fixed flex items-center justify-center font-bold text-xs">{{t127}}</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface font-bold">{{t128}}</span>
<span class="font-code-md text-[10px] text-outline">{{t129}}</span>
</div>
</div>
<blockquote class="font-body-md text-body-md text-on-surface italic bg-surface-container-lowest p-space-sm rounded border-l-2 border-primary">{{t130}}</blockquote>
<div class="flex items-center justify-between pt-1">
<span class="font-code-md text-[10px] text-outline">{{t131}}</span>
<button class="px-2.5 py-1 bg-primary-container text-on-primary font-label-sm text-label-sm rounded hover:bg-tertiary-container transition-colors flex items-center gap-1" id="btn-insert-quote" type="button">
<span class="material-symbols-outlined text-[14px]">{{t132}}</span>
<span>{{t133}}</span>
</button>
</div>
</div>
<!-- Secondary Quote Card -->
<div class="p-space-md bg-surface-container-low rounded-lg flex flex-col space-y-space-sm">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface font-semibold">{{t134}}</span>
<span class="font-code-md text-[10px] text-secondary">{{t135}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">{{t136}}</p>
<button class="self-end px-2 py-0.5 text-xs text-primary font-semibold hover:underline flex items-center gap-1" type="button">
<span>{{t137}}</span>
<span class="material-symbols-outlined text-[12px]">{{t138}}</span>
</button>
</div>
</div>
<!-- Quick Delivery Teleprompter Display Specs -->
<div class="p-space-md bg-surface-container-low rounded-xl flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-outline text-[20px]">{{t139}}</span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-on-surface font-bold uppercase">{{t140}}</span>
<span class="font-body-sm text-body-sm text-outline">{{t141}}</span>
</div>
</div>
<span class="px-2 py-0.5 bg-primary-container text-on-primary rounded font-code-md text-[10px]">{{t142}}</span>
</div>
</div>
</div>
<!-- Teleprompter High-Contrast Modal Simulation Overlay -->
<div class="fixed inset-0 bg-primary/95 z-50 p-8 hidden flex-col justify-between backdrop-blur-sm" id="teleprompter-modal">
<div class="flex items-center justify-between text-on-primary pb-4">
<div class="flex items-center gap-4">
<span class="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded font-code-md font-bold tracking-wider">{{t143}}</span>
<span class="text-sm font-code-md text-primary-fixed-dim">{{t144}}</span>
</div>
<div class="flex items-center gap-3">
<button class="px-3 py-1 bg-tertiary text-on-primary rounded font-code-md text-sm hover:bg-tertiary-container" id="prompter-slow" type="button">{{t145}}</button>
<button class="px-3 py-1 bg-tertiary text-on-primary rounded font-code-md text-sm hover:bg-tertiary-container" id="prompter-fast" type="button">{{t146}}</button>
<button class="px-4 py-1.5 bg-error text-on-error rounded font-label-md font-bold" id="btn-close-prompter" type="button">{{t147}}</button>
</div>
</div>
<div class="flex-1 flex flex-col justify-center items-center max-w-5xl mx-auto text-center space-y-8 select-none py-12">
<p class="text-secondary-fixed text-4xl font-bold" dir="rtl">{{t148}}</p>
<p class="text-on-primary text-5xl font-bold leading-tight tracking-wide">{{t149}}</p>
<p class="text-secondary text-2xl font-code-md uppercase font-bold tracking-widest">{{t150}}</p>
<p class="text-primary-fixed-dim text-3xl leading-snug">{{t151}}</p>
</div>
<div class="text-center font-code-md text-xs text-primary-fixed-dim">{{t152}}</div>
</div>
<!-- Micro-Interactions Script -->

</div></main>`;
