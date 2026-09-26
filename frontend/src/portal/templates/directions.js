/* Layout taken from the prototype. Copy lives in the data module. */
export const template = `<main class="w-full pt-2 bg-surface px-space-lg py-space-lg"><div class="flex flex-col w-full">
<!-- Top Sovereign Strip / Administrative Control Header -->
<div class="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm mb-space-lg">
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-md">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
<h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight flex items-center gap-2">{{t1}}<span class="text-secondary font-label-lg font-normal tracking-normal text-[15px] pt-0.5">{{t2}}</span>
</h1>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{{t3}}</p>
</div>
<!-- Quick Metrics Strip -->
<div class="flex items-center gap-space-sm bg-surface-container-low p-1.5 rounded-lg">
<div class="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest rounded shadow-sm">
<span class="font-code-md text-code-md font-semibold text-primary">{{t4}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{{t5}}</span>
</div>
<div class="flex items-center gap-1.5 px-2.5 py-1">
<span class="w-2 h-2 rounded-full bg-outline"></span>
<span class="font-code-md text-code-md font-semibold text-on-surface">{{t6}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">{{t7}}</span>
</div>
<div class="flex items-center gap-1.5 px-2.5 py-1">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-code-md text-code-md font-semibold text-on-surface">{{t8}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">{{t9}}</span>
</div>
<div class="flex items-center gap-1.5 px-2.5 py-1">
<span class="w-2 h-2 rounded-full bg-error"></span>
<span class="font-code-md text-code-md font-semibold text-error">{{t10}}</span>
<span class="font-label-sm text-label-sm text-error">{{t11}}</span>
</div>
</div>
</div>
<!-- Filters and Operational Actions -->
<div class="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md pt-space-xs">
<div class="flex flex-wrap items-center gap-space-sm flex-1">
<!-- Search Input -->
<div class="relative min-w-[280px] flex-1 max-w-md">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">{{t12}}</span>
<input class="w-full pl-9 pr-3 py-2 bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline rounded-lg outline-none focus:bg-surface-container-lowest focus:shadow-sm" placeholder="{{a1}}" type="text"/>
</div>
<!-- Ministry Filter Dropdown -->
<div class="relative min-w-[210px]">
<select class="w-full pl-3 pr-8 py-2 bg-surface-container-low font-label-md text-label-md text-on-surface rounded-lg appearance-none outline-none cursor-pointer focus:bg-surface-container-lowest">
<option>{{t13}}</option>
<option>{{t14}}</option>
<option>{{t15}}</option>
<option>{{t16}}</option>
<option>{{t17}}</option>
<option>{{t18}}</option>
<option>{{t19}}</option>
</select>
<span class="material-symbols-outlined absolute right-2.5 top-2.5 text-outline text-[18px] pointer-events-none">{{t20}}</span>
</div>
<!-- Date Range Filter -->
<div class="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-lg text-on-surface font-label-md text-label-md">
<span class="material-symbols-outlined text-[16px] text-outline">{{t21}}</span>
<span>{{t22}}</span>
</div>
<!-- Fast Toggle -->
<button class="p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="{{a2}}" type="button">
<span class="material-symbols-outlined text-[18px]">{{t23}}</span>
</button>
</div>
<!-- Primary Action -->
<div class="flex items-center gap-space-sm shrink-0">
<button class="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest text-primary-container font-label-lg text-label-lg rounded-lg shadow-sm hover:bg-surface-container-low transition-colors" type="button">
<span class="material-symbols-outlined text-[18px]">{{t24}}</span>
<span>{{t25}}</span>
</button>
<button class="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow hover:bg-tertiary-container transition-all" type="button">
<span class="material-symbols-outlined text-[18px] text-secondary-fixed">{{t26}}</span>
<span>{{t27}}</span>
</button>
</div>
</div>
</div>
<!-- Primary Workspace: Kanban Grid + Linked Inspection Drawer -->
<div class="grid grid-cols-12 gap-space-lg items-start">
<!-- Kanban Columns View (Columns take 8 cols on wide monitors when drawer is active, 12 when hidden) -->
<div class="col-span-12 xl:col-span-8 flex flex-col gap-space-md transition-all duration-200" id="kanban-container">
<div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-space-md items-start">
<!-- Column 1: Pending Allocation -->
<div class="flex flex-col bg-surface-container-low rounded-xl p-space-sm shadow-sm min-h-[680px]">
<!-- Column Header -->
<div class="flex items-center justify-between pb-2 mb-2 px-1">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-outline"></span>
<span class="font-label-lg text-label-lg text-on-surface">{{t28}}</span>
</div>
<span class="font-code-md text-code-md bg-surface-container px-2 py-0.5 rounded text-on-surface font-semibold">{{t29}}</span>
</div>
<!-- Card List -->
<div class="flex flex-col gap-space-sm">
<!-- Card 1 -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm hover:shadow transition-all cursor-pointer group" onclick="highlightCard(this)">
<div class="flex items-center justify-between gap-1 mb-2">
<span class="font-code-md text-label-sm text-secondary font-bold tracking-tight">{{t30}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">{{t31}}</span>
</div>
<p class="font-headline-sm text-label-lg text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-3">{{t32}}</p>
<div class="flex flex-col gap-1.5 pt-2 bg-surface-container-low/60 -mx-space-md -mb-space-md p-space-sm rounded-b-lg">
<div class="flex items-center gap-1.5 text-on-surface-variant">
<span class="material-symbols-outlined text-[15px] text-outline">{{t33}}</span>
<span class="font-label-sm text-label-sm truncate">{{t34}}</span>
</div>
<div class="flex items-center justify-between text-on-surface-variant">
<span class="flex items-center gap-1 font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[15px] text-outline">{{t35}}</span>
<span>{{t36}}</span>
</span>
<span class="flex items-center gap-1 text-[11px] font-label-sm text-outline">
<span class="w-1.5 h-1.5 rounded-full bg-outline"></span>{{t37}}</span>
</div>
</div>
</div>
<!-- Card 2 -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm hover:shadow transition-all cursor-pointer group" onclick="highlightCard(this)">
<div class="flex items-center justify-between gap-1 mb-2">
<span class="font-code-md text-label-sm text-secondary font-bold tracking-tight">{{t38}}</span>
<span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">{{t39}}</span>
</div>
<p class="font-headline-sm text-label-lg text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-3">{{t40}}</p>
<div class="flex flex-col gap-1.5 pt-2 bg-surface-container-low/60 -mx-space-md -mb-space-md p-space-sm rounded-b-lg">
<div class="flex items-center gap-1.5 text-on-surface-variant">
<span class="material-symbols-outlined text-[15px] text-outline">{{t41}}</span>
<span class="font-label-sm text-label-sm truncate">{{t42}}</span>
</div>
<div class="flex items-center justify-between text-on-surface-variant">
<span class="flex items-center gap-1 font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[15px] text-outline">{{t43}}</span>
<span>{{t44}}</span>
</span>
<span class="flex items-center gap-1 text-[11px] font-label-sm text-outline">
<span class="w-1.5 h-1.5 rounded-full bg-outline"></span>{{t45}}</span>
</div>
</div>
</div>
<!-- Card Placeholder for Density -->
<div class="p-3 bg-surface-container-lowest/60 rounded-lg text-center flex flex-col items-center justify-center py-4">
<span class="material-symbols-outlined text-outline text-[20px] mb-1">{{t46}}</span>
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">{{t47}}</span>
</div>
</div>
</div>
<!-- Column 2: In-Progress / Under Review (Featured Column) -->
<div class="flex flex-col bg-surface-container-low rounded-xl p-space-sm shadow-sm min-h-[680px]">
<!-- Column Header -->
<div class="flex items-center justify-between pb-2 mb-2 px-1">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span class="font-label-lg text-label-lg text-on-surface">{{t48}}</span>
</div>
<span class="font-code-md text-code-md bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-semibold">{{t49}}</span>
</div>
<!-- Card List -->
<div class="flex flex-col gap-space-sm">
<!-- Active Card (DIR-2024-104) -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-md cursor-pointer transition-all bg-gradient-to-r from-primary-container/10 via-transparent to-transparent" id="active-directive-card" onclick="highlightCard(this)">
<div class="flex items-center justify-between gap-1 mb-2">
<span class="font-code-md text-label-sm text-primary font-bold tracking-tight">{{t50}}</span>
<span class="font-label-sm text-label-sm text-on-secondary-container bg-secondary-container px-2 py-0.5 rounded font-semibold">{{t51}}</span>
</div>
<p class="font-headline-sm text-label-lg text-on-surface font-semibold line-clamp-2 mb-2">{{t52}}</p>
<!-- Progress Bar Representation -->
<div class="mb-3">
<div class="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant mb-1">
<span>{{t53}}</span>
<span class="font-code-md font-semibold text-secondary">{{t54}}</span>
</div>
<div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-secondary rounded-full" style="width: 65%;"></div>
</div>
</div>
<div class="flex flex-col gap-1.5 pt-2 bg-surface-container-low/70 -mx-space-md -mb-space-md p-space-sm rounded-b-lg">
<div class="flex items-center gap-1.5 text-on-surface-variant">
<span class="material-symbols-outlined text-[15px] text-outline">{{t55}}</span>
<span class="font-label-sm text-label-sm truncate">{{t56}}</span>
</div>
<div class="flex items-center justify-between text-on-surface-variant">
<span class="flex items-center gap-1 font-label-sm text-label-sm text-secondary font-medium">
<span class="material-symbols-outlined text-[15px]">{{t57}}</span>
<span>{{t58}}</span>
</span>
<span class="flex items-center gap-1 text-[11px] font-label-sm text-secondary font-semibold">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>{{t59}}</span>
</div>
</div>
</div>
<!-- Card 2 -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm hover:shadow transition-all cursor-pointer group" onclick="highlightCard(this)">
<div class="flex items-center justify-between gap-1 mb-2">
<span class="font-code-md text-label-sm text-secondary font-bold tracking-tight">{{t60}}</span>
<span class="font-label-sm text-label-sm text-on-secondary-container bg-secondary-fixed/50 px-1.5 py-0.5 rounded font-semibold">{{t61}}</span>
</div>
<p class="font-headline-sm text-label-lg text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-3">{{t62}}</p>
<div class="flex flex-col gap-1.5 pt-2 bg-surface-container-low/60 -mx-space-md -mb-space-md p-space-sm rounded-b-lg">
<div class="flex items-center gap-1.5 text-on-surface-variant">
<span class="material-symbols-outlined text-[15px] text-outline">{{t63}}</span>
<span class="font-label-sm text-label-sm truncate">{{t64}}</span>
</div>
<div class="flex items-center justify-between text-on-surface-variant">
<span class="flex items-center gap-1 font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[15px] text-outline">{{t65}}</span>
<span>{{t66}}</span>
</span>
<span class="flex items-center gap-1 text-[11px] font-label-sm text-secondary">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>{{t67}}</span>
</div>
</div>
</div>
<div class="p-3 bg-surface-container-lowest/60 rounded-lg text-center flex flex-col items-center justify-center py-4">
<span class="material-symbols-outlined text-outline text-[20px] mb-1">{{t68}}</span>
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">{{t69}}</span>
</div>
</div>
</div>
<!-- Column 3: Completed & Dispatched -->
<div class="flex flex-col bg-surface-container-low rounded-xl p-space-sm shadow-sm min-h-[680px]">
<!-- Column Header -->
<div class="flex items-center justify-between pb-2 mb-2 px-1">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
<span class="font-label-lg text-label-lg text-on-surface">{{t70}}</span>
</div>
<span class="font-code-md text-code-md bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded font-semibold">{{t71}}</span>
</div>
<!-- Card List -->
<div class="flex flex-col gap-space-sm">
<!-- Card 1 -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm hover:shadow transition-all cursor-pointer group" onclick="highlightCard(this)">
<div class="flex items-center justify-between gap-1 mb-2">
<span class="font-code-md text-label-sm text-on-surface-variant font-bold tracking-tight">{{t72}}</span>
<span class="font-label-sm text-label-sm text-on-primary-fixed-variant bg-primary-fixed px-1.5 py-0.5 rounded font-medium">{{t73}}</span>
</div>
<p class="font-headline-sm text-label-lg text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-3">{{t74}}</p>
<div class="flex flex-col gap-1.5 pt-2 bg-surface-container-low/60 -mx-space-md -mb-space-md p-space-sm rounded-b-lg">
<div class="flex items-center gap-1.5 text-on-surface-variant">
<span class="material-symbols-outlined text-[15px] text-primary-container">{{t75}}</span>
<span class="font-label-sm text-label-sm truncate">{{t76}}</span>
</div>
<div class="flex items-center justify-between text-on-surface-variant">
<span class="flex items-center gap-1 font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[15px] text-outline">{{t77}}</span>
<span>{{t78}}</span>
</span>
<span class="flex items-center gap-1 text-[11px] font-label-sm text-primary-container font-semibold">{{t79}}</span>
</div>
</div>
</div>
<!-- Card 2 -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm hover:shadow transition-all cursor-pointer group" onclick="highlightCard(this)">
<div class="flex items-center justify-between gap-1 mb-2">
<span class="font-code-md text-label-sm text-on-surface-variant font-bold tracking-tight">{{t80}}</span>
<span class="font-label-sm text-label-sm text-on-primary-fixed-variant bg-primary-fixed px-1.5 py-0.5 rounded font-medium">{{t81}}</span>
</div>
<p class="font-headline-sm text-label-lg text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-3">{{t82}}</p>
<div class="flex flex-col gap-1.5 pt-2 bg-surface-container-low/60 -mx-space-md -mb-space-md p-space-sm rounded-b-lg">
<div class="flex items-center gap-1.5 text-on-surface-variant">
<span class="material-symbols-outlined text-[15px] text-primary-container">{{t83}}</span>
<span class="font-label-sm text-label-sm truncate">{{t84}}</span>
</div>
<div class="flex items-center justify-between text-on-surface-variant">
<span class="flex items-center gap-1 font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[15px] text-outline">{{t85}}</span>
<span>{{t86}}</span>
</span>
<span class="flex items-center gap-1 text-[11px] font-label-sm text-primary-container font-semibold">{{t87}}</span>
</div>
</div>
</div>
<div class="p-3 bg-surface-container-lowest/60 rounded-lg text-center flex flex-col items-center justify-center py-4">
<span class="material-symbols-outlined text-primary-container text-[20px] mb-1">{{t88}}</span>
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">{{t89}}</span>
</div>
</div>
</div>
<!-- Column 4: Overdue / Non-Compliant -->
<div class="flex flex-col bg-surface-container-low rounded-xl p-space-sm shadow-sm min-h-[680px]">
<!-- Column Header -->
<div class="flex items-center justify-between pb-2 mb-2 px-1">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-error"></span>
<span class="font-label-lg text-label-lg text-error">{{t90}}</span>
</div>
<span class="font-code-md text-code-md bg-error-container text-on-error-container px-2 py-0.5 rounded font-semibold">{{t91}}</span>
</div>
<!-- Card List -->
<div class="flex flex-col gap-space-sm">
<!-- Card 1 -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm hover:shadow transition-all cursor-pointer group bg-gradient-to-br from-error-container/20 to-transparent" onclick="highlightCard(this)">
<div class="flex items-center justify-between gap-1 mb-2">
<span class="font-code-md text-label-sm text-error font-bold tracking-tight">{{t92}}</span>
<span class="font-label-sm text-label-sm text-on-error-container bg-error-container px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{{t93}}</span>
</div>
<p class="font-headline-sm text-label-lg text-on-surface group-hover:text-error transition-colors line-clamp-2 mb-3">{{t94}}</p>
<div class="flex flex-col gap-1.5 pt-2 bg-error-container/10 -mx-space-md -mb-space-md p-space-sm rounded-b-lg">
<div class="flex items-center gap-1.5 text-on-surface-variant">
<span class="material-symbols-outlined text-[15px] text-error">{{t95}}</span>
<span class="font-label-sm text-label-sm truncate">{{t96}}</span>
</div>
<div class="flex items-center justify-between text-on-surface-variant">
<span class="flex items-center gap-1 font-label-sm text-label-sm text-error font-semibold">
<span class="material-symbols-outlined text-[15px]">{{t97}}</span>
<span>{{t98}}</span>
</span>
<span class="flex items-center gap-1 text-[11px] font-label-sm text-error font-bold">{{t99}}</span>
</div>
</div>
</div>
<!-- Card 2 -->
<div class="bg-surface-container-lowest p-space-md rounded-lg shadow-sm hover:shadow transition-all cursor-pointer group" onclick="highlightCard(this)">
<div class="flex items-center justify-between gap-1 mb-2">
<span class="font-code-md text-label-sm text-error font-bold tracking-tight">{{t100}}</span>
<span class="font-label-sm text-label-sm text-on-error-container bg-error-container px-1.5 py-0.5 rounded font-medium">{{t101}}</span>
</div>
<p class="font-headline-sm text-label-lg text-on-surface group-hover:text-error transition-colors line-clamp-2 mb-3">{{t102}}</p>
<div class="flex flex-col gap-1.5 pt-2 bg-error-container/10 -mx-space-md -mb-space-md p-space-sm rounded-b-lg">
<div class="flex items-center gap-1.5 text-on-surface-variant">
<span class="material-symbols-outlined text-[15px] text-outline">{{t103}}</span>
<span class="font-label-sm text-label-sm truncate">{{t104}}</span>
</div>
<div class="flex items-center justify-between text-on-surface-variant">
<span class="flex items-center gap-1 font-label-sm text-label-sm text-error">
<span class="material-symbols-outlined text-[15px]">{{t105}}</span>
<span>{{t106}}</span>
</span>
<span class="flex items-center gap-1 text-[11px] font-label-sm text-error font-semibold">{{t107}}</span>
</div>
</div>
</div>
<!-- Summary Card of Strictures -->
<div class="p-space-md bg-surface-container-lowest rounded-lg text-left shadow-sm">
<span class="font-label-sm text-label-sm text-error font-bold uppercase tracking-wider block mb-1">{{t108}}</span>
<p class="font-body-sm text-[11px] text-on-surface-variant leading-relaxed">{{t109}}</p>
</div>
</div>
</div>
</div>
</div>
<!-- Right Side Inspection Dossier Drawer (Card #DIR-2024-104 Focus) -->
<div class="col-span-12 xl:col-span-4 bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-md transition-all" id="directive-drawer">
<!-- Drawer Header Bar -->
<div class="flex items-center justify-between pb-space-sm bg-surface-container-low -mx-space-lg -mt-space-lg p-space-md rounded-t-xl">
<div class="flex items-center gap-2">
<span class="p-1 rounded bg-primary-container text-on-primary">
<span class="material-symbols-outlined text-[18px]">{{t110}}</span>
</span>
<div class="flex flex-col leading-tight">
<span class="font-code-md text-label-sm text-primary font-bold">{{t111}}</span>
<span class="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">{{t112}}</span>
</div>
</div>
<div class="flex items-center gap-1">
<span class="px-2 py-0.5 rounded text-on-secondary-container bg-secondary-container font-label-sm text-[10px] font-bold uppercase">{{t113}}</span>
<button class="p-1 text-outline hover:text-on-surface transition-colors" onclick="toggleDrawerCollapse()" title="{{a3}}" type="button">
<span class="material-symbols-outlined text-[20px]">{{t114}}</span>
</button>
</div>
</div>
<!-- Subject & Metadata Section -->
<div class="flex flex-col gap-space-xs pt-1">
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">{{t115}}</span>
<h2 class="font-headline-md text-headline-md text-on-surface leading-snug">{{t116}}</h2>
<div class="grid grid-cols-2 gap-space-sm pt-2 bg-surface-container-low p-space-sm rounded-lg mt-1">
<div>
<span class="font-label-sm text-[10px] text-outline uppercase tracking-wider block">{{t117}}</span>
<span class="font-code-md text-code-md font-semibold text-on-surface">{{t118}}</span>
</div>
<div>
<span class="font-label-sm text-[10px] text-outline uppercase tracking-wider block">{{t119}}</span>
<span class="font-code-md text-code-md font-semibold text-secondary">{{t120}}</span>
</div>
<div class="col-span-2">
<span class="font-label-sm text-[10px] text-outline uppercase tracking-wider block">{{t121}}</span>
<span class="font-label-md text-label-md font-medium text-on-surface">{{t122}}</span>
</div>
</div>
</div>
<!-- Full Directive Text -->
<div class="flex flex-col gap-1.5">
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">{{t123}}</span>
<div class="p-space-md bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface leading-relaxed shadow-sm">{{t124}}</div>
</div>
<!-- Linked Source File Document Box -->
<div class="flex items-center justify-between p-3 bg-surface-container rounded-lg">
<div class="flex items-center gap-space-sm min-w-0">
<span class="material-symbols-outlined text-secondary text-[26px]">{{t125}}</span>
<div class="flex flex-col min-w-0">
<span class="font-label-md text-label-md text-on-surface font-semibold truncate">{{t126}}</span>
<span class="font-code-md text-[10px] text-outline">{{t127}}</span>
</div>
</div>
<button class="px-2.5 py-1 bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold rounded shadow-sm hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1 shrink-0" type="button">
<span class="material-symbols-outlined text-[14px]">{{t128}}</span>
<span>{{t129}}</span>
</button>
</div>
<!-- AI Compliance Assessment Engine Box -->
<div class="p-space-md bg-tertiary-container/10 rounded-lg flex flex-col gap-2">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-primary-container text-[18px]">{{t130}}</span>
<span class="font-label-sm text-label-sm text-primary-container font-bold uppercase tracking-wider">{{t131}}</span>
</div>
<span class="font-code-md text-[10px] bg-tertiary-container text-on-primary px-1.5 py-0.2 rounded font-semibold">{{t132}}</span>
</div>
<p class="font-body-sm text-[12px] text-on-surface leading-relaxed">{{t133}}<strong class="font-semibold text-primary">{{t134}}</strong>{{t135}}<span class="font-medium text-secondary">{{t136}}</span>{{t137}}</p>
<div class="p-2 bg-surface-container-lowest rounded text-[11px] font-label-sm text-on-surface-variant flex items-center gap-1.5">
<span class="material-symbols-outlined text-secondary text-[16px]">{{t138}}</span>
<span>{{t139}}</span>
</div>
</div>
<!-- Compliance Evidence & Upload Zone -->
<div class="flex flex-col gap-2">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">{{t140}}</span>
<span class="font-label-sm text-label-sm text-primary font-semibold">{{t141}}</span>
</div>
<div class="flex flex-col gap-1.5">
<!-- Evidence Item 1 -->
<div class="flex items-center justify-between p-2 rounded bg-surface-container-low hover:bg-surface-container transition-colors">
<div class="flex items-center gap-2 min-w-0">
<span class="material-symbols-outlined text-[16px] text-outline">{{t142}}</span>
<span class="font-code-md text-label-sm text-on-surface truncate">{{t143}}</span>
</div>
<span class="material-symbols-outlined text-[16px] text-primary-container shrink-0">{{t144}}</span>
</div>
<!-- Evidence Item 2 -->
<div class="flex items-center justify-between p-2 rounded bg-surface-container-low hover:bg-surface-container transition-colors">
<div class="flex items-center gap-2 min-w-0">
<span class="material-symbols-outlined text-[16px] text-outline">{{t145}}</span>
<span class="font-code-md text-label-sm text-on-surface truncate">{{t146}}</span>
</div>
<span class="material-symbols-outlined text-[16px] text-primary-container shrink-0">{{t147}}</span>
</div>
</div>
<!-- Drag-Drop Upload Area -->
<div class="p-space-md bg-surface-container-low/70 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container transition-all">
<span class="material-symbols-outlined text-outline text-[22px] mb-1">{{t148}}</span>
<span class="font-label-sm text-label-sm text-on-surface font-semibold">{{t149}}</span>
<span class="font-body-sm text-[10px] text-outline mt-0.5">{{t150}}</span>
</div>
</div>
<!-- Action Panel Buttons -->
<div class="flex flex-col gap-2 pt-2">
<button class="w-full py-2.5 px-4 bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow hover:bg-tertiary-container transition-colors flex items-center justify-center gap-2" type="button">
<span class="material-symbols-outlined text-[18px]">{{t151}}</span>
<span>{{t152}}</span>
</button>
<div class="grid grid-cols-2 gap-2">
<button class="py-2 px-3 bg-surface-container text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1" type="button">
<span class="material-symbols-outlined text-[16px] text-primary-container">{{t153}}</span>
<span>{{t154}}</span>
</button>
<button class="py-2 px-3 bg-surface-container-low text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-container transition-colors flex items-center justify-center gap-1" onclick="closeDrawer()" type="button">
<span class="material-symbols-outlined text-[16px]">{{t155}}</span>
<span>{{t156}}</span>
</button>
</div>
</div>
</div>
</div>
<!-- Persistent Interactive AI Floating Trigger in Bottom Right -->
<div class="fixed bottom-6 right-6 z-50">
<button class="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-lg hover:bg-tertiary-container transition-all focus:outline-none ring-2 ring-secondary-fixed cursor-pointer" id="floating-ai-btn" onclick="toggleMainAIDrawer()" title="{{a4}}" type="button">
<span class="material-symbols-outlined text-[24px]">{{t157}}</span>
</button>
</div>
</div>
</main>`;
