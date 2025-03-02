/*
  Warnings:

  - A unique constraint covering the columns `[couponKey]` on the table `CouponConfig` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CouponConfig_couponKey_key" ON "CouponConfig"("couponKey");
