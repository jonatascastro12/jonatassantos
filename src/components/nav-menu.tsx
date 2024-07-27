"use client";

import { Button, Flex, Link } from '@radix-ui/themes';
import { usePathname } from 'next/navigation';

const NavMenu = () => {
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
        {
            label: 'Blog',
            href: '/blog'
        }
    ];

    return <menu>
        <Flex gap="5" justify={'center'} mt={'7'}>
            {menu.filter((item) => item.href !== pathname).map((item, index) => {
                return <Link key={index} href={item.href}><Button>{item.label}</Button></Link>
            })}
        </Flex>
    </menu>;
}

export default NavMenu;