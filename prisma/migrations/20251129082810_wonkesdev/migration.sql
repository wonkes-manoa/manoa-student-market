/*
  Warnings:

  - A unique constraint covering the columns `[PwdResetCode]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "PwdResetCode" TEXT,
ADD COLUMN     "PwdRstCdExp" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Account_PwdResetCode_key" ON "Account"("PwdResetCode");
