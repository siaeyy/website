<script module lang="ts">
    import ContentPaper from "$lib/components/ContentPaper.svelte";
</script>

<script lang="ts">
    import { transformToOpenmojis } from "$lib/helpers/openmoji";
    import type { PageProps } from "./$types";

    const { data }: PageProps = $props();
</script>

<ContentPaper>
    {@html transformToOpenmojis(data.content)}
</ContentPaper>
