/*
  Warnings:

  - You are about to drop the column `Image` on the `Merch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Merch" DROP COLUMN "Image";

-- CreateTable
CREATE TABLE "CardData" (
    "id" SERIAL NOT NULL,
    "photoItemId" INTEGER,
    "username" TEXT NOT NULL,
    "itemSold" TEXT,
    "price" MONEY,
    "quality" TEXT,
    "dateOfList" DATE,

    CONSTRAINT "CardData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoItem" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,

    CONSTRAINT "PhotoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchImage" (
    "ImageID" SERIAL NOT NULL,
    "MerchID" INTEGER NOT NULL,
    "FileName" TEXT NOT NULL,
    "MIMEType" TEXT NOT NULL,
    "Data" BYTEA NOT NULL,
    "CreationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MerchImage_pkey" PRIMARY KEY ("ImageID")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardData_photoItemId_key" ON "CardData"("photoItemId");

-- CreateIndex
CREATE UNIQUE INDEX "CardData_username_key" ON "CardData"("username");

-- CreateIndex
CREATE UNIQUE INDEX "MerchImage_ImageID_key" ON "MerchImage"("ImageID");

-- AddForeignKey
ALTER TABLE "CardData" ADD CONSTRAINT "CardData_photoItemId_fkey" FOREIGN KEY ("photoItemId") REFERENCES "PhotoItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchImage" ADD CONSTRAINT "MerchImage_MerchID_fkey" FOREIGN KEY ("MerchID") REFERENCES "Merch"("MerchID") ON DELETE RESTRICT ON UPDATE CASCADE;
