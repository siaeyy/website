<script lang="ts">
    import { OPENMOJI_CDN } from "$lib/helpers/openmoji";

    let { alt, codepoint }: { alt?: string, codepoint: string } = $props();

    const src = `${OPENMOJI_CDN}/${codepoint.toUpperCase()}.svg`;
</script>

<img class="emoji" alt={alt} src={src} />