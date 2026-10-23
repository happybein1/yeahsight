// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://yeahsight.happybein.com',
    integrations: [
        sitemap({
            i18n: {
                defaultLocale: 'en',
                locales: {
                    en: 'en',
                    fr: 'fr',
                },
            },
        }),
        starlight({
            title: { en: 'YeahSight', fr: 'YeahSight' },
            logo: { src: './src/assets/logo.svg', replacesTitle: true },
            favicon: '/favicon.svg?v=2.31',
            social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/happybein1/yeahsight' },
                { icon: 'discord', label: 'Discord', href: 'https://discord.com/invite/62xRJHCbRW' },
            ],
            customCss: ['./src/styles/custom.css'],
            components: {
                Head: './src/components/overrides/Head.astro',
                Header: './src/components/overrides/Header.astro',
                MobileMenuFooter: './src/components/overrides/MobileMenuFooter.astro',
                MarkdownContent: './src/components/overrides/MarkdownContent.astro',
                Footer: './src/components/overrides/Footer.astro',
            },
            defaultLocale: 'root',
            locales: {
                root: { label: 'English', lang: 'en' },
                fr: { label: 'Français', lang: 'fr' },
            },
            sidebar: [
                { label: '🏠 Home', translations: { fr: '🏠 Accueil' }, link: '/' },
                { label: 'Foresight Trends', translations: { fr: 'Tendances prospectives' }, slug: 'foresight-trends' },
                // v2.33: purpose = understand how societies work and what is changing, then give
                // well-reasoned recommendations. Recommendation themes mirror the forces; article
                // addresses are unchanged (only the menu groups moved).
                {
                    label: '1. How society works',
                    translations: { fr: '1. Comment fonctionne la société' },
                    collapsed: false,
                    items: [
                        { label: 'What Is Society For?', translations: { fr: 'À quoi sert la société ?' }, slug: 'how-society-works/purpose-of-society' },
                        { label: 'What Every Society Must Do', translations: { fr: 'Ce que toute société doit faire' }, slug: 'how-society-works/societal-functions' },
                        { label: 'Societal Systems', translations: { fr: 'Systèmes sociétaux' }, slug: 'how-society-works/societal-systems' },
                        { label: 'The Economic System', translations: { fr: 'Le système économique' }, slug: 'how-society-works/economic-system' },
                        { label: 'Social Redistribution', translations: { fr: 'Redistribution sociale' }, slug: 'sharing-fairly/social-redistribution' },
                        { label: 'Fair Globe Sharing', translations: { fr: 'Partage équitable du monde' }, slug: 'sharing-fairly/fair-globe-sharing' },
                    ],
                },
                {
                    label: '2. Forces shaping the future',
                    translations: { fr: '2. Les forces qui façonnent l\'avenir' },
                    collapsed: false,
                    items: [
                        { label: 'Land per Person', translations: { fr: 'Terres par personne' }, slug: 'forces/land-per-person' },
                        { label: 'Clean & Safe Energy', translations: { fr: 'Énergie propre et sûre' }, slug: 'forces/clean-safe-energy' },
                        { label: 'Managing Regional Migration', translations: { fr: 'Gestion de la migration régionale' }, slug: 'forces/managing-regional-migration' },
                        { label: 'Enhanced Automation', translations: { fr: 'Automatisation améliorée' }, slug: 'forces/enhanced-automation' },
                        { label: 'Impact of Artificial Intelligence', translations: { fr: 'Impact de l\'intelligence artificielle' }, slug: 'forces/impact-of-artificial-intelligence' },
                        { label: 'Life After Automation', translations: { fr: 'La vie après l\'automatisation' }, slug: 'forces/life-after-automation' },
                    ],
                },
                {
                    label: '3. Recommendations',
                    translations: { fr: '3. Recommandations' },
                    collapsed: false,
                    items: [
                        {
                            label: 'Living within limits',
                            translations: { fr: 'Vivre dans les limites' },
                            collapsed: false,
                            items: [
                                { label: 'Plant-Based Consumption', translations: { fr: 'Consommation végétale' }, slug: 'forces/plant-based-consumption' },
                            ],
                        },
                        {
                            label: 'Sharing fairly',
                            translations: { fr: 'Partager équitablement' },
                            collapsed: false,
                            items: [
                                { label: 'Universal Allowance', translations: { fr: 'Allocation universelle' }, slug: 'sharing-fairly/universal-allowance' },
                                { label: 'Fair Space Sharing', translations: { fr: 'Partage équitable de l\'espace' }, slug: 'sharing-fairly/fair-space-sharing' },
                                { label: 'Inheritance', translations: { fr: 'Héritage' }, slug: 'sharing-fairly/inheritance' },
                                { label: 'Making the Transition', translations: { fr: 'Réussir la transition' }, slug: 'sharing-fairly/making-the-transition' },
                                { label: 'The Transition in Practice', translations: { fr: 'La transition en pratique' }, slug: 'sharing-fairly/transition-in-practice' },
                            ],
                        },
                    ],
                },
                {
                    label: '4. Vision & Roadmap',
                    translations: { fr: '4. Vision et feuille de route' },
                    collapsed: false,
                    items: [
                        { label: 'Vision & Roadmap', translations: { fr: 'Vision et feuille de route' }, slug: 'vision-roadmap' },
                        { label: 'Who\'s Working on This', translations: { fr: 'Qui agit déjà' }, slug: 'sharing-fairly/who-is-working-on-this' },
                    ],
                },
                {
                    label: 'Related',
                    translations: { fr: 'Voir aussi' },
                    collapsed: false,
                    items: [
                        { label: 'YeahCore ↗', link: 'https://yeahcore.happybein.com/', attrs: { target: '_blank' } },
                        { label: 'YeahVibe tools ↗', translations: { fr: 'Outils YeahVibe ↗' }, link: 'https://yeahvibe.com/', attrs: { target: '_blank' } },
                        { label: 'HappyBein ↗', link: 'https://happybein.com/', attrs: { target: '_blank' } },
                    ],
                },
            ],
        }),
    ],
});
