import { json } from '@sveltejs/kit';
import Parser from 'rss-parser';

const parser: Parser<{ ttl: string }> = new Parser({
    customFields: {
        feed: ['ttl'],
    }
});

export interface Quote {
    author: string
    content: string
    link: string 
}

// ???
async function getFeed() {
    return fetch("https://www.brainyquote.com/link/quotebr.rss")
        .then(res => res.text())
        .then(rss => parser.parseString(rss));
}

async function getQuote() {
    const feed = await getFeed();
    const quote_ = feed.items[0];

    const quote = {
        author: quote_.title,
        content: quote_.content,
        link: quote_.link,
    } as Quote;

    if (Object.values(quote).some(v => v === undefined)) {
        throw undefined;
    }

    return quote;
}

let lastQuote!: Quote;

async function refreshQuote() {
    try {
        lastQuote = await getQuote();
    } catch {
        lastQuote = {
            author: "siaeyy",
            content: "hmm... i think there is a problem here...",
            link: "",
        }
    }
}

refreshQuote()
setInterval(refreshQuote, 1440); //enough

export async function GET() {
    return json(lastQuote);
}