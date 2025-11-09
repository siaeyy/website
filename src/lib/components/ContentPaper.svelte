<script lang="ts">
    import { onMount } from 'svelte';
    import { createCopyable } from './Copyable.svelte';

    let context!: HTMLDivElement;

    onMount(() => {
        const anchors = context.querySelectorAll('a');
        const codes = context.querySelectorAll('code');

        for (const anchor of anchors) {
            anchor.target = "_blank";
        }

        for (const code of codes) {
            createCopyable(code);
        }
    })
</script>

<div class="paper">
    <div class="paper-texture"></div>
    <div class="paper-separator"></div>
    <div class="paper-lines"></div>
    <div class="paper-context" bind:this={context}>
        <slot />
    </div>
</div>

<style lang="postcss">
    @reference "tailwindcss";

    .paper {
        @apply
            flex
            relative
            mt-10
            mx-5
            w-full
            max-w-[40rem]
            min-h-[4rem]
            text-center
            break-words
            bg-white;
    }

    .paper:before {
        @apply
            pb-[round(down,_100%_*_sqrt(2),_28px)]
            float-left
            content-[""];
    }

    .paper:after {
        @apply
            table
            clear-both
            content-[""];
    }

    .paper-texture {
        @apply
            absolute
            w-full
            h-full
            filter-[url(#RoughPaper)];
    }

    .paper-separator {
        @apply
            absolute
            left-[8%]
            h-full
            w-0.5
            bg-red-600
            z-20;
    }
    
    .paper-lines {
        @apply
            absolute
            min-w-full
            min-h-full
            z-10;
        /* I think this is better to transform it to tailwind */
        background: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent calc(28px - 1px),
            #ccc calc(28px - 1px),
            #ccc 28px
        );
    }

    .paper-context {
        @apply
            relative
            z-30
            ml-[10%]
            mr-[2%]
            flex-1
            leading-[28px]!
            text-left
            text-[#52525e]
            not-italic
            font-[Gloria_Hallelujah];
    }

    .paper-context :global(*) {
        @apply
            m-0!
            border-spacing-0
            leading-[28px];
    }

    .paper-context :global(h1),
    .paper-context :global(h2) {
        @apply leading-[56px]!;
    }

    .paper-context :global(img.emoji) {
        @apply
            inline-block
            align-middle
            w-[calc(1em_*_1.5)];
    }

    .paper-context :global(h1 > img.emoji) {
        @apply
            align-bottom
            my-1!;
    }

    .paper-context :global(h3 > img.emoji) {
        @apply
            align-bottom
            w-7;
    }

    .paper-context :global(hr)  {
        @apply
            absolute
            left-[calc(-100%_/_88_*_10)]
            w-[calc(100%_/_88_*_100)]
            h-[2.2px] /* :D? */
            border-0
            filter-[url(#InkBleed)]
            bg-[#52525e];
    }

    .paper-context :global(hr + hr)  {
        margin-top: 25.8px !important;
        position: relative;
    }

    .paper-context :global(a) {
        @apply text-[#396bcd];
    }

    .paper-context :global(a):hover {
        @apply
            italic
            delay-1;
    }

    .paper-context :global(code),
    .paper-context :global(blockquote) {
        vertical-align: bottom;
    }

    .paper-context :global(code) {
        position: relative;
    }

    .paper-context :global(blockquote) {
        position: relative;
        max-width: fit-content;
        padding-left: 1ch !important;
    }

    .paper-context :global(blockquote)::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        border-left: 1.6px solid #fad000 !important;
        filter: url(#InkBleed);
    }

    .paper-context :global(blockquote > blockquote) {

    }

    .paper-context :global(pre) {
        line-height: 28px !important;
        white-space: pre-wrap !important;
    }

    .paper-context :global(table) {
        border-collapse: collapse;
    }

    .paper-context :global(table *) {
        line-height: 28px !important;
    }

    .paper-context :global(tbody),
    .paper-context :global(td),
    .paper-context :global(tr),
    .paper-context :global(th) {
        position: relative;
        padding: 0px !important;
    }

    .paper-context :global(td + td),
    .paper-context :global(th + th) {
        padding-left: 1ch !important;
    }

    .paper-context :global(td + td)::after,
    .paper-context :global(th + th)::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 1.6px;
        height: 100%;
        background-color: #00a468;
        filter: url(#InkBleed);
    }

    .paper-context :global(td):first-of-type,
    .paper-context :global(th):first-of-type {
        padding-right: 1ch !important;
    }

    .paper-context :global(tbody)::before,
    .paper-context :global(tr + tr)::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1.6px;
        background-color: #00a468;
        filter: url(#InkBleed);
    }
</style>
