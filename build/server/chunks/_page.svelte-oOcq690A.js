import { h as head, c as ensure_array_like, ac as attr_class, ad as stringify, f as escape_html, ae as attr_style } from './index-D0qXBiJg.js';

function _page($$renderer) {
  let vpsList = [
    {
      id: "vps-001",
      name: "web-prod-01",
      status: "online",
      cpu: 45,
      ram: 68,
      storage: 52,
      uptime: "99.98%",
      location: "Midwest, USA",
      ip: "203.0.113.42"
    },
    {
      id: "vps-002",
      name: "db-master-01",
      status: "online",
      cpu: 78,
      ram: 92,
      storage: 87,
      uptime: "99.99%",
      location: "Midwest, USA",
      ip: "203.0.113.43"
    },
    {
      id: "vps-003",
      name: "api-gateway-01",
      status: "online",
      cpu: 32,
      ram: 45,
      storage: 38,
      uptime: "100.00%",
      location: "Midwest, USA",
      ip: "203.0.113.44"
    }
  ];
  let activeSidebarItem = "servers";
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: "◆" },
    { id: "servers", label: "Servers", icon: "⊞" },
    { id: "network", label: "Network", icon: "◇" },
    { id: "storage", label: "Storage", icon: "▯" },
    { id: "billing", label: "Billing", icon: "◈" },
    { id: "settings", label: "Settings", icon: "⚙" },
    { id: "support", label: "Support", icon: "◉" }
  ];
  function getUsageColor(usage) {
    if (usage > 80) return "bg-[#EF6351]";
    if (usage > 60) return "bg-[#F28273]";
    return "bg-[#4C4846]";
  }
  head("1du1zi4", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Dashboard - Fyra Stack</title>`);
    });
  });
  $$renderer.push(`<div class="flex h-screen bg-[#060403] font-sans"><aside class="w-72 border-r-2 border-[#1E1B1A] bg-[#100D0C] flex flex-col"><div class="p-8 border-b border-[#1E1B1A]"><div class="flex items-center gap-3"><img src="/logo.svg" alt="Fyra Stack" class="h-9 w-9"/> <span class="font-bold text-[#E9E8E7] text-xl tracking-wide">STACK</span></div> <p class="text-xs font-mono text-[#7A7674] mt-3">Infrastructure Control</p></div> <nav class="flex-1 p-4 space-y-2"><!--[-->`);
  const each_array = ensure_array_like(sidebarItems);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$renderer.push(`<button${attr_class(`w-full flex items-center gap-4 px-5 py-3.5 text-left text-sm font-medium transition-all duration-200 ${stringify(activeSidebarItem === item.id ? "bg-[#1E1B1A] text-[#E9E8E7] border-l-2 border-[#EF6351]" : "text-[#A5A2A0] hover:bg-[#191614] hover:text-[#D2D0CF]")}`)}><span class="text-base opacity-70">${escape_html(item.icon)}</span> <span class="text-xs tracking-wide">${escape_html(item.label)}</span></button>`);
  }
  $$renderer.push(`<!--]--></nav> <div class="p-4 border-t border-[#1E1B1A] space-y-3"><div class="px-4 py-3 text-xs text-[#7A7674] bg-[#191614] border border-[#1E1B1A] space-y-2"><p class="font-mono text-[#A5A2A0]">STATUS</p> <p class="font-mono text-[#E9E8E7] font-bold">99.98%</p> <p class="text-[10px] text-[#7A7674]">uptime this month</p></div></div></aside> <main class="flex-1 overflow-auto flex flex-col"><div class="border-b-2 border-[#1E1B1A] bg-[#100D0C] px-10 py-8 shrink-0"><div class="flex items-start justify-between"><div><h1 class="text-4xl font-bold text-[#E9E8E7] tracking-tight">`);
  {
    $$renderer.push("<!--[-->");
    $$renderer.push(`SERVERS`);
  }
  $$renderer.push(`<!--]--></h1> <p class="text-[#7A7674] text-sm mt-2 font-mono">`);
  {
    $$renderer.push("<!--[-->");
    $$renderer.push(`3 instances • all systems operational`);
  }
  $$renderer.push(`<!--]--></p></div> <div class="text-right"><p class="text-[#7A7674] text-xs font-mono">Last synced</p> <p class="text-[#E9E8E7] font-mono text-sm font-bold mt-1">just now</p></div></div></div> <div class="flex-1 overflow-auto p-10">`);
  {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="space-y-4"><!--[-->`);
    const each_array_1 = ensure_array_like(vpsList);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let vps = each_array_1[$$index_1];
      $$renderer.push(`<div role="button" tabindex="0" class="group border-2 border-[#1E1B1A] bg-[#191614] hover:bg-[#1E1B1A] hover:border-[#EF6351]/60 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-[#EF6351]/10"><div class="grid grid-cols-1 lg:grid-cols-6 gap-6"><div class="lg:col-span-2"><div class="flex items-center gap-3 mb-4"><div class="flex items-center justify-center w-4 h-4"><div class="w-2 h-2 bg-[#4C4846] animate-pulse rounded-full"></div></div> <h3 class="font-mono font-bold text-[#E9E8E7] text-base">${escape_html(vps.name)}</h3></div> <div class="space-y-2"><p class="text-xs font-mono text-[#7A7674] truncate"><span class="text-[#A5A2A0]">IP:</span> ${escape_html(vps.ip)}</p> <p class="text-xs font-mono text-[#7A7674]"><span class="text-[#A5A2A0]">Location:</span> ${escape_html(vps.location)}</p> <p class="text-xs font-mono text-[#7A7674]"><span class="text-[#A5A2A0]">Status:</span> <span class="text-[#4C4846]">${escape_html(vps.status)}</span></p></div></div> <div><p class="text-xs font-mono text-[#7A7674] mb-3 uppercase tracking-wide">CPU</p> <div class="bg-[#0D0A09] border border-[#1E1B1A] h-8 mb-2 overflow-hidden"><div${attr_class(`h-full ${stringify(getUsageColor(vps.cpu))} transition-all duration-300`)}${attr_style(`width: ${stringify(vps.cpu)}%`)}></div></div> <p class="text-sm font-mono font-bold text-[#E9E8E7]">${escape_html(vps.cpu)}%</p></div> <div><p class="text-xs font-mono text-[#7A7674] mb-3 uppercase tracking-wide">RAM</p> <div class="bg-[#0D0A09] border border-[#1E1B1A] h-8 mb-2 overflow-hidden"><div${attr_class(`h-full ${stringify(getUsageColor(vps.ram))} transition-all duration-300`)}${attr_style(`width: ${stringify(vps.ram)}%`)}></div></div> <p class="text-sm font-mono font-bold text-[#E9E8E7]">${escape_html(vps.ram)}%</p></div> <div><p class="text-xs font-mono text-[#7A7674] mb-3 uppercase tracking-wide">Storage</p> <div class="bg-[#0D0A09] border border-[#1E1B1A] h-8 mb-2 overflow-hidden"><div${attr_class(`h-full ${stringify(getUsageColor(vps.storage))} transition-all duration-300`)}${attr_style(`width: ${stringify(vps.storage)}%`)}></div></div> <p class="text-sm font-mono font-bold text-[#E9E8E7]">${escape_html(vps.storage)}%</p></div> <div><p class="text-xs font-mono text-[#7A7674] mb-3 uppercase tracking-wide">Uptime</p> <p class="text-2xl font-mono font-bold text-[#E9E8E7]">${escape_html(vps.uptime)}</p> <p class="text-xs font-mono text-[#7A7674] mt-2">SLA Compliant</p></div></div></div>`);
    }
    $$renderer.push(`<!--]--></div>`);
  }
  $$renderer.push(`<!--]--></div></main></div> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-oOcq690A.js.map
