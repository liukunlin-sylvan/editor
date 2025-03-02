/*
  Warnings:

  - You are about to drop the column `name` on the `CouponConfig` table. All the data in the column will be lost.
  - The `weight` column on the `CouponConfig` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[hashId]` on the table `CouponConfig` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CouponConfig" DROP COLUMN "name",
DROP COLUMN "weight",
ADD COLUMN     "weight" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "CouponConfig_hashId_key" ON "CouponConfig"("hashId");
