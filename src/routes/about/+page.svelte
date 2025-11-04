<script module lang="ts">
    import BasicContext from "$lib/components/BasicContext.svelte";

    const beCool = false;
    const hasJob = true;
    const bornDate = new Date("2006-09");

    function calcAge(now: number = Date.now()) {
        const diff = now - bornDate.getTime();
        const age = new Date(diff).getFullYear() - 1970;

        return age;
    }
</script>

<BasicContext>
    <p>
        Who am I? I am Salih, or {#if beCool} just know me {/if} by my nick, siaeyy. <br>
        Just a person that {calcAge()} years old,
        who love programming, computer graphics{#if hasJob},{:else}&nbsp;and{/if}
        games a lot{#if hasJob}&nbsp;and currently working as a Backend Developer{/if}. <br>
        On my free time, I like to contribute open-source projects.
        More I like is thinking about a new project idea everytime :) 
    </p>
</BasicContext>

<style lang="postcss">
    @reference "tailwindcss";

    p {
        @apply
            font-[Gloria_Hallelujah]
            not-italic
            text-[#52525e]
            font-semibold;
    }
</style>
