-- CreateTable
CREATE TABLE "LikedMerch" (
    "LikeID" SERIAL NOT NULL,
    "AccountID" INTEGER NOT NULL,
    "MerchID" INTEGER NOT NULL,

    CONSTRAINT "LikedMerch_pkey" PRIMARY KEY ("LikeID")
);

-- CreateIndex
CREATE UNIQUE INDEX "LikedMerch_AccountID_MerchID_key" ON "LikedMerch"("AccountID", "MerchID");

-- AddForeignKey
ALTER TABLE "LikedMerch" ADD CONSTRAINT "LikedMerch_AccountID_fkey" FOREIGN KEY ("AccountID") REFERENCES "Account"("AccountID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedMerch" ADD CONSTRAINT "LikedMerch_MerchID_fkey" FOREIGN KEY ("MerchID") REFERENCES "Merch"("MerchID") ON DELETE RESTRICT ON UPDATE CASCADE;
