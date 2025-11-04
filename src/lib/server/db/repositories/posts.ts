import type { FilterQuery, FindOptions } from "@mikro-orm/core";
import { postsEntity } from "../entities";

import orm from "../orm";


const em = orm.em.fork();

export interface GetPostOptions {
    search?: string, 
    orderBy?: "like" | "create_date" | "update_date" | "view",
    orderIn?: "ASC" | "DESC",
    offset?: number,
    limit?: number,
}

export function getPosts(opts?: GetPostOptions) {
    const {
        search,
        orderBy = "create_date",
        orderIn = "asc",
        offset = 0,
        limit = 20,
    } = opts ?? {};

    const whereOr: FilterQuery<postsEntity>[] = [];
    
    if (search) {
        whereOr.push([
            { title: { $like: `%${search}%` } },
            { description: { $like: `%${search}%` } },
            { slug: { $like: `%${search}%` } },
        ]);
    }
    
    const where: FilterQuery<postsEntity> = {
        ...whereOr.length === 0 ? {} : { $or: whereOr },
    };

    const options: FindOptions<postsEntity, never, any, never> = {
        ...limit === undefined ? {} : { limit },
        ...offset === undefined ? {} : { offset },
        orderBy: {
            [orderBy]: orderIn,
        },
    };

    return em.find(postsEntity, where, options);
}