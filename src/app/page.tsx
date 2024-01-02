import MyTypewriter from '@/components/typewriter';
import { Box, Button, Container, Flex, Grid, Heading, Link, Text } from '@radix-ui/themes';
import { Typewriter } from 'react-simple-typewriter';


export default function Home() {
    const handleType = (count: number) => {
        // access word count number
        console.log(count)
    }

    const handleDone = () => {
        console.log(`Done after 5 loops!`)
    }

    return (
        <Container size="3" height="100%" style={{justifyContent: "center"}}>
            <Flex justify="center" gap="3">
                <Box>
                    <Heading size="9" mt="9">Jônatas Santos</Heading>
                    <Text size="6" color="gray">Software Engineer @ <Link href={"https://workos.com"}
                                                                          target={"_blank"}> WorkOS</Link></Text>

                    <Box mt={"8"}>
                        <Text size="6" color="gray">
                            <MyTypewriter/>
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <Box className="overflow-hidden main-video-mask">
                        <video autoPlay loop muted src={"/jonatas-santos-website.mp4"} className={"main-video"}
                               style={{}}/>
                    </Box>
                </Box>
            </Flex>

            <menu>
                <Flex gap="5" justify={'center'} mt={"7"}>
                    <Button>Menu</Button>
                </Flex>
            </menu>

        </Container>
    )
}
