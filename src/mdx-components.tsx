import { Heading, Quote, Text } from '@radix-ui/themes';
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: (props) => <Heading size="9" {...{children: props.children}} />,
        h2: (props) => <Heading size="7" {...{children: props.children}} />,
        h3: (props) => <Heading size="5" {...{children: props.children}} />,
        h4: (props) => <Heading size="4" {...{children: props.children}} />,
        h5: (props) => <Heading size="3" {...{children: props.children}} />,
        h6: (props) => <Heading size="2" {...{children: props.children}} />,
        p: (props) => <Text {...{children: props.children}} />,
        blockquote: (props) => <Quote {...{children: props.children}} />,

        ...components,
    }
}