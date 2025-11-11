<!-- svelte-ignore element_invalid_self_closing_tag -->

<script module lang="ts">
    import { onMount } from "svelte";
    import dedent from 'dedent';
    import Openmoji from "$lib/components/Openmoji.svelte";
    import ContentPaper from "$lib/components/ContentPaper.svelte";
    import LoadingText from "$lib/components/LoadingText.svelte";

    import type { Quote } from "../api/quote.json/+server";

    const bornDate = new Date("2006-09");

    const shortAbout = dedent(`
        Who am I? Salih, or siaeyy.
        How old am I? ${calcAge()} years old.
        Gender, pronouns? Dih owner
        Where am I from? Türkiye
    `);

    const about = dedent(`
        I used to be Backend Developer for a short time but now,
        I am trying to get into an university for a degree.
        I love programming, computer graphics and games a lot.
        On my free time, I like to contribute open-source projects but
        more I like is thinking about a new project idea everytime :)
    `);

    interface Social {
        name: string,
        href: string,
        openmoji: string,   
    }

    const socials: Social[] = [
        {
            name: "Linkedin",
            href: "https://www.linkedin.com/in/salih-aky%C4%B1ld%C4%B1z-411929283/",
            openmoji: "E046",
        },
        {
            name: "Github",
            href: "https://github.com/siaeyy",
            openmoji: "E045",
        },
        {
            name: "Discord",
            href: "https://discord.gg/GGcRuxyUPS",
            openmoji: "E061",
        },
        {
            name: "Leetcode",
            href: "https://leetcode.com/u/siaeyy/",
            openmoji: "1F9E9",
        },
    ];

    const email: Social = {
        name: "siaeyy@beyler.top",
        href: "mailto:siaeyy@beyler.top",
        openmoji: "2709",
    };

    interface Banner {
        src: string
        href: string
        clipboard?: string
    }

    const createBannerClipboard = (banner: Banner) => {
        return dedent(`
            <a href="${banner.href}">
                <img src="${banner.src}">
            </a>
        `);
    };

    const banners: Banner[] = [
        {
            src: "https://nekoweb.org/assets/buttons/button1.gif",
            href: "https://nekoweb.org/",
        },
        {
            src: "https://auzziejay.com/images/noweb32.gif",
            href: "https://yesterweb.org/no-to-web3/",
        },
    ];
    
    function calcAge(now: number = Date.now()) {
        const diff = now - bornDate.getTime();
        const age = new Date(diff).getFullYear() - 1970;

        return age;
    }

    async function getQuote(): Promise<Quote> {
        return fetch("/api/quote.json")
            .then(res => res.json())        
    }
</script>

<script lang="ts">
    import Copyable from "$lib/components/Copyable.svelte";

    let quote: Quote | undefined;

    onMount(() => {
        getQuote().then(res => quote = res);
    });
</script>

{#snippet social(self: Social)}
    <Openmoji codepoint={self.openmoji} />
    <a href={self.href}>{self.name}</a>
{/snippet}

{#snippet banner(banner: Banner)}
    <span class="inline-block w-[88px] h-[28px] align-bottom">
        <span class="absolute">
            <Copyable clipboard={banner.clipboard ?? createBannerClipboard(banner)}>
                {#if banner.href}
                    <a href={banner.href}>
                        <img
                            class="banner"
                            alt={`Banner of "${banner.href}"`}
                            src={banner.src}
                        >
                    </a>
                {:else}
                    <img
                        class="banner"
                        alt={`Banner of "${banner.href}"`}
                        src={banner.src}>
                {/if}
            </Copyable>
        </span>
    </span>
{/snippet}

<ContentPaper>
    <br>
    <h2>About Me :</h2>
    <div class="about-container">
        <pre class="about">{shortAbout}</pre>
        <span class="guestbook-link">
            <br>
            <a href="/guestbook" data-blank>
                <h3>Guestbook</h3>
            </a>
            <h5>You must check it out!</h5>
        </span>
        <pre class="about"><br>{about}</pre>
    </div>
    <br>
    <h3>Quote of The Day :</h3>
    <blockquote>
        {#if quote === undefined}
            <LoadingText />
        {:else}
            {quote.content}
            <footer class="text-right">
                <cite>
                    <strong>—&nbsp;{quote.author}</strong>
                </cite>
                <a href={quote.link}>
                    {quote.link && "...more"}
                </a>
            </footer>
        {/if}
    </blockquote>
    <br>
    <h2>Socials :</h2>
    {#each socials as social_}
        {@render social(social_)}
        <br>
    {/each}
    <br>
    {@render social(email)}
    <br>
    <br>
    <h3>
        My Banner :&nbsp;
        {@render banner({
            src: "/banner.png",
            href: "",
            clipboard: createBannerClipboard({
                src: "https://siaeyy.me/banner.png",
                href: "https://siaeyy.me",
            }),
        })}
    </h3>
    <p>
        Copy (hover the mouse on it)<br>
        and put it onto your website!
    </p>
    <br>
    <div class="flex flex-wrap gap-x-[28px]">
    {#each banners as banner_}
        <div class="h-[56px]">
            {@render banner(banner_)}
        </div>
    {/each}
    </div>
    <br>
</ContentPaper>

<style lang="postcss">
    @reference "tailwindcss";

    .about {
        @apply
            text-inherit
            font-[inherit];
    }

    .about-container {
        @apply
            flex
            flex-wrap
            justify-between
            gap-x-8;
    }

    .guestbook-link {
        @apply
            flex
            flex-col
            flex-1
            items-center
            text-nowrap;
    }

    .banner {
        display: inline-block;
        vertical-align: middle;
        line-height: 1;
        overflow: visible;
    }
</style>
