<script lang="ts">
    export let post: App.Entities.Post;

    const date = new Date(post.update_date ?? post.create_date);

    const imageB = !Math.round(Math.random())

    if (imageB) {
        const imageD = Math.floor(Math.random() * 1084);
        post.image_url = "https://picsum.photos/id/" + imageD + "/200";
    }

    function onclick() {
        console.log("sa")
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div role="button" tabindex="0" onclick={onclick} class="card">
    <h2 class="card-title">{post.title}</h2>

    <p class="card-description">{post.description}</p>

    {#if post.image_url}
        <img
            src={post.image_url}
            alt={post.title}
            class="card-image"
        />
    {/if}

    <div class="card-footer">
        <span>{date.toLocaleDateString()}</span>
        <span>Likes: {post.likes}</span>
    </div>
</div>

<style lang="postcss">
    @reference "tailwindcss";

    .card {
        @apply
            border-2
            bg-[#dddee4]
            border-gray-400
            cursor-pointer
            flex
            flex-col
            justify-between
            w-[19rem]
            min-h-[11rem]
            rounded-3xl
            p-6
            transition-transform
            duration-300
            mb-6;
    }

    .card:hover {
        @apply
            scale-110;
    }

    .card-title {
        @apply
            font-[Gloria_Hallelujah]
            text-lg
            font-semibold
            mb-2
            text-[#52525e];
    }

    .card-description {
        @apply
            font-[Gloria_Hallelujah]
            flex-grow
            text-gray-600
            mb-4
            text-sm;
    }

    .card-image {
        @apply
            w-full
            h-40
            object-cover
            rounded-xl
            mb-4;
    }

    .card-footer {
        @apply
            font-[Gloria_Hallelujah]
            flex
            justify-between
            text-xs
            text-gray-500;
    }
</style>