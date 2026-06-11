<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<section class="border-b border-border">
	<div class="grid grid-cols-1 divide-y divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
		<!-- Left: service blocks -->
		<div class="grid grid-cols-1 gap-px bg-muted sm:grid-cols-2">
			<!-- VPS -->
			<a
				href={resolve('/services/vps')}
				class="group flex flex-col bg-background p-8 transition-colors duration-100 hover:bg-muted/60"
			>
				<p class="text-lg font-semibold text-foreground">VPS</p>
				<p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">
					Virtual Private Servers from $5/mo. SAS3, 20 Gbps, no games.
				</p>
				<p
					class="mt-auto pt-6 text-sm font-medium text-primary transition-colors duration-100 group-hover:text-primary/80"
				>
					View plans <span aria-hidden="true">→</span>
				</p>
			</a>

			<!-- Colocation -->
			<a
				href={resolve('/services/colocation')}
				class="group flex flex-col bg-background p-8 transition-colors duration-100 hover:bg-muted/60"
			>
				<p class="text-lg font-semibold text-foreground">Colocation</p>
				<p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">
					Your hardware, our facility. Carrier-neutral space in the Midwest.
				</p>
				<p
					class="mt-auto pt-6 text-sm font-medium text-primary transition-colors duration-100 group-hover:text-primary/80"
				>
					View plans <span aria-hidden="true">→</span>
				</p>
			</a>
		</div>

		<!-- Right: headline -->
		<div class="flex flex-col justify-center px-8 py-12 lg:px-10 lg:py-16">
			<h2 class="text-4xl leading-tight font-semibold tracking-tight text-foreground lg:text-4xl">
				Everything you need to run your stack.
			</h2>
			<p class="mt-6 text-base leading-relaxed text-muted-foreground">
				From managed VPS to bare-metal colocation, we've got infrastructure for every scale.
			</p>
		</div>
	</div>
</section>
