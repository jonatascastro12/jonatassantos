import NavMenu from '@/components/nav-menu';
import { Container } from '@radix-ui/themes';

export default function MdxLayout({children}: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return <>
        <NavMenu/>

        <Container size="2" height="100%" pt="9" p="3">
            {children}
        </Container>
    </>
}