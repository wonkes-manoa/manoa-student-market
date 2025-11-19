-- CreateTable
CREATE TABLE "CardData" (
    "id" SERIAL NOT NULL,
    "photoItemId" INTEGER,
    "username" TEXT NOT NULL,
    "itemSold" TEXT,
    "price" MONEY,
    "quality" TEXT,
    "dateOfList" DATE,

    CONSTRAINT "CardData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoItem" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,

    CONSTRAINT "PhotoItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardData_photoItemId_key" ON "CardData"("photoItemId");

-- CreateIndex
CREATE UNIQUE INDEX "CardData_username_key" ON "CardData"("username");

-- AddForeignKey
ALTER TABLE "CardData" ADD CONSTRAINT "CardData_photoItemId_fkey" FOREIGN KEY ("photoItemId") REFERENCES "PhotoItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
