import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('DevUp Society'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    keywords: z.string().optional(),
  })
});

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
  })
});

export const collections = {
  'blog': blogCollection,
  'pages': pagesCollection,
};
