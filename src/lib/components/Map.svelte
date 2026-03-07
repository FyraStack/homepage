<script lang="ts">
	import { onMount } from 'svelte';
	import type { Map, LatLngTuple } from 'leaflet';

	let map: Map;

	const datacenters: { location: LatLngTuple; name: string; details: string }[] = [
		{ location: [44.9537, -93.0900], name: 'US-MDW-MSP',  details: 'Minnesota' },
		{ location: [41.8781, -87.6298], name: 'US-MDW-CHI',  details: 'Illinois' },
	];

	const futureDatacenters: { location: LatLngTuple; name: string; details: string }[] = [];

	onMount(async () => {
		if (typeof window === 'undefined') return;

		const L = await import('leaflet');
		await import('leaflet/dist/leaflet.css');

		const getSettings = (): { center: LatLngTuple; zoom: number } => {
			if (window.innerWidth < 640)  return { center: [43.4, -90.8], zoom: 4 };
			return                               { center: [43.4, -90.8], zoom: 5 };
		};

		const { center, zoom } = getSettings();

		map = L.map('dc-map', { scrollWheelZoom: false }).setView(center, zoom);

		L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			maxZoom: 19,
		}).addTo(map);

		const makeIcon = (cls: string) => L.divIcon({
			className: cls,
			html: `<div class="${cls}-dot"></div>`,
			iconSize: [30, 30],
			iconAnchor: [15, 15],
		});

		const activeIcon = makeIcon('dc-active');
		const futureIcon = makeIcon('dc-future');

		datacenters.forEach(({ location, name, details }) => {
			L.marker(location, { icon: activeIcon })
				.addTo(map)
				.bindPopup(`<strong>${name}</strong><br>${details}`);
		});

		futureDatacenters.forEach(({ location, name, details }) => {
			L.marker(location, { icon: futureIcon })
				.addTo(map)
				.bindPopup(`<strong>${name}</strong><br>${details}`);
		});
	});
</script>

<div class="relative overflow-hidden rounded-xs border border-fyra-gray-700">
	<div class="absolute top-4 left-4 z-20">
		<p class="text-lg font-semibold text-white">Locations</p>
	</div>
	<div id="dc-map" class="w-full min-h-80 md:min-h-[30rem] z-10"></div>
</div>

<style>
	:global(#dc-map) { background: #050505; }

	:global(.dc-active), :global(.dc-future) {
		background: transparent;
		border: none;
	}

	:global(.dc-active-dot) {
		margin: 8px;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: #EF6351;
		border: 2px solid #fff;
	}

	:global(.dc-future-dot) {
		margin: 8px;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: #1C1C1C;
		border: 2px solid #fff;
	}

	:global(.leaflet-popup-content-wrapper),
	:global(.leaflet-popup-tip) {
		background: #121212 !important;
		color: #fff;
		border-radius: 2px !important;
		border: 1px solid #1C1C1C;
	}

	:global(.leaflet-popup-content) { color: #fff; }

	:global(.leaflet-control-attribution) {
		background: #121212 !important;
		color: #A3A3A3 !important;
		border-top: 1px solid #1C1C1C;
		border-left: 1px solid #1C1C1C;
		padding: 2px 6px !important;
	}

	:global(.leaflet-top) {
		top: auto !important;
		bottom: 0 !important;
		margin-bottom: 10px;
	}

	:global(.leaflet-control-zoom) { border: 1px solid #1C1C1C !important; }

	:global(.leaflet-control-zoom-in),
	:global(.leaflet-control-zoom-out) {
		background: #121212 !important;
		color: #A3A3A3 !important;
		border: 1px solid #1C1C1C !important;
	}

	:global(.leaflet-container) {
		font-family: 'Satoshi-Variable', sans-serif !important;
	}
</style>
