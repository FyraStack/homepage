import { h as head, c as ensure_array_like, d as attr, f as escape_html } from './index-D0qXBiJg.js';

function Nav($$renderer) {
  const navMenuItems = [
    { label: "VPS", href: "#" },
    { label: "Colocation", href: "#" },
    { label: "About", href: "#" }
  ];
  $$renderer.push(`<header class="bg-gray-f-900"><nav aria-label="Global" class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"><div class="flex flex-1"><div class="hidden lg:flex lg:gap-x-8"><!--[-->`);
  const each_array = ensure_array_like(navMenuItems);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$renderer.push(`<a${attr("href", item.href)} class="text-sm/6 font-semibold hover:text-gray-f-100 transition-all duration-200">${escape_html(item.label)}</a>`);
  }
  $$renderer.push(`<!--]--></div> <div class="flex lg:hidden"><button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-white"><span class="sr-only">Open main menu</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6"><path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div></div> <a href="/" class="flex items-center gap-2.5 -m-1.5 p-1.5"><img src="/logo.svg" alt="Fyra Stack logo" class="h-8 w-8"/> <span class="text-2xl font-semibold">Stack</span></a> <div class="flex flex-1 justify-end"><a href="#" class="text-sm/6 font-semibold hover:text-gray-f-100 transition-all duration-200">Sign in</a></div></nav></header> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
}
function _layout($$renderer, $$props) {
  const { children } = $$props;
  head("12qhfyh", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Fyra Stack</title>`);
    });
  });
  Nav($$renderer);
  $$renderer.push(`<!----> <div class="flex min-h-screen flex-col">`);
  children($$renderer);
  $$renderer.push(`<!----></div>`);
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-CmHuKds5.js.map
