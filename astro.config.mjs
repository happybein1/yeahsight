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
                    es: 'es',
                    nl: 'nl',
                },
            },
        }),
        starlight({
            title: { en: 'YeahSight', fr: 'YeahSight', es: 'YeahSight', nl: 'YeahSight' },
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
                Pagination: './src/components/overrides/Pagination.astro',
                Footer: './src/components/overrides/Footer.astro',
            },
            defaultLocale: 'root',
            locales: {
                root: { label: 'English', lang: 'en' },
                fr: { label: 'Français', lang: 'fr' },
                // v2.64 (owner, 2026-11-10): Spanish and Dutch.
                es: { label: 'Español', lang: 'es' },
                nl: { label: 'Nederlands', lang: 'nl' },
            },
            sidebar: [
                { label: '🏠 Home', translations: { fr: '🏠 Accueil', es: '🏠 Inicio', nl: '🏠 Home' }, link: '/' },
                { label: 'Foresight Trends', translations: { fr: 'Tendances prospectives', es: 'Tendencias de futuro', nl: 'Toekomsttrends' }, slug: 'foresight-trends' },
                // v2.48 (owner: "publish all except the proposals"): seven new explainers replace the grey items or join them
                // (Climate Change first in 4, Population after Migration, How Societies Change closes 3); Societal Systems
                // is renamed "Who Keeps Society Running?" (same address).
                // v2.47 (owner): each question opens with an Overview page (src/content/docs/questions/).
                // v2.46 (owner): the menu follows the six questions of the home-page story; Previous/Next
                // (components/overrides/Pagination.astro) follow it too and skip the grey 'likely later' items
                // (class yv-planned, not clickable). Article addresses are unchanged.
                {
                    label: '1. What does every person need to live well and thrive?',
                    translations: { fr: "1. De quoi chaque personne a-t-elle besoin pour bien vivre et s'épanouir ?", es: '1. ¿Qué necesita cada persona para vivir bien y desarrollarse?', nl: '1. Wat heeft ieder mens nodig om goed te leven en te groeien?' },
                    collapsed: false,
                    items: [
                        { label: 'Overview', translations: { fr: "Vue d'ensemble", es: 'Visión general', nl: 'Overzicht' }, slug: 'questions/1-needs' },
                        { label: 'Human needs on YeahCore ↗', translations: { fr: 'Les besoins humains sur YeahCore ↗', es: 'Las necesidades humanas en YeahCore ↗', nl: 'Menselijke behoeften op YeahCore ↗' }, link: 'https://yeahcore.happybein.com/decision-foundation/find-your-directional-purpose/humans-physiological-needs/', attrs: { target: '_blank' } },
                    ],
                },
                {
                    label: '2. What resources does the planet offer?',
                    translations: { fr: '2. Quelles ressources la planète offre-t-elle ?', es: '2. ¿Qué recursos ofrece el planeta?', nl: '2. Welke hulpbronnen biedt de planeet?' },
                    collapsed: false,
                    items: [
                        { label: 'Overview', translations: { fr: "Vue d'ensemble", es: 'Visión general', nl: 'Overzicht' }, slug: 'questions/2-resources' },
                        { label: 'Land per Person', translations: { fr: 'Terres par personne', es: 'Tierra por persona', nl: 'Land per persoon' }, slug: 'forces/land-per-person' },
                        { label: 'Fair Globe Sharing', translations: { fr: 'Partage équitable du monde', es: 'Reparto justo del planeta', nl: 'De wereld eerlijk delen' }, slug: 'sharing-fairly/fair-globe-sharing' },
                        { label: 'Nature and Water', translations: { fr: "La nature et l'eau", es: 'La naturaleza y el agua', nl: 'Natuur en water' }, slug: 'forces/nature-and-water' },
                    ],
                },
                {
                    label: '3. How does society turn those resources into what people need?',
                    translations: { fr: '3. Comment la société transforme-t-elle ces ressources en ce dont les gens ont besoin ?', es: '3. ¿Cómo convierte la sociedad esos recursos en lo que la gente necesita?', nl: '3. Hoe zet de samenleving die hulpbronnen om in wat mensen nodig hebben?' },
                    collapsed: false,
                    items: [
                        { label: 'Overview', translations: { fr: "Vue d'ensemble", es: 'Visión general', nl: 'Overzicht' }, slug: 'questions/3-society' },
                        { label: 'What Is Society For?', translations: { fr: 'À quoi sert la société ?', es: '¿Para qué sirve la sociedad?', nl: 'Waar is de samenleving voor?' }, slug: 'how-society-works/purpose-of-society' },
                        { label: 'What Every Society Must Do', translations: { fr: 'Ce que toute société doit faire', es: 'Lo que toda sociedad debe hacer', nl: 'Wat elke samenleving moet doen' }, slug: 'how-society-works/societal-functions' },
                        { label: 'Who Keeps Society Running?', translations: { fr: 'Qui fait tourner la société ?', es: '¿Quién mantiene en marcha la sociedad?', nl: 'Wie houdt de samenleving draaiende?' }, slug: 'how-society-works/societal-systems' },
                        { label: 'The Economic System', translations: { fr: 'Le système économique', es: 'El sistema económico', nl: 'Het economische systeem' }, slug: 'how-society-works/economic-system' },
                        { label: 'Social Redistribution', translations: { fr: 'Redistribution sociale', es: 'Redistribución social', nl: 'Sociale herverdeling' }, slug: 'sharing-fairly/social-redistribution' },
                        { label: 'Democracy and Reliable Information', translations: { fr: 'La démocratie et une information fiable', es: 'La democracia y la información fiable', nl: 'Democratie en betrouwbare informatie' }, slug: 'how-society-works/democracy-and-information' },
                        { label: 'Global Health and Extreme Poverty', translations: { fr: "La santé mondiale et l'extrême pauvreté", es: 'La salud mundial y la pobreza extrema', nl: 'Wereldwijde gezondheid en extreme armoede' }, slug: 'how-society-works/global-health-and-poverty' },
                        { label: 'How Societies Change', translations: { fr: 'Comment les sociétés changent', es: 'Cómo cambian las sociedades', nl: 'Hoe samenlevingen veranderen' }, slug: 'how-society-works/how-societies-change' },
                    ],
                },
                {
                    label: '4. Which big forces are reshaping society?',
                    translations: { fr: '4. Quelles grandes forces transforment la société ?', es: '4. ¿Qué grandes fuerzas están transformando la sociedad?', nl: '4. Welke grote krachten veranderen de samenleving?' },
                    collapsed: false,
                    items: [
                        { label: 'Overview', translations: { fr: "Vue d'ensemble", es: 'Visión general', nl: 'Overzicht' }, slug: 'questions/4-forces' },
                        { label: 'Climate Change', translations: { fr: 'Le changement climatique', es: 'El cambio climático', nl: 'Klimaatverandering' }, slug: 'forces/climate-change' },
                        { label: 'The Energy Transition', translations: { fr: 'La transition énergétique', es: 'La transición energética', nl: 'De energietransitie' }, slug: 'forces/clean-safe-energy' },
                        { label: 'Managing Regional Migration', translations: { fr: 'Gestion de la migration régionale', es: 'La gestión de la migración regional', nl: 'Regionale migratie beheren' }, slug: 'forces/managing-regional-migration' },
                        { label: 'Population Change and Ageing', translations: { fr: 'Évolution de la population et vieillissement', es: 'Evolución de la población y envejecimiento', nl: 'Bevolkingsverandering en vergrijzing' }, slug: 'forces/population-change' },
                        { label: 'Enhanced Automation', translations: { fr: 'Automatisation améliorée', es: 'La automatización', nl: 'Automatisering' }, slug: 'forces/enhanced-automation' },
                        { label: 'Impact of Artificial Intelligence', translations: { fr: "Impact de l'intelligence artificielle", es: 'El impacto de la inteligencia artificial', nl: 'De impact van kunstmatige intelligentie' }, slug: 'forces/impact-of-artificial-intelligence' },
                        { label: 'Life After Automation', translations: { fr: "La vie après l'automatisation", es: 'La vida después de la automatización', nl: 'Het leven na automatisering' }, slug: 'forces/life-after-automation' },
                        { label: 'Big Risks: Pandemics, Nuclear War, Advanced AI', translations: { fr: 'Les grands risques : pandémies, guerre nucléaire, IA avancée', es: 'Los grandes riesgos: pandemias, guerra nuclear, IA avanzada', nl: "Grote risico's: pandemieën, kernoorlog, geavanceerde AI" }, slug: 'forces/big-risks' },
                    ],
                },
                {
                    label: "5. Which solutions could tackle society's main challenges?",
                    translations: { fr: '5. Quelles solutions pourraient répondre aux principaux défis de la société ?', es: '5. ¿Qué soluciones podrían afrontar los principales retos de la sociedad?', nl: '5. Welke oplossingen kunnen de grootste uitdagingen van de samenleving aanpakken?' },
                    collapsed: false,
                    items: [
                        { label: 'Overview', translations: { fr: "Vue d'ensemble", es: 'Visión general', nl: 'Overzicht' }, slug: 'questions/5-solutions' },
                        {
                            label: 'Living within limits',
                            translations: { fr: 'Vivre dans les limites', es: 'Vivir dentro de los límites', nl: 'Binnen de grenzen leven' },
                            collapsed: false,
                            items: [
                                { label: 'Plant-Based Consumption', translations: { fr: 'Consommation végétale', es: 'Consumo vegetal', nl: 'Plantaardig eten' }, slug: 'forces/plant-based-consumption' },
                                { label: 'Fair Space Sharing', translations: { fr: "Partage équitable de l'espace", es: 'Reparto justo del espacio', nl: 'Eerlijk ruimte delen' }, slug: 'sharing-fairly/fair-space-sharing' },
                            ],
                        },
                        {
                            label: 'Sharing fairly',
                            translations: { fr: 'Partager équitablement', es: 'Repartir con justicia', nl: 'Eerlijk delen' },
                            collapsed: false,
                            items: [
                                { label: 'Universal Allowance', translations: { fr: 'Allocation universelle', es: 'Asignación universal', nl: 'Universele toelage' }, slug: 'sharing-fairly/universal-allowance' },
                                { label: 'Inheritance', translations: { fr: 'Héritage', es: 'La herencia', nl: 'Erfenis' }, slug: 'sharing-fairly/inheritance' },
                            ],
                        },
                        // v2.62 (owner, 2026-11-10: "they can be published"): the two new proposals, then the transition
                        // article on its own as the closing step (owner agreed Fair Start closes Solutions).
                        {
                            label: 'People, work and technology',
                            translations: { fr: 'Les gens, le travail et la technologie', es: 'Las personas, el trabajo y la tecnología', nl: 'Mensen, werk en technologie' },
                            collapsed: false,
                            items: [
                                { label: 'Work in an Automated World', translations: { fr: 'Le travail dans un monde automatisé', es: 'El trabajo en un mundo automatizado', nl: 'Werk in een geautomatiseerde wereld' }, slug: 'sharing-fairly/work-in-an-automated-world' },
                                { label: 'People Migration That Works', translations: { fr: 'Une migration humaine qui fonctionne', es: 'Una migración humana que funcione', nl: 'Migratie die werkt' }, slug: 'sharing-fairly/migration-that-works' },
                            ],
                        },
                        {
                            label: 'Getting there',
                            translations: { fr: 'Comment y arriver', es: 'Cómo llegar', nl: 'Hoe komen we er' },
                            collapsed: false,
                            items: [
                                { label: 'From Inherited Wealth to a Fair Start', translations: { fr: 'De la richesse héritée à un départ équitable', es: 'De la riqueza heredada a un comienzo justo', nl: 'Van geërfde rijkdom naar een eerlijke start' }, slug: 'sharing-fairly/making-the-transition' },
                            ],
                        },
                    ],
                },
                {
                    label: '6. Which causes would do the most good for the world?',
                    translations: { fr: '6. Quelles causes feraient le plus de bien au monde ?', es: '6. ¿Qué causas harían más bien al mundo?', nl: '6. Welke doelen zouden de wereld het meeste goed doen?' },
                    collapsed: false,
                    items: [
                        { label: 'Overview', translations: { fr: "Vue d'ensemble", es: 'Visión general', nl: 'Overzicht' }, slug: 'questions/6-causes' },
                        { label: 'Where Help Counts Most', translations: { fr: "Là où l'aide compte le plus", es: 'Dónde cuenta más la ayuda', nl: 'Waar hulp het meest telt' }, slug: 'where-help-counts-most' },
                        { label: 'Vision & Roadmap', translations: { fr: 'Vision et feuille de route', es: 'Visión y hoja de ruta', nl: 'Visie en routekaart' }, slug: 'vision-roadmap' },
                        { label: "Who's Working on This", translations: { fr: 'Qui agit déjà', es: 'Quién está actuando ya', nl: 'Wie er al aan werkt' }, slug: 'sharing-fairly/who-is-working-on-this' },
                    ],
                },
                {
                    label: 'Related',
                    translations: { fr: 'Voir aussi', es: 'Ver también', nl: 'Zie ook' },
                    collapsed: false,
                    items: [
                        { label: 'YeahCore ↗', link: 'https://yeahcore.happybein.com/', attrs: { target: '_blank' } },
                        { label: 'YeahVibe tools ↗', translations: { fr: 'Outils YeahVibe ↗', es: 'Herramientas YeahVibe ↗', nl: 'YeahVibe-tools ↗' }, link: 'https://yeahvibe.com/', attrs: { target: '_blank' } },
                        { label: 'HappyBein ↗', link: 'https://happybein.com/', attrs: { target: '_blank' } },
                    ],
                },
            ],
        }),
    ],
});
