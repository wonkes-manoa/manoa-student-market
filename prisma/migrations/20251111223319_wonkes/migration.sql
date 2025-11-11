/*
  Warnings:

  - Added the required column `HUnit` to the `Merch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LUnit` to the `Merch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MUnit` to the `Merch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WUnit` to the `Merch` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LengthUnit" AS ENUM ('MILLIMETER', 'CENTIMETER', 'DECIMETER', 'METER', 'INCH', 'FEET', 'YARD', 'MILE');

-- CreateEnum
CREATE TYPE "MassUnit" AS ENUM ('MILLIGRAM', 'GRAM', 'KILOGRAM', 'TON', 'OUNCE', 'POUND');

-- AlterTable
ALTER TABLE "Merch" ADD COLUMN     "HUnit" "LengthUnit" NOT NULL,
ADD COLUMN     "Image" TEXT[],
ADD COLUMN     "LUnit" "LengthUnit" NOT NULL,
ADD COLUMN     "MUnit" "MassUnit" NOT NULL,
ADD COLUMN     "WUnit" "LengthUnit" NOT NULL;
