<script module lang="ts">
    import "highlight.js/styles/github.css";

    import hljs from "highlight.js";
    import { Marked, Renderer } from "marked";

    const marked = new Marked();
    const renderer = new Renderer();

    renderer.code = ({ text, lang }) => {
        const code_lang = hljs.getLanguage(lang ?? "") 
            ? lang!
            : "plaintext";

        const highlighted = hljs.highlight(text, {
            language: code_lang
        }).value;

        const pre = document.createElement("pre");
        const code = document.createElement("code");

        code.innerHTML = highlighted;
        pre.appendChild(code);

        return pre.outerHTML;
    };

    renderer.image = ({href, text, title, tokens}) => {
        const imageDiv = document.createElement("div");
        const image = document.createElement("img");

        image.src = href;
        image.alt = text;
        if (title) image.title = title;

        image.style.maxWidth = "100%";
        image.style.maxHeight = "100%";
        image.style.objectFit = "contain";

        imageDiv.style.overflow = "auto";
        imageDiv.appendChild(image);

        return imageDiv.outerHTML;
    };

    marked.use({ renderer });

    export interface Props {
        content: string
    }
</script>

<script lang="ts">
    const { content }: Props = $props();

    const parsedMarkdown = marked.parse(content);
</script>

<div id="markdown">
    {@html parsedMarkdown}
</div>

<style lang="postcss">
    @reference "tailwindcss";

    #markdown {
        @apply
            text-left
            font-[Gloria_Hallelujah]
            not-italic
            text-[#52525e];
    }
</style>