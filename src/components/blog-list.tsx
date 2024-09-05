import { Link } from '@radix-ui/themes';
import React from 'react';

const BlogPostFiles = () => {
    const files = [
        '2024-09-02-new-site.mdx',
        'page.mdx',
        'page.mdx',
        'page.mdx'
    ];

    return (
        <div>
            <h1>Blog Posts</h1>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <Link href={`/blog/${file}`}>{file}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPostFiles;