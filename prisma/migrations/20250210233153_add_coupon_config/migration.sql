/*
  Warnings:

  - The primary key for the `CouponConfig` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CouponConfig` table. All the data in the column will be lost.
  - You are about to drop the column `couponIds` on the `Hash` table. All the data in the column will be lost.
  - Added the required column `couponKey` to the `CouponConfig` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CouponConfig" DROP CONSTRAINT "CouponConfig_hashId_fkey";

-- DropIndex
DROP INDEX "CouponConfig_id_hashId_key";

-- AlterTable
ALTER TABLE "CouponConfig" DROP CONSTRAINT "CouponConfig_pkey",
DROP COLUMN "id",
ADD COLUMN     "couponId" SERIAL NOT NULL,
ADD COLUMN     "couponKey" TEXT NOT NULL,
ADD CONSTRAINT "CouponConfig_pkey" PRIMARY KEY ("couponId");

-- AlterTable
ALTER TABLE "Hash" DROP COLUMN "couponIds",
ADD COLUMN     "couponKey" TEXT NOT NULL DEFAULT 'default-key';

-- AddForeignKey
ALTER TABLE "CouponConfig" ADD CONSTRAINT "CouponConfig_hashId_fkey" FOREIGN KEY ("hashId") REFERENCES "Hash"("id") ON DELETE CASCADE ON UPDATE CASCADE;
