/*
  Warnings:

  - The primary key for the `CouponConfig` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `couponId` on the `CouponConfig` table. All the data in the column will be lost.
  - You are about to drop the column `couponKey` on the `CouponConfig` table. All the data in the column will be lost.
  - You are about to drop the column `couponKey` on the `Hash` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "CouponConfig_couponKey_key";

-- AlterTable
ALTER TABLE "CouponConfig" DROP CONSTRAINT "CouponConfig_pkey",
DROP COLUMN "couponId",
DROP COLUMN "couponKey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL,
ALTER COLUMN "quantity" DROP NOT NULL,
ADD CONSTRAINT "CouponConfig_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Hash" DROP COLUMN "couponKey";
