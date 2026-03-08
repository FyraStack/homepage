
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/about" | "/api" | "/api/prereserve" | "/docs" | "/mockup" | "/pricing" | "/services" | "/services/colocation" | "/services/vps";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/about": Record<string, never>;
			"/api": Record<string, never>;
			"/api/prereserve": Record<string, never>;
			"/docs": Record<string, never>;
			"/mockup": Record<string, never>;
			"/pricing": Record<string, never>;
			"/services": Record<string, never>;
			"/services/colocation": Record<string, never>;
			"/services/vps": Record<string, never>
		};
		Pathname(): "/" | "/about" | "/api/prereserve" | "/docs" | "/mockup" | "/pricing" | "/services/colocation" | "/services/vps";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.DS_Store" | "/assets/.DS_Store" | "/assets/about.webp" | "/assets/chisel-operator-pattern.svg" | "/assets/consulting.webp" | "/assets/conway.gif" | "/assets/map.svg" | "/assets/minnesota.png" | "/assets/people/aikoyori.webp" | "/assets/people/cappy.webp" | "/assets/people/infinitebash.webp" | "/assets/people/jade.webp" | "/assets/people/june.webp" | "/assets/people/kat.webp" | "/assets/people/lains.webp" | "/assets/people/lleyton.webp" | "/assets/people/mado.webp" | "/assets/people/matilde.webp" | "/assets/people/matteo.webp" | "/assets/people/mo.webp" | "/assets/people/mtr.webp" | "/assets/people/owen.webp" | "/assets/people/raboneko.webp" | "/assets/people/riley.webp" | "/assets/people/trobo.webp" | "/assets/server-rack.png" | "/assets/skiff-desktop-pattern.svg" | "/assets/stack-pattern.svg" | "/assets/submarine-pattern.svg" | "/assets/suzyqboard-pattern.svg" | "/assets/tau-pattern.svg" | "/assets/terra-pattern.svg" | "/assets/um-pattern.svg" | "/cubes.webp" | "/dummy-vibecode-screenshot.png" | "/favicon.svg" | "/fonts/Satoshi-Variable.ttf" | "/fonts/Satoshi-Variable.woff" | "/fonts/Satoshi-Variable.woff2" | "/fonts/Satoshi-VariableItalic.ttf" | "/fonts/Satoshi-VariableItalic.woff" | "/fonts/Satoshi-VariableItalic.woff2" | "/logo-text.png" | "/logo-text.svg" | "/logo.png" | "/logo.svg" | "/minnesota.png" | "/stack-pattern.svg" | string & {};
	}
}