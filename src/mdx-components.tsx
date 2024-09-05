import { Blockquote, Heading, Link, Text } from '@radix-ui/themes';
import type { MDXComponents } from 'mdx/types'
import React, { PropsWithChildren, PropsWithRef } from 'react';

const asJonatasComponent = (name: string) => {
    const component = (props: React.PropsWithChildren<{
        [key: string]: any
    }>) => React.createElement(name, {
        ...{
            children: props.children,
            className: `jonatas ${name} ${props.className ?? ""}`,
        }
    });

    component.displayName = "JonatasComponent"

    return component
}

export const defaultComponents = {
    h1: (props: PropsWithChildren) => <Heading size="9" mb="7" {...{children: props.children}} />,
    h2: (props: PropsWithChildren) => <Heading as="h2" mb="2" size="7" {...{children: props.children}} />,
    h3: (props: PropsWithChildren) => <Heading as="h3" mb="2" size="5" {...{children: props.children}} />,
    h4: (props: PropsWithChildren) => <Heading as="h4" size="4" {...{children: props.children}} />,
    h5: (props: PropsWithChildren) => <Heading as="h5" size="3" {...{children: props.children}} />,
    h6: (props: PropsWithChildren) => <Heading as="h6" size="2" {...{children: props.children}} />,
    p: (props: PropsWithChildren) => <Text as="p" mb="4" size="4" {...{children: props.children}} />,
    blockquote: (props: PropsWithChildren) => <Blockquote {...{children: props.children}} />,
    a: (props: PropsWithRef<any>) => <Link target="_blank" {...{children: props.children, href: props.href}} />,
    ol: asJonatasComponent("ol"),
    ul: asJonatasComponent("ul"),
    li: asJonatasComponent("li"),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {...defaultComponents, ...components}
}