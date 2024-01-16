/*
  Warnings:

  - You are about to drop the column `wesbite` on the `Theater` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Theater" DROP COLUMN "wesbite",
ADD COLUMN     "website" TEXT;
