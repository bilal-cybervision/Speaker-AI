/* Layout taken from the prototype. Copy lives in the data module. */
export const template = `<main class="w-full pt-2 bg-surface px-space-lg py-space-lg"><div class="flex flex-col w-full">
<!-- Top Occasion Header Bar -->
<header class="flex flex-col gap-space-sm bg-surface-container-lowest p-space-lg rounded-lg shadow-sm">
<div class="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
<div class="flex flex-col gap-0.5">
<div class="flex items-center gap-space-sm flex-wrap">
<span class="font-headline-lg text-headline-lg text-on-surface">{{t1}}</span>
<span class="font-headline-md text-headline-md text-primary-container font-semibold tracking-wide">{{t2}}</span>
<span class="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed-variant rounded-lg font-code-md text-[11px] font-semibold tracking-wider uppercase">{{t3}}</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant">{{t4}}</p>
</div>
<div class="flex items-center gap-space-md shrink-0 flex-wrap">
<!-- Role / View Switcher -->
<div class="flex items-center bg-surface-container-low p-1 rounded-lg">
<button class="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-sm transition-all flex items-center gap-1.5" type="button">
<span class="material-symbols-outlined text-[16px]">{{t5}}</span>
<span>{{t6}}</span>
</button>
<button class="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium transition-colors flex items-center gap-1.5" type="button">
<span class="material-symbols-outlined text-[16px]">{{t7}}</span>
<span>{{t8}}</span>
</button>
</div>
<!-- Create Campaign Action -->
<button class="px-4 py-2 bg-secondary text-on-secondary rounded-lg font-label-lg text-label-lg font-semibold hover:bg-on-secondary-container transition-all flex items-center gap-2 shadow-sm" type="button">
<span class="material-symbols-outlined text-[18px]">{{t9}}</span>
<span>{{t10}}</span>
</button>
</div>
</div>
</header>
<!-- Occasion Calendar Strip with Lead-time Badges -->
<section class="mt-space-md flex flex-col gap-space-xs">
<div class="flex items-center justify-between px-1">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-primary-container">{{t11}}</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">{{t12}}</span>
</div>
<span class="font-code-md text-[11px] text-outline">{{t13}}</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
<!-- Card 1 (Active Campaign) -->
<div class="relative bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between cursor-pointer transition-all hover:shadow-md">
<div class="absolute top-0 left-0 right-0 h-1 bg-secondary rounded-t-lg"></div>
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between gap-2">
<span class="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed font-code-md text-[10px] rounded-lg font-semibold tracking-wider uppercase flex items-center gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>{{t14}}</span>
<span class="font-code-md text-label-sm text-outline">{{t15}}</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface line-clamp-1">{{t16}}</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">{{t17}}</p>
</div>
<div class="mt-space-sm pt-2 bg-surface-container-low px-2 py-1.5 rounded-lg flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm text-primary-container font-semibold">{{t18}}</span>
</div>
<span class="font-code-md text-[11px] text-on-surface font-semibold">{{t19}}</span>
</div>
</div>
<!-- Card 2 -->
<div class="relative bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between transition-all hover:bg-surface-container-low cursor-pointer">
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between gap-2">
<span class="px-2 py-0.5 bg-surface-container-high text-on-surface font-code-md text-[10px] rounded-lg font-semibold">{{t20}}</span>
<span class="font-code-md text-label-sm text-outline">{{t21}}</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface line-clamp-1">{{t22}}</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">{{t23}}</p>
</div>
<div class="mt-space-sm pt-2 bg-surface-container-low px-2 py-1.5 rounded-lg flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-label-sm text-label-sm text-secondary font-semibold">{{t24}}</span>
</div>
<span class="font-code-md text-[11px] text-outline">{{t25}}</span>
</div>
</div>
<!-- Card 3 -->
<div class="relative bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between transition-all hover:bg-surface-container-low cursor-pointer">
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between gap-2">
<span class="px-2 py-0.5 bg-surface-container-high text-on-surface font-code-md text-[10px] rounded-lg font-semibold">{{t26}}</span>
<span class="font-code-md text-label-sm text-outline">{{t27}}</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface line-clamp-1">{{t28}}</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">{{t29}}</p>
</div>
<div class="mt-space-sm pt-2 bg-surface-container-low px-2 py-1.5 rounded-lg flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-outline"></span>
<span class="font-label-sm text-label-sm text-outline font-semibold">{{t30}}</span>
</div>
<span class="font-code-md text-[11px] text-outline">{{t31}}</span>
</div>
</div>
<!-- Card 4 -->
<div class="relative bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between transition-all hover:bg-surface-container-low cursor-pointer">
<div class="flex flex-col gap-1.5">
<div class="flex items-center justify-between gap-2">
<span class="px-2 py-0.5 bg-surface-container-high text-on-surface font-code-md text-[10px] rounded-lg font-semibold">{{t32}}</span>
<span class="font-code-md text-label-sm text-outline">{{t33}}</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface line-clamp-1">{{t34}}</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">{{t35}}</p>
</div>
<div class="mt-space-sm pt-2 bg-surface-container-low px-2 py-1.5 rounded-lg flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-outline-variant"></span>
<span class="font-label-sm text-label-sm text-outline font-semibold">{{t36}}</span>
</div>
<span class="font-code-md text-[11px] text-outline">{{t37}}</span>
</div>
</div>
</div>
</section>
<!-- Two-Panel Console Grid -->
<section class="mt-space-md grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
<!-- LEFT PANEL: Recipient Protocol Roster (42% -> 5 cols) -->
<div class="lg:col-span-5 flex flex-col bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
<div class="flex items-center justify-between pb-space-sm bg-surface-container-lowest">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[20px] text-primary-container">{{t38}}</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">{{t39}}</h2>
</div>
<span class="font-code-md text-[11px] px-2 py-0.5 bg-surface-container rounded font-semibold text-secondary">{{t40}}</span>
</div>
<!-- Search & Filters -->
<div class="mt-space-xs flex flex-col gap-space-xs">
<div class="relative flex items-center">
<span class="material-symbols-outlined absolute left-3 text-outline text-[18px]">{{t41}}</span>
<input class="w-full pl-9 pr-3 py-2 bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline rounded-lg outline-none focus:bg-surface-container-lowest shadow-sm" placeholder="{{a1}}" type="text" value="{{a2}}"/>
</div>
<!-- Protocol Tier Pills -->
<div class="flex items-center gap-1.5 overflow-x-auto py-1">
<button class="shrink-0 px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors" type="button">{{t42}}</button>
<button class="shrink-0 px-2.5 py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold shadow-sm" type="button">{{t43}}</button>
<button class="shrink-0 px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors" type="button">{{t44}}</button>
<button class="shrink-0 px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors" type="button">{{t45}}</button>
</div>
</div>
<!-- Recipient List -->
<div class="mt-space-sm flex flex-col gap-1.5 max-h-[640px] overflow-y-auto pr-1">
<!-- Item 1 (Active/Selected) -->
<div class="flex items-start gap-3 p-space-sm bg-surface-container-low rounded-lg transition-all cursor-pointer">
<input checked="" class="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer" type="checkbox"/>
<div class="flex-1 min-w-0 flex flex-col">
<div class="flex items-center justify-between gap-1">
<span class="font-label-lg text-label-lg font-semibold text-on-surface truncate">{{t46}}</span>
<span class="font-code-md text-[10px] text-secondary font-bold shrink-0">{{t47}}</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">{{t48}}</span>
<div class="mt-1 flex items-center justify-between text-body-sm">
<span class="font-code-md text-[11px] text-outline">{{t49}}</span>
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm text-primary-container font-semibold">{{t50}}</span>
</div>
</div>
</div>
</div>
<!-- Item 2 -->
<div class="flex items-start gap-3 p-space-sm bg-surface-container-lowest hover:bg-surface-container-low rounded-lg transition-all cursor-pointer">
<input checked="" class="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer" type="checkbox"/>
<div class="flex-1 min-w-0 flex flex-col">
<div class="flex items-center justify-between gap-1">
<span class="font-label-lg text-label-lg font-semibold text-on-surface truncate">{{t51}}</span>
<span class="font-code-md text-[10px] text-secondary font-bold shrink-0">{{t52}}</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">{{t53}}</span>
<div class="mt-1 flex items-center justify-between text-body-sm">
<span class="font-code-md text-[11px] text-outline">{{t54}}</span>
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm text-primary-container font-semibold">{{t55}}</span>
</div>
</div>
</div>
</div>
<!-- Item 3 -->
<div class="flex items-start gap-3 p-space-sm bg-surface-container-lowest hover:bg-surface-container-low rounded-lg transition-all cursor-pointer">
<input checked="" class="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer" type="checkbox"/>
<div class="flex-1 min-w-0 flex flex-col">
<div class="flex items-center justify-between gap-1">
<span class="font-label-lg text-label-lg font-semibold text-on-surface truncate">{{t56}}</span>
<span class="font-code-md text-[10px] text-secondary font-bold shrink-0">{{t57}}</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">{{t58}}</span>
<div class="mt-1 flex items-center justify-between text-body-sm">
<span class="font-code-md text-[11px] text-outline">{{t59}}</span>
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm text-primary-container font-semibold">{{t60}}</span>
</div>
</div>
</div>
</div>
<!-- Item 4 -->
<div class="flex items-start gap-3 p-space-sm bg-surface-container-lowest hover:bg-surface-container-low rounded-lg transition-all cursor-pointer opacity-70">
<input class="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer" type="checkbox"/>
<div class="flex-1 min-w-0 flex flex-col">
<div class="flex items-center justify-between gap-1">
<span class="font-label-lg text-label-lg font-semibold text-on-surface truncate">{{t61}}</span>
<span class="font-code-md text-[10px] text-outline font-bold shrink-0">{{t62}}</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">{{t63}}</span>
<div class="mt-1 flex items-center justify-between text-body-sm">
<span class="font-code-md text-[11px] text-outline">{{t64}}</span>
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-outline"></span>
<span class="font-label-sm text-label-sm text-outline font-semibold">{{t65}}</span>
</div>
</div>
</div>
</div>
<!-- Item 5 -->
<div class="flex items-start gap-3 p-space-sm bg-surface-container-lowest hover:bg-surface-container-low rounded-lg transition-all cursor-pointer opacity-70">
<input class="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer" type="checkbox"/>
<div class="flex-1 min-w-0 flex flex-col">
<div class="flex items-center justify-between gap-1">
<span class="font-label-lg text-label-lg font-semibold text-on-surface truncate">{{t66}}</span>
<span class="font-code-md text-[10px] text-outline font-bold shrink-0">{{t67}}</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant truncate">{{t68}}</span>
<div class="mt-1 flex items-center justify-between text-body-sm">
<span class="font-code-md text-[11px] text-outline">{{t69}}</span>
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-label-sm text-label-sm text-secondary font-semibold">{{t70}}</span>
</div>
</div>
</div>
</div>
</div>
<!-- Batch Selection Counter -->
<div class="mt-space-md pt-space-xs bg-surface-container-low px-space-sm py-2 rounded-lg flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface font-semibold">{{t71}}</span>
<button class="font-label-sm text-label-sm text-primary-container font-semibold hover:underline" type="button">{{t72}}</button>
</div>
</div>
<!-- RIGHT PANEL: AI-Personalized Card Preview & Editorial Suite (58% -> 7 cols) -->
<div class="lg:col-span-7 flex flex-col gap-space-md">
<!-- Occasion Indicator Banner -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[22px]">{{t73}}</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">{{t74}}</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface">{{t75}}</h2>
</div>
</div>
<div class="flex items-center gap-2">
<span class="px-2.5 py-1 bg-surface-container rounded-lg font-code-md text-[11px] font-semibold text-on-surface">{{t76}}</span>
<button class="p-1.5 text-on-surface-variant hover:text-on-surface rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors" type="button">
<span class="material-symbols-outlined text-[18px]">{{t77}}</span>
</button>
</div>
</div>
<!-- Dignified Parchment State Card Preview -->
<div class="relative bg-surface-container-lowest rounded-lg p-space-lg shadow-md flex flex-col gap-space-md">
<!-- Visual Accent Header Band -->
<div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary-container to-secondary rounded-t-lg"></div>
<!-- Crest & National Attribution -->
<div class="flex flex-col items-center text-center gap-1.5 pt-space-xs">
<img alt="{{a3}}" class="h-14 w-auto object-contain mx-auto" src="/assets/proto-01.jpg"/>
<div class="flex flex-col">
<span class="font-label-md text-label-md uppercase tracking-widest text-primary-container font-semibold">{{t78}}</span>
<span class="font-label-sm text-label-sm text-secondary font-serif italic">{{t79}}</span>
</div>
</div>
<div class="h-0.5 w-24 bg-secondary mx-auto"></div>
<!-- Salutation & Addressee -->
<div class="flex flex-col gap-1 bg-surface-container-low/50 p-space-sm rounded-lg">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-outline">{{t80}}</span>
<span class="font-headline-sm text-headline-sm text-on-surface font-semibold">{{t81}}</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">{{t82}}</span>
</div>
<!-- Card Body Content -->
<div class="flex flex-col gap-space-sm text-justify font-body-md text-body-md text-on-surface leading-relaxed">
<p>{{t83}}</p>
<p>{{t84}}</p>
<!-- Urdu Inscription Parallel Text Box -->
<div class="p-space-sm bg-surface-container-low rounded-lg text-right font-headline-sm text-[15px] leading-relaxed text-primary-container">{{t85}}</div>
</div>
<!-- Sign-off & Digital Official Seal -->
<div class="mt-space-sm flex flex-col md:flex-row items-center justify-between gap-space-md pt-space-sm bg-surface-container-low/30 p-space-sm rounded-lg">
<div class="flex items-center gap-space-sm">
<div class="w-14 h-14 rounded-full bg-secondary-fixed/40 flex items-center justify-center p-1 text-secondary shadow-inner">
<span class="material-symbols-outlined text-[32px]">{{t86}}</span>
</div>
<div class="flex flex-col">
<span class="font-code-md text-[11px] font-bold text-secondary uppercase tracking-wider">{{t87}}</span>
<span class="font-code-md text-[10px] text-outline">{{t88}}</span>
<span class="font-label-sm text-label-sm text-primary-container font-semibold">{{t89}}</span>
</div>
</div>
<div class="flex flex-col text-right">
<!-- Simulated Signature Placeholder / Crest Stamp -->
<span class="font-headline-md text-headline-md font-bold text-on-surface">{{t90}}</span>
<span class="font-label-sm text-label-sm text-primary-container font-semibold">{{t91}}</span>
<span class="font-code-md text-[10px] text-outline">{{t92}}</span>
</div>
</div>
</div>
<!-- Personal Touch AI Customizer & Options -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col gap-space-sm">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-secondary">{{t93}}</span>
<span class="font-headline-sm text-headline-sm text-on-surface">{{t94}}</span>
</div>
<span class="font-code-md text-[11px] text-primary-container font-semibold bg-primary-fixed px-2 py-0.5 rounded">{{t95}}</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-sm mt-1">
<label class="flex items-start gap-2.5 p-space-sm bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-colors">
<input checked="" class="mt-0.5 w-4 h-4 rounded text-primary-container accent-primary-container" type="checkbox"/>
<div class="flex flex-col">
<span class="font-label-md text-label-md font-semibold text-on-surface">{{t96}}</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">{{t97}}</span>
</div>
</label>
<label class="flex items-start gap-2.5 p-space-sm bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-colors">
<input checked="" class="mt-0.5 w-4 h-4 rounded text-primary-container accent-primary-container" type="checkbox"/>
<div class="flex flex-col">
<span class="font-label-md text-label-md font-semibold text-on-surface">{{t98}}</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">{{t99}}</span>
</div>
</label>
<label class="flex items-start gap-2.5 p-space-sm bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-colors">
<input checked="" class="mt-0.5 w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer" type="checkbox"/>
<div class="flex flex-col">
<span class="font-label-md text-label-md font-semibold text-on-surface">{{t100}}</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">{{t101}}</span>
</div>
</label>
<label class="flex items-start gap-2.5 p-space-sm bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-colors">
<input class="mt-0.5 w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer" type="checkbox"/>
<div class="flex flex-col">
<span class="font-label-md text-label-md font-semibold text-on-surface">{{t102}}</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">{{t103}}</span>
</div>
</label>
</div>
</div>
</div>
</section>
<!-- Bottom Action & Dispatch Bar -->
<footer class="mt-space-lg mb-space-md bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col xl:flex-row items-center justify-between gap-space-md">
<!-- Left Summary -->
<div class="flex items-center gap-space-md flex-wrap">
<div class="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant shrink-0">
<span class="material-symbols-outlined text-[22px]">{{t104}}</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-label-lg text-label-lg font-bold text-on-surface">{{t105}}</span>
<span class="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed-variant rounded font-code-md text-[10px] font-bold">{{t106}}</span>
</div>
<span class="font-body-sm text-body-sm text-outline">{{t107}}</span>
</div>
</div>
<!-- Right Action Buttons -->
<div class="flex items-center gap-space-sm flex-wrap w-full xl:w-auto justify-end">
<!-- Print Parchment Cards -->
<button class="px-4 py-3 rounded-lg bg-surface-container text-on-surface font-label-lg text-label-lg font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-2 shadow-sm" type="button">
<span class="material-symbols-outlined text-[18px]">{{t108}}</span>
<span>{{t109}}</span>
</button>
<!-- Send via Diplomatic Bag / MoFA -->
<button class="px-4 py-3 rounded-lg bg-surface-container-lowest text-primary-container font-label-lg text-label-lg font-semibold hover:bg-surface-container-low transition-colors flex items-center gap-2 shadow-sm" type="button">
<span class="material-symbols-outlined text-[18px]">{{t110}}</span>
<span>{{t111}}</span>
</button>
<!-- Primary 1-Click Approval Action (52px height) -->
<button class="h-[52px] px-6 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg font-bold hover:bg-tertiary transition-all flex items-center gap-2 shadow-md" type="button">
<span class="material-symbols-outlined text-[20px] text-secondary-fixed">{{t112}}</span>
<span>{{t113}}</span>
</button>
</div>
</footer>
</div>
</main>`;
