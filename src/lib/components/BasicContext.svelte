<div class="context">
    <slot />
</div>

<style lang="postcss">
    @reference "tailwindcss";
    
    .context {
        @apply
            border-2
            bg-[#dddee4]
            border-gray-400
            max-w-[40rem]
            min-h-[4rem]
            text-center
            mt-10
            mx-5
            py-5
            px-10
            rounded-[30px]
            break-words;
    }
</style>
