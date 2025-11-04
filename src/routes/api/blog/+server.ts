import { getPosts } from "$lib/server/db/repositories/posts";
import { json } from "@sveltejs/kit";


export async function GET({ url }) {
    const params: Record<string, any> =
        Object.fromEntries(url.searchParams.entries());
    
    const {
        limit,
        offset,
        orderBy,
        orderIn,
    } = params;


    if (orderBy && !["like", "create_date", "update_date", "view"].includes(orderBy))
        throw json({ message: "orderBy must be \"like\" or \"create_date\" or \"update_date\" or \"view\"" }, { status: 400 });
    if (orderIn && !["ASC", "DESC"].includes(orderIn))
        throw json({ message: "orderIn must be \"ASC\" or \"DESC\"" }, { status: 400 });
    
    if (limit) {
        const val = parseInt(limit);
        params.limit = val;
        if (Number.isNaN(val))
            throw json({ message: "limit must be a number" }, { status: 400 });
    }

    if (offset) {
        const val = parseInt(offset);
        params.offset = val;
        if (Number.isNaN(val))
            throw json({ message: "offset must be a number" }, { status: 400 });
    }

    return json(await getPosts(params));
}
