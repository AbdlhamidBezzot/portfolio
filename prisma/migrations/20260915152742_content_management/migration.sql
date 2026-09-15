-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "defaultLocale" TEXT NOT NULL DEFAULT 'en',
    "brand" TEXT NOT NULL DEFAULT 'AB_AI',
    "heroName" TEXT NOT NULL DEFAULT 'Abdelhamid Bezzot',
    "heroRoleEn" TEXT NOT NULL DEFAULT '',
    "heroRoleFr" TEXT NOT NULL DEFAULT '',
    "heroKickerEn" TEXT NOT NULL DEFAULT '',
    "heroKickerFr" TEXT NOT NULL DEFAULT '',
    "heroProjectsCtaEn" TEXT NOT NULL DEFAULT '',
    "heroProjectsCtaFr" TEXT NOT NULL DEFAULT '',
    "heroProjectsTarget" TEXT NOT NULL DEFAULT '#projects',
    "heroContactCtaEn" TEXT NOT NULL DEFAULT '',
    "heroContactCtaFr" TEXT NOT NULL DEFAULT '',
    "heroContactTarget" TEXT NOT NULL DEFAULT '#contact',
    "manifestoEn" TEXT NOT NULL DEFAULT '',
    "manifestoFr" TEXT NOT NULL DEFAULT '',
    "manifestoNoteEn" TEXT NOT NULL DEFAULT '',
    "manifestoNoteFr" TEXT NOT NULL DEFAULT '',
    "contactEyebrowEn" TEXT NOT NULL DEFAULT '',
    "contactEyebrowFr" TEXT NOT NULL DEFAULT '',
    "contactTitleEn" TEXT NOT NULL DEFAULT '',
    "contactTitleFr" TEXT NOT NULL DEFAULT '',
    "contactChoiceEn" TEXT NOT NULL DEFAULT '',
    "contactChoiceFr" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "footerEn" TEXT NOT NULL DEFAULT '',
    "footerFr" TEXT NOT NULL DEFAULT '',
    "seoTitleEn" TEXT NOT NULL DEFAULT '',
    "seoTitleFr" TEXT NOT NULL DEFAULT '',
    "seoDescriptionEn" TEXT NOT NULL DEFAULT '',
    "seoDescriptionFr" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarqueeItem" (
    "id" TEXT NOT NULL,
    "textEn" TEXT NOT NULL,
    "textFr" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarqueeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StackCategory" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameFr" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StackCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StackTech" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StackTech_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessStep" (
    "id" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcessStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactLink" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleFr" TEXT NOT NULL,
    "eyebrowEn" TEXT NOT NULL DEFAULT '',
    "eyebrowFr" TEXT NOT NULL DEFAULT '',
    "summaryEn" TEXT NOT NULL,
    "summaryFr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "problemEn" TEXT NOT NULL DEFAULT '',
    "problemFr" TEXT NOT NULL DEFAULT '',
    "solutionEn" TEXT NOT NULL DEFAULT '',
    "solutionFr" TEXT NOT NULL DEFAULT '',
    "roleEn" TEXT NOT NULL DEFAULT '',
    "roleFr" TEXT NOT NULL DEFAULT '',
    "statusEn" TEXT NOT NULL DEFAULT '',
    "statusFr" TEXT NOT NULL DEFAULT '',
    "tags" TEXT[],
    "imageUrl" TEXT,
    "liveUrl" TEXT,
    "githubUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MarqueeItem_order_idx" ON "MarqueeItem"("order");

-- CreateIndex
CREATE INDEX "StackCategory_order_idx" ON "StackCategory"("order");

-- CreateIndex
CREATE INDEX "StackTech_categoryId_order_idx" ON "StackTech"("categoryId", "order");

-- CreateIndex
CREATE INDEX "ProcessStep_order_idx" ON "ProcessStep"("order");

-- CreateIndex
CREATE UNIQUE INDEX "ContactLink_type_key" ON "ContactLink"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_published_order_idx" ON "Project"("published", "order");

-- AddForeignKey
ALTER TABLE "StackTech" ADD CONSTRAINT "StackTech_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "StackCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
