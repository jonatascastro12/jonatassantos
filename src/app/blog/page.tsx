import BlogList from "@/components/blog-list";
import NavMenu from "@/components/nav-menu";
import { getSortedPostsData } from "@/lib/posts";
import { Container, Heading, Link } from "@radix-ui/themes";

export default function Page() {
  const postsData = getSortedPostsData();

  return (
    <>
      <NavMenu />

      <Container size="2" height="100%" pt="9" p="3">
        <Heading as={"h1"} mb="5" size="9">Blog</Heading>
        {postsData.map((post) => {
          return (
            <Link key={post.id} href={`/blog/${post.id}`}>
              {post.title}
            </Link>
          );
        })}
      </Container>
    </>
  );
}
