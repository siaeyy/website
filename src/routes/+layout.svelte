<script module lang="ts">
    import { fly, type FlyParams } from 'svelte/transition';	
    
    const pages = [
        { href: "/blog", text: "Blog" },
        { href: "/about", text: "About" },
        { href: "/projects", text: "Projects" },
        // { href: "/etc", text: "Etc." },
    ]

    const pageIn: FlyParams = {
        x: -100,
        duration: 450,
        delay: 600,
        easing: (a) => a, // For straight ease
    };

    const pageOut: FlyParams = {
        x: 100,
        duration: 450,
    };
</script>

<script lang="ts">
	import '../app.css';
    import "highlight.js/styles/github.css";

    import SvgDefs from '$lib/components/SvgDefs.svelte';

	let { children, data } = $props();
</script>

<SvgDefs />

<div class="footer">
    {#each pages as page}
        <div class="footer-item">
            <a href={page.href}>{page.text}</a>
        </div>
    {/each}
</div>

{#key data.pathname}
	<main in:fly={pageIn} out:fly={pageOut}>
		{@render children()}
	</main>
{/key}

<style lang="postcss">
    @reference "tailwindcss";

    main {
        @apply
            flex
            justify-center
            w-full
            h-full;
    }

    .footer {
        @apply
            flex
            items-center
            justify-center
            w-full
            max-w-[20rem]
            min-h-[5rem]
            pl-2
            mt-5;
        position: relative;
        mask: url(#FooterMask);
        -webkit-mask: url(#FooterMask);
    }

    .footer::before {
        content: '';
        position: absolute;
        top: 65%;
        left: 0;
        z-index: -1;
        width: 100%;
        min-height: 1px;
        background-color: #ccc;
    }

    .footer::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        filter: url(#RoughPaper);
    }

    .footer-item {
        @apply
            font-[Gloria_Hallelujah]
            not-italic
            font-semibold
            text-lg
            px-5
            text-center
            cursor-pointer;
    }

    .footer-item a {
        @apply text-[#52525e];
    }

    .footer-item a:hover {
        @apply
            italic
            delay-1;
    }

    .footer-item a:link,
    .footer-item a:visited,
    .footer-item a:link:active,
    .footer-item a:visited:active {
        @apply
            outline-none
            no-underline;
    }
</style>
