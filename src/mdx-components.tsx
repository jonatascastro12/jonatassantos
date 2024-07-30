import { Blockquote, Heading, Link, Text } from '@radix-ui/themes';
import type { MDXComponents } from 'mdx/types'
import React from 'react';

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


export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: (props) => <Heading size="9" mb="7" {...{children: props.children}} />,
        h2: (props) => <Heading as="h2" mb="6" size="7" {...{children: props.children}} />,
        h3: (props) => <Heading as="h3" mb="2" size="5" {...{children: props.children}} />,
        h4: (props) => <Heading as="h4" size="4" {...{children: props.children}} />,
        h5: (props) => <Heading as="h5" size="3" {...{children: props.children}} />,
        h6: (props) => <Heading as="h6" size="2" {...{children: props.children}} />,
        p: (props) => <Text as="p" mb="4" size="4" {...{children: props.children}} />,
        blockquote: (props) => <Blockquote {...{children: props.children}} />,
        a: (props) => <Link {...{children: props.children, href: props.href}} />,
        ol: asJonatasComponent("ol"),
        ul: asJonatasComponent("ul"),
        li: asJonatasComponent("li"),
        ...components,
    }
}