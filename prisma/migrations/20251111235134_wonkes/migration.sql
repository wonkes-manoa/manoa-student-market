/*
  Warnings:

  - A unique constraint covering the columns `[Username]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Username` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "Username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_Username_key" ON "Account"("Username");
