/* Layout taken from the prototype. Copy lives in the data module. */
export const template = `<main class="w-full pt-2 bg-surface px-space-lg py-space-lg"><div class="flex flex-col w-full gap-space-lg">
<!-- 1. Executive Top Header & Alert Banner -->
<section class="flex flex-col gap-space-sm bg-surface-container-lowest p-space-lg rounded-lg shadow-sm border-l-4 border-l-primary-container">
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">{{t1}}</span>
<span class="text-outline-variant font-label-sm text-label-sm">{{t2}}</span>
<span class="font-label-sm text-label-sm text-outline font-medium">{{t3}}</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-0.5">{{t4}}</h1>
<p class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
<span class="material-symbols-outlined text-[15px] text-primary-container">{{t5}}</span>
<span>{{t6}}</span>
<span class="text-outline-variant">{{t7}}</span>
<span class="font-code-md text-code-md text-on-surface-variant">{{t8}}</span>
<span class="text-outline-variant">{{t9}}</span>
<span class="font-code-md text-code-md text-primary-container font-semibold">{{t10}}</span>
</p>
</div>
<div class="flex flex-wrap items-center gap-2">
<button class="px-3 py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-colors" type="button">
<span class="material-symbols-outlined text-[16px] text-outline">{{t11}}</span>
<span>{{t12}}</span>
</button>
<button class="px-3 py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-colors" type="button">
<span class="material-symbols-outlined text-[16px] text-outline">{{t13}}</span>
<span>{{t14}}</span>
</button>
<button class="px-3 py-1.5 rounded bg-error text-on-error hover:bg-on-error-container font-label-md text-label-md flex items-center gap-1.5 transition-colors shadow-sm" type="button">
<span class="material-symbols-outlined text-[16px]">{{t15}}</span>
<span>{{t16}}</span>
</button>
</div>
</div>
<!-- Alert Strip -->
<div class="flex items-center justify-between gap-3 bg-secondary-fixed/30 px-space-md py-2 rounded border-l-2 border-l-secondary text-on-surface">
<div class="flex items-center gap-2.5 min-w-0">
<span class="material-symbols-outlined text-[20px] text-secondary shrink-0">{{t17}}</span>
<p class="font-body-sm text-body-sm truncate">
<strong class="font-semibold text-secondary">{{t18}}</strong>{{t19}}</p>
</div>
<div class="flex items-center gap-2 shrink-0">
<span class="font-code-md text-[11px] text-secondary font-semibold bg-surface-container-lowest px-2 py-0.5 rounded">{{t20}}</span>
<button class="text-secondary hover:text-on-surface font-label-sm text-label-sm underline ml-1" type="button">{{t21}}</button>
</div>
</div>
</section>
<!-- 2. Four Top Executive Metric Cards -->
<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
<!-- Card 1 -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between border-t-[3px] border-t-primary-container">
<div class="flex items-start justify-between">
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">{{t22}}</span>
<div class="flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-code-md text-[10px] text-secondary font-bold uppercase">{{t23}}</span>
</div>
</div>
<div class="my-2">
<div class="flex items-baseline gap-2">
<span class="font-display-lg text-display-lg text-on-surface font-bold leading-none">{{t24}}</span>
<span class="font-label-lg text-label-lg text-on-surface-variant">{{t25}}</span>
</div>
<p class="font-body-sm text-body-sm text-outline mt-1 line-clamp-2">{{t26}}</p>
</div>
<div class="pt-2 border-t border-t-outline-variant/30 flex items-center justify-between">
<span class="font-code-md text-[11px] text-secondary font-semibold">{{t27}}</span>
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t28}}</span>
</div>
</div>
<!-- Card 2 -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between border-t-[3px] border-t-primary-container">
<div class="flex items-start justify-between">
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">{{t29}}</span>
<div class="flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-code-md text-[10px] text-primary-container font-bold uppercase">{{t30}}</span>
</div>
</div>
<div class="my-2">
<div class="flex items-baseline gap-2">
<span class="font-display-lg text-display-lg text-on-surface font-bold leading-none">{{t31}}</span>
<span class="font-label-lg text-label-lg text-on-surface-variant">{{t32}}</span>
</div>
<p class="font-body-sm text-body-sm text-outline mt-1 line-clamp-2">{{t33}}</p>
</div>
<div class="pt-2 border-t border-t-outline-variant/30 flex items-center justify-between">
<span class="font-code-md text-[11px] text-primary-container font-semibold">{{t34}}</span>
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t35}}</span>
</div>
</div>
<!-- Card 3 -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between border-t-[3px] border-t-primary-container">
<div class="flex items-start justify-between">
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">{{t36}}</span>
<div class="flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-error"></span>
<span class="font-code-md text-[10px] text-error font-bold uppercase">{{t37}}</span>
</div>
</div>
<div class="my-2">
<div class="flex items-baseline gap-2">
<span class="font-display-lg text-display-lg text-error font-bold leading-none">{{t38}}</span>
<span class="font-label-lg text-label-lg text-on-surface-variant">{{t39}}</span>
</div>
<p class="font-body-sm text-body-sm text-outline mt-1 line-clamp-2">{{t40}}</p>
</div>
<div class="pt-2 border-t border-t-outline-variant/30 flex items-center justify-between">
<span class="font-code-md text-[11px] text-error font-semibold">{{t41}}</span>
<span class="material-symbols-outlined text-[16px] text-error">{{t42}}</span>
</div>
</div>
<!-- Card 4 -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between border-t-[3px] border-t-primary-container">
<div class="flex items-start justify-between">
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">{{t43}}</span>
<div class="flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-outline"></span>
<span class="font-code-md text-[10px] text-outline font-bold uppercase">{{t44}}</span>
</div>
</div>
<div class="my-2">
<div class="flex items-baseline gap-2">
<span class="font-display-lg text-display-lg text-on-surface font-bold leading-none">{{t45}}</span>
<span class="font-label-lg text-label-lg text-on-surface-variant">{{t46}}</span>
</div>
<p class="font-body-sm text-body-sm text-outline mt-1 line-clamp-2">{{t47}}</p>
</div>
<div class="pt-2 border-t border-t-outline-variant/30 flex items-center justify-between">
<span class="font-code-md text-[11px] text-on-surface-variant font-semibold">{{t48}}</span>
<span class="material-symbols-outlined text-[16px] text-outline">{{t49}}</span>
</div>
</div>
</section>
<!-- 3. Two-Column Operational Core -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
<!-- Left Column (40% / 5 cols): Today's Schedule & Chamber Order -->
<div class="lg:col-span-5 flex flex-col gap-space-md">
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col h-full">
<div class="flex items-center justify-between pb-space-sm border-b border-b-outline-variant/40">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[20px] text-primary-container">{{t50}}</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface font-semibold">{{t51}}</h2>
</div>
<span class="font-code-md text-[11px] px-2 py-0.5 rounded bg-surface-container text-on-surface font-semibold">{{t52}}</span>
</div>
<!-- Vertical Timeline List -->
<div class="relative flex flex-col gap-space-md my-space-md pl-4 before:content-[''] before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-container">
<!-- Item 1: Completed -->
<div class="relative flex flex-col gap-1">
<div class="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-primary-container ring-4 ring-surface-container-lowest"></div>
<div class="flex items-center justify-between">
<span class="font-code-md text-code-md text-on-surface font-bold">{{t53}}</span>
<span class="font-label-sm text-label-sm text-primary-container bg-primary-fixed/40 px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold">
<span class="material-symbols-outlined text-[12px]">{{t54}}</span>{{t55}}</span>
</div>
<p class="font-label-lg text-label-lg text-on-surface font-semibold">{{t56}}</p>
<div class="flex items-center gap-2 text-outline font-body-sm text-body-sm">
<span class="material-symbols-outlined text-[14px]">{{t57}}</span>
<span>{{t58}}</span>
<span class="text-outline-variant">{{t59}}</span>
<span class="text-secondary font-medium">{{t60}}</span>
</div>
</div>
<!-- Item 2: Active / In Progress -->
<div class="relative flex flex-col gap-1 p-2 rounded bg-surface-container-low/70 border-l-2 border-l-secondary">
<div class="absolute -left-[22px] top-3 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-surface-container-lowest animate-pulse"></div>
<div class="flex items-center justify-between">
<span class="font-code-md text-code-md text-secondary font-bold">{{t61}}</span>
<span class="font-label-sm text-label-sm text-secondary bg-secondary-fixed/50 px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>{{t62}}</span>
</div>
<p class="font-label-lg text-label-lg text-on-surface font-semibold">{{t63}}</p>
<div class="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
<span class="material-symbols-outlined text-[14px]">{{t64}}</span>
<span class="font-medium">{{t65}}</span>
</div>
<p class="font-body-sm text-body-sm text-outline text-[11px] mt-0.5">{{t66}}</p>
</div>
<!-- Item 3: Confirmed -->
<div class="relative flex flex-col gap-1">
<div class="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-outline ring-4 ring-surface-container-lowest"></div>
<div class="flex items-center justify-between">
<span class="font-code-md text-code-md text-on-surface font-bold">{{t67}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">{{t68}}</span>
</div>
<p class="font-label-lg text-label-lg text-on-surface font-semibold">{{t69}}</p>
<div class="flex items-center gap-2 text-outline font-body-sm text-body-sm">
<span class="material-symbols-outlined text-[14px]">{{t70}}</span>
<span>{{t71}}</span>
<span class="text-outline-variant">{{t72}}</span>
<span class="text-primary-container font-medium">{{t73}}</span>
</div>
</div>
<!-- Item 4: Confirmed -->
<div class="relative flex flex-col gap-1">
<div class="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-outline ring-4 ring-surface-container-lowest"></div>
<div class="flex items-center justify-between">
<span class="font-code-md text-code-md text-on-surface font-bold">{{t74}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">{{t75}}</span>
</div>
<p class="font-label-lg text-label-lg text-on-surface font-semibold">{{t76}}</p>
<div class="flex items-center gap-2 text-outline font-body-sm text-body-sm">
<span class="material-symbols-outlined text-[14px]">{{t77}}</span>
<span>{{t78}}</span>
</div>
</div>
<!-- Item 5: Pending -->
<div class="relative flex flex-col gap-1">
<div class="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-outline ring-4 ring-surface-container-lowest"></div>
<div class="flex items-center justify-between">
<span class="font-code-md text-code-md text-on-surface font-bold">{{t79}}</span>
<span class="font-label-sm text-label-sm text-outline bg-surface-container-low px-1.5 py-0.5 rounded">{{t80}}</span>
</div>
<p class="font-label-lg text-label-lg text-on-surface font-semibold">{{t81}}</p>
<div class="flex items-center gap-2 text-outline font-body-sm text-body-sm">
<span class="material-symbols-outlined text-[14px]">{{t82}}</span>
<span>{{t83}}</span>
</div>
</div>
</div>
<!-- Action / View Roster -->
<div class="mt-auto pt-space-sm border-t border-t-outline-variant/40 flex items-center justify-between">
<span class="font-body-sm text-body-sm text-outline">{{t84}}</span>
<button class="px-3 py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-primary-container font-label-md text-label-md flex items-center gap-1 font-semibold transition-colors" type="button">
<span>{{t85}}</span>
<span class="material-symbols-outlined text-[16px]">{{t86}}</span>
</button>
</div>
</div>
</div>
<!-- Right Column (60% / 7 cols): "Awaiting Your Decision" Priority Queue -->
<div class="lg:col-span-7 flex flex-col gap-space-md">
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col gap-space-md">
<div class="flex items-center justify-between pb-space-sm border-b border-b-outline-variant/40">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[20px] text-primary-container">{{t87}}</span>
<div class="flex flex-col">
<h2 class="font-headline-sm text-headline-sm text-on-surface font-semibold leading-tight">{{t88}}</h2>
<span class="font-label-sm text-label-sm text-outline">{{t89}}</span>
</div>
</div>
<div class="flex items-center gap-2">
<span class="font-code-md text-[11px] text-secondary font-semibold bg-secondary-fixed/40 px-2 py-0.5 rounded">{{t90}}</span>
<span class="font-code-md text-[11px] text-outline bg-surface-container px-2 py-0.5 rounded">{{t91}}</span>
</div>
</div>
<!-- Priority Card 1 (Urgent Constitutional Ruling) -->
<div class="p-space-md rounded bg-surface-container-lowest border-l-4 border-l-secondary shadow-sm flex flex-col gap-space-sm">
<div class="flex flex-wrap items-center justify-between gap-2">
<div class="flex items-center gap-2">
<span class="font-code-md text-code-md font-bold text-primary-container">{{t92}}</span>
<span class="text-outline-variant">{{t93}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">{{t94}}</span>
<span class="text-outline-variant">{{t95}}</span>
<span class="font-code-md text-[11px] text-outline">{{t96}}</span>
</div>
<span class="font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed font-semibold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>{{t97}}</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface font-semibold">{{t98}}</h3>
<!-- AI Executive Brief Pill -->
<div class="p-space-sm rounded bg-surface-container-low flex items-start gap-2.5">
<span class="material-symbols-outlined text-[18px] text-secondary-fixed-variant shrink-0 mt-0.5">{{t99}}</span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">{{t100}}</span>
<p class="font-body-sm text-body-sm text-on-surface mt-0.5">{{t101}}</p>
</div>
</div>
<!-- Inline Actions -->
<div class="flex flex-wrap items-center justify-between gap-2 pt-1">
<div class="flex items-center gap-1 text-outline font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px]">{{t102}}</span>
<span>{{t103}}</span>
</div>
<div class="flex items-center gap-2">
<button class="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" type="button">{{t104}}</button>
<button class="px-2.5 py-1 rounded bg-surface-container-lowest text-primary-container font-label-md text-label-md shadow-sm hover:bg-surface-container transition-colors" type="button">{{t105}}</button>
<button class="px-3 py-1 rounded bg-primary-container hover:bg-tertiary-container text-on-primary font-label-md text-label-md font-semibold transition-colors flex items-center gap-1 shadow-sm" type="button">
<span class="material-symbols-outlined text-[15px]">{{t106}}</span>
<span>{{t107}}</span>
</button>
</div>
</div>
</div>
<!-- Priority Card 2 (Inter-Parliamentary Sanction) -->
<div class="p-space-md rounded bg-surface-container-lowest border-l-4 border-l-primary-container shadow-sm flex flex-col gap-space-sm">
<div class="flex flex-wrap items-center justify-between gap-2">
<div class="flex items-center gap-2">
<span class="font-code-md text-code-md font-bold text-primary-container">{{t108}}</span>
<span class="text-outline-variant">{{t109}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">{{t110}}</span>
<span class="text-outline-variant">{{t111}}</span>
<span class="font-code-md text-[11px] text-outline">{{t112}}</span>
</div>
<span class="font-label-sm text-label-sm bg-surface-container text-on-surface-variant font-semibold px-2 py-0.5 rounded uppercase tracking-wider">{{t113}}</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface font-semibold">{{t114}}</h3>
<div class="p-space-sm rounded bg-surface-container-low flex items-start gap-2.5">
<span class="material-symbols-outlined text-[18px] text-primary-container shrink-0 mt-0.5">{{t115}}</span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-primary-container font-bold uppercase tracking-wider">{{t116}}</span>
<p class="font-body-sm text-body-sm text-on-surface mt-0.5">{{t117}}</p>
</div>
</div>
<div class="flex flex-wrap items-center justify-between gap-2 pt-1">
<div class="flex items-center gap-1 text-outline font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px]">{{t118}}</span>
<span>{{t119}}</span>
</div>
<div class="flex items-center gap-2">
<button class="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" type="button">{{t120}}</button>
<button class="px-3 py-1 rounded bg-primary-container hover:bg-tertiary-container text-on-primary font-label-md text-label-md font-semibold transition-colors flex items-center gap-1 shadow-sm" type="button">
<span class="material-symbols-outlined text-[15px]">{{t121}}</span>
<span>{{t122}}</span>
</button>
</div>
</div>
</div>
<!-- Priority Card 3 (Establishment Promotion) -->
<div class="p-space-md rounded bg-surface-container-lowest border-l-4 border-l-outline-variant shadow-sm flex flex-col gap-space-sm">
<div class="flex flex-wrap items-center justify-between gap-2">
<div class="flex items-center gap-2">
<span class="font-code-md text-code-md font-bold text-primary-container">{{t123}}</span>
<span class="text-outline-variant">{{t124}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">{{t125}}</span>
<span class="text-outline-variant">{{t126}}</span>
<span class="font-code-md text-[11px] text-outline">{{t127}}</span>
</div>
<span class="font-label-sm text-label-sm bg-surface-container-low text-outline font-semibold px-2 py-0.5 rounded uppercase tracking-wider">{{t128}}</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface font-semibold">{{t129}}</h3>
<div class="p-space-sm rounded bg-surface-container-low flex items-start gap-2.5">
<span class="material-symbols-outlined text-[18px] text-outline shrink-0 mt-0.5">{{t130}}</span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-outline font-bold uppercase tracking-wider">{{t131}}</span>
<p class="font-body-sm text-body-sm text-on-surface mt-0.5">{{t132}}</p>
</div>
</div>
<div class="flex flex-wrap items-center justify-between gap-2 pt-1">
<div class="flex items-center gap-1 text-outline font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px]">{{t133}}</span>
<span>{{t134}}</span>
</div>
<div class="flex items-center gap-2">
<button class="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" type="button">{{t135}}</button>
<button class="px-3 py-1 rounded bg-primary-container hover:bg-tertiary-container text-on-primary font-label-md text-label-md font-semibold transition-colors flex items-center gap-1 shadow-sm" type="button">
<span class="material-symbols-outlined text-[15px]">{{t136}}</span>
<span>{{t137}}</span>
</button>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- 4. Full-Width Bottom Section: Recent Activity Audit Feed Across All 9 Modules -->
<section class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col gap-space-md">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm border-b border-b-outline-variant/40">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[22px] text-primary-container">{{t138}}</span>
<div class="flex flex-col">
<h2 class="font-headline-sm text-headline-sm text-on-surface font-semibold leading-tight">{{t139}}</h2>
<span class="font-label-sm text-label-sm text-outline">{{t140}}</span>
</div>
</div>
<div class="flex items-center gap-2">
<button class="px-3 py-1.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1.5 hover:bg-surface-container-high transition-colors" type="button">
<span class="material-symbols-outlined text-[16px] text-outline">{{t141}}</span>
<span>{{t142}}</span>
</button>
</div>
</div>
<!-- Filter Tabs Pill Bar -->
<div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-nowrap">
<button class="px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold" type="button">{{t143}}</button>
<button class="px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors" type="button">{{t144}}</button>
<button class="px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors" type="button">{{t145}}</button>
<button class="px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors" type="button">{{t146}}</button>
<button class="px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors" type="button">{{t147}}</button>
<button class="px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors" type="button">{{t148}}</button>
</div>
<!-- Audit Table Strip -->
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-low font-label-sm text-label-sm text-outline uppercase tracking-wider">
<th class="py-2.5 px-3 font-semibold">{{t149}}</th>
<th class="py-2.5 px-3 font-semibold">{{t150}}</th>
<th class="py-2.5 px-3 font-semibold">{{t151}}</th>
<th class="py-2.5 px-3 font-semibold">{{t152}}</th>
<th class="py-2.5 px-3 font-semibold">{{t153}}</th>
<th class="py-2.5 px-3 font-semibold text-right">{{t154}}</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/30 font-body-sm text-body-sm text-on-surface">
<tr class="hover:bg-surface-container-low/60 transition-colors">
<td class="py-2.5 px-3 font-code-md text-code-md text-outline">{{t155}}</td>
<td class="py-2.5 px-3">
<span class="inline-flex items-center gap-1 text-primary-container font-semibold font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px]">{{t156}}</span>
<span>{{t157}}</span>
</span>
</td>
<td class="py-2.5 px-3 font-medium">{{t158}}</td>
<td class="py-2.5 px-3 text-on-surface-variant">{{t159}}</td>
<td class="py-2.5 px-3 font-code-md text-[12px] text-primary-container">{{t160}}</td>
<td class="py-2.5 px-3 text-right">
<span class="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary-container font-semibold">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>{{t161}}</span>
</td>
</tr>
<tr class="hover:bg-surface-container-low/60 transition-colors">
<td class="py-2.5 px-3 font-code-md text-code-md text-outline">{{t162}}</td>
<td class="py-2.5 px-3">
<span class="inline-flex items-center gap-1 text-on-surface font-semibold font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t163}}</span>
<span>{{t164}}</span>
</span>
</td>
<td class="py-2.5 px-3 font-medium">{{t165}}</td>
<td class="py-2.5 px-3 text-on-surface-variant">{{t166}}</td>
<td class="py-2.5 px-3 font-code-md text-[12px] text-outline">{{t167}}</td>
<td class="py-2.5 px-3 text-right">
<span class="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-semibold">
<span class="w-2 h-2 rounded-full bg-secondary"></span>{{t168}}</span>
</td>
</tr>
<tr class="hover:bg-surface-container-low/60 transition-colors">
<td class="py-2.5 px-3 font-code-md text-code-md text-outline">{{t169}}</td>
<td class="py-2.5 px-3">
<span class="inline-flex items-center gap-1 text-on-surface font-semibold font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px] text-outline">{{t170}}</span>
<span>{{t171}}</span>
</span>
</td>
<td class="py-2.5 px-3 font-medium">{{t172}}</td>
<td class="py-2.5 px-3 text-on-surface-variant">{{t173}}</td>
<td class="py-2.5 px-3 font-code-md text-[12px] text-outline">{{t174}}</td>
<td class="py-2.5 px-3 text-right">
<span class="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary-container font-semibold">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>{{t175}}</span>
</td>
</tr>
<tr class="hover:bg-surface-container-low/60 transition-colors">
<td class="py-2.5 px-3 font-code-md text-code-md text-outline">{{t176}}</td>
<td class="py-2.5 px-3">
<span class="inline-flex items-center gap-1 text-on-surface font-semibold font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px] text-outline">{{t177}}</span>
<span>{{t178}}</span>
</span>
</td>
<td class="py-2.5 px-3 font-medium">{{t179}}</td>
<td class="py-2.5 px-3 text-on-surface-variant">{{t180}}</td>
<td class="py-2.5 px-3 font-code-md text-[12px] text-outline">{{t181}}</td>
<td class="py-2.5 px-3 text-right">
<span class="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary-container font-semibold">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>{{t182}}</span>
</td>
</tr>
<tr class="hover:bg-surface-container-low/60 transition-colors">
<td class="py-2.5 px-3 font-code-md text-code-md text-outline">{{t183}}</td>
<td class="py-2.5 px-3">
<span class="inline-flex items-center gap-1 text-on-surface font-semibold font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px] text-outline">{{t184}}</span>
<span>{{t185}}</span>
</span>
</td>
<td class="py-2.5 px-3 font-medium">{{t186}}</td>
<td class="py-2.5 px-3 text-on-surface-variant">{{t187}}</td>
<td class="py-2.5 px-3 font-code-md text-[12px] text-outline">{{t188}}</td>
<td class="py-2.5 px-3 text-right">
<span class="inline-flex items-center gap-1 font-label-sm text-label-sm text-outline font-semibold">
<span class="w-2 h-2 rounded-full bg-outline"></span>{{t189}}</span>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Audit Footer -->
<div class="flex items-center justify-between pt-2">
<span class="font-code-md text-[11px] text-outline">{{t190}}</span>
<div class="flex items-center gap-1 text-primary-container hover:text-tertiary-container font-label-sm text-label-sm font-semibold cursor-pointer">
<span>{{t191}}</span>
<span class="material-symbols-outlined text-[16px]">{{t192}}</span>
</div>
</div>
</section>
</div>
<!-- Inline Interactive Script for Navigation highlight and Panel syncing -->
</main>`;
