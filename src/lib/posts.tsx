import fs from "fs";
import path from "path";
import matter from "gray-matter";
import externalPosts from "../content/external-posts.json";
import type { Locale } from "./i18n";

type PostSummary = {
  id: string;
  date: string;
  title: string;
  externalUrl?: string;
  source?: string;
  legacy?: boolean;
};

const postsDirectory = path.join(process.cwd(), "src/content");

function directoryForLocale(locale: Locale) {
  return locale === "pt" ? path.join(postsDirectory, "pt") : postsDirectory;
}

export function getSortedPostsData(locale: Locale = "en") {
  const directory = directoryForLocale(locale);
  const fileNames = fs.readdirSync(directory).filter((filename) => filename.endsWith(".md"));

  const allPostsData = fileNames.map((filename) => {
    const id = filename.replace(/\.md$/, "");
    const fullPath = path.join(directory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });

  const posts: PostSummary[] = [
    ...allPostsData,
    ...externalPosts.map((post) => ({ ...post, title: locale === "pt" ? post.titlePt : post.title })),
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

export async function getPostData(slug: string, locale: Locale = "en") {
  if (!getAllPostIds().some(({ params }) => params.id === slug)) return null;
  const fullPath = path.join(directoryForLocale(locale), `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    slug,
    content: matterResult.content,
    ...(matterResult.data as { date: string; title: string; description?: string; legacy?: boolean; revised?: string }),
  };
}
