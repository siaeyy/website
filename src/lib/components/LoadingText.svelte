<script lang="ts">
  import { onDestroy } from "svelte";

	let dots = '';
	const interval = setInterval(() => {
		dots = dots.length < 3 ? dots + '.' : '';
	}, 250);

	onDestroy(() => clearInterval(interval));
</script>

<span>Loading{dots}</span>
