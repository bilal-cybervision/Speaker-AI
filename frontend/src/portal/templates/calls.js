/* Layout taken from the prototype. Copy lives in the data module. */
export const template = `<main class="w-full pt-2 bg-surface px-space-lg py-space-lg"><div class="flex flex-col w-full">
<!-- Section: Header Bar & Registry Context -->
<section class="flex flex-col gap-space-sm bg-surface-container-lowest p-space-lg rounded-lg shadow-sm">
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="font-headline-lg text-headline-lg text-primary uppercase tracking-tight">{{t1}}</span>
<span class="font-headline-md text-headline-md text-secondary font-semibold">{{t2}}</span>
</div>
<p class="font-body-md text-body-md text-on-surface-variant">{{t3}}</p>
</div>
<!-- Action Group -->
<div class="flex items-center gap-space-sm flex-wrap">
<div class="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-lg text-on-surface">
<span class="material-symbols-outlined text-[18px] text-secondary">{{t4}}</span>
<span class="font-code-md text-code-md uppercase tracking-wider">{{t5}}</span>
</div>
<button class="flex items-center gap-1.5 px-4 py-2 bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow hover:bg-tertiary-container transition-all" id="open-modal-btn" type="button">
<span class="material-symbols-outlined text-[18px]">{{t6}}</span>
<span>{{t7}}</span>
</button>
</div>
</div>
<!-- Administrative Filter Grid -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-space-sm mt-space-sm pt-space-sm bg-surface-container-low p-space-md rounded-lg">
<!-- Search Input -->
<div class="md:col-span-4 relative flex items-center">
<span class="material-symbols-outlined absolute left-3 text-outline text-[18px]">{{t8}}</span>
<input class="w-full pl-9 pr-3 py-2 bg-surface-container-lowest font-body-sm text-body-sm text-on-surface placeholder:text-outline rounded outline-none focus:bg-surface-container-high transition-colors" id="call-search" placeholder="{{a1}}" type="text"/>
</div>
<!-- Filter: Line -->
<div class="md:col-span-3">
<div class="relative">
<select class="w-full px-3 py-2 bg-surface-container-lowest font-body-sm text-body-sm text-on-surface rounded outline-none cursor-pointer appearance-none" id="filter-line">
<option value="{{a2}}">{{t9}}</option>
<option value="{{a3}}">{{t10}}</option>
<option value="{{a4}}">{{t11}}</option>
<option value="{{a5}}">{{t12}}</option>
</select>
<span class="material-symbols-outlined absolute right-2.5 top-2.5 text-outline pointer-events-none text-[16px]">{{t13}}</span>
</div>
</div>
<!-- Filter: Priority -->
<div class="md:col-span-3">
<div class="relative">
<select class="w-full px-3 py-2 bg-surface-container-lowest font-body-sm text-body-sm text-on-surface rounded outline-none cursor-pointer appearance-none" id="filter-priority">
<option value="{{a6}}">{{t14}}</option>
<option value="{{a7}}">{{t15}}</option>
<option value="{{a8}}">{{t16}}</option>
</select>
<span class="material-symbols-outlined absolute right-2.5 top-2.5 text-outline pointer-events-none text-[16px]">{{t17}}</span>
</div>
</div>
<!-- Filter: Date Range -->
<div class="md:col-span-2 flex items-center justify-between bg-surface-container-lowest px-3 py-2 rounded">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary">{{t18}}</span>
<span class="font-label-md text-label-md text-on-surface">{{t19}}</span>
</div>
<span class="font-code-md text-label-sm text-outline uppercase font-semibold">{{t20}}</span>
</div>
</div>
</section>
<!-- Metric Quick Rollout & Sparkline Strip -->
<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mt-space-md">
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-outline">{{t21}}</span>
<span class="material-symbols-outlined text-[20px] text-primary-container">{{t22}}</span>
</div>
<div class="flex items-baseline gap-2 mt-1">
<span class="font-display-lg text-display-lg text-primary font-bold">{{t23}}</span>
<span class="font-label-sm text-label-sm text-secondary font-semibold">{{t24}}</span>
</div>
<div class="w-full bg-surface-container-high h-1 rounded-full mt-2 overflow-hidden">
<div class="bg-primary-container h-full w-[70%]"></div>
</div>
</div>
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-outline">{{t25}}</span>
<span class="material-symbols-outlined text-[20px] text-secondary">{{t26}}</span>
</div>
<div class="flex items-baseline gap-2 mt-1">
<span class="font-display-lg text-display-lg text-primary font-bold">{{t27}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">{{t28}}</span>
</div>
<div class="w-full bg-surface-container-high h-1 rounded-full mt-2 overflow-hidden">
<div class="bg-secondary h-full w-[45%]"></div>
</div>
</div>
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-outline">{{t29}}</span>
<span class="material-symbols-outlined text-[20px] text-secondary">{{t30}}</span>
</div>
<div class="flex items-baseline gap-2 mt-1">
<span class="font-display-lg text-display-lg text-secondary font-bold">{{t31}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">{{t32}}</span>
</div>
<div class="w-full bg-surface-container-high h-1 rounded-full mt-2 overflow-hidden">
<div class="bg-secondary-container h-full w-[35%]"></div>
</div>
</div>
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm uppercase tracking-wider text-outline">{{t33}}</span>
<span class="material-symbols-outlined text-[20px] text-primary-container">{{t34}}</span>
</div>
<div class="flex items-baseline gap-2 mt-1">
<span class="font-display-lg text-display-lg text-primary font-bold">{{t35}}</span>
<span class="font-label-sm text-label-sm text-primary-fixed-dim bg-primary-container px-1 py-0.5 rounded">{{t36}}</span>
</div>
<div class="w-full bg-surface-container-high h-1 rounded-full mt-2 overflow-hidden">
<div class="bg-primary-fixed-dim h-full w-[98%]"></div>
</div>
</div>
</section>
<!-- Main Administrative Call Ledger -->
<section class="mt-space-md bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden">
<div class="p-space-md bg-surface-container-low flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-primary text-[20px]">{{t37}}</span>
<span class="font-label-lg text-label-lg uppercase tracking-wider text-primary font-bold">{{t38}}</span>
</div>
<div class="flex items-center gap-space-sm">
<span class="font-code-md text-code-md text-outline">{{t39}}</span>
<button class="p-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors" title="{{a9}}" type="button">
<span class="material-symbols-outlined text-[18px]">{{t40}}</span>
</button>
</div>
</div>
<!-- Responsive Table Wrapper -->
<div class="overflow-x-auto w-full">
<table class="w-full text-left text-on-surface">
<thead>
<tr class="bg-surface-container-high/60 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th class="py-3 px-space-md font-semibold">{{t41}}</th>
<th class="py-3 px-space-sm font-semibold">{{t42}}</th>
<th class="py-3 px-space-sm font-semibold">{{t43}}</th>
<th class="py-3 px-space-sm font-semibold">{{t44}}</th>
<th class="py-3 px-space-sm font-semibold text-right">{{t45}}</th>
<th class="py-3 px-space-md font-semibold min-w-[280px]">{{t46}}</th>
<th class="py-3 px-space-sm font-semibold">{{t47}}</th>
<th class="py-3 px-space-sm font-semibold">{{t48}}</th>
<th class="py-3 px-space-md font-semibold text-right">{{t49}}</th>
</tr>
</thead>
<tbody class="font-body-sm text-body-sm">
<!-- Row 1 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-3 px-space-md whitespace-nowrap">
<div class="flex flex-col">
<span class="font-code-md text-code-md font-semibold text-primary">{{t50}}</span>
<span class="font-label-sm text-label-sm text-outline">{{t51}}</span>
</div>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<div class="flex items-center gap-space-xs">
<div class="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs uppercase">{{t52}}</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md font-bold text-on-surface">{{t53}}</span>
<span class="font-body-sm text-[11px] text-on-surface-variant leading-tight">{{t54}}</span>
</div>
</div>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<span class="font-label-md text-label-md text-on-surface font-medium">{{t55}}</span>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-fixed/20 text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[14px]">{{t56}}</span>
<span>{{t57}}</span>
</span>
</td>
<td class="py-3 px-space-sm font-code-md text-code-md text-right text-on-surface-variant font-medium">{{t58}}</td>
<td class="py-3 px-space-md">
<p class="text-on-surface leading-snug">{{t59}}</p>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<a class="inline-flex items-center gap-1 px-2 py-1 bg-surface-container rounded font-code-md text-label-sm text-primary hover:bg-surface-container-high transition-colors" href="#">
<span class="material-symbols-outlined text-[13px]">{{t60}}</span>
<span>{{t61}}</span>
</a>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-label-sm text-label-sm font-semibold text-secondary">{{t62}}</span>
</div>
</td>
<td class="py-3 px-space-md text-right whitespace-nowrap">
<button class="px-2.5 py-1 bg-surface-container text-primary hover:bg-surface-container-high font-label-sm text-label-sm rounded transition-colors inline-flex items-center gap-1" type="button">
<span class="material-symbols-outlined text-[14px]">{{t63}}</span>
<span>{{t64}}</span>
</button>
</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-3 px-space-md whitespace-nowrap">
<div class="flex flex-col">
<span class="font-code-md text-code-md font-semibold text-primary">{{t65}}</span>
<span class="font-label-sm text-label-sm text-outline">{{t66}}</span>
</div>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<div class="flex items-center gap-space-xs">
<div class="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-xs uppercase">{{t67}}</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md font-bold text-on-surface">{{t68}}</span>
<span class="font-body-sm text-[11px] text-on-surface-variant leading-tight">{{t69}}</span>
</div>
</div>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<span class="font-label-md text-label-md text-on-surface font-medium">{{t70}}</span>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[14px]">{{t71}}</span>
<span>{{t72}}</span>
</span>
</td>
<td class="py-3 px-space-sm font-code-md text-code-md text-right text-on-surface-variant font-medium">{{t73}}</td>
<td class="py-3 px-space-md">
<p class="text-on-surface leading-snug">{{t74}}</p>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<a class="inline-flex items-center gap-1 px-2 py-1 bg-surface-container rounded font-code-md text-label-sm text-primary hover:bg-surface-container-high transition-colors" href="#">
<span class="material-symbols-outlined text-[13px]">{{t75}}</span>
<span>{{t76}}</span>
</a>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm font-semibold text-primary-container">{{t77}}</span>
</div>
</td>
<td class="py-3 px-space-md text-right whitespace-nowrap">
<button class="px-2.5 py-1 bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm rounded transition-colors inline-flex items-center gap-1" type="button">
<span class="material-symbols-outlined text-[14px]">{{t78}}</span>
<span>{{t79}}</span>
</button>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-3 px-space-md whitespace-nowrap">
<div class="flex flex-col">
<span class="font-code-md text-code-md font-semibold text-primary">{{t80}}</span>
<span class="font-label-sm text-label-sm text-outline">{{t81}}</span>
</div>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<div class="flex items-center gap-space-xs">
<div class="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-xs uppercase">{{t82}}</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md font-bold text-on-surface">{{t83}}</span>
<span class="font-body-sm text-[11px] text-on-surface-variant leading-tight">{{t84}}</span>
</div>
</div>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<span class="font-label-md text-label-md text-on-surface font-medium">{{t85}}</span>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-fixed/20 text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[14px]">{{t86}}</span>
<span>{{t87}}</span>
</span>
</td>
<td class="py-3 px-space-sm font-code-md text-code-md text-right text-on-surface-variant font-medium">{{t88}}</td>
<td class="py-3 px-space-md">
<p class="text-on-surface leading-snug">{{t89}}</p>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<a class="inline-flex items-center gap-1 px-2 py-1 bg-surface-container rounded font-code-md text-label-sm text-primary hover:bg-surface-container-high transition-colors" href="#">
<span class="material-symbols-outlined text-[13px]">{{t90}}</span>
<span>{{t91}}</span>
</a>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-label-sm text-label-sm font-semibold text-secondary">{{t92}}</span>
</div>
</td>
<td class="py-3 px-space-md text-right whitespace-nowrap">
<button class="px-2.5 py-1 bg-secondary text-on-secondary font-label-sm text-label-sm rounded transition-colors inline-flex items-center gap-1" type="button">
<span class="material-symbols-outlined text-[14px]">{{t93}}</span>
<span>{{t94}}</span>
</button>
</td>
</tr>
<!-- Row 4 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-3 px-space-md whitespace-nowrap">
<div class="flex flex-col">
<span class="font-code-md text-code-md font-semibold text-on-surface">{{t95}}</span>
<span class="font-label-sm text-label-sm text-outline">{{t96}}</span>
</div>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<div class="flex items-center gap-space-xs">
<div class="w-8 h-8 rounded-full bg-tertiary-container text-on-primary flex items-center justify-center font-bold text-xs uppercase">{{t97}}</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md font-bold text-on-surface">{{t98}}</span>
<span class="font-body-sm text-[11px] text-on-surface-variant leading-tight">{{t99}}</span>
</div>
</div>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<span class="font-label-md text-label-md text-on-surface font-medium">{{t100}}</span>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[14px]">{{t101}}</span>
<span>{{t102}}</span>
</span>
</td>
<td class="py-3 px-space-sm font-code-md text-code-md text-right text-on-surface-variant font-medium">{{t103}}</td>
<td class="py-3 px-space-md">
<p class="text-on-surface leading-snug">{{t104}}</p>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<a class="inline-flex items-center gap-1 px-2 py-1 bg-surface-container rounded font-code-md text-label-sm text-primary hover:bg-surface-container-high transition-colors" href="#">
<span class="material-symbols-outlined text-[13px]">{{t105}}</span>
<span>{{t106}}</span>
</a>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm font-semibold text-primary-container">{{t107}}</span>
</div>
</td>
<td class="py-3 px-space-md text-right whitespace-nowrap">
<button class="px-2.5 py-1 bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm rounded transition-colors inline-flex items-center gap-1" type="button">
<span class="material-symbols-outlined text-[14px]">{{t108}}</span>
<span>{{t109}}</span>
</button>
</td>
</tr>
<!-- Row 5 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-3 px-space-md whitespace-nowrap">
<div class="flex flex-col">
<span class="font-code-md text-code-md font-semibold text-on-surface">{{t110}}</span>
<span class="font-label-sm text-label-sm text-outline">{{t111}}</span>
</div>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<div class="flex items-center gap-space-xs">
<div class="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center font-bold text-xs uppercase">{{t112}}</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md font-bold text-on-surface">{{t113}}</span>
<span class="font-body-sm text-[11px] text-on-surface-variant leading-tight">{{t114}}</span>
</div>
</div>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<span class="font-label-md text-label-md text-on-surface font-medium">{{t115}}</span>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-fixed/20 text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[14px]">{{t116}}</span>
<span>{{t117}}</span>
</span>
</td>
<td class="py-3 px-space-sm font-code-md text-code-md text-right text-on-surface-variant font-medium">{{t118}}</td>
<td class="py-3 px-space-md">
<p class="text-on-surface leading-snug">{{t119}}</p>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<a class="inline-flex items-center gap-1 px-2 py-1 bg-surface-container rounded font-code-md text-label-sm text-primary hover:bg-surface-container-high transition-colors" href="#">
<span class="material-symbols-outlined text-[13px]">{{t120}}</span>
<span>{{t121}}</span>
</a>
</td>
<td class="py-3 px-space-sm whitespace-nowrap">
<div class="flex items-center gap-1.5">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm font-semibold text-primary-container">{{t122}}</span>
</div>
</td>
<td class="py-3 px-space-md text-right whitespace-nowrap">
<button class="px-2.5 py-1 bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm rounded transition-colors inline-flex items-center gap-1" type="button">
<span class="material-symbols-outlined text-[14px]">{{t123}}</span>
<span>{{t124}}</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Ledger Pagination & Administrative Verification Footnote -->
<div class="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
<div class="flex items-center gap-space-xs">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span>{{t125}}</span>
</div>
<div class="flex items-center gap-2">
<span>{{t126}}</span>
<div class="inline-flex rounded shadow-sm">
<button class="px-2.5 py-1 bg-surface-container-lowest text-on-surface hover:bg-surface-container rounded-l" type="button">{{t127}}</button>
<button class="px-2.5 py-1 bg-primary-container text-on-primary font-semibold" type="button">{{t128}}</button>
<button class="px-2.5 py-1 bg-surface-container-lowest text-on-surface hover:bg-surface-container" type="button">{{t129}}</button>
<button class="px-2.5 py-1 bg-surface-container-lowest text-on-surface hover:bg-surface-container" type="button">{{t130}}</button>
<button class="px-2.5 py-1 bg-surface-container-lowest text-on-surface hover:bg-surface-container rounded-r" type="button">{{t131}}</button>
</div>
</div>
</div>
</section>
<!-- Section: Secondary Grid with Call Statistics & Live Chamber Channel Monitor -->
<section class="grid grid-cols-1 lg:grid-cols-3 gap-space-md mt-space-md mb-space-lg">
<!-- Channel Status Card -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-lg text-label-lg font-bold text-on-surface">{{t132}}</span>
<span class="material-symbols-outlined text-secondary text-[20px]">{{t133}}</span>
</div>
<div class="flex flex-col gap-2 mt-3">
<div class="flex items-center justify-between p-2 rounded bg-surface-container-low">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-md text-label-md text-on-surface font-semibold">{{t134}}</span>
</div>
<span class="font-code-md text-label-sm text-outline">{{t135}}</span>
</div>
<div class="flex items-center justify-between p-2 rounded bg-surface-container-low">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-label-md text-label-md text-on-surface font-semibold">{{t136}}</span>
</div>
<span class="font-code-md text-label-sm text-secondary font-semibold">{{t137}}</span>
</div>
<div class="flex items-center justify-between p-2 rounded bg-surface-container-low">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-md text-label-md text-on-surface font-semibold">{{t138}}</span>
</div>
<span class="font-code-md text-label-sm text-outline">{{t139}}</span>
</div>
</div>
<span class="font-body-sm text-[11px] text-outline mt-3 block">{{t140}}</span>
</div>
<!-- Official Dispatcher Notice -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-lg text-label-lg font-bold text-on-surface">{{t141}}</span>
<span class="material-symbols-outlined text-primary text-[20px]">{{t142}}</span>
</div>
<div class="p-3 bg-surface-container-low rounded-lg mt-2 flex flex-col gap-1.5">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm font-bold text-secondary uppercase">{{t143}}</span>
<span class="font-code-md text-[11px] text-outline">{{t144}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface">{{t145}}</p>
</div>
<div class="flex items-center gap-2 mt-3">
<button class="w-full py-1.5 bg-primary-container text-on-primary font-label-md text-label-md rounded hover:bg-tertiary-container transition-colors" type="button">{{t146}}</button>
</div>
</div>
<!-- AI Voice Transcription Summary Widget -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-lg text-label-lg font-bold text-on-surface">{{t147}}</span>
<span class="material-symbols-outlined text-secondary text-[20px]">{{t148}}</span>
</div>
<div class="p-3 bg-primary-fixed/15 rounded-lg mt-2 flex flex-col gap-1">
<span class="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">{{t149}}</span>
<p class="font-body-sm text-[12px] text-on-surface italic">{{t150}}</p>
</div>
<div class="flex items-center justify-between mt-3 pt-2">
<span class="font-label-sm text-label-sm text-outline">{{t151}}</span>
<span class="font-code-md text-[11px] text-primary font-semibold">{{t152}}</span>
</div>
</div>
</section>
<!-- Modal / Docked Overlay: New Call Entry & AI Voice Transcription Form -->
<div class="fixed inset-0 z-50 bg-inverse-surface/40 flex items-center justify-center p-4 hidden" id="new-call-modal">
<div class="w-full max-w-2xl bg-surface-container-lowest rounded-lg shadow-xl overflow-hidden flex flex-col">
<!-- Modal Header -->
<div class="px-space-lg py-space-md bg-primary-container text-on-primary flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-[20px] text-secondary-fixed">{{t153}}</span>
<div class="flex flex-col">
<span class="font-headline-sm text-headline-sm font-semibold">{{t154}}</span>
<span class="font-label-sm text-label-sm text-primary-fixed-dim/80 text-[10px]">{{t155}}</span>
</div>
</div>
<button class="text-primary-fixed-dim hover:text-on-primary p-1 rounded transition-colors" id="close-modal-btn" type="button">
<span class="material-symbols-outlined text-[20px]">{{t156}}</span>
</button>
</div>
<!-- Modal Body Form -->
<form class="p-space-lg flex flex-col gap-space-md overflow-y-auto max-h-[768px]">
<!-- Caller Identity Row -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div class="flex flex-col gap-1">
<label class="font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider">{{t157}}</label>
<input class="px-3 py-2 bg-surface-container-low font-body-md text-body-md text-on-surface rounded outline-none focus:bg-surface-container-high transition-colors" placeholder="{{a10}}" type="text" value="{{a11}}"/>
</div>
<div class="flex flex-col gap-1">
<label class="font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider">{{t158}}</label>
<div class="relative">
<select class="w-full px-3 py-2 bg-surface-container-low font-body-md text-body-md text-on-surface rounded outline-none cursor-pointer appearance-none">
<option value="{{a12}}">{{t159}}</option>
<option value="{{a13}}">{{t160}}</option>
<option value="{{a14}}">{{t161}}</option>
<option value="{{a15}}">{{t162}}</option>
</select>
<span class="material-symbols-outlined absolute right-2.5 top-2.5 text-outline pointer-events-none text-[16px]">{{t163}}</span>
</div>
</div>
</div>
<!-- Telecommunication Channel & Direction -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div class="flex flex-col gap-1">
<label class="font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider">{{t164}}</label>
<select class="w-full px-3 py-2 bg-surface-container-low font-body-sm text-body-sm text-on-surface rounded outline-none">
<option>{{t165}}</option>
<option>{{t166}}</option>
<option>{{t167}}</option>
</select>
</div>
<div class="flex flex-col gap-1">
<label class="font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider">{{t168}}</label>
<select class="w-full px-3 py-2 bg-surface-container-low font-body-sm text-body-sm text-on-surface rounded outline-none">
<option>{{t169}}</option>
<option>{{t170}}</option>
<option>{{t171}}</option>
</select>
</div>
<div class="flex flex-col gap-1">
<label class="font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider">{{t172}}</label>
<input class="px-3 py-2 bg-surface-container-low font-code-md text-code-md text-on-surface rounded outline-none" type="text" value="{{a16}}"/>
</div>
</div>
<!-- Direct Recording / Voice Dictation Feature -->
<div class="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-sm">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[18px] text-error">{{t173}}</span>
<span class="font-label-md text-label-md font-bold text-on-surface">{{t174}}</span>
</div>
<span class="font-label-sm text-label-sm text-primary font-semibold">{{t175}}</span>
</div>
<button class="w-full py-2.5 px-4 bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold rounded hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 shadow-sm" id="dictation-btn" type="button">
<span class="material-symbols-outlined text-error text-[18px]">{{t176}}</span>
<span>{{t177}}</span>
</button>
<!-- Voice Transcription Preview Card -->
<div class="p-3 bg-surface-container-lowest rounded shadow-xs flex flex-col gap-1">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-outline font-semibold uppercase tracking-wider">{{t178}}</span>
<span class="font-code-md text-[10px] text-secondary font-semibold">{{t179}}</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface italic" id="transcription-text">{{t180}}</p>
</div>
</div>
<!-- Legislative Dossier Cross-Linking -->
<div class="flex flex-col gap-1">
<label class="font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider">{{t181}}</label>
<div class="relative">
<select class="w-full px-3 py-2 bg-surface-container-low font-body-sm text-body-sm text-on-surface rounded outline-none cursor-pointer appearance-none">
<option value="{{a17}}">{{t182}}</option>
<option value="{{a18}}">{{t183}}</option>
<option value="{{a19}}">{{t184}}</option>
<option value="{{a20}}">{{t185}}</option>
</select>
<span class="material-symbols-outlined absolute right-2.5 top-2.5 text-outline pointer-events-none text-[16px]">{{t186}}</span>
</div>
</div>
<!-- Follow-up Action / Note -->
<div class="flex flex-col gap-1">
<label class="font-label-sm text-label-sm font-semibold text-on-surface uppercase tracking-wider">{{t187}}</label>
<textarea class="w-full p-2.5 bg-surface-container-low font-body-sm text-body-sm text-on-surface rounded outline-none focus:bg-surface-container-high transition-colors" placeholder="{{a21}}" rows="2">{{t188}}</textarea>
</div>
<!-- Modal Actions -->
<div class="flex items-center justify-end gap-space-sm pt-space-xs">
<button class="px-4 py-2 bg-surface-container text-on-surface font-label-md text-label-md rounded hover:bg-surface-container-high transition-colors" id="cancel-modal-btn" type="button">{{t189}}</button>
<button class="px-5 py-2 bg-primary-container text-on-primary font-label-md text-label-md font-semibold rounded hover:bg-tertiary-container transition-colors shadow" type="submit">{{t190}}</button>
</div>
</form>
</div>
</div>
</div>
<!-- Inline JavaScript for Micro-Interactions & Ledger Filtering -->
</main>`;
