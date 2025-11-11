<script lang="ts">
    import { onMount } from "svelte";

    let { content }: { content: string } = $props();

    let text!: HTMLDivElement;

    onMount(() => {
        text.addEventListener("animationend", () => {
            text.remove();
        });
    });
</script>

<div class="floating-text" bind:this={text}>{content}</div>

<style lang="postcss">
    @reference "tailwindcss";

    .floating-text {
        @apply text-red-500;
        position: absolute;
        font-weight: bold;
        animation: floatUp 2s forwards;
        pointer-events: none;
    }

    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px);
        }
    }
</style>
