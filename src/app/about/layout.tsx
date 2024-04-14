import { Container } from '@radix-ui/themes';

export default function MdxLayout({children}: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return <>
        <Container size="3" height="100%" style={{justifyContent: "center"}}>
            {children}
        </Container>
    </>
}