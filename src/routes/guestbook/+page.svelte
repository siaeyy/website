<script>
    import ContentPaper from "$lib/components/ContentPaper.svelte";

</script>

<ContentPaper>
    <br>
    <h2 class="text-center">
        &gt; Welcome My Dear Visitor &lt;
    </h2>
    <p class="text-center">
        You have the right to write/draw whatever you want,
        <br>
        however ever you like in this guestbook.
        <br>
        <br>
        About me, my website, my works/projects,
        <br>
        even it doesn't have to be one of these.
        <br>
        <br>
        <a href="/guestbook/submit" data-blank>So, go ahead!</a>
    </p>
    <br>
    <br>
    <span>
        <h3 class="inline m-0">siaeyy :</h3>
        <span class="underline float-right">{(new Date()).toLocaleDateString()}</span>
    </span>
    <pre><p>test</p></pre>
</ContentPaper>