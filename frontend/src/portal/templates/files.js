/* Layout taken from the prototype. Copy lives in the data module. */
export const template = `<main class="w-full pt-2 bg-surface px-space-lg py-space-lg"><div class="flex flex-col w-full">
<!-- Module Strategic Header -->
<section class="flex flex-col md:flex-row md:items-center justify-between pb-space-lg gap-space-md">
<div class="flex flex-col gap-1 min-w-0">
<div class="flex items-center gap-space-xs">
<span class="px-2 py-0.5 rounded bg-primary-container text-on-primary font-code-md text-label-sm tracking-wider uppercase">{{t1}}</span>
<span class="font-code-md text-label-sm text-secondary font-semibold">{{t2}}</span>
</div>
<div class="flex items-baseline gap-space-sm flex-wrap">
<h1 class="font-headline-xl text-headline-xl text-on-surface tracking-tight">{{t3}}</h1>
<span class="font-headline-md text-headline-md text-outline font-normal">{{t4}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant max-w-3xl">{{t5}}</p>
</div>
<!-- Top Action Controls -->
<div class="flex items-center gap-space-xs shrink-0 flex-wrap">
<div class="relative">
<select class="h-9 pl-3 pr-8 bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg shadow-sm focus:outline-none focus:bg-surface-container-lowest appearance-none cursor-pointer">
<option value="{{a1}}">{{t6}}</option>
<option selected="" value="{{a2}}">{{t7}}</option>
<option value="{{a3}}">{{t8}}</option>
<option value="{{a4}}">{{t9}}</option>
<option value="{{a5}}">{{t10}}</option>
<option value="{{a6}}">{{t11}}</option>
</select>
<span class="material-symbols-outlined text-[18px] text-outline absolute right-2.5 top-2 pointer-events-none">{{t12}}</span>
</div>
<button class="h-9 px-3.5 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg shadow-sm flex items-center gap-1.5 transition-colors" type="button">
<span class="material-symbols-outlined text-[18px] text-secondary">{{t13}}</span>
<span>{{t14}}</span>
<span class="ml-1 px-1.5 py-0.2 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-code-md rounded">{{t15}}</span>
</button>
<button class="h-9 px-4 bg-primary-container hover:bg-tertiary text-on-primary font-label-md text-label-md rounded-lg shadow-sm flex items-center gap-2 transition-colors" type="button">
<span class="material-symbols-outlined text-[18px] text-secondary-fixed">{{t16}}</span>
<span>{{t17}}</span>
</button>
</div>
</section>
<!-- Three-Panel Split Legislative Workflow Grid -->
<div class="grid grid-cols-12 gap-space-md w-full items-start">
<!-- LEFT PANEL: Matters Awaiting Action (28% -> col-span-12 xl:col-span-3) -->
<section class="col-span-12 xl:col-span-3 flex flex-col bg-surface-container-lowest rounded-xl shadow-sm p-space-md">
<div class="flex items-center justify-between pb-space-sm">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[20px] text-primary-container">{{t18}}</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">{{t19}}</h2>
</div>
<span class="font-code-md text-label-sm text-outline">{{t20}}</span>
</div>
<!-- Quick Search inside Docket Inbox -->
<div class="relative w-full mb-space-sm">
<span class="material-symbols-outlined absolute left-2.5 top-2 text-[16px] text-outline">{{t21}}</span>
<input class="w-full h-8 pl-8 pr-3 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:bg-surface-container" placeholder="{{a7}}" type="text"/>
</div>
<!-- Filter Chips -->
<div class="flex items-center gap-1.5 overflow-x-auto pb-space-xs mb-space-sm">
<button class="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-sm text-[11px] whitespace-nowrap">{{t22}}</button>
<button class="px-2 py-0.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-[11px] whitespace-nowrap">{{t23}}</button>
<button class="px-2 py-0.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-[11px] whitespace-nowrap">{{t24}}</button>
<button class="px-2 py-0.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-[11px] whitespace-nowrap">{{t25}}</button>
</div>
<!-- Docket List -->
<div class="flex flex-col gap-2">
<!-- Item 1: Active Focus Item -->
<article class="p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer relative shadow-sm">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-primary-container rounded-l-lg"></div>
<div class="flex items-center justify-between gap-1 mb-1 pl-1">
<span class="font-code-md text-[11px] text-primary-container font-semibold uppercase">{{t26}}</span>
<div class="flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-secondary animate-pulse" title="{{a8}}"></span>
<span class="font-code-md text-[10px] text-on-surface-variant">{{t27}}</span>
</div>
</div>
<h3 class="font-label-lg text-label-md text-on-surface font-semibold leading-snug mb-1.5 pl-1">{{t28}}</h3>
<p class="font-body-sm text-[11px] text-on-surface-variant line-clamp-2 mb-2 pl-1">{{t29}}</p>
<div class="flex items-center justify-between pl-1">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-code-md text-[10px] font-semibold">
<span class="material-symbols-outlined text-[12px]">{{t30}}</span>{{t31}}</span>
<span class="font-label-sm text-[10px] text-outline truncate max-w-[110px]" title="{{a9}}">{{t32}}</span>
</div>
</article>
<!-- Item 2 -->
<article class="p-space-sm rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-all cursor-pointer shadow-sm">
<div class="flex items-center justify-between gap-1 mb-1">
<span class="font-code-md text-[11px] text-outline font-semibold uppercase">{{t33}}</span>
<div class="flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-outline" title="{{a10}}"></span>
<span class="font-code-md text-[10px] text-outline">{{t34}}</span>
</div>
</div>
<h3 class="font-label-md text-label-md text-on-surface font-semibold leading-snug mb-1">{{t35}}</h3>
<p class="font-body-sm text-[11px] text-on-surface-variant line-clamp-1 mb-2">{{t36}}</p>
<div class="flex items-center justify-between">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-code-md text-[10px]">{{t37}}</span>
<span class="font-label-sm text-[10px] text-outline truncate max-w-[110px]">{{t38}}</span>
</div>
</article>
<!-- Item 3 -->
<article class="p-space-sm rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-all cursor-pointer shadow-sm">
<div class="flex items-center justify-between gap-1 mb-1">
<span class="font-code-md text-[11px] text-outline font-semibold uppercase">{{t39}}</span>
<div class="flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-outline" title="{{a11}}"></span>
<span class="font-code-md text-[10px] text-outline">{{t40}}</span>
</div>
</div>
<h3 class="font-label-md text-label-md text-on-surface font-semibold leading-snug mb-1">{{t41}}</h3>
<p class="font-body-sm text-[11px] text-on-surface-variant line-clamp-1 mb-2">{{t42}}</p>
<div class="flex items-center justify-between">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-code-md text-[10px]">{{t43}}</span>
<span class="font-label-sm text-[10px] text-outline truncate max-w-[110px]">{{t44}}</span>
</div>
</article>
<!-- Item 4 -->
<article class="p-space-sm rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-all cursor-pointer shadow-sm">
<div class="flex items-center justify-between gap-1 mb-1">
<span class="font-code-md text-[11px] text-outline font-semibold uppercase">{{t45}}</span>
<div class="flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-primary-container" title="{{a12}}"></span>
<span class="font-code-md text-[10px] text-outline">{{t46}}</span>
</div>
</div>
<h3 class="font-label-md text-label-md text-on-surface font-semibold leading-snug mb-1">{{t47}}</h3>
<p class="font-body-sm text-[11px] text-on-surface-variant line-clamp-1 mb-2">{{t48}}</p>
<div class="flex items-center justify-between">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-code-md text-[10px]">{{t49}}</span>
<span class="font-label-sm text-[10px] text-outline truncate max-w-[110px]">{{t50}}</span>
</div>
</article>
</div>
<!-- Quick Document Registry Stats -->
<div class="mt-space-md p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1.5">
<div class="flex justify-between items-center text-[11px] font-code-md">
<span class="text-on-surface-variant uppercase tracking-wider">{{t51}}</span>
<span class="text-primary-container font-semibold">{{t52}}</span>
</div>
<div class="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div class="bg-primary-container h-full rounded-full" style="width: 91.4%;"></div>
</div>
<span class="font-label-sm text-[10px] text-outline text-right">{{t53}}</span>
</div>
</section>
<!-- CENTER PANEL: Official Document Viewer & AI Executive Brief (44% -> col-span-12 xl:col-span-5) -->
<section class="col-span-12 xl:col-span-5 flex flex-col gap-space-md">
<!-- Docket Overview Bar -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-sm">
<div class="flex items-start justify-between">
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-code-md text-label-md text-primary-container font-semibold">{{t54}}</span>
<span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-code-md font-semibold uppercase">{{t55}}</span>
</div>
<h2 class="font-headline-md text-headline-md text-on-surface">{{t56}}</h2>
</div>
<div class="flex items-center gap-1">
<button class="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors" title="{{a13}}">
<span class="material-symbols-outlined text-[20px]">{{t57}}</span>
</button>
<button class="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors" title="{{a14}}">
<span class="material-symbols-outlined text-[20px]">{{t58}}</span>
</button>
<button class="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors" title="{{a15}}">
<span class="material-symbols-outlined text-[20px]">{{t59}}</span>
</button>
</div>
</div>
<!-- AI-Generated Executive Summary Box (Austerity, State Tone) -->
<div class="rounded-lg bg-surface-container-low p-space-sm shadow-sm flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5 text-primary-container">
<span class="material-symbols-outlined text-[18px]">{{t60}}</span>
<span class="font-label-sm text-label-sm font-semibold uppercase tracking-wider">{{t61}}</span>
</div>
<span class="font-code-md text-[10px] text-outline">{{t62}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface leading-relaxed">
<strong class="font-semibold text-on-surface">{{t63}}</strong>{{t64}}</p>
<p class="font-body-sm text-body-sm text-on-surface leading-relaxed">
<strong class="font-semibold text-on-surface">{{t65}}</strong>{{t66}}</p>
<!-- Extracted Procedural Tags -->
<div class="flex flex-wrap items-center gap-1.5 pt-1">
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-md text-[10px]">{{t67}}</span>
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-md text-[10px]">{{t68}}</span>
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-md text-[10px]">{{t69}}</span>
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-md text-[10px]">{{t70}}</span>
</div>
</div>
</div>
<!-- Rendered Official Document Sheet View (80%+ White, Formal Government Dignity) -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm p-space-xl flex flex-col gap-space-lg relative overflow-hidden select-text">
<!-- Official Archival Watermark Bar -->
<div class="w-full py-1 bg-surface-container-low text-center rounded text-[10px] font-code-md tracking-widest text-outline uppercase">{{t71}}</div>
<!-- Official Header with Crest -->
<div class="flex flex-col items-center text-center gap-1">
<div class="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-low text-primary-container mb-1">
<span class="material-symbols-outlined text-[32px]">{{t72}}</span>
</div>
<span class="font-label-sm text-label-sm uppercase tracking-widest text-primary-container font-semibold">{{t73}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">{{t74}}</span>
<span class="font-code-md text-[11px] text-outline">{{t75}}</span>
</div>
<div class="h-0.5 w-full bg-surface-container-low"></div>
<!-- Memo Metadata Header -->
<div class="grid grid-cols-2 gap-y-2 gap-x-4 font-body-sm text-body-sm bg-surface-container-low p-space-sm rounded-lg">
<div><span class="font-semibold text-on-surface">{{t76}}</span>{{t77}}</div>
<div><span class="font-semibold text-on-surface">{{t78}}</span>{{t79}}</div>
<div><span class="font-semibold text-on-surface">{{t80}}</span>{{t81}}</div>
<div><span class="font-semibold text-on-surface">{{t82}}</span>{{t83}}</div>
</div>
<!-- Paragraphs (Official Parliamentary Draft Style) -->
<div class="flex flex-col gap-space-md text-on-surface font-body-md text-body-md leading-relaxed">
<div class="flex gap-space-sm items-start">
<span class="font-code-md text-primary-container font-bold text-label-md shrink-0 w-6">{{t84}}</span>
<p>{{t85}}<em>{{t86}}</em>{{t87}}</p>
</div>
<div class="flex gap-space-sm items-start">
<span class="font-code-md text-primary-container font-bold text-label-md shrink-0 w-6">{{t88}}</span>
<p>{{t89}}</p>
</div>
<div class="flex gap-space-sm items-start">
<span class="font-code-md text-primary-container font-bold text-label-md shrink-0 w-6">{{t90}}</span>
<div class="flex flex-col gap-2 w-full">
<p>{{t91}}<strong>{{t92}}</strong>{{t93}}</p>
<!-- Marginal Annotation Box -->
<div class="p-space-sm bg-surface-container rounded-lg flex items-start gap-space-xs text-on-surface">
<span class="material-symbols-outlined text-[16px] text-secondary shrink-0 mt-0.5">{{t94}}</span>
<div class="flex flex-col">
<span class="font-label-sm text-[11px] font-semibold text-secondary">{{t95}}</span>
<span class="font-body-sm text-[12px] text-on-surface-variant">{{t96}}</span>
</div>
</div>
</div>
</div>
<div class="flex gap-space-sm items-start">
<span class="font-code-md text-primary-container font-bold text-label-md shrink-0 w-6">{{t97}}</span>
<p>{{t98}}<em>{{t99}}</em>{{t100}}</p>
</div>
</div>
<!-- Official Seal and Digital Security Token Footer -->
<div class="pt-space-md flex items-end justify-between">
<div class="flex items-center gap-space-sm">
<div class="w-16 h-16 rounded bg-surface-container flex flex-col items-center justify-center text-outline">
<span class="material-symbols-outlined text-[28px]">{{t101}}</span>
<span class="font-code-md text-[8px] uppercase">{{t102}}</span>
</div>
<div class="flex flex-col leading-tight">
<span class="font-code-md text-[10px] text-on-surface font-semibold">{{t103}}</span>
<span class="font-label-sm text-[10px] text-outline">{{t104}}</span>
<span class="font-code-md text-[9px] text-outline">{{t105}}</span>
</div>
</div>
<!-- Official Green Coat of Arms Stamp -->
<div class="flex flex-col items-end">
<div class="px-3 py-1 bg-surface-container rounded font-code-md text-[10px] text-primary-container font-semibold uppercase tracking-wider">{{t106}}</div>
<span class="font-code-md text-[9px] text-outline mt-1">{{t107}}</span>
</div>
</div>
</div>
</section>
<!-- RIGHT PANEL: AI Precedents, Related Records & Decision Terminal (28% -> col-span-12 xl:col-span-4) -->
<section class="col-span-12 xl:col-span-4 flex flex-col gap-space-md">
<!-- Section A: Related Records & Historical Precedents -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-sm">
<div class="flex items-center justify-between pb-space-xs">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[18px] text-secondary">{{t108}}</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface">{{t109}}</h3>
</div>
<span class="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-md text-[10px]">{{t110}}</span>
</div>
<p class="font-body-sm text-[11px] text-on-surface-variant">{{t111}}<em>{{t112}}</em>{{t113}}</p>
<div class="flex flex-col gap-2 mt-1">
<!-- Precedent Link 1 -->
<a class="p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-all group flex items-start gap-space-xs" href="#">
<span class="material-symbols-outlined text-[20px] text-primary-container shrink-0 mt-0.5">{{t114}}</span>
<div class="flex flex-col min-w-0 flex-1">
<span class="font-label-md text-label-md text-on-surface group-hover:text-primary-container font-semibold truncate">{{t115}}</span>
<span class="font-body-sm text-[11px] text-on-surface-variant">{{t116}}</span>
<span class="font-code-md text-[10px] text-secondary mt-1">{{t117}}</span>
</div>
<span class="material-symbols-outlined text-[16px] text-outline group-hover:translate-x-0.5 transition-transform">{{t118}}</span>
</a>
<!-- Precedent Link 2 -->
<a class="p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-all group flex items-start gap-space-xs" href="#">
<span class="material-symbols-outlined text-[20px] text-primary-container shrink-0 mt-0.5">{{t119}}</span>
<div class="flex flex-col min-w-0 flex-1">
<span class="font-label-md text-label-md text-on-surface group-hover:text-primary-container font-semibold truncate">{{t120}}</span>
<span class="font-body-sm text-[11px] text-on-surface-variant">{{t121}}</span>
<span class="font-code-md text-[10px] text-secondary mt-1">{{t122}}</span>
</div>
<span class="material-symbols-outlined text-[16px] text-outline group-hover:translate-x-0.5 transition-transform">{{t123}}</span>
</a>
<!-- Precedent Link 3 -->
<a class="p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-all group flex items-start gap-space-xs" href="#">
<span class="material-symbols-outlined text-[20px] text-primary-container shrink-0 mt-0.5">{{t124}}</span>
<div class="flex flex-col min-w-0 flex-1">
<span class="font-label-md text-label-md text-on-surface group-hover:text-primary-container font-semibold truncate">{{t125}}</span>
<span class="font-body-sm text-[11px] text-on-surface-variant">{{t126}}</span>
<span class="font-code-md text-[10px] text-secondary mt-1">{{t127}}</span>
</div>
<span class="material-symbols-outlined text-[16px] text-outline group-hover:translate-x-0.5 transition-transform">{{t128}}</span>
</a>
</div>
</div>
<!-- Section B: Speaker's Decision & Directive Box -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-sm">
<div class="flex items-center justify-between pb-space-xs">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[20px] text-primary-container">{{t129}}</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface">{{t130}}</h3>
</div>
<span class="px-2 py-0.5 rounded bg-primary-container text-on-primary font-code-md text-[10px] uppercase font-semibold">{{t131}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">{{t132}}</p>
<!-- Executive Radio Decisions -->
<div class="grid grid-cols-2 gap-2">
<label class="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input checked="" class="w-4 h-4 text-primary-container accent-primary-container focus:ring-0" name="speaker_decision" type="radio" value="{{a16}}"/>
<span class="font-label-md text-label-md text-on-surface font-semibold">{{t133}}</span>
</label>
<label class="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input class="w-4 h-4 text-primary-container accent-primary-container focus:ring-0" name="speaker_decision" type="radio" value="{{a17}}"/>
<span class="font-label-md text-label-md text-on-surface font-semibold">{{t134}}</span>
</label>
<label class="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input class="w-4 h-4 text-primary-container accent-primary-container focus:ring-0" name="speaker_decision" type="radio" value="{{a18}}"/>
<span class="font-label-md text-label-md text-on-surface font-semibold">{{t135}}</span>
</label>
<label class="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input class="w-4 h-4 text-primary-container accent-primary-container focus:ring-0" name="speaker_decision" type="radio" value="{{a19}}"/>
<span class="font-label-md text-label-md text-on-surface font-semibold">{{t136}}</span>
</label>
</div>
<!-- Structured Directive Text Area -->
<div class="flex flex-col gap-1 mt-1">
<div class="flex items-center justify-between">
<label class="font-label-sm text-label-sm text-on-surface font-semibold">{{t137}}</label>
<button class="text-secondary hover:text-on-surface font-label-sm text-[11px] flex items-center gap-1 transition-colors" title="{{a20}}" type="button">
<span class="material-symbols-outlined text-[14px]">{{t138}}</span>
<span>{{t139}}</span>
</button>
</div>
<textarea class="w-full p-2.5 bg-surface-container-low text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary-container resize-none leading-relaxed" rows="4">{{t140}}</textarea>
</div>
<!-- Urgent Execution Notice -->
<div class="flex items-center gap-2 p-2 bg-secondary-fixed/50 rounded-lg text-on-secondary-fixed">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t141}}</span>
<span class="font-body-sm text-[11px] leading-tight">{{t142}}</span>
</div>
<!-- Action Button Row -->
<div class="flex flex-col gap-2 pt-1">
<button class="w-full h-10 bg-primary-container hover:bg-tertiary text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors" type="button">
<span class="material-symbols-outlined text-[20px] text-secondary-fixed">{{t143}}</span>
<span>{{t144}}</span>
</button>
<div class="grid grid-cols-2 gap-2">
<button class="h-9 bg-surface-container-low hover:bg-surface-container text-primary-container font-label-md text-label-md rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors" type="button">
<span class="material-symbols-outlined text-[16px]">{{t145}}</span>
<span>{{t146}}</span>
</button>
<button class="h-9 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors" type="button">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t147}}</span>
<span>{{t148}}</span>
</button>
</div>
</div>
</div>
</section>
</div>
<!-- BOTTOM FULL STRIP: Docket Audit Trail -->
<section class="mt-space-md w-full bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-sm">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-1 pb-1">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-primary-container">{{t149}}</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface">{{t150}}</h3>
</div>
<div class="flex items-center gap-2 font-code-md text-[11px] text-outline">
<span>{{t151}}</span>
<span class="bg-surface-container px-2 py-0.5 rounded text-on-surface font-semibold truncate max-w-[200px]" title="{{a21}}">{{t152}}</span>
</div>
</div>
<!-- Stepper Steps -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-space-sm">
<!-- Step 1 -->
<div class="flex items-start gap-space-xs p-space-sm rounded-lg bg-surface-container-low">
<div class="w-6 h-6 rounded-full bg-primary-container text-on-primary font-code-md text-[11px] flex items-center justify-center shrink-0">{{t153}}</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface font-semibold">{{t154}}</span>
<span class="font-body-sm text-[11px] text-on-surface-variant">{{t155}}</span>
<span class="font-code-md text-[10px] text-outline mt-0.5">{{t156}}</span>
</div>
</div>
<!-- Step 2 -->
<div class="flex items-start gap-space-xs p-space-sm rounded-lg bg-surface-container-low">
<div class="w-6 h-6 rounded-full bg-primary-container text-on-primary font-code-md text-[11px] flex items-center justify-center shrink-0">{{t157}}</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface font-semibold">{{t158}}</span>
<span class="font-body-sm text-[11px] text-on-surface-variant">{{t159}}</span>
<span class="font-code-md text-[10px] text-outline mt-0.5">{{t160}}</span>
</div>
</div>
<!-- Step 3 -->
<div class="flex items-start gap-space-xs p-space-sm rounded-lg bg-surface-container-low">
<div class="w-6 h-6 rounded-full bg-primary-container text-on-primary font-code-md text-[11px] flex items-center justify-center shrink-0">{{t161}}</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface font-semibold">{{t162}}</span>
<span class="font-body-sm text-[11px] text-on-surface-variant">{{t163}}</span>
<span class="font-code-md text-[10px] text-outline mt-0.5">{{t164}}</span>
</div>
</div>
<!-- Step 4: Active Current -->
<div class="flex items-start gap-space-xs p-space-sm rounded-lg bg-surface-container">
<div class="w-6 h-6 rounded-full bg-secondary text-on-secondary font-code-md text-[11px] flex items-center justify-center shrink-0 animate-pulse">{{t165}}</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface font-semibold">{{t166}}</span>
<span class="font-body-sm text-[11px] text-secondary font-semibold">{{t167}}</span>
<span class="font-code-md text-[10px] text-outline mt-0.5">{{t168}}</span>
</div>
</div>
</div>
</section>
<!-- Persistent Interactive Micro-Script for Terminal Feedback -->

</div></main>`;
