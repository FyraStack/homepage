const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","assets/.DS_Store","assets/about.webp","assets/chisel-operator-pattern.svg","assets/consulting.webp","assets/map.svg","assets/minnesota.png","assets/people/aikoyori.webp","assets/people/cappy.webp","assets/people/infinitebash.webp","assets/people/jade.webp","assets/people/june.webp","assets/people/kat.webp","assets/people/lains.webp","assets/people/lleyton.webp","assets/people/mado.webp","assets/people/matilde.webp","assets/people/matteo.webp","assets/people/mo.webp","assets/people/mtr.webp","assets/people/owen.webp","assets/people/raboneko.webp","assets/people/riley.webp","assets/people/trobo.webp","assets/skiff-desktop-pattern.svg","assets/stack-pattern.svg","assets/submarine-pattern.svg","assets/suzyqboard-pattern.svg","assets/tau-pattern.svg","assets/terra-pattern.svg","assets/um-pattern.svg","cubes.webp","dummy-vibecode-screenshot.png","favicon.svg","fonts/Satoshi-Variable.ttf","fonts/Satoshi-Variable.woff","fonts/Satoshi-Variable.woff2","fonts/Satoshi-VariableItalic.ttf","fonts/Satoshi-VariableItalic.woff","fonts/Satoshi-VariableItalic.woff2","logo-text.png","logo-text.svg","logo.png","logo.svg","minnesota.png","stack-pattern.svg"]),
	mimeTypes: {".webp":"image/webp",".svg":"image/svg+xml",".png":"image/png",".ttf":"font/ttf",".woff":"font/woff",".woff2":"font/woff2"},
	_: {
		client: {start:"_app/immutable/entry/start.Cz1KjsdX.js",app:"_app/immutable/entry/app.gTmbeI24.js",imports:["_app/immutable/entry/start.Cz1KjsdX.js","_app/immutable/chunks/D0tnclbg.js","_app/immutable/chunks/DjIVQBe-.js","_app/immutable/chunks/3jff29J5.js","_app/immutable/entry/app.gTmbeI24.js","_app/immutable/chunks/DjIVQBe-.js","_app/immutable/chunks/CxYqM0FP.js","_app/immutable/chunks/TJJ7mNY4.js","_app/immutable/chunks/3jff29J5.js","_app/immutable/chunks/CWfMkOH4.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-CxYHw7AD.js')),
			__memo(() => import('./chunks/1-DOAqTJow.js')),
			__memo(() => import('./chunks/2-D0D_R9z-.js')),
			__memo(() => import('./chunks/3-LeRkgZeO.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/demo",
				pattern: /^\/demo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
