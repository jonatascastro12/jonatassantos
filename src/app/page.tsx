import MyTypewriter from '@/components/typewriter';
import { Box, Button, Container, Flex, Grid, Heading, Link, Text } from '@radix-ui/themes';
import { Typewriter } from 'react-simple-typewriter';


export default function Home() {
    const handleType = (count: number) => {
        // access word count number
        console.log(count)
    }
    return (
        <>
            <Container size="3" height="100%" style={{justifyContent: "center"}}>
                <Flex justify="center" gap="3" style={{position: "relative"}}>
                    <Box>
                        <Heading size="9" mt="9">Jônatas Santos</Heading>
                        <Text size="6" color="gray">Software Engineer @ <Link href={"https://workos.com"}
                                                                              target={"_blank"}> WorkOS</Link></Text>

                        <Box mt={"8"}>
                            <Text size="6" color="gray">
                                I've been <MyTypewriter/>
                            </Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box className="overflow-hidden main-video-mask">
                            <video autoPlay loop muted src={"/jonatas-website-2-2.mp4"} className={"main-video"}/>
                        </Box>
                    </Box>
                </Flex>

                <menu>
                    <Flex gap="5" justify={'center'} mt={"7"}>
                        <Link href={"/about"}><Button>About</Button></Link>
                        <Link href={"/projects"}><Button>Projects</Button></Link>
                        <Link href={"/blog"}><Button>Blog</Button></Link>
                    </Flex>
                </menu>

            </Container>
        </>
    )
}
