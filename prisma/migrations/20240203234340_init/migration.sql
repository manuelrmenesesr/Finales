-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "entity" TEXT,
    "cutoffDay" INTEGER
);

-- CreateTable
CREATE TABLE "CategoriesOnMovements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "movementId" INTEGER NOT NULL,
    "amount" DECIMAL NOT NULL,
    CONSTRAINT "CategoriesOnMovements_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CategoriesOnMovements_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Debt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "disbursement" INTEGER NOT NULL,
    "repayment" INTEGER NOT NULL,
    "remaining" DECIMAL NOT NULL,
    CONSTRAINT "Debt_disbursement_fkey" FOREIGN KEY ("disbursement") REFERENCES "CategoriesOnMovements" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Debt_repayment_fkey" FOREIGN KEY ("repayment") REFERENCES "CategoriesOnMovements" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ForeignMovement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" DECIMAL NOT NULL,
    "currency" TEXT NOT NULL,
    "movementId" INTEGER NOT NULL,
    CONSTRAINT "ForeignMovement_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
CREATE UNIQUE INDEX "CategoriesOnMovements_categoryId_movementId_key" ON "CategoriesOnMovements"("categoryId", "movementId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_subcategory_key" ON "Category"("category", "subcategory");

-- CreateIndex
CREATE UNIQUE INDEX "Debt_disbursement_repayment_key" ON "Debt"("disbursement", "repayment");

-- CreateIndex
CREATE UNIQUE INDEX "ForeignMovement_movementId_key" ON "ForeignMovement"("movementId");
