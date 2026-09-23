import { defineCollection, reference, z } from 'astro:content';

const projects = defineCollection({
	type: 'data',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			image: image(),
			alt: z.string(),
			status: z.string().nullable().default(null),
			href: z.string().default('#'),
			order: z.number().default(0),
		}),
});

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		project: reference('projects').optional(),
	}),
});

export const collections = { projects, blog };
