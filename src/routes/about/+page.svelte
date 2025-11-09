<!-- svelte-ignore element_invalid_self_closing_tag -->

<script module lang="ts">
    import { onMount } from "svelte";
    import dedent from 'dedent';
    import Openmoji from "$lib/components/Openmoji.svelte";
    import ContentPaper from "$lib/components/ContentPaper.svelte";
    import LoadingText from "$lib/components/LoadingText.svelte";

    const bornDate = new Date("2006-09");

    const about = dedent(`
        Who am I? Salih, or siaeyy.
        How old am I? ${calcAge()} years old.
        Gender, pronouns? Dih owner
        Where am I from? Türkiye

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

    const banner = dedent(`
        <a href="http://siaeyy.me">
            <img alt="siaeyy\'s banner" src="http://siaeyy.me/banner.png">
        </a>';
    `);

    
    function calcAge(now: number = Date.now()) {
        const diff = now - bornDate.getTime();
        const age = new Date(diff).getFullYear() - 1970;

        return age;
    }

    async function getQuote() {
        const xml = await fetch("/quote_server/link/quotebr.rss")
            .then(r => r.text())
            .then(code => {
                const parser = new DOMParser()

                return parser.parseFromString(code, "text/xml");
            });

        const quote_ = xml.getElementsByTagName("item")[0];
        
        return {
            author: quote_.getElementsByTagName("title")[0].textContent,
            content: quote_.getElementsByTagName("description")[0].textContent,
        }
    }
</script>

<script lang="ts">
    import Copyable from "$lib/components/Copyable.svelte";

    let quoteRef!: HTMLQuoteElement;

    const quoteData = {
        href: "",
        author: "",
        content: "",
        isLoaded: false,
    };

    onMount(async () => {
        let quote = await getQuote();

        quoteData.author = quote.author;
        quoteData.content = quote.content;

        const quoteAuthorURI = quoteData.author.replaceAll(' ', '-').toLowerCase();
        quoteData.href = `https://www.brainyquote.com/authors/${quoteAuthorURI}-quotes`;

        quoteData.isLoaded = true;
    });
</script>

{#snippet social(self: Social)}
    <Openmoji codepoint={self.openmoji} />
    <a href={self.href}>{self.name}</a>
{/snippet}

<ContentPaper>
    <br>
    <h3>About Me :</h3>
    <pre class="text-inherit font-[inherit]">{about}</pre>
    <br>
    <h4>Quote of The Day :</h4>
    <blockquote bind:this={quoteRef}>
        {quoteData.content}
        {#if quoteData.isLoaded}
            <footer class="text-right">
                <cite>—&nbsp;{quoteData.author}</cite>
                <a href={quoteData.href}>...more</a>
            </footer>
        {:else}
            <LoadingText />
        {/if}
    </blockquote>
    <br>
    <h3>Socials :</h3>
    {#each socials as social_}
        {@render social(social_)}
        <br>
    {/each}
    <br>
    {@render social(email)}
    <br>
    <br>
    <h3>
        Banner :
        <Copyable clipboard={banner}>
            <img class="banner" alt="" src="/banner.png">
        </Copyable>
    </h3>
    <p>
        Copy (hover the mouse on it)<br>
        and put it onto your website!
    </p>
    <br>
    &nbsp;
</ContentPaper>

<style lang="postcss">
    @reference "tailwindcss";

    .banner {
        display: inline-block;
        vertical-align: middle;
        line-height: 1;
        overflow: visible;
    }
</style>
