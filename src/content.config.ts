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
				// Recorded audio version of the article (v2.07), e.g. https://audio.happybein.com/yeahsight/vision-roadmap.en.mp3 (R2 since v2.25)
				audio: z.string().optional(),
				audioMinutes: z.number().optional(),
				// Podcast feed details (v2.23): file size in bytes, length in seconds, and the date
				// this recording was published. An article is a feed episode once all three are set.
				audioBytes: z.number().optional(),
				audioSeconds: z.number().optional(),
				audioDate: z.coerce.date().optional(),
			}),
		}),
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
