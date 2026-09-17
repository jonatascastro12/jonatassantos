import fs from "fs";
import path from "path";
import matter from "gray-matter";
import externalPosts from "../content/external-posts.json";

type PostSummary = {
  id: string;
  date: string;
  title: string;
  externalUrl?: string;
  source?: string;
};

const postsDirectory = path.join(process.cwd(), "src/content");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory).filter((filename) => filename.endsWith(".md"));

  const allPostsData = fileNames.map((filename) => {
    const id = filename.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });

  const posts: PostSummary[] = [
    ...allPostsData,
    ...externalPosts,
  ];
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory).filter((filename) => filename.endsWith(".md"));

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    slug,
    content: matterResult.content,
    ...(matterResult.data as { date: string; title: string }),
  };
}
