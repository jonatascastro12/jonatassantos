import NavMenu from "@/components/nav-menu";
import { getSortedPostsData } from "@/lib/posts";
import { Box, Container, Flex, Heading, Link } from "@radix-ui/themes";
import {
  format
} from 'date-fns';

export default function Page() {
  const postsData = getSortedPostsData();

  return (
    <>
      <NavMenu />

      <Container size="2" height="100%" pt="9" p="3">
        <Heading as={"h1"} mb="5" size="8">
          Blog
        </Heading>
        {postsData.map((post) => {
          return (
            <Flex key={post.id} justify="between" className="pb-4">
              <Box>
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </Box>

              <Box style={{minWidth: "100px"}} className="text-gray-400">{format(post.date, "dd MMM yyyy")}</Box>
            </Flex>
          );
        })}
      </Container>
    </>
  );
}
