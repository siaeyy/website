import {
    Entity,
    PrimaryKey,
    Property,
    OneToMany,
    Collection,
} from "@mikro-orm/core";
import { PostLike } from "./postLikes";
import { PostView } from "./postViews";

@Entity({ tableName: "posts" })
export class Post {
    @PrimaryKey({ type: "integer" })
    id!: number;

    @Property({ type: "varchar", length: 256 })
    title!: string;

    @Property({ type: "varchar", length: 128, unique: true })
    slug!: string;

    @Property({ type: "varchar", length: 512 })
    description!: string;

    @Property({ type: "varchar", length: 1024, nullable: true })
    image_url!: string | null;

    @Property({ type: "timestamp" })
    create_date!: Date;

    @Property({ type: "timestamp", nullable: true })
    update_date!: Date | null;

    @OneToMany(() => PostLike, (postLike) => postLike.post)
    likes = new Collection<PostLike>(this);

    @OneToMany(() => PostView, (postView) => postView.post)
    views = new Collection<PostView>(this);
}

export default Post;
