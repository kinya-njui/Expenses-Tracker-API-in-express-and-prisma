-- CreateTable
CREATE TABLE "expenses" (
    "item_title" TEXT NOT NULL,
    "item_quantity" TEXT NOT NULL,
    "item_price" TEXT NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("item_title")
);

-- CreateIndex
CREATE UNIQUE INDEX "expenses_item_title_key" ON "expenses"("item_title");
