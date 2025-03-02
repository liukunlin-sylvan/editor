-- DropForeignKey
ALTER TABLE "CouponConfig" DROP CONSTRAINT "CouponConfig_hashId_fkey";

-- AlterTable
ALTER TABLE "CouponConfig" ALTER COLUMN "hashId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "CouponConfig" ADD CONSTRAINT "CouponConfig_hashId_fkey" FOREIGN KEY ("hashId") REFERENCES "Hash"("key") ON DELETE CASCADE ON UPDATE CASCADE;
