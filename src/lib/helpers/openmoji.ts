import { parse } from '@twemoji/parser';

export const OPENMOJI_CDN = "https://cdn.jsdelivr.net/npm/openmoji@latest/color/svg";

export const openmojiImg = ({ text, codepoint }: Record<"text" | "codepoint", string>) => `<img class="emoji" alt="${text}" src="${OPENMOJI_CDN}/${codepoint}.svg"/>`;

export function transformToOpenmojis(text: string) {
    const emojis = parse(text, {
        assetType: "svg",
        buildUrl: (codepoint, type) => {
            return `${OPENMOJI_CDN}/${codepoint.toUpperCase()}.${type}`;
        },
    });

    for (const emoji of [...emojis].reverse()) {
        const element = `<img class="emoji" alt="${emoji.text}" src="${emoji.url}"/>`;
        const [start, end] = emoji.indices;
        text = text.slice(0, start) + element + text.slice(end);
    }

    return text;
}
