-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "entity" TEXT,
    "cutoffDay" INTEGER
);

-- CreateTable
CREATE TABLE "CategoriesOnTransactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "amount" DECIMAL,
    CONSTRAINT "CategoriesOnTransactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CategoriesOnTransactions_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Movement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Movement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "concept" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "date" DATETIME NOT NULL,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "Movement_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_name_entity_key" ON "Account"("name", "entity");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriesOnTransactions_categoryId_transactionId_key" ON "CategoriesOnTransactions"("categoryId", "transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_subcategory_key" ON "Category"("category", "subcategory");
