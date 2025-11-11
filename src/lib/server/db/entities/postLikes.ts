import {
    Entity,
    PrimaryKey,
    Property,
    ManyToOne,
    Unique,
} from "@mikro-orm/core";
import { Post } from "./posts";

@Entity({ tableName: "post_likes" })
@Unique({ properties: ["post", "ipHash"] })
export class PostLike {
    @PrimaryKey({ type: "integer" })
    id!: number;

    @Property({ type: "text" })
    ipHash!: string;

    @ManyToOne(() => Post)
    post!: Post;
}

export default PostLike;
