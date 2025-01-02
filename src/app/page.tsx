import { SocialBar } from "@/components/social-bar";
import NavMenu from "@/components/nav-menu";
import MyTypewriter from "@/components/typewriter";
import { Box, Container, Flex, Heading, Link, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <Box position={"fixed"} right="0" pt={"5"}>
        <SocialBar />
      </Box>
      <Container size="3" height="100%" style={{ justifyContent: "center" }}>
        <Flex
          justify="center"
          direction={{ initial: "column", md: "row" }}
          gap="3"
          style={{ position: "relative" }}
        >
          <Box p={"3"}>
            <Heading size="9" mt="9">
              Jônatas Santos
            </Heading>
            <Text size="6" color="gray">
              Software Engineer @{" "}
              <Link href={"https://workos.com"} target={"_blank"}>
                {" "}
                WorkOS
              </Link>
            </Text>

            <Box mt={"8"} width={{ xs: "100%" }}>
              <Text size="6" color="gray">
                I&apos;ve been <MyTypewriter />
              </Text>
            </Box>
          </Box>
          <Box>
            <Box className="overflow-hidden main-video-mask">
              <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={"main-video"}
              >
                <source src={"/jonatas-website-hevc-safari.mp4"} type='video/mp4; codecs="hvc1"' />
                <source src={"/jonatas-website-vp9-chrome.webm"} type="video/webm" />
              </video>
              <div className="sibling"></div>
            </Box>
          </Box>
        </Flex>

        <NavMenu displaySocial={false}/>
      </Container>
    </>
  );
}
