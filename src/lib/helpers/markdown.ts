import hljs from "highlight.js";
import { Marked, Renderer } from "marked";

const marked = new Marked();
const renderer = new Renderer({ gfm: true });

renderer.code = ({ text, lang }) => {
    const code_lang = hljs.getLanguage(lang ?? "") ? lang! : "plaintext";

    const highlighted = hljs.highlight(text, {
        language: code_lang,
    }).value;

    /*
    const pre = document.createElement("pre");
    const code = document.createElement("code");

    code.innerHTML = highlighted;
    pre.appendChild(code);

    return pre.outerHTML;
    */

    return `
        <pre><code>${highlighted}</code></pre>
    `;
};

renderer.image = ({ href, text, title }) => {
    /*
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
    */

    return `
        <div style="overflow: auto;">
            <img 
                src="${href}" 
                alt="${text}" 
                ${title ? `title="${title}"` : ""}
                style="
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                "
            />
        </div>
    `;
};

marked.use({ renderer });

export function parseMarkdown(content: string) {
    return marked.parse(content) as string;
}
