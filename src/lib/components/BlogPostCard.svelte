<script lang="ts">
    export let post: App.Entities.Post;

    const date = new Date(post.update_date ?? post.create_date);

    const imageB = !Math.round(Math.random())

    if (imageB) {
        const imageD = Math.floor(Math.random() * 1084);
        post.image_url = "https://picsum.photos/id/" + imageD + "/200";
    }

    function onclick() {}
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
            flex
            flex-col
            justify-between
            relative
            w-[19rem]
            min-h-[11rem]
            p-6
            pt-12
            mb-6
            border-2
            bg-[#ffe187]
            cursor-pointer
            transition-transform
            duration-300;
    }

    .card::before {
        @apply 
            absolute
            top-0
            left-0
            w-full
            h-11.25
            bg-[#f1d17b]
            content-[""];
    }

    .card:hover {
        @apply
            scale-110;
    }

    .card-title {
        @apply
            mb-2
            text-lg
            text-[#52525e]
            font-semibold;
    }

    .card-description {
        @apply
            mb-4
            flex-grow
            text-sm
            text-gray-600;
    }

    .card-image {
        @apply
            mb-4
            w-full
            h-40
            rounded-xl
            object-cover;
    }

    .card-footer {
        @apply
            flex
            justify-between
            text-xs
            text-gray-500;
    }
</style>