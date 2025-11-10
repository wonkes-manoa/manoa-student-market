-- CreateEnum
CREATE TYPE "AccountPrivilege" AS ENUM ('USER', 'ADMINISTRATOR');

-- CreateEnum
CREATE TYPE "MerchStockStatus" AS ENUM ('ON_STOCK', 'SOLD', 'RECALLED');

-- CreateEnum
CREATE TYPE "MerchTag" AS ENUM ('COLLECTABLE', 'ELECTRONIC', 'FICTIONAL', 'FURNITURE', 'HYGIENE_EQUIPMENT', 'KITCHENWARE', 'SCHOOL_SUPPLY', 'SPORT_EQUIPMENT');

-- CreateEnum
CREATE TYPE "MerchCondition" AS ENUM ('NEW', 'EXCELLENT', 'GOOD', 'FAIR', 'POOR');

-- CreateEnum
CREATE TYPE "MerchMaterial" AS ENUM ('ALUMINUM', 'INTANGIBLE', 'IRON', 'TITANIUM', 'PAPER', 'PLASTIC', 'WOOD', 'OTHER');

-- CreateTable
CREATE TABLE "Account" (
    "AccountID" SERIAL NOT NULL,
    "Privilege" "AccountPrivilege" NOT NULL DEFAULT 'USER',
    "EmailAddress" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "MiddleName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("AccountID")
);

-- CreateTable
CREATE TABLE "Merch" (
    "MerchID" SERIAL NOT NULL,
    "AccountID" INTEGER NOT NULL,
    "PostTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "StockStatus" "MerchStockStatus" NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Length" DOUBLE PRECISION NOT NULL,
    "Width" DOUBLE PRECISION NOT NULL,
    "Height" DOUBLE PRECISION NOT NULL,
    "Mass" DOUBLE PRECISION NOT NULL,
    "Material" "MerchMaterial" NOT NULL,
    "Condition" "MerchCondition" NOT NULL,

    CONSTRAINT "Merch_pkey" PRIMARY KEY ("MerchID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_AccountID_key" ON "Account"("AccountID");

-- CreateIndex
CREATE UNIQUE INDEX "Account_EmailAddress_key" ON "Account"("EmailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Merch_MerchID_key" ON "Merch"("MerchID");

-- AddForeignKey
ALTER TABLE "Merch" ADD CONSTRAINT "Merch_AccountID_fkey" FOREIGN KEY ("AccountID") REFERENCES "Account"("AccountID") ON DELETE RESTRICT ON UPDATE CASCADE;
