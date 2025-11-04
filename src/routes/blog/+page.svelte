<script module lang="ts">
    import BlogPostCard from "$lib/components/BlogPostCard.svelte";
    import { mount, onMount } from 'svelte';
</script>

<script lang="ts">
    const { data } = $props();
    const { posts } = data;

    let isMounted = false;

    let container: Element = null!;
    const columns: Element[] = $state([]);

    let columnCount = $state(0);
    let lastWidth = 0;

    function calcColumnCount() {
        const width = container.clientWidth;

        if (width === lastWidth) return;
        else lastWidth = width;

        if (width >= 1024) {
            columnCount = 3
        } else if (width >= 640) {
            columnCount = 2
        } else {
            columnCount = 1
        }
    }

    function getPositions(el: Element) {
        const rect = el.getBoundingClientRect()
        
        const top = rect.top + window.scrollY;
        const bottom = rect.bottom + window.scrollY;

        return { top, bottom };
    }

    function getLowestPositions() {
        return columns
            .filter(v => !!v)
            .map(v => {
                const last = v.lastElementChild;

                if (last === null) return null;

                return getPositions(last);
            })
    }

    function getNextColumn() {
        const positions = getLowestPositions();
  
        // console.log(positions);

        const nully = positions.findIndex(v => v === null);

        if (nully !== -1) return nully;

        const filtered = positions
            .map((pos, i) => ({ pos, i }));

        // console.log(filtered.length)

        if (filtered.length === 0) return 0;

        filtered.sort((a, b) => a.pos!.bottom - b.pos!.bottom);

        return filtered.shift()!.i;
    }

    function removePosts() {
        for (let i = 0; i < columnCount; i++) {
            columns[i].innerHTML = "";
        }
    }

    function placePost(column: Element, post: App.Entities.Post) {
        mount(BlogPostCard, {
            target: column,
            props: { post },
        });
    }

    function placePosts() {
        removePosts();

        const start = Date.now();

        for (let i = 0; i < posts.length; i++) {
            const columnIndex = getNextColumn();
            const column = columns[columnIndex];

            placePost(column, posts[i]);
        }

        console.log(Date.now() - start);

        // console.log();
    }

    $effect(() => {
        columnCount;

        if (!isMounted) return;

        placePosts();
    });

    onMount(() => {
        const observer = new ResizeObserver(calcColumnCount);

        observer.observe(container);

        isMounted = true;
        return () => observer.disconnect();
    });
</script>

<div id="posts-container" bind:this={container}>
    {#each Array(columnCount) as _, i}
        <div class="post-column " bind:this={columns[i]}>
            {i}
        </div>
    {/each}
</div>

<style lang="postcss">
    @reference "tailwindcss";

    #posts-container {
        @apply
            w-full
            flex
            justify-center
            flex-row
            /* bg-gray-400 */
            mt-10;
    }

    .post-column {
        @apply
            /* bg-red-600 */
            mx-3
            basis-64;
    }
</style>
