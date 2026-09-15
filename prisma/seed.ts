import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main", heroName: "Abdelhamid Bezzot", brand: "AB", defaultLocale: "en",
      heroRoleEn: "Full-stack developer · Applied AI", heroRoleFr: "Développeur full-stack · IA appliquée",
      heroKickerEn: "// THE PRODUCT AND THE MODEL, IN THE SAME HANDS", heroKickerFr: "// LE PRODUIT ET LE MODÈLE, DANS LES MÊMES MAINS",
      heroProjectsCtaEn: "See projects", heroProjectsCtaFr: "Voir les projets", heroContactCtaEn: "Get in touch", heroContactCtaFr: "Me contacter",
      manifestoEn: "I build the interface.\nI build the model.\nI develop the websites that bring them together.", manifestoFr: "Je construis l’interface.\nJe construis le modèle.\nJe développe les sites qui les font tenir ensemble.",
      manifestoNoteEn: "Three real products, from first idea to a working system.", manifestoNoteFr: "Trois produits réels, de la première idée au système fonctionnel.",
      contactEyebrowEn: "A project, a question, a connection?", contactEyebrowFr: "Un projet, une question, une connexion ?", contactTitleEn: "WRITE TO ME.", contactTitleFr: "ÉCRIVEZ-MOI.",
      contactChoiceEn: "Choose the channel that works for you.", contactChoiceFr: "Choisissez le canal qui vous convient.", location: "Fès, Morocco", footerEn: "AB_ · ABDELHAMID BEZZOT", footerFr: "AB_ · ABDELHAMID BEZZOT",
      seoTitleEn: "Abdelhamid Bezzot — Full-stack developer · Applied AI", seoTitleFr: "Abdelhamid Bezzot — Développeur full-stack · IA appliquée",
      seoDescriptionEn: "Portfolio of Abdelhamid Bezzot: full-stack products and applied AI systems.", seoDescriptionFr: "Portfolio d’Abdelhamid Bezzot : produits full-stack et systèmes d’IA appliquée."
    }
  });

  if (await prisma.marqueeItem.count() === 0) await prisma.marqueeItem.createMany({ data: [
    ["Writing code", "Écrire du code"], ["Training models", "Entraîner des modèles"], ["Breaking things", "Casser les choses"], ["Fixing them", "Les réparer"], ["Shipping", "Déployer"], ["Frontend", "Frontend"], ["Backend", "Backend"], ["Machine Learning", "Machine Learning"]
  ].map(([textEn, textFr], order) => ({ textEn, textFr, order })) });

  if (await prisma.stackCategory.count() === 0) for (const [nameEn, nameFr, labels] of [["Interfaces", "Interfaces", ["HTML", "CSS", "JavaScript", "PHP", "Next.js", "NestJS"]], ["Systems & data", "Systèmes & données", ["PostgreSQL", "MySQL", "Redis", "PL/SQL", "T-SQL", "API REST"]], ["Applied AI", "IA appliquée", ["Scikit-Learn", "TensorFlow", "KNIME", "Talend", "TF-IDF", "KNN"]]] as const) {
    await prisma.stackCategory.create({ data: { nameEn, nameFr, order: (await prisma.stackCategory.count()), techs: { create: labels.map((label, order) => ({ label, order })) } } });
  }

  if (await prisma.processStep.count() === 0) await prisma.processStep.createMany({ data: [
    ["Scoping & data", "Cadrage & données", "Understand the use case, constraints and right problem.", "Comprendre l’usage, les contraintes et le bon problème."],
    ["Architecture", "Architecture", "Design the product and model as one coherent system.", "Dessiner le produit et le modèle comme un seul système."],
    ["Iterative build", "Développement itératif", "Build, test and adjust with the experience at the centre.", "Construire, tester et ajuster avec l’expérience au centre."],
    ["Ship & measure", "Déployer & mesurer", "Go live, observe and improve what matters.", "Mettre en ligne, observer et améliorer ce qui compte."]
  ].map(([titleEn, titleFr, descriptionEn, descriptionFr], order) => ({ titleEn, titleFr, descriptionEn, descriptionFr, order })) });

  if (await prisma.contactLink.count() === 0) await prisma.contactLink.createMany({ data: [
    { type: "email", value: "abdelhamid.bezzot374@gmail.com", order: 0 }, { type: "github", value: "https://github.com/AbdlhamidBezzot", order: 1 }, { type: "linkedin", value: "https://linkedin.com/in/abdelhamidbezzot", order: 2 }
  ] });

  if (await prisma.project.count() === 0) await prisma.project.createMany({ data: [
    { slug: "apollo", titleEn: "Apollo", titleFr: "Apollo", eyebrowEn: "Film discovery / live product", eyebrowFr: "Découverte cinéma / produit en ligne", summaryEn: "A film and series discovery platform with a personalised recommendation experience.", summaryFr: "Plateforme de découverte de films et séries avec une expérience de recommandation personnalisée.", descriptionEn: "A film and series discovery platform with a personalised recommendation experience.", descriptionFr: "Une plateforme de découverte de films et séries, augmentée par un moteur de recommandation pensé pour rendre le choix plus personnel.", problemEn: "Discovery is often lost between endless catalogues and generic recommendations.", problemFr: "La découverte de contenus se perd souvent entre catalogues infinis et recommandations génériques.", solutionEn: "Apollo brings exploration, tracking and recommendations together in one editorial experience.", solutionFr: "Apollo réunit exploration, suivi et recommandations dans une expérience éditoriale unifiée.", roleEn: "Full-stack product design and development: Next.js interface, FastAPI API, Supabase, Redis and product logic.", roleFr: "Conception et développement full-stack : interface Next.js, API FastAPI, intégration Supabase, Redis et logique produit.", statusEn: "Live in production at missapollo.me.", statusFr: "Déployé en production sur missapollo.me.", tags: ["Next.js", "FastAPI", "Supabase", "Redis", "AI"], imageUrl: "/projects/apollo.png", liveUrl: "https://missapollo.me", order: 0 },
    { slug: "bloom", titleEn: "Bloom", titleFr: "Bloom", eyebrowEn: "Skill exchange / web product", eyebrowFr: "Échange de compétences / produit web", summaryEn: "A skills exchange marketplace where time becomes the currency.", summaryFr: "Marketplace d’échange de compétences où le temps devient la monnaie.", descriptionEn: "A skills exchange marketplace where time becomes the currency.", descriptionFr: "Une marketplace d’échange de compétences où le temps devient la monnaie : apprendre, proposer et progresser sans transaction financière.", problemEn: "People who want to learn often have skills to offer, but no simple framework to exchange them.", problemFr: "Les personnes qui souhaitent apprendre ont souvent des compétences à offrir, mais aucun cadre simple pour les échanger.", solutionEn: "Bloom organises profiles, exchanges and real-time conversations around a time-barter system.", solutionFr: "Bloom organise les profils, échanges et conversations en temps réel autour d’un système de troc de temps.", roleEn: "Architecture and development of a real-time platform with exchanges, notifications and job queues.", roleFr: "Architecture et développement d’une plateforme temps réel avec gestion des échanges, notifications et files de tâches.", statusEn: "Deployed as a preview.", statusFr: "Projet déployé en preview.", tags: ["NestJS", "Next.js", "PostgreSQL", "Socket.io", "BullMQ"], imageUrl: "/projects/bloom.png", liveUrl: "https://bloom-roan-alpha.vercel.app", order: 1 },
    { slug: "zaza", titleEn: "ZAZA", titleFr: "ZAZA", eyebrowEn: "Fashion commerce / web product", eyebrowFr: "E-commerce mode / produit web", summaryEn: "A fashion e-commerce platform with an AI stylist and TF-IDF + KNN recommendations.", summaryFr: "E-commerce mode avec styliste IA et recommandations TF-IDF + KNN.", descriptionEn: "A fashion e-commerce platform with an AI stylist and TF-IDF + KNN recommendations.", descriptionFr: "Une plateforme e-commerce de mode avec styliste IA, reliant catalogue, préférences utilisateur et recommandations pertinentes.", problemEn: "Traditional fashion shops offer little guidance when discovering suitable pieces.", problemFr: "Les boutiques de mode traditionnelles offrent peu d’accompagnement dans la découverte de pièces adaptées.", solutionEn: "ZAZA connects a three-tier architecture to a Python microservice that recommends products by similarity.", solutionFr: "ZAZA associe une architecture 3-tiers à un microservice Python qui recommande des produits par similarité.", roleEn: "PHP/MySQL architecture and Flask recommendation microservice using TF-IDF and KNN.", roleFr: "Développement de l’architecture PHP/MySQL et du microservice Flask de recommandation TF-IDF + KNN.", statusEn: "Documented on GitHub.", statusFr: "Projet documenté sur GitHub.", tags: ["PHP 8", "MySQL", "Flask", "TF-IDF", "KNN"], imageUrl: "/projects/zaza.png", githubUrl: "https://github.com/AbdlhamidBezzot/ZAZA", order: 2 }
  ] });
}

main().then(() => prisma.$disconnect()).catch(async (error) => { console.error(error); await prisma.$disconnect(); process.exit(1); });