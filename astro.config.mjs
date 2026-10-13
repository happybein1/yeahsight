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
            favicon: '/favicon.svg',
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
                {
                    label: 'Environment & Energy',
                    translations: { fr: 'Environnement et énergie' },
                    collapsed: false,
                    items: [
                        { label: 'Earth Land — View per Individual', translations: { fr: 'Terres de la Terre — Vue par individu' }, slug: 'environment-energy/earth-land-view-per-individual' },
                        { label: 'Fair Space Sharing', translations: { fr: "Partage équitable de l'espace" }, slug: 'environment-energy/fair-space-sharing' },
                        { label: 'Clean & Safe Energy', translations: { fr: 'Énergie propre et sûre' }, slug: 'environment-energy/clean-safe-energy' },
                        { label: 'Plant-Based Consumption', translations: { fr: 'Consommation végétale' }, slug: 'environment-energy/plant-based-consumption' },
                    ],
                },
                {
                    label: 'Economy & Equity',
                    translations: { fr: 'Économie et équité' },
                    collapsed: false,
                    items: [
                        { label: 'Universal Allowance', translations: { fr: 'Allocation universelle' }, slug: 'economy-equity/universal-allowance' },
                        { label: 'The Economical System', translations: { fr: 'Le système économique' }, slug: 'economy-equity/the-economical-system' },
                        { label: 'Fair Globe Sharing', translations: { fr: 'Partage équitable du monde' }, slug: 'economy-equity/fair-globe-sharing' },
                        { label: 'Inheritance', translations: { fr: 'Héritage' }, slug: 'economy-equity/inheritance' },
                    ],
                },
                {
                    label: 'Technology & Automation',
                    translations: { fr: 'Technologie et automatisation' },
                    collapsed: false,
                    items: [
                        { label: 'Enhanced Automation', translations: { fr: 'Automatisation améliorée' }, slug: 'technology-automation/enhanced-automation' },
                        { label: 'Impact of Artificial Intelligence', translations: { fr: "Impact de l'intelligence artificielle" }, slug: 'technology-automation/impact-of-artificial-intelligence' },
                        { label: 'Life After Automation', translations: { fr: "La vie après l'automatisation" }, slug: 'technology-automation/life-after-automation' },
                    ],
                },
                {
                    label: 'Social Organization',
                    translations: { fr: 'Organisation sociale' },
                    collapsed: false,
                    items: [
                        { label: 'Purpose of Society', translations: { fr: 'Objectif de la société' }, slug: 'social-organization/purpose-of-society' },
                        { label: 'Societal Systems', translations: { fr: 'Systèmes sociétaux' }, slug: 'social-organization/societal-systems' },
                        { label: 'Societal Functions', translations: { fr: 'Fonctions sociétales' }, slug: 'social-organization/societal-functions' },
                        { label: 'Social Redistribution', translations: { fr: 'Redistribution sociale' }, slug: 'social-organization/social-redistribution' },
                        { label: 'Managing Regional Migration', translations: { fr: 'Gestion de la migration régionale' }, slug: 'social-organization/managing-regional-migration' },
                    ],
                },
                { label: '🧭 Vision & Roadmap', translations: { fr: '🧭 Vision et feuille de route' }, slug: 'vision-roadmap' },
                {
                    label: 'Related',
                    translations: { fr: 'Voir aussi' },
                    collapsed: false,
                    items: [
                        { label: 'YeahCore ↗', link: 'https://core.yeahvibe.com/', attrs: { target: '_blank' } },
                        { label: 'YeahVibe tools ↗', translations: { fr: 'Outils YeahVibe ↗' }, link: 'https://yeahvibe.com/', attrs: { target: '_blank' } },
                        { label: 'HappyBein ↗', link: 'https://happybein.com/', attrs: { target: '_blank' } },
                    ],
                },
            ],
        }),
    ],
});
