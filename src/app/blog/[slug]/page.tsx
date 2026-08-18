import { PageShell } from "@/components/page-shell";
import { defaultComponents } from "@/mdx-components";
import { getAllPostIds, getPostData } from "@/lib/posts";
import Markdown from "react-markdown";
import { format } from "date-fns";

type Params = {
    slug: string;
};

type Props = {
    params: Params;
};

type PostData = {
    title: string;
    date: string;
    content: string;
};

export async function generateMetadata({ params }: Props) {
    const postData: PostData = await getPostData(params.slug);

    return {
        title: postData.title,
    };
}

export default async function Post({ params }: Props) {
    const postData: PostData = await getPostData(params.slug);

    return (
        <PageShell narrow>
            <article className="prose-content animate-fade-up">
                <h1 className="page-title">{postData.title}</h1>
                <time className="blog-item-date" dateTime={postData.date}>
                    {format(postData.date, "dd MMM yyyy")}
                </time>
                <Markdown components={defaultComponents}>{postData.content}</Markdown>
            </article>
        </PageShell>
    );
}
