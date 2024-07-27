"use client";

import NavMenu from "@/components/nav-menu";
import MyTypewriter from "@/components/typewriter";
import { XLogoIcon } from '@/components/x-logo-icon';
import {
    GitHubLogoIcon,
    LinkedInLogoIcon,
    TwitterLogoIcon,
} from "@radix-ui/react-icons";
import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    Heading,
    Link,
    Switch,
    Text,
} from "@radix-ui/themes";
import { useTheme } from "next-themes";
import { NoSSR } from "next/dist/shared/lib/lazy-dynamic/dynamic-no-ssr";

export default function Home() {
    const {theme, setTheme} = useTheme();

    const switchTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return (
        <>
            <Flex justify="end" p="5" position="fixed" top="0" width="100%">
                <NoSSR>
                    <Switch onClick={switchTheme} checked={theme === "dark"}></Switch>
                </NoSSR>
                &nbsp;
                <div className={"social"}>
                    <a href="https://github.com/jonatascastro12" target="_blank"><GitHubLogoIcon/></a>
                    <a href="https://x.com/jonatascastro12" target="_blank"><XLogoIcon/></a>
                    <a  href="https://linkedin.com/in/jonatascastro12" target="_blank"><LinkedInLogoIcon/></a>
                </div>
            </Flex>
            <Container size="3" height="100%" style={{justifyContent: "center"}}>
                <Flex
                    justify="center"
                    direction={{initial: "column", md: "row"}}
                    gap="3"
                    style={{position: "relative"}}
                >
                    <Box>
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

                        <Box mt={"8"} width={{xs: "100%"}}>
                            <Text size="6" color="gray">
                                I've been <MyTypewriter/>
                            </Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box className="overflow-hidden main-video-mask">
                            <video
                                autoPlay
                                loop
                                muted
                                src={"/jonatas-website-2-2.mp4"}
                                className={"main-video"}
                            />
                        </Box>
                    </Box>
                </Flex>

                <NavMenu/>
            </Container>
        </>
);
}
