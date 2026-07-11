// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
    site: 'https://www.yeahvibe.com',
    integrations: [
        starlight({
            title: { en: 'YeahVibe', fr: 'YeahVibe' },
            logo: { src: './src/assets/logo.svg', replacesTitle: true },
            social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/happybein1/yeahvibe-astro' },
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
                { label: '🧭 Start Here', translations: { fr: '🧭 Commencer ici' }, slug: 'start-here' },
                { label: '🛠️ Advised Tools', translations: { fr: '🛠️ Outils conseillés' }, slug: 'advised-tools' },
                {
                    label: 'Decision Foundation',
                    translations: { fr: 'Fondation de la décision' },
                    items: [
                        { label: 'Ideation & Assessment', translations: { fr: 'Idéation et évaluation' }, slug: 'decision-foundation/ideation-assessment' },
                        { label: 'Independent Prioritization', translations: { fr: 'Priorisation indépendante' }, slug: 'decision-foundation/independent-prioritization' },
                        { label: 'Clarity & Alignment', translations: { fr: 'Clarté et alignement' }, slug: 'decision-foundation/clarity-alignment' },
                        { label: 'Tracking and Update', translations: { fr: 'Suivi et mise à jour' }, slug: 'decision-foundation/tracking-and-update' },
                        {
                            label: 'Find Your Directional Purpose',
                            translations: { fr: 'Trouver votre objectif directionnel' },
                            items: [
                                { label: 'Overview', translations: { fr: "Vue d'ensemble" }, slug: 'decision-foundation/find-your-directional-purpose' },
                                { label: 'Generic Primary Goal Breakdown', translations: { fr: 'Décomposition des objectifs primaires' }, slug: 'decision-foundation/find-your-directional-purpose/generic-primary-goal-breakdown' },
                                { label: 'Core Drivers of Feelings', translations: { fr: 'Moteurs des émotions' }, slug: 'decision-foundation/find-your-directional-purpose/core-drivers-of-feelings' },
                                { label: "Human's Physiological Needs", translations: { fr: 'Besoins physiologiques humains' }, slug: 'decision-foundation/find-your-directional-purpose/humans-physiological-needs' },
                            ],
                        },
                    ],
                },
                {
                    label: 'Personal Effectiveness',
                    translations: { fr: 'Efficacité personnelle' },
                    items: [
                        { label: 'Habits Improvement', translations: { fr: 'Amélioration des habitudes' }, slug: 'personal-effectiveness/habits-improvement' },
                        { label: 'Growth Mindset', translations: { fr: "État d'esprit de croissance" }, slug: 'personal-effectiveness/growth-mindset' },
                        { label: 'Fear Management', translations: { fr: 'Gestion de la peur' }, slug: 'personal-effectiveness/fear-management' },
                        { label: 'Sleeping Well', translations: { fr: 'Bien dormir' }, slug: 'personal-effectiveness/sleeping-well' },
                        {
                            label: 'Inspiration',
                            translations: { fr: 'Inspiration' },
                            items: [
                                { label: 'Daily Activities', translations: { fr: 'Activités quotidiennes' }, slug: 'personal-effectiveness/inspiration/daily-activities' },
                                { label: 'Long-Term Goals', translations: { fr: 'Objectifs à long terme' }, slug: 'personal-effectiveness/inspiration/long-term-goals' },
                            ],
                        },
                    ],
                },
                {
                    label: 'Organizational Processes',
                    translations: { fr: 'Processus organisationnels' },
                    items: [
                        { label: 'Basic Organization Principles', translations: { fr: "Principes d'organisation de base" }, slug: 'organizational-processes/basic-organization-principles' },
                        { label: 'Files & Folder Organization', translations: { fr: 'Organisation des fichiers et dossiers' }, slug: 'organizational-processes/files-folder-organization' },
                        { label: 'Managing Commuting Time', translations: { fr: 'Gérer le temps de trajet' }, slug: 'organizational-processes/managing-commuting-time' },
                    ],
                },
                {
                    label: 'Collaboration & Leadership',
                    translations: { fr: 'Collaboration et leadership' },
                    items: [
                        { label: 'Collaboration Principles', translations: { fr: 'Principes de collaboration' }, slug: 'collaboration-leadership/collaboration-principles' },
                        { label: 'Influence and Leadership', translations: { fr: 'Influence et leadership' }, slug: 'collaboration-leadership/influence-and-leadership' },
                        { label: 'Speak Clearly and Confidently', translations: { fr: 'Parler clairement et avec confiance' }, slug: 'collaboration-leadership/speak-clearly-and-confidently' },
                        { label: 'Group Decision Making', translations: { fr: 'Prise de décision en groupe' }, slug: 'collaboration-leadership/group-decision-making' },
                    ],
                },
                {
                    label: 'YeahSight',
                    translations: { fr: 'YeahSight' },
                    items: [
                        { label: 'Foresight Trends', translations: { fr: 'Tendances prospectives' }, slug: 'applications/foresight-trends' },
                        {
                            label: 'Environment & Energy',
                            translations: { fr: 'Environnement et énergie' },
                            items: [
                                { label: 'Earth Land — View per Individual', translations: { fr: 'Terres de la Terre — Vue par individu' }, slug: 'applications/environment-energy/earth-land-view-per-individual' },
                                { label: 'Clean & Safe Energy', translations: { fr: 'Énergie propre et sûre' }, slug: 'applications/environment-energy/clean-safe-energy' },
                                { label: 'Plant-Based Consumption', translations: { fr: 'Consommation végétale' }, slug: 'applications/environment-energy/plant-based-consumption' },
                            ],
                        },
                        {
                            label: 'Economy & Equity',
                            translations: { fr: 'Économie et équité' },
                            items: [
                                { label: 'Universal Allowance', translations: { fr: 'Allocation universelle' }, slug: 'applications/economy-equity/universal-allowance' },
                                { label: 'Mastering Finance Basics', translations: { fr: 'Maîtriser les bases de la finance' }, slug: 'applications/economy-equity/mastering-finance-basics' },
                                { label: 'The Economical System', translations: { fr: 'Le système économique' }, slug: 'applications/economy-equity/the-economical-system' },
                                { label: 'Fair Globe Sharing', translations: { fr: 'Partage équitable du monde' }, slug: 'applications/economy-equity/fair-globe-sharing' },
                            ],
                        },
                        {
                            label: 'Technology & Automation',
                            translations: { fr: 'Technologie et automatisation' },
                            items: [
                                { label: 'Enhanced Automation', translations: { fr: 'Automatisation améliorée' }, slug: 'applications/technology-automation/enhanced-automation' },
                                { label: 'Impact of Artificial Intelligence', translations: { fr: "Impact de l'intelligence artificielle" }, slug: 'applications/technology-automation/impact-of-artificial-intelligence' },
                            ],
                        },
                        {
                            label: 'Social Organization',
                            translations: { fr: 'Organisation sociale' },
                            items: [
                                { label: 'Purpose of Society', translations: { fr: 'Objectif de la société' }, slug: 'applications/social-organization/purpose-of-society' },
                                { label: 'Societal Systems', translations: { fr: 'Systèmes sociétaux' }, slug: 'applications/social-organization/societal-systems' },
                                { label: 'Societal Functions', translations: { fr: 'Fonctions sociétales' }, slug: 'applications/social-organization/societal-functions' },
                                { label: 'Social Redistribution', translations: { fr: 'Redistribution sociale' }, slug: 'applications/social-organization/social-redistribution' },
                                { label: 'Time Spent Identification', translations: { fr: 'Identification du temps passé' }, slug: 'applications/social-organization/time-spent-identification' },
                                { label: 'Managing Regional Migration', translations: { fr: 'Gestion de la migration régionale' }, slug: 'applications/social-organization/managing-regional-migration' },
                            ],
                        },
                    ],
                },
                {
                    label: 'About',
                    translations: { fr: 'À propos' },
                    items: [
                        { label: 'About YeahVibe', translations: { fr: 'À propos de YeahVibe' }, slug: 'about/about-yeahvibe' },
                        { label: 'Supporters & Partners', translations: { fr: 'Supporters et partenaires' }, slug: 'about/supporters-partners' },
                    ],
                },
            ],
        }),
    ],
});
