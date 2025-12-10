/*
  Warnings:

  - The values [ADMINISTRATOR] on the enum `AccountPrivilege` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccountPrivilege_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "Account" ALTER COLUMN "Privilege" DROP DEFAULT;
ALTER TABLE "Account" ALTER COLUMN "Privilege" TYPE "AccountPrivilege_new" USING ("Privilege"::text::"AccountPrivilege_new");
ALTER TYPE "AccountPrivilege" RENAME TO "AccountPrivilege_old";
ALTER TYPE "AccountPrivilege_new" RENAME TO "AccountPrivilege";
DROP TYPE "AccountPrivilege_old";
ALTER TABLE "Account" ALTER COLUMN "Privilege" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "LikedMerch" DROP CONSTRAINT "LikedMerch_AccountID_fkey";

-- DropForeignKey
ALTER TABLE "LikedMerch" DROP CONSTRAINT "LikedMerch_MerchID_fkey";

-- DropForeignKey
ALTER TABLE "Merch" DROP CONSTRAINT "Merch_AccountID_fkey";

-- DropForeignKey
ALTER TABLE "MerchImage" DROP CONSTRAINT "MerchImage_MerchID_fkey";

-- AddForeignKey
ALTER TABLE "LikedMerch" ADD CONSTRAINT "LikedMerch_AccountID_fkey" FOREIGN KEY ("AccountID") REFERENCES "Account"("AccountID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedMerch" ADD CONSTRAINT "LikedMerch_MerchID_fkey" FOREIGN KEY ("MerchID") REFERENCES "Merch"("MerchID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merch" ADD CONSTRAINT "Merch_AccountID_fkey" FOREIGN KEY ("AccountID") REFERENCES "Account"("AccountID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchImage" ADD CONSTRAINT "MerchImage_MerchID_fkey" FOREIGN KEY ("MerchID") REFERENCES "Merch"("MerchID") ON DELETE CASCADE ON UPDATE CASCADE;
