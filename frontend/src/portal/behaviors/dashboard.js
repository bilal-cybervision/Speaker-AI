export function mount() {
  const el = document.createElement("script");
  el.dataset.pageBehavior = "dashboard";
  el.textContent = "(function() {\n    const drawerContext = document.querySelector('#ai-drawer p.font-body-sm');\n    if (drawerContext) {\n      drawerContext.textContent = 'Overview Context: 7 pending files require your constitutional endorsement before 04:00 PM session adjournment.';\n    }\n  })();";
  document.body.appendChild(el);
}
