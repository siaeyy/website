<script module lang="ts">
    import { mount, type Snippet } from "svelte";
    import Copyable from "./Copyable.svelte";

    export interface CopyableProps {
        children: Snippet | HTMLElement;
        clipboard?: string;
    }

    export function createCopyable(target: HTMLElement) {
        const copyableParent = document.createElement("div");

        mount(Copyable, {
            target: copyableParent,
            props: {
                children: target,
            },
        });

        const copyable = copyableParent.firstElementChild!;

        target.replaceWith(copyable);
        copyable.appendChild(target);
    }
</script>

<script lang="ts">
    import { onMount } from "svelte";
    import RisingText from "./RisingText.svelte";
    import Openmoji from "./Openmoji.svelte";

    const { children, clipboard }: CopyableProps = $props();

    const isSnippet = typeof children === "function";

    let copyable!: HTMLElement;
    let content!: HTMLElement;
    let textSpawn!: HTMLElement;

    const onClick = () => {
        navigator.clipboard.writeText(clipboard ?? content.textContent);

        mount(RisingText, {
            target: textSpawn,
            props: {
                content: "Copied!",
            },
        });
    };

    onMount(() => {
        if (!isSnippet) {
            content.appendChild(children);
        }
    });
</script>

<div bind:this={copyable} class="copyable">
    <div class="button-wrapper">
        <button onclick={onClick} class="copy-button">
            <Openmoji codepoint="E25B" alt="" />
        </button>
        <!-- svelte-ignore element_invalid_self_closing_tag -->
        <div bind:this={textSpawn} class="rising-text-spawn" />
    </div>
    <span bind:this={content}>
        {#if isSnippet}
            {@render children?.()}
        {/if}
    </span>
</div>

<style lang="postcss">
    @reference "tailwindcss";

    .copy-button {
        position: absolute;
        display: flex;
        width: 24px;
        height: 24px;
        justify-content: center;
        align-items: center;
        background-color: #f4f4f4;
        border: 1px solid #52525e;
        border-radius: 4px;
        padding: 4px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition:
            opacity 0.3s ease,
            visibility 0s linear 0.3s;
    }

    .button-wrapper {
        position: absolute;
        top: 2px;
        left: calc(-24px - 1ch);
        width: calc(24px + 1ch);
        height: 100%;
    }

    .copyable {
        position: relative;
        display: inline-block;
    }

    .rising-text-spawn {
        position: absolute;
        justify-content: center;
        align-items: center;
        display: flex;
        left: 0px;
        top: 0px;
        pointer-events: none;
        font-size: 16px;
        width: 24px;
        height: 0px;
    }

    .copyable:hover .copy-button {
        opacity: 1;
        visibility: visible;
        transition-delay: 0s;
    }
</style>
