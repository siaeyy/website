<script module lang="ts">
    const pages = [
        { href: "/blog", text: "Blog" },
        { href: "/about", text: "About" },
        { href: "/projects", text: "Projects" },
        // { href: "/etc", text: "Etc." },
    ]
</script>

<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="footer">
    {#each pages as page}
        <div class="footer-item">
            <a href={page.href}>{page.text}</a>
        </div>
    {/each}
</div>

<style lang="postcss">
    @reference "tailwindcss";

    .footer {
        @apply
            border-2
            bg-[#dadce3]
            border-gray-400
            flex
            items-center
            justify-center
            w-full
            max-w-[20rem]
            min-h-[4rem]
            rounded-[30px]
            mt-5;
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

{@render children()}
