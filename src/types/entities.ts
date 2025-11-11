import type { postsEntity } from "$lib/server/db/entities";

declare global {
    namespace App {
        namespace Entities {
            type Post = InstanceType<typeof postsEntity>;
        }
    }
}
