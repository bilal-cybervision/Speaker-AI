/* Layout taken from the prototype. Copy lives in the data module. */
export const template = `<main class="relative pt-16 bg-surface min-h-screen"><div class="flex flex-col w-full">
<!-- Top Document Header Context Bar -->
<div class="bg-surface-container-lowest px-space-lg py-space-md shadow-sm">
<div class="max-w-7xl mx-auto flex flex-col gap-space-sm">
<!-- Breadcrumb navigation & file registration index -->
<div class="flex flex-wrap items-center justify-between gap-space-sm text-label-sm font-label-sm text-secondary">
<div class="flex items-center gap-1.5 min-w-0">
<span class="hover:text-primary transition-colors cursor-pointer">{{t1}}</span>
<span class="material-symbols-outlined text-[14px]">{{t2}}</span>
<span class="hover:text-primary transition-colors cursor-pointer">{{t3}}</span>
<span class="material-symbols-outlined text-[14px]">{{t4}}</span>
<span class="font-mono text-primary font-semibold tracking-wide">{{t5}}</span>
</div>
<div class="flex items-center gap-2">
<span class="bg-tertiary-container text-tertiary-fixed px-2 py-0.5 rounded text-label-sm font-bold uppercase tracking-wider">{{t6}}</span>
<span class="bg-surface-container-high text-on-surface px-2 py-0.5 rounded text-label-sm flex items-center gap-1 font-medium">
<span class="h-1.5 w-1.5 rounded-full bg-on-tertiary-container"></span>{{t7}}</span>
</div>
</div>
<!-- Institutional Title & Official Urdu Transcript Header -->
<div class="flex flex-col lg:flex-row lg:items-start justify-between gap-space-md pt-1">
<div class="space-y-1 max-w-4xl min-w-0">
<h1 class="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">{{t8}}</h1>
<p class="font-headline-sm text-headline-sm text-secondary font-medium leading-relaxed font-['Noto_Nastaliq_Urdu']" dir="rtl">{{t9}}</p>
<div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-body-sm font-body-sm text-secondary pt-1">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t10}}</span>{{t11}}<strong class="text-on-surface font-semibold">{{t12}}</strong>
</span>
<span class="">{{t13}}</span>
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t14}}</span>{{t15}}<strong class="text-on-surface font-semibold">{{t16}}</strong>
</span>
<span class="">{{t17}}</span>
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t18}}</span>{{t19}}<span class="font-mono text-xs">{{t20}}</span>
</span>
</div>
</div>
<!-- Administrative Utility Button Group -->
<div class="flex items-center flex-wrap gap-2 shrink-0 self-start">
<button class="bg-surface-container-low hover:bg-surface-container text-on-surface text-label-md font-label-md px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors" type="button">
<span class="material-symbols-outlined text-[18px]">{{t21}}</span>
<span class="">{{t22}}</span>
</button>
<button class="bg-surface-container-low hover:bg-surface-container text-on-surface text-label-md font-label-md px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors" type="button">
<span class="material-symbols-outlined text-[18px]">{{t23}}</span>
<span class="">{{t24}}</span>
</button>
<button class="bg-surface-container-low hover:bg-surface-container text-on-surface text-label-md font-label-md px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors" type="button">
<span class="material-symbols-outlined text-[18px]">{{t25}}</span>
<span class="">{{t26}}</span>
</button>
<button class="bg-primary text-on-primary hover:bg-primary-container text-label-md font-label-md px-3.5 py-1.5 rounded flex items-center gap-1.5 transition-colors shadow-sm" type="button">
<span class="material-symbols-outlined text-[18px]">{{t27}}</span>
<span class="">{{t28}}</span>
</button>
</div>
</div>
</div>
</div>
<!-- Workspace Canvas -->
<div class="max-w-7xl mx-auto w-full px-space-lg py-space-md flex flex-col gap-space-lg">
<!-- Dual-Pane Working Workspace -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
<!-- LEFT PANE: Official Secretariat Note Sheet (Source Scan View) -->
<section class="lg:col-span-6 bg-surface-container-lowest rounded-lg p-space-md shadow-sm flex flex-col min-w-0">
<!-- Document Action Toolbar -->
<div class="flex items-center justify-between bg-surface-container-low p-2 rounded mb-space-md">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[20px]">{{t29}}</span>
<div class="flex flex-col">
<span class="text-label-md font-label-md text-on-surface font-semibold">{{t30}}</span>
<span class="text-[10px] text-secondary font-mono tracking-tight">{{t31}}</span>
</div>
</div>
<div class="flex items-center gap-1">
<button class="p-1 hover:bg-surface-container rounded text-secondary hover:text-on-surface" title="{{a1}}">
<span class="material-symbols-outlined text-[18px]">{{t32}}</span>
</button>
<span class="text-label-sm font-label-sm px-1.5 py-0.5 bg-surface-container-lowest rounded font-mono text-on-surface">{{t33}}</span>
<button class="p-1 hover:bg-surface-container rounded text-secondary hover:text-on-surface" title="{{a2}}">
<span class="material-symbols-outlined text-[18px]">{{t34}}</span>
</button>
<div class="h-4 w-px bg-secondary-fixed-dim mx-1"></div>
<span class="text-label-sm font-label-sm text-secondary px-1">{{t35}}</span>
<button class="p-1 hover:bg-surface-container rounded text-secondary hover:text-on-surface" title="{{a3}}">
<span class="material-symbols-outlined text-[18px]">{{t36}}</span>
</button>
<button class="p-1 hover:bg-surface-container rounded text-secondary hover:text-on-surface" title="{{a4}}">
<span class="material-symbols-outlined text-[18px]">{{t37}}</span>
</button>
</div>
</div>
<!-- High-fidelity Note Sheet Simulation -->
<div class="relative bg-surface rounded p-space-lg text-on-surface font-serif shadow-inner">
<!-- Institutional Watermark Background Impression -->
<div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
<svg class="w-72 h-72 text-primary" fill="currentColor" viewBox="0 0 100 100">
<circle cx="50" cy="50" fill="none" r="42" stroke="currentColor" stroke-width="4"></circle>
<path d="M50 15 L50 85 M15 50 L85 50 M25 25 L75 75 M25 75 L75 25" stroke="currentColor" stroke-width="2"></path>
</svg>
</div>
<!-- Official Secretariat Header -->
<div class="relative text-center pb-space-sm mb-space-sm">
<p class="font-label-sm text-label-sm tracking-widest uppercase text-secondary font-sans font-semibold">{{t38}}</p>
<p class="font-headline-sm text-headline-sm text-primary font-bold font-sans">{{t39}}</p>
<p class="font-body-sm text-body-sm text-secondary font-sans">{{t40}}</p>
<div class="flex items-center justify-between pt-2 text-label-sm font-label-sm text-secondary font-sans">
<span class="">{{t41}}</span>
<span class="">{{t42}}</span>
</div>
</div>
<!-- Note Content Paragraphs -->
<div class="relative space-y-space-md text-body-sm font-body-sm text-on-surface leading-relaxed font-sans">
<div class="bg-surface-container-lowest p-2.5 rounded">
<strong class="font-label-md text-label-md text-primary uppercase block mb-1">{{t43}}</strong>
</div>
<p class="text-justify">
<strong class="font-mono text-xs text-secondary mr-1">{{t44}}</strong>{{t45}}</p>
<p class="text-justify">
<strong class="font-mono text-xs text-secondary mr-1">{{t46}}</strong>{{t47}}</p>
<p class="text-justify">
<strong class="font-mono text-xs text-secondary mr-1">{{t48}}</strong>{{t49}}</p>
<p class="text-justify">
<strong class="font-mono text-xs text-secondary mr-1">{{t50}}</strong>{{t51}}</p>
<!-- Formal Closing & Pre-Signature Paragraph -->
<div class="bg-primary/5 p-space-sm rounded">
<p class="font-semibold text-primary">{{t52}}</p>
</div>
<!-- Authentic Departmental Signatures & Minute Trail -->
<div class="pt-space-md grid grid-cols-2 gap-space-md">
<div class="bg-surface-container-lowest p-2.5 rounded flex flex-col justify-between h-28">
<span class="font-mono text-[10px] text-secondary tracking-widest uppercase">{{t53}}</span>
<div>
<div class="h-6 w-24 bg-primary/10 rounded mb-1 flex items-center justify-center font-serif italic text-xs text-primary font-bold">{{t54}}</div>
<p class="text-label-sm font-label-sm text-on-surface font-bold leading-tight">{{t55}}</p>
<p class="text-[10px] text-secondary leading-tight">{{t56}}</p>
</div>
</div>
<div class="bg-surface-container-lowest p-2.5 rounded flex flex-col justify-between h-28">
<span class="font-mono text-[10px] text-secondary tracking-widest uppercase">{{t57}}</span>
<div>
<div class="h-6 w-28 bg-primary/10 rounded mb-1 flex items-center justify-center font-serif italic text-xs text-primary font-bold">{{t58}}</div>
<p class="text-label-sm font-label-sm text-on-surface font-bold leading-tight">{{t59}}</p>
<p class="text-[10px] text-secondary leading-tight">{{t60}}</p>
</div>
</div>
</div>
<!-- Secretary NA Elevation Block -->
<div class="bg-surface-container-lowest p-space-md rounded flex items-start justify-between gap-space-md">
<div class="space-y-1">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">{{t61}}</span>
<p class="text-body-sm font-body-sm text-on-surface italic">{{t62}}</p>
<div class="pt-2">
<p class="text-label-md font-label-md text-primary font-bold">{{t63}}</p>
<p class="text-label-sm font-label-sm text-secondary">{{t64}}</p>
<p class="font-mono text-[11px] text-secondary">{{t65}}</p>
</div>
</div>
<div class="bg-primary-fixed/20 p-2 rounded shrink-0 flex flex-col items-center justify-center text-primary text-center">
<span class="material-symbols-outlined text-[28px]">{{t66}}</span>
<span class="font-mono text-[9px] font-bold uppercase mt-0.5">{{t67}}</span>
</div>
</div>
</div>
</div>
</section>
<!-- RIGHT PANE: AI-Generated Legislative Brief & Analytical Insights -->
<section class="lg:col-span-6 flex flex-col gap-space-md min-w-0">
<!-- AI Executive Brief Card -->
<div class="bg-surface-container-lowest rounded-lg p-space-md shadow-sm">
<div class="flex items-center justify-between pb-space-sm mb-space-sm bg-surface-container-low p-2 rounded">
<div class="flex items-center gap-2">
<div class="w-6 h-6 rounded bg-primary-container text-on-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[16px]">{{t68}}</span>
</div>
<div>
<h2 class="text-label-md font-label-md text-on-surface font-bold uppercase tracking-wider">{{t69}}</h2>
<span class="text-[11px] text-secondary">{{t70}}</span>
</div>
</div>
<span class="bg-primary/10 text-primary text-label-sm font-label-sm px-2 py-0.5 rounded font-mono font-medium">{{t71}}</span>
</div>
<!-- Key Facts Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-sm mb-space-md">
<div class="bg-surface p-space-sm rounded">
<span class="text-label-sm font-label-sm text-secondary uppercase block mb-1">{{t72}}</span>
<span class="font-headline-sm text-headline-sm text-primary font-bold">{{t73}}</span>
<span class="text-[11px] text-secondary block mt-0.5">{{t74}}</span>
</div>
<div class="bg-surface p-space-sm rounded">
<span class="text-label-sm font-label-sm text-secondary uppercase block mb-1">{{t75}}</span>
<span class="font-headline-sm text-headline-sm text-on-surface font-bold flex items-center gap-1">
<span class="material-symbols-outlined text-primary text-[18px]">{{t76}}</span>{{t77}}</span>
<span class="text-[11px] text-secondary block mt-0.5">{{t78}}</span>
</div>
<div class="bg-surface p-space-sm rounded">
<span class="text-label-sm font-label-sm text-secondary uppercase block mb-1">{{t79}}</span>
<span class="font-headline-sm text-headline-sm text-primary font-bold">{{t80}}</span>
<span class="text-[11px] text-secondary block mt-0.5">{{t81}}</span>
</div>
</div>
<!-- Synthesized Core Points -->
<div class="space-y-space-sm text-body-sm font-body-sm text-on-surface">
<div class="flex items-start gap-2">
<span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">{{t82}}</span>
<p class=""><strong>{{t83}}</strong>{{t84}}</p>
</div>
<div class="flex items-start gap-2">
<span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">{{t85}}</span>
<p class=""><strong>{{t86}}</strong>{{t87}}</p>
</div>
<div class="flex items-start gap-2">
<span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">{{t88}}</span>
<p class=""><strong>{{t89}}</strong>{{t90}}</p>
</div>
</div>
</div>
<!-- Precedent & Risk Assessment -->
<div class="bg-surface-container-lowest rounded-lg p-space-md shadow-sm space-y-space-sm">
<div class="flex items-center gap-2 pb-1">
<span class="material-symbols-outlined text-on-tertiary-container text-[20px]">{{t91}}</span>
<h3 class="text-label-md font-label-md text-on-surface font-bold uppercase tracking-wider">{{t92}}</h3>
</div>
<div class="bg-surface p-space-sm rounded space-y-2">
<div class="flex items-start justify-between gap-2">
<div class="space-y-0.5">
<span class="font-label-sm text-label-sm text-secondary uppercase font-semibold">{{t93}}</span>
<p class="font-body-sm text-body-sm font-bold text-primary">{{t94}}</p>
<p class="text-body-sm font-body-sm text-secondary">{{t95}}</p>
</div>
<span class="bg-surface-container-high text-on-surface px-2 py-0.5 rounded text-label-sm font-mono shrink-0">{{t96}}</span>
</div>
</div>
<div class="bg-tertiary-fixed/30 p-space-sm rounded">
<div class="flex items-start gap-2">
<span class="material-symbols-outlined text-on-tertiary-fixed-variant text-[20px] shrink-0 mt-0.5">{{t97}}</span>
<div>
<span class="font-label-sm text-label-sm font-bold text-on-tertiary-fixed">{{t98}}</span>
<p class="text-body-sm font-body-sm text-on-surface leading-snug pt-0.5">{{t99}}<strong>{{t100}}</strong>{{t101}}</p>
</div>
</div>
</div>
</div>
<!-- Related Parliamentary Records & Prior Decisions -->
<div class="bg-surface-container-lowest rounded-lg p-space-md shadow-sm space-y-space-sm">
<div class="flex items-center justify-between pb-1">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[20px]">{{t102}}</span>
<h3 class="text-label-md font-label-md text-on-surface font-bold uppercase tracking-wider">{{t103}}</h3>
</div>
<span class="text-label-sm font-label-sm text-secondary font-mono">{{t104}}</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
<!-- Linked record 1 -->
<a class="bg-surface hover:bg-surface-container-low p-space-sm rounded transition-colors block group" href="#">
<div class="flex items-center justify-between text-label-sm font-label-sm text-secondary font-mono mb-1">
<span class="">{{t105}}</span>
<span class="text-primary font-bold">{{t106}}</span>
</div>
<p class="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">{{t107}}</p>
<p class="text-body-sm text-secondary line-clamp-2 mt-0.5">{{t108}}</p>
<div class="mt-2 flex items-center gap-1 text-[11px] text-primary">
<span class="">{{t109}}</span>
<span class="material-symbols-outlined text-[14px]">{{t110}}</span>
</div>
</a>
<!-- Linked record 2 -->
<a class="bg-surface hover:bg-surface-container-low p-space-sm rounded transition-colors block group" href="#">
<div class="flex items-center justify-between text-label-sm font-label-sm text-secondary font-mono mb-1">
<span class="">{{t111}}</span>
<span class="text-primary-container font-bold">{{t112}}</span>
</div>
<p class="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">{{t113}}</p>
<p class="text-body-sm text-secondary line-clamp-2 mt-0.5">{{t114}}</p>
<div class="mt-2 flex items-center gap-1 text-primary-container">
<span class="">{{t115}}</span>
<span class="material-symbols-outlined text-[14px]">{{t116}}</span>
</div>
</a>
</div>
</div>
</section>
</div>
<!-- PROMINENT SPEAKER'S DECISION & ORDER BOX (حکم جناب اسپیکر) -->
<section class="bg-surface-container-lowest rounded-lg p-space-lg shadow-md bg-gradient-to-b from-surface-container-lowest via-surface-container-lowest to-surface-container-low/40">
<!-- Box Header with Sovereign Identification -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-md mb-space-md bg-surface-container-low p-space-md rounded">
<div class="flex items-center gap-space-md">
<div class="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm">
<span class="material-symbols-outlined text-[24px]">{{t117}}</span>
</div>
<div>
<div class="flex items-center gap-2">
<h2 class="font-headline-sm text-headline-sm text-primary font-bold uppercase tracking-wide">{{t118}}</h2>
<span class="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-0.5 rounded uppercase tracking-wider font-semibold">{{t119}}</span>
</div>
<p class="font-headline-sm text-headline-sm text-secondary font-['Noto_Nastaliq_Urdu'] pt-0.5" dir="rtl">{{t120}}</p>
</div>
</div>
<div class="flex items-center gap-2 text-label-sm font-label-sm text-secondary">
<span class="flex items-center gap-1 text-primary-container font-semibold">
<span class="material-symbols-outlined text-[16px]">{{t121}}</span>{{t122}}</span>
</div>
</div>
<!-- Interactive Decision Selector (Radio Group) -->
<div class="space-y-space-sm mb-space-md">
<label class="text-label-sm font-label-sm text-secondary uppercase font-bold tracking-wider block">{{t123}}</label>
<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
<!-- Option 1: Approved as Proposed (Active) -->
<label class="flex flex-col p-2.5 rounded cursor-pointer bg-primary-container text-on-primary transition-all shadow-sm">
<div class="flex items-center justify-between mb-1">
<input checked="" class="accent-primary-fixed" name="speaker_order" type="radio" value="{{a5}}">
<span class="material-symbols-outlined text-[16px] text-tertiary-fixed">{{t124}}</span>
</div>
<span class="text-label-md font-label-md font-bold leading-tight">{{t125}}</span>
<span class="text-[12px] opacity-90 font-['Noto_Nastaliq_Urdu'] pt-1" dir="rtl">{{t126}}</span>
</label>
<!-- Option 2: Approved with Modifications -->
<label class="flex flex-col p-2.5 rounded cursor-pointer bg-surface hover:bg-surface-container transition-all text-on-surface">
<div class="flex items-center justify-between mb-1">
<input class="accent-primary" name="speaker_order" type="radio" value="{{a6}}">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t127}}</span>
</div>
<span class="text-label-md font-label-md font-semibold leading-tight">{{t128}}</span>
<span class="text-[12px] text-secondary font-['Noto_Nastaliq_Urdu'] pt-1" dir="rtl">{{t129}}</span>
</label>
<!-- Option 3: Returned with Observations -->
<label class="flex flex-col p-2.5 rounded cursor-pointer bg-surface hover:bg-surface-container transition-all text-on-surface">
<div class="flex items-center justify-between mb-1">
<input class="accent-primary" name="speaker_order" type="radio" value="{{a7}}">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t130}}</span>
</div>
<span class="text-label-md font-label-md font-semibold leading-tight">{{t131}}</span>
<span class="text-[12px] text-secondary font-['Noto_Nastaliq_Urdu'] pt-1" dir="rtl">{{t132}}</span>
</label>
<!-- Option 4: Directions for Standing Committee -->
<label class="flex flex-col p-2.5 rounded cursor-pointer bg-surface hover:bg-surface-container transition-all text-on-surface">
<div class="flex items-center justify-between mb-1">
<input class="accent-primary" name="speaker_order" type="radio" value="{{a8}}">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t133}}</span>
</div>
<span class="text-label-md font-label-md font-semibold leading-tight">{{t134}}</span>
<span class="text-[12px] text-secondary font-['Noto_Nastaliq_Urdu'] pt-1" dir="rtl">{{t135}}</span>
</label>
<!-- Option 5: Rejected -->
<label class="flex flex-col p-2.5 rounded cursor-pointer bg-surface hover:bg-surface-container transition-all text-on-surface">
<div class="flex items-center justify-between mb-1">
<input class="accent-primary" name="speaker_order" type="radio" value="{{a9}}">
<span class="material-symbols-outlined text-[16px] text-error">{{t136}}</span>
</div>
<span class="text-label-md font-label-md font-semibold leading-tight">{{t137}}</span>
<span class="text-[12px] text-secondary font-['Noto_Nastaliq_Urdu'] pt-1" dir="rtl">{{t138}}</span>
</label>
</div>
</div>
<!-- Directive Textarea & Speech-to-Text Audio Console -->
<div class="space-y-space-sm mb-space-md">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<label class="text-label-sm font-label-sm text-secondary uppercase font-bold tracking-wider" for="speaker_notes">{{t139}}</label>
<!-- AI Template Presets -->
<div class="flex items-center gap-1">
<span class="text-body-sm font-body-sm text-secondary text-xs">{{t140}}</span>
<button class="px-2 py-0.5 rounded bg-surface text-primary text-label-sm font-label-sm hover:bg-surface-container transition-colors" id="btn-insert-standard" type="button">{{t141}}</button>
<button class="px-2 py-0.5 rounded bg-surface text-primary text-label-sm font-label-sm hover:bg-surface-container transition-colors" id="btn-insert-audit" type="button">{{t142}}</button>
</div>
</div>
<div class="relative">
<textarea class="w-full bg-surface-container-low text-on-surface text-body-md font-body-md p-space-md rounded placeholder:text-secondary focus:bg-surface-container-lowest focus:outline-none transition-all resize-y" id="speaker_notes" placeholder="{{a10}}" rows="4">{{t143}}</textarea>
</div>
<!-- Voice-to-Text Dictation Strip -->
<div class="bg-surface p-space-sm rounded flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div class="flex items-center gap-space-sm min-w-0">
<button class="text-on-primary hover:bg-primary-container px-3 py-1.5 rounded flex items-center gap-2 text-label-md font-label-md shrink-0 transition-colors shadow-sm bg-primary" id="dictate-toggle" type="button">
<span class="material-symbols-outlined text-[18px]">{{t144}}</span>
<span id="dictate-label" class="">{{t145}}</span>
</button>
<!-- Real-time SVG Audio Waveform Indicator -->
<div class="flex items-center gap-1 px-2 overflow-hidden h-6">
<svg class="w-48 h-5 text-primary opacity-80" fill="currentColor" viewBox="0 0 160 20">
<rect height="4" rx="1.5" width="3" x="0" y="8"></rect>
<rect height="10" rx="1.5" width="3" x="8" y="5"></rect>
<rect height="16" rx="1.5" width="3" x="16" y="2"></rect>
<rect height="8" rx="1.5" width="3" x="24" y="6"></rect>
<rect height="14" rx="1.5" width="3" x="32" y="3"></rect>
<rect height="6" rx="1.5" width="3" x="40" y="7"></rect>
<rect height="18" rx="1.5" width="3" x="48" y="1"></rect>
<rect height="12" rx="1.5" width="3" x="56" y="4"></rect>
<rect height="4" rx="1.5" width="3" x="64" y="8"></rect>
<rect height="16" rx="1.5" width="3" x="72" y="2"></rect>
<rect height="10" rx="1.5" width="3" x="80" y="5"></rect>
<rect height="14" rx="1.5" width="3" x="88" y="3"></rect>
<rect height="6" rx="1.5" width="3" x="96" y="7"></rect>
<rect height="16" rx="1.5" width="3" x="104" y="2"></rect>
<rect height="8" rx="1.5" width="3" x="112" y="6"></rect>
<rect height="12" rx="1.5" width="3" x="120" y="4"></rect>
<rect height="4" rx="1.5" width="3" x="128" y="8"></rect>
<rect height="10" rx="1.5" width="3" x="136" y="5"></rect>
<rect height="16" rx="1.5" width="3" x="144" y="2"></rect>
<rect height="6" rx="1.5" width="3" x="152" y="7"></rect>
</svg>
<span class="text-label-sm font-label-sm text-secondary font-mono text-[11px] shrink-0">{{t146}}</span>
</div>
</div>
<div class="flex items-center gap-2 self-end md:self-auto text-secondary text-label-sm font-label-sm">
<span class="material-symbols-outlined text-[16px]">{{t147}}</span>
<span class="">{{t148}}</span>
</div>
</div>
</div>
<!-- Action Verification & Issue Bar -->
<div class="bg-surface-container-low p-space-md rounded flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<!-- Cryptographic Digital Stamp Confirmation Checkbox -->
<label class="flex items-start gap-3 cursor-pointer select-none max-w-xl">
<input checked="" class="mt-1 h-4 w-4 rounded accent-primary text-on-primary" id="seal_sign_checkbox" type="checkbox">
<div class="flex flex-col">
<span class="text-label-md font-label-md font-bold text-on-surface">{{t149}}</span>
<span class="text-body-sm font-body-sm text-secondary">{{t150}}</span>
</div>
</label>
<!-- Command Execution Action Buttons -->
<div class="flex items-center flex-wrap gap-2 shrink-0">
<button class="bg-surface hover:bg-surface-container text-on-surface text-label-md font-label-md px-3.5 py-2.5 rounded transition-colors" type="button">{{t151}}</button>
<button class="bg-surface-container-high hover:bg-surface-container text-primary text-label-md font-label-md px-3.5 py-2.5 rounded flex items-center gap-1.5 transition-colors" type="button">
<span class="material-symbols-outlined text-[18px]">{{t152}}</span>
<span class="">{{t153}}</span>
</button>
<button class="bg-primary hover:bg-primary-container text-on-primary text-label-md font-label-md px-5 py-2.5 rounded flex items-center gap-2 font-bold shadow-md transition-all active:scale-[0.99]" id="btn-issue-directive" type="button">
<span class="material-symbols-outlined text-[20px] text-tertiary-fixed">{{t154}}</span>
<span class="">{{t155}}</span>
</button>
</div>
</div>
<!-- Confirmation Toast Feedback Element (Hidden by default) -->
<div class="hidden mt-space-md p-space-md bg-primary-container text-on-primary rounded flex items-center justify-between transition-all" id="confirmation-banner">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-tertiary-fixed text-[28px]">{{t156}}</span>
<div>
<p class="font-headline-sm text-headline-sm font-bold">{{t157}}</p>
<p class="text-body-sm font-body-sm text-on-primary-container">{{t158}}</p>
</div>
</div>
<span class="font-mono text-xs bg-primary px-3 py-1.5 rounded text-tertiary-fixed font-semibold">{{t159}}</span>
</div>
</section>
<!-- Institutional Workflow Audit Trail & Verification Chain (سابقہ کارروائی اور تصدیقی ریکارڈ) -->
<section class="bg-surface-container-lowest rounded-lg p-space-md shadow-sm mb-space-lg">
<div class="flex items-center justify-between pb-space-sm mb-space-sm bg-surface-container-low p-2 rounded">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[20px]">{{t160}}</span>
<h3 class="text-label-md font-label-md text-on-surface font-bold uppercase tracking-wider">{{t161}}</h3>
</div>
<span class="text-label-sm font-label-sm text-secondary font-mono">{{t162}}</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-4 gap-space-md pt-2">
<!-- Step 1 -->
<div class="bg-surface p-space-sm rounded space-y-1">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-secondary uppercase font-bold">{{t163}}</span>
<span class="material-symbols-outlined text-primary text-[16px]">{{t164}}</span>
</div>
<p class="font-label-md text-label-md font-bold text-on-surface">{{t165}}</p>
<p class="text-[11px] text-secondary">{{t166}}</p>
<p class="font-mono text-[10px] text-secondary pt-1">{{t167}}</p>
</div>
<!-- Step 2 -->
<div class="bg-surface p-space-sm rounded space-y-1">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-secondary uppercase font-bold">{{t168}}</span>
<span class="material-symbols-outlined text-primary text-[16px]">{{t169}}</span>
</div>
<p class="font-label-md text-label-md font-bold text-on-surface">{{t170}}</p>
<p class="text-[11px] text-secondary">{{t171}}</p>
<p class="font-mono text-[10px] text-secondary pt-1">{{t172}}</p>
</div>
<!-- Step 3 -->
<div class="bg-surface p-space-sm rounded space-y-1">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-secondary uppercase font-bold">{{t173}}</span>
<span class="material-symbols-outlined text-primary text-[16px]">{{t174}}</span>
</div>
<p class="font-label-md text-label-md font-bold text-on-surface">{{t175}}</p>
<p class="text-[11px] text-secondary">{{t176}}</p>
<p class="font-mono text-[10px] text-secondary pt-1">{{t177}}</p>
</div>
<!-- Step 4 -->
<div class="bg-primary/5 p-space-sm rounded space-y-1">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-primary uppercase font-bold">{{t178}}</span>
<span class="material-symbols-outlined text-tertiary-fixed-dim text-[16px]">{{t179}}</span>
</div>
<p class="font-label-md text-label-md font-bold text-primary">{{t180}}</p>
<p class="text-[11px] text-secondary">{{t181}}</p>
<p class="font-mono text-[10px] text-primary font-semibold pt-1">{{t182}}</p>
</div>
</div>
</section>
</div>
</div>
</main>`;
