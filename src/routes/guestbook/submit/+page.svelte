<script lang="ts">
    import { onMount, tick } from "svelte";
    import CanvasDraw, { createDrawStore } from "$lib/components/CanvasDraw.svelte";
    import ContentPaper from "$lib/components/ContentPaper.svelte";

    const store = createDrawStore();

    $store.color = "#52525e";
    
    let nameInput!: HTMLInputElement;
    let emailInput!: HTMLInputElement;
    let writingInput!: HTMLSpanElement;
    let drawingInput!: HTMLDivElement;
    let colorInput!: HTMLInputElement;

    let drawingStat = false;
    let maxThickness = 100;

    let latestImageData: ImageData | undefined;

    onMount(() => {
        maxThickness = window.innerWidth / 20;
    })
</script>

{#snippet drawingCanvas()}
    <div class="draw-bar text-2xl font-bold">
        <div>
            <button type="button" class="button" onclick={$store.undo}>⤺</button>
            <button type="button" class="button transform-[scaleX(-1)]" onclick={$store.redo}>⤺</button>
        </div>
        <div class="flex justify-between gap-x-[2ch]">
            <button
                type="button"
                class="button"
                onclick={() => {
                    drawingStat = false;
                    latestImageData = $store.restoreIndex === -1
                        ? undefined
                        : $store.restore.at($store.restoreIndex);
                    
                    if (latestImageData === undefined) {
                        writingInput.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                        });
                    }
                }}>
                ✓
            </button>
            <button
                type="button"
                class="button"
                onclick={() => {
                    drawingStat = false;
                    latestImageData = undefined;
                    $store.restoreIndex = -1;
                    console.log($store.restore);
                    writingInput.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                    });
                }}>
                ✗
            </button>
        </div>
    </div>
    <div class="flex flex-col gap-y-6 w-full">
        <div class="w-full cursor-crosshair">
            <div class="relative aspect-square w-full">
                <div class="absolute inset-0 border-3 border-[#52525e] pointer-events-none filter-[url(#InkBleed)]"></div>
                <CanvasDraw store={store} />
            </div>
        </div>
        <input
            type="range"
            min="1"
            max={maxThickness}
            bind:value={$store.thickness}
            class="range filter-[url(#InkBleed)]" />
        <div class="flex">
            <div class="flex justify-center items-center relative w-12 h-12">
                <div class="absolute w-full h-full border-3 border-[#52525e] filter-[url(#InkBleed)]"></div>
                <button
                    type="button"
                    aria-label="{$store.color}"
                    onclick={() => colorInput.click() }
                    class="w-7 h-7 border-0 border-[#52525e] cursor-pointer filter-[url(#InkBleed)]"
                    style="background-color: {$store.color};">
                </button>
                <input
                    type="color"
                    bind:this={colorInput}
                    bind:value={$store.color}
                    class="absolute top-0 left-0 invisible">
            </div>
            <div class="flex ml-5! items-center gap-x-2">
            {#each $store.latestColors.toReversed() as color}
                <button
                    type="button"
                    aria-label="{color}"
                    onclick={() => store.update(v => { v.color = color; return v; }) }
                    class="w-7 h-7 border-0 border-[#52525e] cursor-pointer filter-[url(#InkBleed)]"
                    style="background-color: {color};">
                </button>
            {/each}
            </div>
        </div>
    </div>
{/snippet}

<ContentPaper>
    <br>
    <div class="relative">
        <h3>Your (nick)name :</h3>
        <input
            type="text"
            placeholder="e.g. Osama bin Mohammed bin Awad bin Laden"
            class="input w-full"
            bind:this={nameInput}
        />
    </div>
    <br>
    <div class="relative">
        <h3>Your e-mail address : </h3>
        <h5>(optional, private)</h5>
        <input
            type="email"
            placeholder="e.g. example31@gmail.com"
            class="input w-full"
            bind:this={emailInput}
        />
    </div>
    <br>
    <div class="relative">
        <h3>Message :</h3>
        <span
            class="textarea"
            role="textbox"
            oninput={() => {
                console.log("a")
                if (writingInput.textContent === "") {
                    writingInput.innerHTML === '';
                }
            }}
            bind:this={writingInput}
            contenteditable >
        </span>
    </div>
    <br>
    {#if drawingStat}
        <div bind:this={drawingInput}>
            {@render drawingCanvas()}
        </div>
    {:else}
        <div class="flex justify-center">
            <button
                class="button"
                onclick={async () => {
                    drawingStat = true;
                    await tick();
                    drawingInput.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    })
                }}>
                <span class="text-lg">
                    {#if latestImageData !== undefined}
                        &#9998; Edit Drawing
                    {:else}
                        + Add Drawing
                    {/if}
                </span>
            </button>
        </div>
        <br>
        {#if latestImageData !== undefined}
            <div class="relative aspect-square w-full">
                <CanvasDraw store={store} />
            </div>
        {/if}
    {/if}
    <br>
    <br>
</ContentPaper>

<style lang="postcss">
    @reference "tailwindcss";

    [contenteditable]:focus {
        outline: 0px solid transparent;
    }
    
    ::placeholder {
        @apply text-[#aaa];
    }

    .input {
        @apply
            h-7
            p-0
            m-0
            border-0
            outline-0
            font-[inherit]
            [font-size:inherit]
            text-inherit
            align-bottom
            bg-transparent;
    }

    .textarea {
        display: inline-block;
        width: 100%;
        line-height: 28px;
        white-space: pre-wrap;
        word-break: break-all;
    }

    .textarea:empty::before {
        content: "e.g. this website is awesome, you're awesome blah blah";
        color: #aaa;
        pointer-events: none;
    }

    .button {
        background: none;
	    color: inherit;
	    border: none;
	    padding: 0;
	    font: inherit;
	    cursor: pointer;
	    outline: inherit;
    }

    .draw-bar {
        @apply
            flex
            flex-row
            items-center
            justify-between
            my-[14px]!;
    }

    .draw-bar :global(.emoji) {
        width: 36px !important;
    }

    .range {
        -webkit-appearance: none;
        width: 100%;
        height: 2px;
        background: #aaa;
        border-radius: 2px;
        outline: none;
        margin: 20px 0;
    }

    .range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        border: 2px solid #52525e;
        border-radius: 50%;
        background: transparent;
        cursor: pointer;
    }

    .range::-moz-range-thumb {
        width: 24x;
        height: 24px;
        border: 2px solid #52525e;
        border-radius: 50%;
        background: transparent;
        cursor: pointer;
    }

    .range::-moz-range-track {
        width: 100%;
        height: 4px;
        background: #aaa;
        border-radius: 2px;
    }

    .range::-ms-track {
        width: 100%;
        height: 4px;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
</style>