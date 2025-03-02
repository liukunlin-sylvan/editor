-- AlterTable
ALTER TABLE "Hash" ADD COLUMN     "couponIds" INTEGER[];

-- CreateTable
CREATE TABLE "CouponConfig" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "validDate" TIMESTAMP(3) NOT NULL,
    "img" TEXT NOT NULL,
    "isEmpty" BOOLEAN NOT NULL,
    "weight" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "hashId" INTEGER NOT NULL,

    CONSTRAINT "CouponConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CouponConfig_id_hashId_key" ON "CouponConfig"("id", "hashId");

-- AddForeignKey
ALTER TABLE "CouponConfig" ADD CONSTRAINT "CouponConfig_hashId_fkey" FOREIGN KEY ("hashId") REFERENCES "Hash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
