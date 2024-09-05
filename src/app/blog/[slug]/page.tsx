import NavMenu from "@/components/nav-menu";
import { defaultComponents } from '@/mdx-components';
import { getAllPostIds, getPostData } from "@/lib/posts";
import { Container, Heading, Link } from "@radix-ui/themes";
import React from 'react';
import Markdown from "react-markdown";

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
    <>
      <NavMenu />

      <Container size="2" height="100%" pt="9" p="3">
        <Heading as={"h1"} size="9">{postData.title}</Heading>

        <div className="text-gray-500 font-medium mb-5">
          {/*<Date dateString={postData.date}/>*/}
        </div>

        {/* Post Content */}
        <Markdown
          components={defaultComponents}
        >
          {postData.content}
        </Markdown>
      </Container>
    </>
  );
}
