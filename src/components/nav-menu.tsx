"use client";

import { SocialBar } from '@/components/social-bar';
import { Box, Button, Flex, Link } from '@radix-ui/themes';
import { usePathname } from 'next/navigation';

const NavMenu = ({displaySocial = true}) => {
    const pathname = usePathname();

    const menu = [
        {
            label: 'Home',
            href: '/'
        },
        {
            label: 'About',
            href: '/about'
        },
        {
            label: 'Projects',
            href: '/projects'
        },
        // {
        //     label: 'Blog',
        //     href: '/blog'
        // }
    ];

    return <menu>
        <Flex justify={'between'} pt={'5'}>
            <Box width="9"></Box>
            <Flex gap="5" justify={'center'}>
                {menu.filter((item) => item.href !== pathname).map((item, index) => {
                    return <Link key={index} href={item.href}><Button>{item.label}</Button></Link>
                })}
            </Flex>
            { displaySocial ? <SocialBar/> : <div></div>}
        </Flex>
    </menu>;
}

export default NavMenu;