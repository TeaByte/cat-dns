/*
  Warnings:

  - A unique constraint covering the columns `[subdomain]` on the table `SubDomain` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subdomain` to the `SubDomain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubDomain" ADD COLUMN     "subdomain" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SubDomain_subdomain_key" ON "SubDomain"("subdomain");
