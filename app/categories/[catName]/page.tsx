import { TPost } from "@/app/types";
import Post from "@/components/Post";

const getPosts = async (catName: string): Promise<TPost[] | null> => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${catName}`,
            { cache: "no-store" }
        );

            if (res.ok) {
                const categories = await res.json();
                return Array.isArray(categories.posts) ? categories.posts : []; 
            } else {
                console.error(`Error fetching posts: ${res.status} ${res.statusText}`);
            }
    } catch (error) {
        console.error("Failed to fetch category posts", error);
    }

    return null;
};

export default async function CategoryPosts({
    params,
}: {
    params: { catName: string };
})  {
    const categories = params.catName;
    const posts = await getPosts(categories);

    return (
        <>
        <h1>
            <span className="font-normal">Category: </span>{" "}
            {decodeURIComponent(categories)}
        </h1>

            {posts && posts.length > 0 ? (
                posts.map((post: TPost) => (
                    <Post
                    key={post.id}
                    id={post.id}
                    author={post.author.name}
                    date={post.createdAt}
                    thumbnail={post.imageUrl}
                    authorEmail={post.authorEmail}
                    category={post.catName}
                    title={post.title}
                    content={post.content}
                    links={post.links || []}
                    />
                )) 
                ) : (
                <div className="py-6">No posts to display</div>
                )}
        </>
    );
}