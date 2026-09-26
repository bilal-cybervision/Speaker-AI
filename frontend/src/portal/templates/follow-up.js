/* Layout taken from the prototype. Copy lives in the data module. */
export const template = `<main class="relative pt-16 bg-surface min-h-screen"><div class="flex flex-col w-full">
<!-- Top Context Navigation Ribbon -->
<div class="w-full bg-surface-container-low px-margin-desktop py-space-sm flex flex-wrap items-center justify-between gap-y-2">
<div class="flex items-center gap-space-sm font-label-sm text-label-sm text-secondary">
<span class="text-primary-container font-semibold">{{t1}}</span>
<span>{{t2}}</span>
<span>{{t3}}</span>
<span>{{t4}}</span>
<span class="text-on-surface font-semibold">{{t5}}</span>
</div>
<div class="flex items-center gap-space-md">
<div class="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-secondary text-[11px] font-mono">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span>{{t6}}</span>
</div>
<span class="text-secondary text-[11px]">{{t7}}</span>
</div>
</div>
<!-- Main View Container -->
<div class="w-full px-margin-desktop py-space-lg space-y-space-lg">
<!-- Executive Header with Bilinguality & Authority Switch -->
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-md bg-surface-container-lowest p-space-lg rounded shadow-sm">
<div class="space-y-1">
<div class="flex items-center gap-space-sm">
<span class="material-symbols-outlined text-primary-container text-[24px]">{{t8}}</span>
<h1 class="font-headline-lg text-headline-lg text-primary tracking-tight">{{t9}}</h1>
<span class="font-headline-sm text-headline-sm text-on-tertiary-container font-medium px-2 py-0.5 rounded bg-surface-container">{{t10}}</span>
</div>
<p class="font-body-md text-body-md text-secondary">{{t11}}</p>
</div>
<div class="flex items-center flex-wrap gap-space-sm">
<div class="flex items-center gap-2 bg-surface px-3 py-1.5 rounded">
<span class="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim ring-2 ring-tertiary-container/30"></span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">{{t12}}</span>
</div>
<button class="inline-flex items-center gap-1.5 bg-surface text-secondary hover:text-on-surface hover:bg-surface-container px-3 py-2 rounded font-label-md text-label-md transition-colors" type="button">
<span class="material-symbols-outlined text-[18px]">{{t13}}</span>
<span>{{t14}}</span>
</button>
<button class="inline-flex items-center gap-1.5 bg-primary-container hover:bg-primary text-on-primary px-3.5 py-2 rounded font-label-md text-label-md transition-colors" type="button">
<span class="material-symbols-outlined text-[18px]">{{t15}}</span>
<span>{{t16}}</span>
</button>
</div>
</div>
<!-- Executive Compliance Metric Bar -->
<div class="grid grid-cols-2 md:grid-cols-5 gap-space-md">
<!-- Total Active -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between text-secondary">
<span class="font-label-sm text-label-sm uppercase tracking-wider">{{t17}}</span>
<span class="material-symbols-outlined text-[18px]">{{t18}}</span>
</div>
<div class="mt-2 flex items-baseline justify-between">
<span class="font-display text-display text-primary font-bold">{{t19}}</span>
<span class="text-body-sm font-label-sm text-secondary">{{t20}}</span>
</div>
<div class="w-full bg-surface-container h-1 rounded-full mt-2 overflow-hidden">
<div class="bg-primary-container h-full w-full"></div>
</div>
</div>
<!-- On Track -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between text-secondary">
<span class="font-label-sm text-label-sm uppercase tracking-wider">{{t21}}</span>
<span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
</div>
<div class="mt-2 flex items-baseline justify-between">
<span class="font-display text-display text-on-surface font-bold">{{t22}}</span>
<span class="text-body-sm font-label-sm text-secondary">{{t23}}</span>
</div>
<div class="w-full bg-surface-container h-1 rounded-full mt-2 overflow-hidden">
<div class="bg-secondary h-full" style="width: 42.8%"></div>
</div>
</div>
<!-- In Progress -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between text-secondary">
<span class="font-label-sm text-label-sm uppercase tracking-wider">{{t24}}</span>
<span class="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim"></span>
</div>
<div class="mt-2 flex items-baseline justify-between">
<span class="font-display text-display text-on-surface font-bold">{{t25}}</span>
<span class="text-body-sm font-label-sm text-secondary">{{t26}}</span>
</div>
<div class="w-full bg-surface-container h-1 rounded-full mt-2 overflow-hidden">
<div class="bg-tertiary-fixed-dim h-full" style="width: 35.7%"></div>
</div>
</div>
<!-- Overdue -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between">
<div class="flex items-center justify-between text-error font-semibold">
<span class="font-label-sm text-label-sm uppercase tracking-wider">{{t27}}</span>
<span class="w-2.5 h-2.5 rounded-full bg-error"></span>
</div>
<div class="mt-2 flex items-baseline justify-between">
<span class="font-display text-display text-error font-bold">{{t28}}</span>
<span class="text-body-sm font-label-sm text-error font-medium">{{t29}}</span>
</div>
<div class="w-full bg-surface-container h-1 rounded-full mt-2 overflow-hidden">
<div class="bg-error h-full" style="width: 9.5%"></div>
</div>
</div>
<!-- Verified This Month -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col justify-between col-span-2 md:col-span-1">
<div class="flex items-center justify-between text-primary-container font-semibold">
<span class="font-label-sm text-label-sm uppercase tracking-wider">{{t30}}</span>
<span class="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
</div>
<div class="mt-2 flex items-baseline justify-between">
<span class="font-display text-display text-primary-container font-bold">{{t31}}</span>
<span class="text-body-sm font-label-sm text-primary-container">{{t32}}</span>
</div>
<div class="w-full bg-surface-container h-1 rounded-full mt-2 overflow-hidden">
<div class="bg-primary-container h-full" style="width: 100%"></div>
</div>
</div>
</div>
<!-- Filter & Operational Toolbar -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col xl:flex-row items-center justify-between gap-space-md">
<div class="flex flex-1 flex-wrap items-center gap-space-md w-full">
<!-- Search bar -->
<div class="relative flex-1 min-w-[280px]">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[18px]">{{t33}}</span>
<input class="w-full pl-9 pr-4 py-2 bg-surface text-on-surface text-body-md rounded focus:outline-none focus:bg-surface-container-lowest placeholder:text-secondary text-xs" placeholder="{{a1}}" type="text"/>
</div>
<!-- Department Filter -->
<div class="relative">
<select class="appearance-none bg-surface text-on-surface text-body-md py-2 pl-3 pr-8 rounded text-xs focus:outline-none cursor-pointer">
<option>{{t34}}</option>
<option>{{t35}}</option>
<option>{{t36}}</option>
<option>{{t37}}</option>
<option>{{t38}}</option>
<option>{{t39}}</option>
<option>{{t40}}</option>
</select>
<span class="material-symbols-outlined absolute right-2 top-2.5 pointer-events-none text-secondary text-[16px]">{{t41}}</span>
</div>
<!-- Priority Filter -->
<div class="relative">
<select class="appearance-none bg-surface text-on-surface text-body-md py-2 pl-3 pr-8 rounded text-xs focus:outline-none cursor-pointer">
<option>{{t42}}</option>
<option>{{t43}}</option>
<option>{{t44}}</option>
<option>{{t45}}</option>
</select>
<span class="material-symbols-outlined absolute right-2 top-2.5 pointer-events-none text-secondary text-[16px]">{{t46}}</span>
</div>
</div>
<!-- View Switcher -->
<div class="flex items-center gap-1 bg-surface-container p-1 rounded shrink-0 self-end xl:self-center">
<button class="px-3 py-1 text-label-sm font-label-sm rounded bg-surface-container-lowest text-primary-container font-semibold shadow-none flex items-center gap-1" type="button">
<span class="material-symbols-outlined text-[16px]">{{t47}}</span>
<span>{{t48}}</span>
</button>
<button class="px-3 py-1 text-label-sm font-label-sm rounded text-secondary hover:text-on-surface flex items-center gap-1" type="button">
<span class="material-symbols-outlined text-[16px]">{{t49}}</span>
<span>{{t50}}</span>
</button>
<button class="px-3 py-1 text-label-sm font-label-sm rounded text-secondary hover:text-on-surface flex items-center gap-1" type="button">
<span class="material-symbols-outlined text-[16px]">{{t51}}</span>
<span>{{t52}}</span>
</button>
</div>
</div>
<!-- Main Workspace: 4-Column Board + Contextual Review Panel -->
<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
<!-- Kanban 4 Columns Container (8 Cols on XL) -->
<div class="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
<!-- Column 1: Pending Action -->
<div class="flex flex-col bg-surface-container-low rounded p-space-sm space-y-space-sm">
<div class="flex items-center justify-between px-2 py-1 bg-surface-container-lowest rounded">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">{{t53}}</span>
</div>
<span class="font-label-sm text-label-sm px-1.5 py-0.2 bg-surface-container text-secondary rounded">{{t54}}</span>
</div>
<div class="text-[11px] text-secondary px-2 font-body-sm">{{t55}}</div>
<!-- Card 1 -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm hover:bg-surface transition-colors cursor-pointer space-y-space-sm" onclick="openDirectiveModal('DIR-2024-118')">
<div class="flex items-start justify-between gap-1">
<span class="font-mono text-[11px] text-primary-container font-semibold">{{t56}}</span>
<span class="px-2 py-0.5 rounded text-[10px] font-label-sm bg-surface-container text-secondary uppercase font-semibold">{{t57}}</span>
</div>
<h2 class="font-headline-sm text-body-md text-on-surface font-semibold leading-snug">{{t58}}</h2>
<div class="space-y-1 text-body-sm text-secondary">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[15px] text-secondary">{{t59}}</span>
<span class="truncate">{{t60}}</span>
</div>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[15px] text-secondary">{{t61}}</span>
<span>{{t62}}</span>
</div>
</div>
<div class="pt-2 bg-surface-container-low p-2 rounded text-[11px] text-on-surface flex items-start gap-1.5">
<span class="material-symbols-outlined text-primary-container text-[14px] shrink-0 mt-0.5">{{t63}}</span>
<span><strong>{{t64}}</strong>{{t65}}</span>
</div>
</div>
<!-- Card 2 -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm hover:bg-surface transition-colors cursor-pointer space-y-space-sm" onclick="openDirectiveModal('DIR-2024-121')">
<div class="flex items-start justify-between gap-1">
<span class="font-mono text-[11px] text-primary-container font-semibold">{{t66}}</span>
<span class="px-2 py-0.5 rounded text-[10px] font-label-sm bg-surface-container text-secondary uppercase">{{t67}}</span>
</div>
<h2 class="font-headline-sm text-body-md text-on-surface font-semibold leading-snug">{{t68}}</h2>
<div class="space-y-1 text-body-sm text-secondary">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[15px] text-secondary">{{t69}}</span>
<span class="truncate">{{t70}}</span>
</div>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[15px] text-secondary">{{t71}}</span>
<span>{{t72}}</span>
</div>
</div>
<div class="flex items-center justify-between text-[11px] text-secondary pt-1">
<span>{{t73}}</span>
<span class="material-symbols-outlined text-[16px]">{{t74}}</span>
</div>
</div>
</div>
<!-- Column 2: In Progress -->
<div class="flex flex-col bg-surface-container-low rounded p-space-sm space-y-space-sm">
<div class="flex items-center justify-between px-2 py-1 bg-surface-container-lowest rounded">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">{{t75}}</span>
</div>
<span class="font-label-sm text-label-sm px-1.5 py-0.2 bg-surface-container text-secondary rounded">{{t76}}</span>
</div>
<div class="text-[11px] text-secondary px-2 font-body-sm">{{t77}}</div>
<!-- Card 3 -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm hover:bg-surface transition-colors cursor-pointer space-y-space-sm" onclick="openDirectiveModal('DIR-2024-104')">
<div class="flex items-start justify-between gap-1">
<span class="font-mono text-[11px] text-primary-container font-semibold">{{t78}}</span>
<span class="px-2 py-0.5 rounded text-[10px] font-label-sm bg-surface-container text-secondary uppercase font-semibold">{{t79}}</span>
</div>
<h2 class="font-headline-sm text-body-md text-on-surface font-semibold leading-snug">{{t80}}</h2>
<div class="space-y-1 text-body-sm text-secondary">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[15px] text-secondary">{{t81}}</span>
<span class="truncate">{{t82}}</span>
</div>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[15px] text-secondary">{{t83}}</span>
<span>{{t84}}</span>
</div>
</div>
<div class="space-y-1 bg-surface-container-low p-2 rounded">
<div class="flex justify-between text-[11px] text-on-surface font-medium">
<span>{{t85}}</span>
<span>{{t86}}</span>
</div>
<div class="w-full bg-surface-container h-1 rounded-full overflow-hidden">
<div class="bg-primary-container h-full" style="width: 60%"></div>
</div>
<p class="text-[10px] text-secondary">{{t87}}</p>
</div>
<div class="flex items-center gap-2 text-[11px] text-secondary pt-1">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">{{t88}}</span>{{t89}}</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">{{t90}}</span>{{t91}}</span>
</div>
</div>
<!-- Card 4 -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm hover:bg-surface transition-colors cursor-pointer space-y-space-sm" onclick="openDirectiveModal('DIR-2024-098')">
<div class="flex items-start justify-between gap-1">
<span class="font-mono text-[11px] text-primary-container font-semibold">{{t92}}</span>
<span class="px-2 py-0.5 rounded text-[10px] font-label-sm bg-surface-container text-secondary uppercase">{{t93}}</span>
</div>
<h2 class="font-headline-sm text-body-md text-on-surface font-semibold leading-snug">{{t94}}</h2>
<div class="space-y-1 text-body-sm text-secondary">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[15px] text-secondary">{{t95}}</span>
<span class="truncate">{{t96}}</span>
</div>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[15px] text-secondary">{{t97}}</span>
<span>{{t98}}</span>
</div>
</div>
<div class="pt-1 text-[11px] text-secondary">{{t99}}</div>
</div>
</div>
<!-- Column 3: Overdue / Escalation Required (High Attention) -->
<div class="flex flex-col bg-surface-container-low rounded p-space-sm space-y-space-sm">
<div class="flex items-center justify-between px-2 py-1 bg-surface-container-lowest rounded">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-error"></span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-error font-bold">{{t100}}</span>
</div>
<span class="font-label-sm text-label-sm px-1.5 py-0.2 bg-error-container text-on-error-container rounded font-bold">{{t101}}</span>
</div>
<div class="text-[11px] text-error px-2 font-body-sm font-semibold">{{t102}}</div>
<!-- Card 5 (Selected Card with Drawer Target) -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm hover:bg-surface transition-colors cursor-pointer space-y-space-sm bg-error-container/10" onclick="selectDirectiveForReview('DIR-2024-076')">
<div class="flex items-start justify-between gap-1">
<span class="font-mono text-[11px] text-error font-bold flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">{{t103}}</span>{{t104}}</span>
<span class="px-2 py-0.5 rounded text-[10px] font-label-sm bg-error-container text-on-error-container uppercase font-bold">{{t105}}</span>
</div>
<h2 class="font-headline-sm text-body-md text-on-surface font-semibold leading-snug">{{t106}}</h2>
<div class="space-y-1 text-body-sm text-secondary">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[15px] text-secondary">{{t107}}</span>
<span class="truncate font-semibold text-on-surface">{{t108}}</span>
</div>
<div class="flex items-center gap-1.5 text-error font-medium">
<span class="material-symbols-outlined text-[15px]">{{t109}}</span>
<span>{{t110}}</span>
</div>
</div>
<div class="bg-error-container/30 p-2 rounded text-[11px] text-on-error-container">
<strong>{{t111}}</strong>{{t112}}</div>
<div class="pt-1 flex flex-col gap-1.5">
<button class="w-full text-center bg-primary text-on-primary hover:bg-primary-container text-[11px] font-label-sm py-1.5 rounded transition-colors uppercase tracking-wider font-semibold" type="button">{{t113}}</button>
</div>
</div>
<!-- Card 6 -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm hover:bg-surface transition-colors cursor-pointer space-y-space-sm" onclick="selectDirectiveForReview('DIR-2024-082')">
<div class="flex items-start justify-between gap-1">
<span class="font-mono text-[11px] text-error font-bold flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">{{t114}}</span>{{t115}}</span>
<span class="px-2 py-0.5 rounded text-[10px] font-label-sm bg-error-container text-on-error-container uppercase font-semibold">{{t116}}</span>
</div>
<h2 class="font-headline-sm text-body-md text-on-surface font-semibold leading-snug">{{t117}}</h2>
<div class="space-y-1 text-body-sm text-secondary">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[15px] text-secondary">{{t118}}</span>
<span class="truncate">{{t119}}</span>
</div>
<div class="flex items-center gap-1.5 text-error">
<span class="material-symbols-outlined text-[15px]">{{t120}}</span>
<span>{{t121}}</span>
</div>
</div>
<div class="pt-1">
<button class="w-full text-center bg-surface hover:bg-surface-container text-on-surface text-[11px] font-label-sm py-1.5 rounded transition-colors" type="button">{{t122}}</button>
</div>
</div>
</div>
<!-- Column 4: Completed & Verified -->
<div class="flex flex-col bg-surface-container-low rounded p-space-sm space-y-space-sm">
<div class="flex items-center justify-between px-2 py-1 bg-surface-container-lowest rounded">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">{{t123}}</span>
</div>
<span class="font-label-sm text-label-sm px-1.5 py-0.2 bg-primary-fixed text-primary-container font-bold rounded">{{t124}}</span>
</div>
<div class="text-[11px] text-secondary px-2 font-body-sm">{{t125}}</div>
<!-- Card 7 -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm hover:bg-surface transition-colors cursor-pointer space-y-space-sm" onclick="openDirectiveModal('DIR-2024-065')">
<div class="flex items-start justify-between gap-1">
<span class="font-mono text-[11px] text-primary-container font-semibold">{{t126}}</span>
<span class="px-2 py-0.5 rounded text-[10px] font-label-sm bg-primary-fixed text-primary-container uppercase font-semibold flex items-center gap-0.5">
<span class="material-symbols-outlined text-[12px]">{{t127}}</span>{{t128}}</span>
</div>
<h2 class="font-headline-sm text-body-md text-on-surface font-semibold leading-snug">{{t129}}</h2>
<div class="space-y-1 text-body-sm text-secondary">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[15px] text-secondary">{{t130}}</span>
<span class="truncate">{{t131}}</span>
</div>
<div class="flex items-center gap-1.5 text-primary-container">
<span class="material-symbols-outlined text-[15px]">{{t132}}</span>
<span>{{t133}}</span>
</div>
</div>
<div class="text-[11px] text-secondary pt-1 flex items-center justify-between">
<span>{{t134}}</span>
<span class="font-mono text-primary text-[10px] underline">{{t135}}</span>
</div>
</div>
<!-- Card 8 -->
<div class="bg-surface-container-lowest p-space-md rounded shadow-sm hover:bg-surface transition-colors cursor-pointer space-y-space-sm" onclick="openDirectiveModal('DIR-2024-054')">
<div class="flex items-start justify-between gap-1">
<span class="font-mono text-[11px] text-primary-container font-semibold">{{t136}}</span>
<span class="px-2 py-0.5 rounded text-[10px] font-label-sm bg-primary-fixed text-primary-container uppercase font-semibold flex items-center gap-0.5">
<span class="material-symbols-outlined text-[12px]">{{t137}}</span>{{t138}}</span>
</div>
<h2 class="font-headline-sm text-body-md text-on-surface font-semibold leading-snug">{{t139}}</h2>
<div class="space-y-1 text-body-sm text-secondary">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[15px] text-secondary">{{t140}}</span>
<span class="truncate">{{t141}}</span>
</div>
<div class="flex items-center gap-1.5 text-primary-container">
<span class="material-symbols-outlined text-[15px]">{{t142}}</span>
<span>{{t143}}</span>
</div>
</div>
<div class="text-[11px] text-secondary pt-1 flex items-center justify-between">
<span>{{t144}}</span>
<span class="material-symbols-outlined text-primary-container text-[16px]">{{t145}}</span>
</div>
</div>
</div>
</div>
<!-- Integrated Executive Review Drawer (4 Cols on XL) -->
<div class="xl:col-span-4 bg-surface-container-lowest rounded shadow-sm p-space-lg space-y-space-md sticky top-20">
<!-- Review Drawer Header -->
<div class="flex items-start justify-between pb-space-sm">
<div>
<div class="flex items-center gap-2">
<span class="font-mono text-xs font-bold text-error px-2 py-0.5 rounded bg-error-container/40">{{t146}}</span>
<span class="font-label-sm text-[10px] uppercase font-bold text-on-tertiary-container bg-surface-container px-2 py-0.5 rounded">{{t147}}</span>
</div>
<h3 class="font-headline-md text-headline-sm text-on-surface mt-1 font-bold">{{t148}}</h3>
<span class="font-body-sm text-[11px] text-secondary">{{t149}}</span>
</div>
<button class="text-secondary hover:text-on-surface p-1 rounded hover:bg-surface-container" title="{{a2}}" type="button">
<span class="material-symbols-outlined text-[18px]">{{t150}}</span>
</button>
</div>
<!-- Subject Overview Card -->
<div class="bg-surface p-space-md rounded space-y-2">
<div class="text-[11px] uppercase tracking-wider font-label-sm text-secondary">{{t151}}</div>
<div class="font-headline-sm text-body-md text-on-surface font-semibold leading-relaxed">{{t152}}</div>
<div class="grid grid-cols-2 gap-2 pt-2 text-[12px] text-secondary">
<div>
<span class="block text-[10px] uppercase tracking-wider text-secondary">{{t153}}</span>
<span class="font-medium text-on-surface">{{t154}}</span>
</div>
<div>
<span class="block text-[10px] uppercase tracking-wider text-secondary">{{t155}}</span>
<span class="font-medium text-error">{{t156}}</span>
</div>
</div>
</div>
<!-- Formal Speaker Directive Text -->
<div class="space-y-1.5">
<div class="flex items-center justify-between text-[11px] font-label-sm uppercase tracking-wider text-secondary">
<span>{{t157}}</span>
<span class="text-primary-container font-mono text-[10px]">{{t158}}</span>
</div>
<div class="p-3 bg-surface-container-low rounded text-body-sm font-body-sm text-on-surface leading-relaxed italic">{{t159}}</div>
<div class="text-right font-label-sm text-[11px] text-secondary">{{t160}}</div>
</div>
<!-- Source File Connection -->
<div class="space-y-1">
<span class="text-[11px] font-label-sm uppercase tracking-wider text-secondary">{{t161}}</span>
<a class="flex items-center justify-between p-2 rounded bg-surface hover:bg-surface-container transition-colors group" href="#">
<div class="flex items-center gap-2 min-w-0">
<span class="material-symbols-outlined text-primary-container text-[20px]">{{t162}}</span>
<div class="truncate">
<span class="font-mono text-body-sm font-semibold text-primary block truncate">{{t163}}</span>
<span class="font-body-sm text-[11px] text-secondary truncate">{{t164}}</span>
</div>
</div>
<span class="material-symbols-outlined text-secondary group-hover:text-on-surface text-[18px]">{{t165}}</span>
</a>
</div>
<!-- Evidence & Submissions Dropzone / Status -->
<div class="space-y-2">
<div class="flex items-center justify-between text-[11px] font-label-sm uppercase tracking-wider text-secondary">
<span>{{t166}}</span>
<span class="text-error font-semibold">{{t167}}</span>
</div>
<div class="p-4 bg-surface rounded text-center space-y-1">
<span class="material-symbols-outlined text-secondary text-[28px]">{{t168}}</span>
<div class="text-body-sm text-on-surface font-medium">{{t169}}</div>
<div class="text-[11px] text-secondary">{{t170}}</div>
<button class="mt-2 text-xs font-label-sm text-primary-container bg-surface-container-lowest px-2.5 py-1 rounded hover:bg-surface transition-colors" type="button">{{t171}}</button>
</div>
</div>
<!-- Direct Speaker Actions / Escalation Triggers -->
<div class="space-y-2 pt-space-xs">
<span class="text-[11px] font-label-sm uppercase tracking-wider text-secondary">{{t172}}</span>
<div class="grid grid-cols-1 gap-2">
<button class="w-full flex items-center justify-center gap-2 bg-primary text-on-primary hover:bg-primary-container px-3 py-2 rounded font-label-md text-label-md transition-colors" type="button">
<span class="material-symbols-outlined text-[18px]">{{t173}}</span>
<span>{{t174}}</span>
</button>
<div class="grid grid-cols-2 gap-2">
<button class="flex items-center justify-center gap-1.5 bg-surface text-on-surface hover:bg-surface-container px-2 py-2 rounded font-label-md text-label-md transition-colors" type="button">
<span class="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">{{t175}}</span>
<span>{{t176}}</span>
</button>
<button class="flex items-center justify-center gap-1.5 bg-surface text-error hover:bg-error-container/30 px-2 py-2 rounded font-label-md text-label-md transition-colors" type="button">
<span class="material-symbols-outlined text-[16px]">{{t177}}</span>
<span>{{t178}}</span>
</button>
</div>
</div>
</div>
<!-- Audit Trail Snapshot -->
<div class="pt-space-xs text-[11px] text-secondary flex items-center justify-between">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">{{t179}}</span>{{t180}}</span>
<span class="font-mono text-[10px]">{{t181}}</span>
</div>
</div>
</div>
<!-- Supplementary Compliance Roster Table for Quick Bulk Inspection -->
<div class="bg-surface-container-lowest rounded shadow-sm p-space-lg space-y-space-md">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-space-sm">
<div>
<h4 class="font-headline-md text-headline-sm text-on-surface font-semibold">{{t182}}</h4>
<span class="font-body-sm text-secondary">{{t183}}</span>
</div>
<div class="flex items-center gap-2">
<span class="font-label-sm text-secondary text-xs">{{t184}}</span>
<button class="p-1 rounded bg-surface hover:bg-surface-container text-secondary" title="{{a3}}" type="button">
<span class="material-symbols-outlined text-[18px]">{{t185}}</span>
</button>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left text-body-sm">
<thead>
<tr class="bg-surface-container-low text-secondary font-label-sm text-[11px] uppercase tracking-wider">
<th class="py-2.5 px-3">{{t186}}</th>
<th class="py-2.5 px-3">{{t187}}</th>
<th class="py-2.5 px-3">{{t188}}</th>
<th class="py-2.5 px-3">{{t189}}</th>
<th class="py-2.5 px-3">{{t190}}</th>
<th class="py-2.5 px-3">{{t191}}</th>
<th class="py-2.5 px-3 text-right">{{t192}}</th>
</tr>
</thead>
<tbody class="text-on-surface">
<!-- Row 1 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-2.5 px-3 font-mono font-semibold text-primary-container text-xs">{{t193}}</td>
<td class="py-2.5 px-3 font-medium">{{t194}}</td>
<td class="py-2.5 px-3 text-secondary">{{t195}}</td>
<td class="py-2.5 px-3 text-secondary">{{t196}}</td>
<td class="py-2.5 px-3 text-secondary">{{t197}}</td>
<td class="py-2.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-label-sm bg-surface-container text-secondary">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>{{t198}}</span>
</td>
<td class="py-2.5 px-3 text-right">
<button class="text-primary-container hover:underline font-label-sm text-xs font-semibold" type="button">{{t199}}</button>
</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-2.5 px-3 font-mono font-semibold text-primary-container text-xs">{{t200}}</td>
<td class="py-2.5 px-3 font-medium">{{t201}}</td>
<td class="py-2.5 px-3 text-secondary">{{t202}}</td>
<td class="py-2.5 px-3 text-secondary">{{t203}}</td>
<td class="py-2.5 px-3 text-secondary">{{t204}}</td>
<td class="py-2.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-label-sm bg-tertiary-container/20 text-on-tertiary-container">
<span class="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></span>{{t205}}</span>
</td>
<td class="py-2.5 px-3 text-right">
<button class="text-primary-container hover:underline font-label-sm text-xs font-semibold" type="button">{{t206}}</button>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-container-low transition-colors bg-error-container/10">
<td class="py-2.5 px-3 font-mono font-bold text-error text-xs">{{t207}}</td>
<td class="py-2.5 px-3 font-semibold text-error">{{t208}}</td>
<td class="py-2.5 px-3 text-on-surface font-medium">{{t209}}</td>
<td class="py-2.5 px-3 text-secondary">{{t210}}</td>
<td class="py-2.5 px-3 text-error font-bold">{{t211}}</td>
<td class="py-2.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-label-sm bg-error-container text-on-error-container font-bold">
<span class="w-1.5 h-1.5 rounded-full bg-error"></span>{{t212}}</span>
</td>
<td class="py-2.5 px-3 text-right">
<button class="text-error hover:underline font-label-sm text-xs font-bold" type="button">{{t213}}</button>
</td>
</tr>
<!-- Row 4 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-2.5 px-3 font-mono font-semibold text-primary-container text-xs">{{t214}}</td>
<td class="py-2.5 px-3 font-medium">{{t215}}</td>
<td class="py-2.5 px-3 text-secondary">{{t216}}</td>
<td class="py-2.5 px-3 text-secondary">{{t217}}</td>
<td class="py-2.5 px-3 text-secondary">{{t218}}</td>
<td class="py-2.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-label-sm bg-primary-fixed text-primary-container font-semibold">
<span class="w-1.5 h-1.5 rounded-full bg-primary-container"></span>{{t219}}</span>
</td>
<td class="py-2.5 px-3 text-right">
<button class="text-primary-container hover:underline font-label-sm text-xs font-semibold" type="button">{{t220}}</button>
</td>
</tr>
<!-- Row 5 -->
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-2.5 px-3 font-mono font-semibold text-primary-container text-xs">{{t221}}</td>
<td class="py-2.5 px-3 font-medium">{{t222}}</td>
<td class="py-2.5 px-3 text-secondary">{{t223}}</td>
<td class="py-2.5 px-3 text-secondary">{{t224}}</td>
<td class="py-2.5 px-3 text-secondary">{{t225}}</td>
<td class="py-2.5 px-3">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-label-sm bg-primary-fixed text-primary-container font-semibold">
<span class="w-1.5 h-1.5 rounded-full bg-primary-container"></span>{{t226}}</span>
</td>
<td class="py-2.5 px-3 text-right">
<button class="text-primary-container hover:underline font-label-sm text-xs font-semibold" type="button">{{t227}}</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<!-- Official Seal & Constitutional Note -->
<div class="flex items-center justify-between text-secondary text-body-sm py-space-sm font-label-sm text-xs">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">{{t228}}</span>
<span>{{t229}}</span>
</div>
<div class="text-right">
<span>{{t230}}</span>
</div>
</div>
</div>
</div>
</main>`;
