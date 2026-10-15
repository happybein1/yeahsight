import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Article type badge shown above the article (v2.06):
				// 'explainer' = neutral background, 'proposal' = HappyBein's view, open for discussion.
				kind: z.enum(['explainer', 'proposal']).optional(),
				// Recorded audio version of the article (v2.07), e.g. /audio/vision-roadmap.en.mp3
				audio: z.string().optional(),
				audioMinutes: z.number().optional(),
			}),
		}),
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
