import { PageShell } from "@/components/page-shell";
import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { format } from "date-fns";

export default function Page() {
    const postsData = getSortedPostsData();

    return (
        <PageShell narrow>
            <h1 className="page-title animate-fade-up">Blog</h1>
            <ul className="blog-list animate-fade-up">
                {postsData.map((post) => (
                    <li key={post.id} className="blog-item">
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        <time className="blog-item-date" dateTime={post.date}>
                            {format(post.date, "dd MMM yyyy")}
                        </time>
                    </li>
                ))}
            </ul>
        </PageShell>
    );
}
