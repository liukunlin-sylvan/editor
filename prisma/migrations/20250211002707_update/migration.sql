/*
  Warnings:

  - A unique constraint covering the columns `[hashId]` on the table `CouponConfig` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CouponConfig_hashId_key" ON "CouponConfig"("hashId");
