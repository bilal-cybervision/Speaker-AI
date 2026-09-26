/* Layout taken from the prototype. Copy lives in the data module. */
export const template = `<main class="w-full pt-2 bg-surface px-space-lg py-space-lg"><div class="flex flex-col w-full">
<!-- Header & Administrative Protocol Controls -->
<header class="flex flex-col gap-space-md mb-space-lg">
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-code-md text-[11px] uppercase tracking-wider text-secondary font-semibold">{{t1}}</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">{{t2}}<span class="font-headline-md text-headline-md text-on-surface-variant font-normal">{{t3}}</span>
</h1>
<p class="font-body-sm text-body-sm text-on-surface-variant">{{t4}}</p>
</div>
<div class="flex items-center gap-space-sm shrink-0">
<button class="px-space-md py-2 bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-lg shadow-sm hover:bg-surface-container transition-colors flex items-center gap-1.5" type="button">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t5}}</span>
<span>{{t6}}</span>
</button>
<button class="px-space-md py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-tertiary-container transition-colors flex items-center gap-1.5" id="open-appointment-modal" type="button">
<span class="material-symbols-outlined text-[18px]">{{t7}}</span>
<span>{{t8}}</span>
</button>
</div>
</div>
<!-- View & Date Control Strip -->
<div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-sm bg-surface-container-lowest p-2 rounded-lg shadow-sm">
<div class="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
<button class="px-3 py-1 font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface rounded transition-colors" type="button">{{t9}}</button>
<button class="px-3 py-1 font-label-sm text-label-sm text-on-primary bg-primary-container rounded shadow-sm" type="button">{{t10}}</button>
<button class="px-3 py-1 font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface rounded transition-colors" type="button">{{t11}}</button>
<button class="px-3 py-1 font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface rounded transition-colors" type="button">{{t12}}</button>
</div>
<div class="flex items-center justify-between md:justify-end gap-space-sm">
<div class="flex items-center gap-1">
<button class="p-1 rounded hover:bg-surface-container text-on-surface-variant" title="{{a1}}" type="button">
<span class="material-symbols-outlined text-[18px]">{{t13}}</span>
</button>
<span class="font-label-md text-label-md font-semibold text-on-surface px-2">{{t14}}</span>
<button class="p-1 rounded hover:bg-surface-container text-on-surface-variant" title="{{a2}}" type="button">
<span class="material-symbols-outlined text-[18px]">{{t15}}</span>
</button>
</div>
<button class="px-2.5 py-1 font-code-md text-[11px] uppercase bg-surface-container-high text-on-surface font-semibold rounded hover:bg-surface-variant" type="button">{{t16}}</button>
</div>
</div>
</header>
<!-- Top-of-Day Executive AI Card -->
<section class="mb-space-lg relative bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden p-space-md">
<div class="absolute top-0 left-0 right-0 h-1 bg-primary-container"></div>
<div class="flex flex-col md:flex-row items-start justify-between gap-space-md">
<div class="flex items-start gap-space-md max-w-4xl">
<div class="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[24px] text-secondary">{{t17}}</span>
</div>
<div class="flex flex-col gap-1">
<div class="flex items-center gap-2">
<span class="font-code-md text-[10px] uppercase tracking-wider font-semibold text-primary-container bg-surface-container-low px-1.5 py-0.5 rounded">{{t18}}</span>
<span class="font-label-sm text-label-sm text-on-surface font-semibold">{{t19}}</span>
<span class="font-code-md text-[10px] text-outline">{{t20}}</span>
</div>
<p class="font-body-md text-body-md text-on-surface leading-relaxed">{{t21}}<strong>{{t22}}</strong>{{t23}}<strong>{{t24}}</strong>{{t25}}<strong>{{t26}}</strong>{{t27}}</p>
</div>
</div>
<div class="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1 shrink-0 w-full md:w-72">
<div class="flex items-center gap-1.5 text-secondary">
<span class="material-symbols-outlined text-[16px]">{{t28}}</span>
<span class="font-label-sm text-label-sm uppercase font-semibold">{{t29}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface font-medium leading-snug">{{t30}}<strong>{{t31}}</strong>{{t32}}</p>
<span class="font-code-md text-[9px] text-outline">{{t33}}</span>
</div>
</div>
</section>
<!-- Interactive Conflict Notification Banner (Micro-Interaction) -->
<div class="hidden mb-space-md p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between" id="conflict-banner">
<div class="flex items-center gap-2 text-on-surface">
<span class="material-symbols-outlined text-[18px] text-error">{{t34}}</span>
<span class="font-label-sm text-label-sm font-semibold">{{t35}}</span>
<span class="font-body-sm text-body-sm">{{t36}}</span>
</div>
<div class="flex items-center gap-2">
<button class="px-2 py-0.5 font-label-sm text-label-sm bg-surface-container-lowest text-on-surface rounded shadow-sm hover:bg-surface-container" type="button">{{t37}}</button>
<button class="text-outline hover:text-on-surface" onclick="document.getElementById('conflict-banner').classList.add('hidden')" type="button"><span class="material-symbols-outlined text-[16px]">{{t38}}</span></button>
</div>
</div>
<!-- Operational Week Calendar Grid -->
<section class="bg-surface-container-lowest rounded-lg shadow-sm mb-space-lg overflow-hidden">
<div class="p-space-sm bg-surface-container-low flex flex-wrap items-center justify-between gap-space-sm">
<div class="flex items-center gap-space-md">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">{{t39}}</span>
<div class="flex items-center gap-1.5">
<span class="w-3 h-3 rounded bg-primary-container"></span>
<span class="font-label-sm text-label-sm text-on-surface">{{t40}}</span>
</div>
<div class="flex items-center gap-1.5">
<span class="w-3 h-3 rounded bg-neutral-700"></span>
<span class="font-label-sm text-label-sm text-on-surface">{{t41}}</span>
</div>
<div class="flex items-center gap-1.5">
<span class="w-3 h-3 rounded bg-surface-container-low ring-1 ring-secondary"></span>
<span class="font-label-sm text-label-sm text-on-surface">{{t42}}</span>
</div>
<div class="flex items-center gap-1.5">
<span class="w-3 h-3 rounded bg-surface-container-high"></span>
<span class="font-label-sm text-label-sm text-on-surface">{{t43}}</span>
</div>
</div>
<div class="flex items-center gap-1 font-code-md text-[10px] text-outline">
<span class="material-symbols-outlined text-[14px]">{{t44}}</span>
<span>{{t45}}</span>
</div>
</div>
<!-- Week Grid Container -->
<div class="overflow-x-auto">
<div class="min-w-[1100px] grid grid-cols-8 bg-surface-container">
<!-- Col 0: Timestamps -->
<div class="bg-surface-container-low flex flex-col pt-10">
<div class="h-14 px-2 flex items-start justify-end"><span class="font-code-md text-[10px] text-outline">{{t46}}</span></div>
<div class="h-14 px-2 flex items-start justify-end"><span class="font-code-md text-[10px] text-outline">{{t47}}</span></div>
<div class="h-14 px-2 flex items-start justify-end"><span class="font-code-md text-[10px] text-outline">{{t48}}</span></div>
<div class="h-14 px-2 flex items-start justify-end"><span class="font-code-md text-[10px] text-outline">{{t49}}</span></div>
<div class="h-14 px-2 flex items-start justify-end"><span class="font-code-md text-[10px] text-outline">{{t50}}</span></div>
<div class="h-14 px-2 flex items-start justify-end"><span class="font-code-md text-[10px] text-outline">{{t51}}</span></div>
<div class="h-14 px-2 flex items-start justify-end"><span class="font-code-md text-[10px] text-outline">{{t52}}</span></div>
<div class="h-14 px-2 flex items-start justify-end"><span class="font-code-md text-[10px] text-outline">{{t53}}</span></div>
<div class="h-14 px-2 flex items-start justify-end"><span class="font-code-md text-[10px] text-outline">{{t54}}</span></div>
<div class="h-14 px-2 flex items-start justify-end"><span class="font-code-md text-[10px] text-outline">{{t55}}</span></div>
<div class="h-14 px-2 flex items-start justify-end"><span class="font-code-md text-[10px] text-outline">{{t56}}</span></div>
<div class="h-14 px-2 flex items-start justify-end"><span class="font-code-md text-[10px] text-outline">{{t57}}</span></div>
</div>
<!-- Day Columns (Mon to Sun) -->
<!-- Monday 21 -->
<div class="bg-surface-container-lowest flex flex-col relative group">
<div class="h-10 px-2 py-1 bg-surface-container-low flex flex-col justify-center">
<span class="font-label-sm text-label-sm font-semibold text-on-surface">{{t58}}</span>
<span class="font-code-md text-[9px] text-outline">{{t59}}</span>
</div>
<div class="relative h-[672px] p-1 flex flex-col gap-1">
<!-- 09:00 - 10:30 Internal Briefing -->
<div class="absolute top-14 left-1 right-1 h-20 bg-surface-container-high text-on-surface p-2 rounded shadow-sm cursor-grab active:cursor-grabbing hover:bg-surface-variant transition-colors group/card" title="{{a3}}">
<span class="font-code-md text-[9px] block text-outline font-semibold">{{t60}}</span>
<span class="font-label-sm text-label-sm font-semibold leading-tight line-clamp-2">{{t61}}</span>
<span class="font-body-sm text-[10px] text-on-surface-variant block mt-0.5">{{t62}}</span>
</div>
<!-- 11:00 - 14:00 House Floor -->
<div class="absolute top-[168px] left-1 right-1 h-40 bg-primary-container text-on-primary p-2 rounded shadow-sm cursor-grab active:cursor-grabbing hover:bg-tertiary-container transition-colors" title="{{a4}}">
<div class="flex items-center justify-between">
<span class="font-code-md text-[9px] text-secondary-fixed font-semibold">{{t63}}</span>
<span class="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
</div>
<span class="font-label-sm text-label-sm font-bold leading-tight line-clamp-2 mt-0.5">{{t64}}</span>
<span class="font-body-sm text-[10px] text-primary-fixed-dim block mt-0.5">{{t65}}</span>
</div>
<!-- 16:00 - 17:30 APNS Committee -->
<div class="absolute top-[448px] left-1 right-1 h-20 bg-neutral-700 text-white p-2 rounded shadow-sm cursor-grab active:cursor-grabbing hover:bg-neutral-800 transition-colors" title="{{a5}}">
<span class="font-code-md text-[9px] text-slate-300 font-semibold">{{t66}}</span>
<span class="font-label-sm text-label-sm font-semibold leading-tight line-clamp-2">{{t67}}</span>
<span class="font-body-sm text-[10px] text-slate-300 block">{{t68}}</span>
</div>
</div>
</div>
<!-- Tuesday 22 -->
<div class="bg-surface-container-lowest flex flex-col relative group">
<div class="h-10 px-2 py-1 bg-surface-container-low flex flex-col justify-center">
<span class="font-label-sm text-label-sm font-semibold text-on-surface">{{t69}}</span>
<span class="font-code-md text-[9px] text-outline">{{t70}}</span>
</div>
<div class="relative h-[672px] p-1">
<!-- 10:00 - 12:00 Business Advisory -->
<div class="absolute top-28 left-1 right-1 h-28 bg-primary-container text-on-primary p-2 rounded shadow-sm cursor-grab active:cursor-grabbing hover:bg-tertiary-container transition-colors" title="{{a6}}">
<span class="font-code-md text-[9px] text-secondary-fixed font-semibold">{{t71}}</span>
<span class="font-label-sm text-label-sm font-bold leading-tight line-clamp-2">{{t72}}</span>
<span class="font-body-sm text-[10px] text-primary-fixed-dim block mt-0.5">{{t73}}</span>
</div>
<!-- 13:00 - 14:30 EU Delegation -->
<div class="absolute top-[280px] left-1 right-1 h-20 bg-neutral-700 text-white p-2 rounded shadow-sm cursor-grab active:cursor-grabbing hover:bg-neutral-800 transition-colors" title="{{a7}}">
<span class="font-code-md text-[9px] text-slate-300 font-semibold">{{t74}}</span>
<span class="font-label-sm text-label-sm font-semibold leading-tight line-clamp-2">{{t75}}</span>
<span class="font-body-sm text-[10px] text-slate-300 block">{{t76}}</span>
</div>
<!-- 15:30 - 17:00 File Approvals -->
<div class="absolute top-[420px] left-1 right-1 h-20 bg-surface-container-high text-on-surface p-2 rounded shadow-sm cursor-grab active:cursor-grabbing hover:bg-surface-variant transition-colors" title="{{a8}}">
<span class="font-code-md text-[9px] text-outline font-semibold">{{t77}}</span>
<span class="font-label-sm text-label-sm font-semibold leading-tight line-clamp-2">{{t78}}</span>
<span class="font-body-sm text-[10px] text-on-surface-variant block">{{t79}}</span>
</div>
</div>
</div>
<!-- Wednesday 23 -->
<div class="bg-surface-container-lowest flex flex-col relative group">
<div class="h-10 px-2 py-1 bg-surface-container-low flex flex-col justify-center">
<span class="font-label-sm text-label-sm font-semibold text-on-surface">{{t80}}</span>
<span class="font-code-md text-[9px] text-outline">{{t81}}</span>
</div>
<div class="relative h-[672px] p-1">
<!-- 10:30 - 13:30 House Sitting -->
<div class="absolute top-[140px] left-1 right-1 h-40 bg-primary-container text-on-primary p-2 rounded shadow-sm cursor-grab active:cursor-grabbing hover:bg-tertiary-container transition-colors" title="{{a9}}">
<span class="font-code-md text-[9px] text-secondary-fixed font-semibold">{{t82}}</span>
<span class="font-label-sm text-label-sm font-bold leading-tight line-clamp-2">{{t83}}</span>
<span class="font-body-sm text-[10px] text-primary-fixed-dim block mt-0.5">{{t84}}</span>
</div>
<!-- High Priority Constitutional Joint Session (Gold Border) with Interactive Warning Hover -->
<div class="absolute top-[392px] left-1 right-1 h-24 bg-surface-container-low p-2 rounded shadow-sm cursor-grab active:cursor-grabbing relative group/warning" style="box-shadow: inset 0 0 0 1.5px #775928;" title="{{a10}}">
<div class="flex items-center justify-between">
<span class="font-code-md text-[9px] text-secondary font-semibold">{{t85}}</span>
<span class="material-symbols-outlined text-[14px] text-secondary">{{t86}}</span>
</div>
<span class="font-label-sm text-label-sm font-bold text-on-surface leading-tight line-clamp-2">{{t87}}</span>
<span class="font-body-sm text-[10px] text-on-surface-variant block mt-0.5">{{t88}}</span>
<!-- Conflict Warning Tooltip -->
<div class="hidden group-hover/warning:flex absolute -top-12 left-0 right-0 z-20 bg-neutral-900 text-white text-[11px] p-2 rounded shadow-lg items-center gap-1.5 leading-tight">
<span class="material-symbols-outlined text-[14px] text-amber-400 shrink-0">{{t89}}</span>
<span>{{t90}}</span>
</div>
</div>
</div>
</div>
<!-- Thursday 24 (Active / Selected Day) -->
<div class="bg-surface-container-lowest flex flex-col relative group" style="box-shadow: inset 0 0 0 2px #01411c;">
<div class="h-10 px-2 py-1 bg-surface-container flex flex-col justify-center">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm font-bold text-on-surface">{{t91}}</span>
<span class="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
</div>
<span class="font-code-md text-[9px] text-primary-container font-semibold">{{t92}}</span>
</div>
<div class="relative h-[672px] p-1">
<!-- 09:00 - 10:15 SPS Briefing -->
<div class="absolute top-14 left-1 right-1 h-16 bg-surface-container-high text-on-surface p-1.5 rounded shadow-sm cursor-grab active:cursor-grabbing hover:bg-surface-variant transition-colors" title="{{a11}}">
<span class="font-code-md text-[9px] text-outline font-semibold">{{t93}}</span>
<span class="font-label-sm text-label-sm font-semibold leading-tight truncate block">{{t94}}</span>
<span class="font-body-sm text-[9px] text-on-surface-variant truncate block">{{t95}}</span>
</div>
<!-- 10:30 - 13:00 Presiding NA -->
<div class="absolute top-[140px] left-1 right-1 h-36 bg-primary-container text-on-primary p-2 rounded shadow-sm cursor-grab active:cursor-grabbing hover:bg-tertiary-container transition-colors" title="{{a12}}">
<div class="flex items-center justify-between">
<span class="font-code-md text-[9px] text-secondary-fixed font-semibold">{{t96}}</span>
<span class="font-code-md text-[9px] bg-secondary text-white px-1 rounded">{{t97}}</span>
</div>
<span class="font-label-sm text-label-sm font-bold leading-tight line-clamp-2 mt-0.5">{{t98}}</span>
<span class="font-body-sm text-[10px] text-primary-fixed-dim block mt-0.5">{{t99}}</span>
</div>
<!-- 13:15 - 14:15 Turkish Ambassador Luncheon -->
<div class="absolute top-[294px] left-1 right-1 h-14 bg-neutral-700 text-white p-1.5 rounded shadow-sm cursor-grab active:cursor-grabbing hover:bg-neutral-800 transition-colors" title="{{a13}}">
<span class="font-code-md text-[9px] text-slate-300 font-semibold">{{t100}}</span>
<span class="font-label-sm text-label-sm font-semibold truncate block">{{t101}}</span>
<span class="font-body-sm text-[9px] text-slate-300 truncate block">{{t102}}</span>
</div>
<!-- 15:00 - 16:00 Delegation of APNS & PRA -->
<div class="absolute top-[392px] left-1 right-1 h-14 bg-neutral-700 text-white p-1.5 rounded shadow-sm cursor-grab active:cursor-grabbing hover:bg-neutral-800 transition-colors" title="{{a14}}">
<span class="font-code-md text-[9px] text-slate-300 font-semibold">{{t103}}</span>
<span class="font-label-sm text-label-sm font-semibold truncate block">{{t104}}</span>
<span class="font-body-sm text-[9px] text-slate-300 truncate block">{{t105}}</span>
</div>
<!-- 16:30 - 17:30 Chamber File Approvals -->
<div class="absolute top-[476px] left-1 right-1 h-14 bg-surface-container-high text-on-surface p-1.5 rounded shadow-sm cursor-grab active:cursor-grabbing hover:bg-surface-variant transition-colors" title="{{a15}}">
<span class="font-code-md text-[9px] text-outline font-semibold">{{t106}}</span>
<span class="font-label-sm text-label-sm font-semibold truncate block">{{t107}}</span>
<span class="font-body-sm text-[9px] text-on-surface-variant truncate block">{{t108}}</span>
</div>
<!-- 18:00 - 19:30 Chief Guest Event -->
<div class="absolute top-[560px] left-1 right-1 h-20 bg-surface-container-low p-1.5 rounded shadow-sm cursor-grab active:cursor-grabbing" style="box-shadow: inset 0 0 0 1.5px #775928;" title="{{a16}}">
<span class="font-code-md text-[9px] text-secondary font-semibold">{{t109}}</span>
<span class="font-label-sm text-label-sm font-bold text-on-surface leading-tight line-clamp-2">{{t110}}</span>
<span class="font-body-sm text-[9px] text-on-surface-variant truncate block">{{t111}}</span>
</div>
</div>
</div>
<!-- Friday 25 -->
<div class="bg-surface-container-lowest flex flex-col relative group">
<div class="h-10 px-2 py-1 bg-surface-container-low flex flex-col justify-center">
<span class="font-label-sm text-label-sm font-semibold text-on-surface">{{t112}}</span>
<span class="font-code-md text-[9px] text-outline">{{t113}}</span>
</div>
<div class="relative h-[672px] p-1">
<!-- 10:00 - 12:30 Friday Chamber Sitting -->
<div class="absolute top-28 left-1 right-1 h-36 bg-primary-container text-on-primary p-2 rounded shadow-sm cursor-grab active:cursor-grabbing hover:bg-tertiary-container transition-colors" title="{{a17}}">
<span class="font-code-md text-[9px] text-secondary-fixed font-semibold">{{t114}}</span>
<span class="font-label-sm text-label-sm font-bold leading-tight line-clamp-2">{{t115}}</span>
<span class="font-body-sm text-[10px] text-primary-fixed-dim block mt-0.5">{{t116}}</span>
</div>
<!-- 15:00 - 17:00 Council of Common Interests -->
<div class="absolute top-[392px] left-1 right-1 h-28 bg-surface-container-low p-2 rounded shadow-sm cursor-grab active:cursor-grabbing" style="box-shadow: inset 0 0 0 1.5px #775928;" title="{{a18}}">
<div class="flex items-center justify-between">
<span class="font-code-md text-[9px] text-secondary font-semibold">{{t117}}</span>
<span class="material-symbols-outlined text-[14px] text-secondary">{{t118}}</span>
</div>
<span class="font-label-sm text-label-sm font-bold text-on-surface leading-tight line-clamp-2">{{t119}}</span>
<span class="font-body-sm text-[10px] text-on-surface-variant block mt-0.5">{{t120}}</span>
</div>
</div>
</div>
<!-- Saturday 26 -->
<div class="bg-surface-container-lowest flex flex-col relative group">
<div class="h-10 px-2 py-1 bg-surface-container-low flex flex-col justify-center">
<span class="font-label-sm text-label-sm font-semibold text-on-surface">{{t121}}</span>
<span class="font-code-md text-[9px] text-outline">{{t122}}</span>
</div>
<div class="relative h-[672px] p-1">
<!-- 11:00 - 13:00 Constituency Delegations -->
<div class="absolute top-[168px] left-1 right-1 h-28 bg-neutral-700 text-white p-2 rounded shadow-sm cursor-grab active:cursor-grabbing hover:bg-neutral-800 transition-colors" title="{{a19}}">
<span class="font-code-md text-[9px] text-slate-300 font-semibold">{{t123}}</span>
<span class="font-label-sm text-label-sm font-semibold leading-tight line-clamp-2">{{t124}}</span>
<span class="font-body-sm text-[10px] text-slate-300 block mt-0.5">{{t125}}</span>
</div>
</div>
</div>
<!-- Sunday 27 -->
<div class="bg-surface-container-lowest flex flex-col relative group">
<div class="h-10 px-2 py-1 bg-surface-container-low flex flex-col justify-center">
<span class="font-label-sm text-label-sm font-semibold text-on-surface">{{t126}}</span>
<span class="font-code-md text-[9px] text-outline">{{t127}}</span>
</div>
<div class="relative h-[672px] p-1 flex items-center justify-center">
<div class="text-center p-4">
<span class="material-symbols-outlined text-[24px] text-outline mb-1">{{t128}}</span>
<span class="font-label-sm text-label-sm text-outline block">{{t129}}</span>
<span class="font-code-md text-[10px] text-outline-variant">{{t130}}</span>
</div>
</div>
</div>
</div>
</div>
<!-- Drag & Drop Instruction Subtext -->
<div class="px-space-md py-2 bg-surface-container-low flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[16px] text-outline">{{t131}}</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">{{t132}}</span>
</div>
<span class="font-code-md text-[10px] text-secondary font-semibold">{{t133}}</span>
</div>
</section>
<!-- Selected Day Detail Strip: Thursday, 24 October 2024 -->
<section class="bg-surface-container-lowest rounded-lg shadow-sm p-space-md mb-space-lg flex flex-col gap-space-md">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container">
<div class="flex items-center gap-space-sm">
<div class="w-8 h-8 rounded bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-md">{{t134}}</div>
<div class="flex flex-col">
<h2 class="font-headline-md text-headline-md text-on-surface font-bold">{{t135}}</h2>
<span class="font-label-sm text-label-sm text-on-surface-variant">{{t136}}</span>
</div>
</div>
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm text-outline uppercase font-semibold">{{t137}}</span>
<button class="px-2 py-1 bg-surface-container-low text-on-surface rounded font-label-sm text-label-sm hover:bg-surface-container" type="button">{{t138}}</button>
<button class="px-2 py-1 bg-surface-container-low text-on-surface-variant rounded font-label-sm text-label-sm hover:bg-surface-container" type="button">{{t139}}</button>
<button class="px-2 py-1 bg-surface-container-low text-on-surface-variant rounded font-label-sm text-label-sm hover:bg-surface-container" type="button">{{t140}}</button>
</div>
</div>
<!-- Official Schedule Table -->
<div class="overflow-x-auto">
<table class="w-full text-left">
<thead>
<tr class="bg-surface-container-low text-on-surface-variant uppercase font-label-sm text-label-sm">
<th class="py-2.5 px-3">{{t141}}</th>
<th class="py-2.5 px-3">{{t142}}</th>
<th class="py-2.5 px-3">{{t143}}</th>
<th class="py-2.5 px-3">{{t144}}</th>
<th class="py-2.5 px-3">{{t145}}</th>
<th class="py-2.5 px-3 text-right">{{t146}}</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
<!-- Row 1 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-3 px-3 font-code-md text-[12px] font-semibold text-on-surface">{{t147}}</td>
<td class="py-3 px-3">
<div class="flex flex-col">
<span class="font-label-md text-label-md font-semibold text-on-surface">{{t148}}</span>
<span class="text-on-surface-variant text-[12px]">{{t149}}</span>
</div>
</td>
<td class="py-3 px-3">
<span class="px-2 py-0.5 rounded text-[11px] font-code-md bg-surface-container text-on-surface font-medium">{{t150}}</span>
</td>
<td class="py-3 px-3 text-on-surface-variant">{{t151}}</td>
<td class="py-3 px-3">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm text-on-surface font-semibold">{{t152}}</span>
</div>
</td>
<td class="py-3 px-3 text-right">
<select class="bg-surface-container-low text-on-surface font-label-sm text-label-sm py-1 px-2 rounded outline-none focus:bg-surface-container">
<option selected="">{{t153}}</option>
<option>{{t154}}</option>
<option>{{t155}}</option>
<option>{{t156}}</option>
<option>{{t157}}</option>
</select>
</td>
</tr>
<!-- Row 2 (Live / In-Progress) -->
<tr class="bg-surface-container-low/60 hover:bg-surface-container-low transition-colors">
<td class="py-3 px-3 font-code-md text-[12px] font-bold text-secondary">{{t158}}</td>
<td class="py-3 px-3">
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-label-md text-label-md font-bold text-on-surface">{{t159}}</span>
<span class="px-1.5 py-0.2 bg-secondary text-white font-code-md text-[9px] rounded font-semibold">{{t160}}</span>
</div>
<span class="text-on-surface-variant text-[12px]">{{t161}}</span>
</div>
</td>
<td class="py-3 px-3">
<span class="px-2 py-0.5 rounded text-[11px] font-code-md bg-primary-container text-on-primary font-medium">{{t162}}</span>
</td>
<td class="py-3 px-3 text-on-surface-variant">{{t163}}</td>
<td class="py-3 px-3">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
<span class="font-label-sm text-label-sm text-secondary font-bold">{{t164}}</span>
</div>
</td>
<td class="py-3 px-3 text-right">
<select class="bg-surface-container text-on-surface font-label-sm text-label-sm py-1 px-2 rounded outline-none focus:bg-surface-container-high">
<option>{{t165}}</option>
<option selected="">{{t166}}</option>
<option>{{t167}}</option>
<option>{{t168}}</option>
<option>{{t169}}</option>
<option>{{t170}}</option>
</select>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-3 px-3 font-code-md text-[12px] font-semibold text-on-surface">{{t171}}</td>
<td class="py-3 px-3">
<div class="flex flex-col">
<span class="font-label-md text-label-md font-semibold text-on-surface">{{t172}}</span>
<span class="text-on-surface-variant text-[12px]">{{t173}}</span>
</div>
</td>
<td class="py-3 px-3">
<span class="px-2 py-0.5 rounded text-[11px] font-code-md bg-neutral-700 text-white font-medium">{{t174}}</span>
</td>
<td class="py-3 px-3 text-on-surface-variant">{{t175}}</td>
<td class="py-3 px-3">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm text-on-surface font-semibold">{{t176}}</span>
</div>
</td>
<td class="py-3 px-3 text-right">
<select class="bg-surface-container-low text-on-surface font-label-sm text-label-sm py-1 px-2 rounded outline-none focus:bg-surface-container">
<option selected="">{{t177}}</option>
<option>{{t178}}</option>
<option>{{t179}}</option>
<option>{{t180}}</option>
<option>{{t181}}</option>
</select>
</td>
</tr>
<!-- Row 4 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-3 px-3 font-code-md text-[12px] font-semibold text-on-surface">{{t182}}</td>
<td class="py-3 px-3">
<div class="flex flex-col">
<span class="font-label-md text-label-md font-semibold text-on-surface">{{t183}}</span>
<span class="text-on-surface-variant text-[12px]">{{t184}}</span>
</div>
</td>
<td class="py-3 px-3">
<span class="px-2 py-0.5 rounded text-[11px] font-code-md bg-surface-container text-on-surface font-medium">{{t185}}</span>
</td>
<td class="py-3 px-3 text-on-surface-variant">{{t186}}</td>
<td class="py-3 px-3">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm text-on-surface font-semibold">{{t187}}</span>
</div>
</td>
<td class="py-3 px-3 text-right">
<select class="bg-surface-container-low text-on-surface font-label-sm text-label-sm py-1 px-2 rounded outline-none focus:bg-surface-container">
<option selected="">{{t188}}</option>
<option>{{t189}}</option>
<option>{{t190}}</option>
<option>{{t191}}</option>
<option>{{t192}}</option>
</select>
</td>
</tr>
<!-- Row 5 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-3 px-3 font-code-md text-[12px] font-semibold text-on-surface">{{t193}}</td>
<td class="py-3 px-3">
<div class="flex flex-col">
<span class="font-label-md text-label-md font-semibold text-on-surface">{{t194}}</span>
<span class="text-on-surface-variant text-[12px]">{{t195}}</span>
</div>
</td>
<td class="py-3 px-3">
<span class="px-2 py-0.5 rounded text-[11px] font-code-md bg-surface-container text-on-surface font-medium">{{t196}}</span>
</td>
<td class="py-3 px-3 text-on-surface-variant">{{t197}}</td>
<td class="py-3 px-3">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-neutral-400"></span>
<span class="font-label-sm text-label-sm text-neutral-600 font-semibold">{{t198}}</span>
</div>
</td>
<td class="py-3 px-3 text-right">
<select class="bg-surface-container-low text-on-surface font-label-sm text-label-sm py-1 px-2 rounded outline-none focus:bg-surface-container">
<option>{{t199}}</option>
<option selected="">{{t200}}</option>
<option>{{t201}}</option>
<option>{{t202}}</option>
<option>{{t203}}</option>
</select>
</td>
</tr>
<!-- Row 6 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-3 px-3 font-code-md text-[12px] font-semibold text-on-surface">{{t204}}</td>
<td class="py-3 px-3">
<div class="flex flex-col">
<span class="font-label-md text-label-md font-semibold text-on-surface">{{t205}}</span>
<span class="text-on-surface-variant text-[12px]">{{t206}}</span>
</div>
</td>
<td class="py-3 px-3">
<span class="px-2 py-0.5 rounded text-[11px] font-code-md bg-surface-container-low text-secondary font-medium" style="box-shadow: inset 0 0 0 1px #775928;">{{t207}}</span>
</td>
<td class="py-3 px-3 text-on-surface-variant">{{t208}}</td>
<td class="py-3 px-3">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm text-on-surface font-semibold">{{t209}}</span>
</div>
</td>
<td class="py-3 px-3 text-right">
<select class="bg-surface-container-low text-on-surface font-label-sm text-label-sm py-1 px-2 rounded outline-none focus:bg-surface-container">
<option selected="">{{t210}}</option>
<option>{{t211}}</option>
<option>{{t212}}</option>
<option>{{t213}}</option>
<option>{{t214}}</option>
</select>
</td>
</tr>
</tbody>
</table>
</div>
</section>
<!-- Modal Dialog: Insert Official Chamber Appointment -->
<dialog class="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-none p-4 rounded-none max-w-2xl w-full m-auto shadow-2xl" id="appointment-modal">
<div class="bg-surface-container-lowest rounded-lg overflow-hidden flex flex-col">
<div class="bg-primary-container px-space-md py-space-sm flex items-center justify-between text-on-primary">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[20px] text-secondary-fixed">{{t215}}</span>
<span class="font-headline-sm text-headline-sm font-semibold">{{t216}}</span>
</div>
<button class="text-primary-fixed-dim hover:text-on-primary" id="close-appointment-modal" type="button">
<span class="material-symbols-outlined text-[20px]">{{t217}}</span>
</button>
</div>
<form class="p-space-md flex flex-col gap-space-md" method="dialog">
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div class="flex flex-col gap-1">
<label class="font-label-sm text-label-sm text-on-surface font-semibold">{{t218}}</label>
<input class="bg-surface-container-low px-3 py-2 text-on-surface rounded font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary-container" placeholder="{{a20}}" type="text"/>
</div>
<div class="flex flex-col gap-1">
<label class="font-label-sm text-label-sm text-on-surface font-semibold">{{t219}}</label>
<select class="bg-surface-container-low px-3 py-2 text-on-surface rounded font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary-container">
<option>{{t220}}</option>
<option>{{t221}}</option>
<option>{{t222}}</option>
<option>{{t223}}</option>
<option>{{t224}}</option>
</select>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div class="flex flex-col gap-1">
<label class="font-label-sm text-label-sm text-on-surface font-semibold">{{t225}}</label>
<input class="bg-surface-container-low px-3 py-2 text-on-surface rounded font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary-container" type="date" value="{{a21}}"/>
</div>
<div class="flex flex-col gap-1">
<label class="font-label-sm text-label-sm text-on-surface font-semibold">{{t226}}</label>
<input class="bg-surface-container-low px-3 py-2 text-on-surface rounded font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary-container" type="time" value="{{a22}}"/>
</div>
<div class="flex flex-col gap-1">
<label class="font-label-sm text-label-sm text-on-surface font-semibold">{{t227}}</label>
<input class="bg-surface-container-low px-3 py-2 text-on-surface rounded font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary-container" type="time" value="{{a23}}"/>
</div>
</div>
<div class="flex flex-col gap-1">
<label class="font-label-sm text-label-sm text-on-surface font-semibold">{{t228}}</label>
<input class="bg-surface-container-low px-3 py-2 text-on-surface rounded font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary-container" placeholder="{{a24}}" type="text"/>
</div>
<div class="flex flex-col gap-1">
<label class="font-label-sm text-label-sm text-on-surface font-semibold">{{t229}}</label>
<textarea class="bg-surface-container-low px-3 py-2 text-on-surface rounded font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary-container" placeholder="{{a25}}" rows="2"></textarea>
</div>
<div class="p-space-sm bg-surface-container-low rounded flex items-center justify-between">
<div class="flex items-center gap-2">
<input checked="" class="w-4 h-4 rounded text-primary-container" id="ai-conflict-check" type="checkbox"/>
<label class="font-label-sm text-label-sm text-on-surface font-medium" for="ai-conflict-check">{{t230}}</label>
</div>
<span class="font-code-md text-[10px] text-secondary font-semibold">{{t231}}</span>
</div>
<div class="flex items-center justify-end gap-space-sm pt-2">
<button class="px-space-md py-2 bg-surface-container text-on-surface font-label-md text-label-md rounded hover:bg-surface-container-high transition-colors" id="cancel-modal" type="button">{{t232}}</button>
<button class="px-space-md py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded hover:bg-tertiary-container transition-colors" type="submit">{{t233}}</button>
</div>
</form>
</div>
</dialog>
<!-- Persistent Bottom Right Floating AI Assistant Button -->
<div class="fixed bottom-6 right-6 z-40">
<button class="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-lg hover:bg-tertiary-container transition-transform transform active:scale-95" id="floating-ai-trigger" title="{{a26}}" type="button">
<span class="material-symbols-outlined text-[24px]">{{t234}}</span>
</button>
</div>
</div>
</main>`;
