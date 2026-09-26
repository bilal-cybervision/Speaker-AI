/* Layout taken from the prototype. Copy lives in the data module. */
export const template = `<main class="w-full pt-2 bg-surface px-space-lg py-space-lg"><div class="flex flex-col w-full gap-space-lg">
<!-- Breadcrumbs & Sovereign Protocol Banner -->
<div class="flex flex-col md:flex-row md:items-center justify-between pb-space-xs gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="font-code-md text-code-md text-secondary font-semibold uppercase tracking-wider">{{t1}}</span>
<span class="text-outline-variant font-label-sm">{{t2}}</span>
<span class="font-code-md text-code-md text-on-surface-variant font-medium">{{t3}}</span>
</div>
<div class="flex items-baseline gap-space-sm mt-0.5">
<h1 class="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">{{t4}}</h1>
<span class="font-headline-lg text-headline-lg text-on-surface-variant/80 font-normal">{{t5}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{{t6}}</p>
</div>
<!-- Live Telemetry & Timestamp -->
<div class="flex items-center gap-space-md self-start md:self-auto bg-surface-container-low px-space-md py-space-xs rounded-xl shadow-sm">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
<span class="font-code-md text-code-md text-on-surface font-semibold">{{t7}}</span>
<span class="font-code-md text-code-md text-outline font-normal">{{t8}}</span>
</div>
<div class="w-px h-4 bg-surface-container-highest"></div>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t9}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{{t10}}</span>
</div>
</div>
</div>
<!-- Operational Filter Strip & Action Command -->
<div class="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
<div class="flex flex-wrap items-center gap-space-sm">
<!-- Media Source Filter -->
<div class="flex items-center gap-1 bg-surface-container-low px-space-sm py-1.5 rounded-lg">
<span class="material-symbols-outlined text-outline text-[16px]">{{t11}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">{{t12}}</span>
<select class="bg-transparent font-label-md text-label-md text-on-surface font-semibold focus:outline-none cursor-pointer pr-2">
<option>{{t13}}</option>
<option>{{t14}}</option>
<option>{{t15}}</option>
<option>{{t16}}</option>
</select>
</div>
<!-- Sentiment Filter -->
<div class="flex items-center gap-1 bg-surface-container-low px-space-sm py-1.5 rounded-lg">
<span class="material-symbols-outlined text-outline text-[16px]">{{t17}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">{{t18}}</span>
<select class="bg-transparent font-label-md text-label-md text-on-surface font-semibold focus:outline-none cursor-pointer pr-2">
<option>{{t19}}</option>
<option>{{t20}}</option>
<option>{{t21}}</option>
<option>{{t22}}</option>
</select>
</div>
<!-- Date Period Filter -->
<div class="flex items-center gap-1 bg-surface-container-low px-space-sm py-1.5 rounded-lg">
<span class="material-symbols-outlined text-outline text-[16px]">{{t23}}</span>
<span class="font-label-md text-label-md text-on-surface font-semibold">{{t24}}</span>
</div>
<!-- Quick Toggles -->
<button class="flex items-center gap-1 px-space-sm py-1.5 bg-surface-container text-on-surface-variant hover:text-on-surface rounded-lg font-label-md text-label-md transition-colors">
<span class="material-symbols-outlined text-[16px]">{{t25}}</span>
<span>{{t26}}</span>
</button>
</div>
<!-- Primary Action Solid Sovereign Green -->
<div class="flex items-center gap-space-sm shrink-0">
<button class="flex items-center gap-2 bg-primary-container hover:bg-tertiary-container text-on-primary font-label-lg text-label-lg px-space-md py-2 rounded-lg transition-all shadow-sm">
<span class="material-symbols-outlined text-[18px]">{{t27}}</span>
<span>{{t28}}</span>
</button>
</div>
</div>
<!-- Metric Summary Strip (Stat Tiles with Sovereign Micro-Visuals) -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
<!-- Stat 1 -->
<div class="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
<div class="flex items-start justify-between">
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">{{t29}}</span>
<span class="font-display-lg text-display-lg font-bold text-on-surface mt-1">{{t30}}</span>
</div>
<div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
<span class="material-symbols-outlined text-[22px]">{{t31}}</span>
</div>
</div>
<div class="mt-space-sm pt-space-xs flex items-center justify-between">
<span class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>{{t32}}</span>
<span class="font-code-md text-code-md text-primary-container font-semibold">{{t33}}</span>
</div>
</div>
<!-- Stat 2 -->
<div class="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div class="flex items-start justify-between">
<div class="flex flex-col">
<div class="flex items-center gap-1.5">
<span class="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">{{t34}}</span>
</div>
<span class="font-display-lg text-display-lg font-bold text-primary-container mt-1">{{t35}}<span class="text-headline-md font-medium text-outline">{{t36}}</span></span>
</div>
<!-- Sparkline Vector -->
<svg class="w-16 h-8 text-primary-container mt-2" fill="none" viewbox="0 0 64 32" xmlns="http://www.w3.org/2000/svg">
<path d="M2 28L14 22L26 26L38 12L50 16L62 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path>
</svg>
</div>
<div class="mt-space-sm pt-space-xs flex items-center justify-between text-body-sm text-on-surface-variant">
<span>{{t37}}</span>
<span class="font-code-md text-code-md text-secondary font-semibold">{{t38}}</span>
</div>
</div>
<!-- Stat 3 -->
<div class="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div class="flex items-start justify-between">
<div class="flex flex-col">
<div class="flex items-center gap-1.5">
<span class="w-2.5 h-2.5 rounded-full bg-outline"></span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">{{t39}}</span>
</div>
<span class="font-display-lg text-display-lg font-bold text-on-surface mt-1">{{t40}}<span class="text-headline-md font-medium text-outline">{{t41}}</span></span>
</div>
<!-- Flat Sparkline -->
<svg class="w-16 h-8 text-outline mt-2" fill="none" viewbox="0 0 64 32" xmlns="http://www.w3.org/2000/svg">
<path d="M2 18L18 16L32 17L48 15L62 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</div>
<div class="mt-space-sm pt-space-xs flex items-center justify-between text-body-sm text-on-surface-variant">
<span>{{t42}}</span>
<span class="font-code-md text-code-md text-outline">{{t43}}</span>
</div>
</div>
<!-- Stat 4 Flagged / Critical -->
<div class="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div class="flex items-start justify-between">
<div class="flex flex-col">
<div class="flex items-center gap-1.5">
<span class="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
<span class="font-label-sm text-label-sm text-error uppercase tracking-wider font-bold">{{t44}}</span>
</div>
<span class="font-display-lg text-display-lg font-bold text-error mt-1">{{t45}}<span class="text-headline-md font-medium text-error/70">{{t46}}</span></span>
</div>
<div class="px-2 py-1 bg-error-container text-on-error-container rounded font-code-md text-code-md font-bold mt-1">{{t47}}</div>
</div>
<div class="mt-space-sm pt-space-xs flex items-center justify-between text-body-sm text-error">
<span class="font-semibold font-label-sm">{{t48}}</span>
<span class="material-symbols-outlined text-[16px]">{{t49}}</span>
</div>
</div>
</div>
<!-- Operational Core Grid: 60% Feed / 40% Drafting Engine -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
<!-- LEFT COLUMN (60% / 7 Cols): Daily Parliamentary News & Media Digest Feed -->
<div class="lg:col-span-7 flex flex-col gap-space-md">
<!-- Feed Header & Sorter -->
<div class="flex items-center justify-between bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-sm">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-primary-container text-[20px]">{{t50}}</span>
<span class="font-headline-sm text-headline-sm text-on-surface font-semibold">{{t51}}</span>
<span class="bg-surface-container-high font-code-md text-code-md text-on-surface-variant px-1.5 py-0.5 rounded ml-1">{{t52}}</span>
</div>
<div class="flex items-center gap-2">
<button class="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface flex items-center gap-1">
<span>{{t53}}</span>
<span class="material-symbols-outlined text-[14px]">{{t54}}</span>
</button>
<button class="p-1 rounded hover:bg-surface-container text-outline hover:text-on-surface">
<span class="material-symbols-outlined text-[18px]">{{t55}}</span>
</button>
</div>
</div>
<!-- ITEM 1: CRITICAL FLAGGED -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
<!-- Card Top Bar -->
<div class="px-space-md pt-space-md pb-space-xs flex items-start justify-between gap-space-sm">
<div class="flex flex-wrap items-center gap-2">
<span class="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold uppercase tracking-wider flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-error"></span>{{t56}}</span>
<span class="font-code-md text-code-md text-on-surface font-semibold">{{t57}}</span>
<span class="text-outline-variant font-label-sm">{{t58}}</span>
<span class="font-body-sm text-body-sm text-outline flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">{{t59}}</span>{{t60}}</span>
</div>
<div class="flex items-center gap-1 text-outline">
<span class="material-symbols-outlined text-[18px] cursor-pointer hover:text-on-surface" title="{{a1}}">{{t61}}</span>
<span class="material-symbols-outlined text-[18px] cursor-pointer hover:text-on-surface" title="{{a2}}">{{t62}}</span>
</div>
</div>
<!-- Headline & Media Clipping Preview -->
<div class="px-space-md py-space-xs flex flex-col md:flex-row gap-space-md items-start">
<div class="flex-1">
<h2 class="font-headline-md text-headline-md text-on-surface font-bold leading-snug">{{t63}}</h2>
<div class="mt-2.5 p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1.5">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t64}}</span>
<span class="font-label-sm text-label-sm text-primary-container font-semibold uppercase tracking-wider">{{t65}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{{t66}}</p>
</div>
<!-- Legislative Fact-Check Callout Box -->
<div class="mt-2.5 p-space-sm bg-surface-container rounded-lg flex items-start gap-space-xs">
<span class="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">{{t67}}</span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">{{t68}}</span>
<p class="font-body-sm text-body-sm text-on-surface font-medium mt-0.5">{{t69}}</p>
</div>
</div>
</div>
<!-- Video Broadcast Thumbnail Clip -->
<div class="w-full md:w-44 shrink-0 rounded-lg overflow-hidden bg-surface-container-high relative group">
<img class="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Television broadcast screen showing a Pakistani parliamentary news bulletin desk with red alert graphics and ticker discussing assembly private members bills." src="/assets/proto-06.jpg"/>
<div class="absolute inset-0 bg-on-surface/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
<div class="w-8 h-8 rounded-full bg-surface-container-lowest/90 flex items-center justify-center text-primary-container shadow">
<span class="material-symbols-outlined text-[20px]">{{t70}}</span>
</div>
</div>
<div class="absolute bottom-1 left-1 bg-on-background/80 px-1 py-0.5 rounded font-code-md text-[9px] text-on-primary">{{t71}}</div>
</div>
</div>
<!-- Action Command Footer -->
<div class="px-space-md py-space-sm bg-surface-container-low flex flex-wrap items-center justify-between gap-space-sm mt-space-sm">
<div class="flex items-center gap-space-sm">
<button class="bg-primary-container hover:bg-tertiary-container text-on-primary font-label-md text-label-md px-space-md py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors">
<span class="material-symbols-outlined text-[16px]">{{t72}}</span>
<span>{{t73}}</span>
</button>
<button class="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-space-sm py-1.5 rounded-lg flex items-center gap-1 transition-colors">
<span class="material-symbols-outlined text-[16px]">{{t74}}</span>
<span>{{t75}}</span>
</button>
</div>
<div class="flex items-center gap-space-xs">
<button class="font-label-sm text-label-sm text-outline hover:text-on-surface-variant px-2 py-1">{{t76}}</button>
<button class="font-label-sm text-label-sm text-primary-container hover:underline px-2 py-1 font-semibold">{{t77}}</button>
</div>
</div>
</div>
<!-- ITEM 2: POSITIVE INSTITUTIONAL COVERAGE -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
<div class="px-space-md pt-space-md pb-space-xs flex items-start justify-between gap-space-sm">
<div class="flex flex-wrap items-center gap-2">
<span class="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold uppercase tracking-wider flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-primary-container"></span>{{t78}}</span>
<span class="font-code-md text-code-md text-on-surface font-semibold">{{t79}}</span>
<span class="text-outline-variant font-label-sm">{{t80}}</span>
<span class="font-body-sm text-body-sm text-outline flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">{{t81}}</span>{{t82}}</span>
</div>
<div class="flex items-center gap-1 text-outline">
<span class="material-symbols-outlined text-[18px] cursor-pointer hover:text-on-surface">{{t83}}</span>
<span class="material-symbols-outlined text-[18px] cursor-pointer hover:text-on-surface">{{t84}}</span>
</div>
</div>
<div class="px-space-md py-space-xs flex flex-col md:flex-row gap-space-md items-start">
<div class="flex-1">
<h2 class="font-headline-md text-headline-md text-on-surface font-bold leading-snug">{{t85}}</h2>
<div class="mt-2 p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t86}}</span>
<span class="font-label-sm text-label-sm text-primary-container font-semibold uppercase tracking-wider">{{t87}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">{{t88}}</p>
</div>
</div>
<!-- Photo Clip -->
<div class="w-full md:w-44 shrink-0 rounded-lg overflow-hidden bg-surface-container-high relative">
<img class="w-full h-28 object-cover" data-alt="Speaker Sardar Ayaz Sadiq seated in formal diplomatic chamber with the Turkish Ambassador in Islamabad, national flags displayed behind with state protocol decor." src="/assets/proto-07.jpg"/>
<div class="absolute bottom-1 right-1 bg-surface-container-lowest/90 px-1 py-0.5 rounded font-label-sm text-[9px] text-primary-container font-bold">{{t89}}</div>
</div>
</div>
<div class="px-space-md py-space-sm bg-surface-container-low flex flex-wrap items-center justify-between gap-space-sm mt-space-sm">
<div class="flex items-center gap-space-sm">
<button class="bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md px-space-md py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors">
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t90}}</span>
<span>{{t91}}</span>
</button>
<button class="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-space-sm py-1.5 rounded-lg flex items-center gap-1 transition-colors">
<span class="material-symbols-outlined text-[16px]">{{t92}}</span>
<span>{{t93}}</span>
</button>
</div>
<span class="font-label-sm text-label-sm text-on-primary-fixed-variant font-semibold">{{t94}}</span>
</div>
</div>
<!-- ITEM 3: NEUTRAL REPORTING -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
<div class="px-space-md pt-space-md pb-space-xs flex items-start justify-between gap-space-sm">
<div class="flex flex-wrap items-center gap-2">
<span class="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold uppercase tracking-wider flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-outline"></span>{{t95}}</span>
<span class="font-code-md text-code-md text-on-surface font-semibold">{{t96}}</span>
<span class="text-outline-variant font-label-sm">{{t97}}</span>
<span class="font-body-sm text-body-sm text-outline flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">{{t98}}</span>{{t99}}</span>
</div>
<div class="flex items-center gap-1 text-outline">
<span class="material-symbols-outlined text-[18px] cursor-pointer hover:text-on-surface">{{t100}}</span>
<span class="material-symbols-outlined text-[18px] cursor-pointer hover:text-on-surface">{{t101}}</span>
</div>
</div>
<div class="px-space-md py-space-xs">
<h2 class="font-headline-md text-headline-md text-on-surface font-bold leading-snug">{{t102}}</h2>
<div class="mt-2 p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t103}}</span>
<span class="font-label-sm text-label-sm text-primary-container font-semibold uppercase tracking-wider">{{t104}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">{{t105}}</p>
</div>
</div>
<div class="px-space-md py-space-sm bg-surface-container-low flex flex-wrap items-center justify-between gap-space-sm mt-space-sm">
<div class="flex items-center gap-space-sm">
<button class="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-space-md py-1.5 rounded-lg flex items-center gap-1 transition-colors">
<span class="material-symbols-outlined text-[16px]">{{t106}}</span>
<span>{{t107}}</span>
</button>
<span class="font-body-sm text-body-sm text-outline">{{t108}}</span>
</div>
<span class="font-code-md text-code-md text-outline">{{t109}}</span>
</div>
</div>
</div>
<!-- RIGHT COLUMN (40% / 5 Cols): AI-Assisted Press Release Drafting & Statement Console -->
<div class="lg:col-span-5 flex flex-col gap-space-md">
<!-- Console Master Container -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm flex flex-col overflow-hidden">
<!-- Console Sovereign Header -->
<div class="bg-primary-container px-space-md py-space-sm flex items-center justify-between text-on-primary">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[20px] text-secondary-fixed">{{t110}}</span>
<div class="flex flex-col">
<span class="font-label-lg text-label-lg font-bold">{{t111}}</span>
<span class="font-label-sm text-label-sm text-primary-fixed-dim/80 text-[10px]">{{t112}}</span>
</div>
</div>
<span class="bg-tertiary px-2 py-0.5 rounded font-code-md text-[10px] text-secondary-fixed font-semibold uppercase tracking-wider">{{t113}}</span>
</div>
<!-- Target Story Context Banner -->
<div class="p-space-md bg-surface-container-low flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-error font-bold uppercase tracking-wider flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">{{t114}}</span>{{t115}}</span>
<span class="font-code-md text-code-md text-outline font-semibold">{{t116}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface font-semibold">{{t117}}</p>
<div class="flex items-center gap-space-xs text-[11px] text-on-surface-variant font-code-md">
<span>{{t118}}</span>
</div>
</div>
<!-- Drafting Workspace Form -->
<div class="p-space-md flex flex-col gap-space-md">
<!-- Tone Selector Tabs -->
<div class="flex flex-col gap-1.5">
<label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">{{t119}}</label>
<div class="grid grid-cols-3 gap-1 bg-surface-container-low p-1 rounded-lg">
<button class="py-1.5 px-2 rounded font-label-sm text-label-sm text-center font-bold bg-primary-container text-on-primary shadow-sm">{{t120}}</button>
<button class="py-1.5 px-2 rounded font-label-sm text-label-sm text-center font-medium text-on-surface hover:bg-surface-container transition-colors">{{t121}}</button>
<button class="py-1.5 px-2 rounded font-label-sm text-label-sm text-center font-medium text-on-surface hover:bg-surface-container transition-colors">{{t122}}</button>
</div>
</div>
<!-- Headline Input -->
<div class="flex flex-col gap-1">
<div class="flex items-center justify-between">
<label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">{{t123}}</label>
<span class="font-label-sm text-label-sm text-secondary font-medium cursor-pointer hover:underline flex items-center gap-0.5">
<span class="material-symbols-outlined text-[12px]">{{t124}}</span>{{t125}}</span>
</div>
<input class="w-full bg-surface px-3 py-2 rounded-lg font-body-sm text-body-sm text-on-surface font-semibold focus:outline-none focus:bg-surface-container-low transition-all" type="text" value="{{a3}}"/>
</div>
<!-- AI Draft Editor Body -->
<div class="flex flex-col gap-1">
<div class="flex items-center justify-between">
<label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">{{t126}}</label>
<div class="flex items-center gap-2">
<button class="font-label-sm text-label-sm text-outline hover:text-on-surface flex items-center gap-0.5">
<span class="material-symbols-outlined text-[14px]">{{t127}}</span>{{t128}}</button>
<span class="font-code-md text-code-md text-outline">{{t129}}</span>
</div>
</div>
<div class="relative rounded-lg overflow-hidden bg-surface">
<textarea class="w-full bg-transparent p-3 font-body-sm text-body-sm text-on-surface leading-relaxed focus:outline-none resize-none" rows="9">{{t130}}</textarea>
<div class="absolute bottom-2 right-2 bg-surface-container-low/90 px-2 py-0.5 rounded text-[10px] font-code-md text-on-surface-variant flex items-center gap-1 shadow-sm">
<span class="w-1.5 h-1.5 rounded-full bg-primary-container"></span>{{t131}}</div>
</div>
</div>
<!-- Distribution Routing Multi-Selector -->
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">{{t132}}</label>
<span class="font-code-md text-code-md text-primary-container font-semibold">{{t133}}</span>
</div>
<div class="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-2">
<div class="flex flex-wrap gap-1.5">
<span class="inline-flex items-center gap-1 bg-surface-container-lowest px-2 py-1 rounded text-label-sm font-code-md text-on-surface shadow-sm">{{t134}}<span class="material-symbols-outlined text-[12px] text-outline cursor-pointer hover:text-error">{{t135}}</span>
</span>
<span class="inline-flex items-center gap-1 bg-surface-container-lowest px-2 py-1 rounded text-label-sm font-code-md text-on-surface shadow-sm">{{t136}}<span class="material-symbols-outlined text-[12px] text-outline cursor-pointer hover:text-error">{{t137}}</span>
</span>
<span class="inline-flex items-center gap-1 bg-surface-container-lowest px-2 py-1 rounded text-label-sm font-code-md text-on-surface shadow-sm">{{t138}}<span class="material-symbols-outlined text-[12px] text-outline cursor-pointer hover:text-error">{{t139}}</span>
</span>
<span class="inline-flex items-center gap-1 bg-surface-container-lowest px-2 py-1 rounded text-label-sm font-code-md text-on-surface shadow-sm">{{t140}}<span class="material-symbols-outlined text-[12px] text-outline cursor-pointer hover:text-error">{{t141}}</span>
</span>
</div>
<div class="flex items-center justify-between pt-1">
<span class="font-body-sm text-[11px] text-outline">{{t142}}</span>
<span class="material-symbols-outlined text-[16px] text-secondary">{{t143}}</span>
</div>
</div>
</div>
<!-- Action Buttons Bar -->
<div class="flex flex-col sm:flex-row items-center gap-space-sm pt-space-xs">
<button class="w-full sm:flex-1 bg-primary-container hover:bg-tertiary-container text-on-primary font-label-lg text-label-lg py-2.5 rounded-lg flex items-center justify-center gap-2 shadow transition-all">
<span class="material-symbols-outlined text-[18px]">{{t144}}</span>
<span>{{t145}}</span>
</button>
<button class="w-full sm:w-auto bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg px-space-md py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[18px] text-outline">{{t146}}</span>
<span>{{t147}}</span>
</button>
</div>
<div class="p-2 bg-surface-container-high/60 rounded flex items-center gap-2 text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t148}}</span>
<p class="font-body-sm text-[11px] leading-tight">{{t149}}</p>
</div>
</div>
</div>
<!-- Quick Regulatory Reference Dossier Card -->
<div class="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">{{t150}}</span>
<span class="font-code-md text-code-md text-outline">{{t151}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">{{t152}}</p>
<div class="flex items-center gap-space-md pt-1">
<a class="font-label-sm text-label-sm text-primary-container hover:underline font-semibold flex items-center gap-0.5" href="#">
<span>{{t153}}</span>
<span class="material-symbols-outlined text-[14px]">{{t154}}</span>
</a>
<span class="text-outline-variant font-label-sm">{{t155}}</span>
<a class="font-label-sm text-label-sm text-outline hover:text-on-surface" href="#">{{t156}}</a>
</div>
</div>
</div>
</div>
<!-- Persistent Floating AI Assistant Launcher (Pinned Bottom Right) -->
<div class="fixed bottom-6 right-6 z-50 flex items-center gap-2 group">
<div class="hidden md:flex flex-col items-end pr-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
<span class="font-label-sm text-label-sm bg-inverse-surface text-inverse-on-surface px-2.5 py-1 rounded-md shadow-md">{{t157}}</span>
</div>
<button aria-label="{{a4}}" class="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-lg hover:bg-tertiary-container transition-all hover:scale-105 active:scale-95" onclick="const d = document.getElementById('ai-drawer'); if(d) d.classList.toggle('hidden');" type="button">
<span class="material-symbols-outlined text-[24px] text-secondary-fixed">{{t158}}</span>
</button>
</div>
</div></main>`;
