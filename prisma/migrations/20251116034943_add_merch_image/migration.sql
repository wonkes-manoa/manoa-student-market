/*
  Warnings:

  - You are about to drop the `CardData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PhotoItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CardData" DROP CONSTRAINT "CardData_photoItemId_fkey";

-- DropTable
DROP TABLE "CardData";

-- DropTable
DROP TABLE "PhotoItem";
