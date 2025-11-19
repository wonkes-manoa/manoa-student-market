/*
  Warnings:

  - The values [INTANGIBLE] on the enum `MerchMaterial` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MerchMaterial_new" AS ENUM ('ALUMINUM', 'BAMBOO', 'BRASS', 'BRONZE', 'CARBON', 'CERAMIC', 'CLOTH', 'COPPER', 'FABRIC', 'GLASS', 'GOLD', 'IRON', 'LEATHER', 'PAPER', 'PLASTIC', 'RUBBER', 'SILVER', 'STEEL', 'STONE', 'TITANIUM', 'WOOD', 'OTHER');
ALTER TABLE "Merch" ALTER COLUMN "Material" TYPE "MerchMaterial_new" USING ("Material"::text::"MerchMaterial_new");
ALTER TYPE "MerchMaterial" RENAME TO "MerchMaterial_old";
ALTER TYPE "MerchMaterial_new" RENAME TO "MerchMaterial";
DROP TYPE "MerchMaterial_old";
COMMIT;
