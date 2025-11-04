export async function load({ fetch }) {
    const res = await fetch("/api/blog");
    const posts = await res.json();

    return { posts };
}
