-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShoppingListItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shoppingListId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ShoppingListItem_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "ShoppingList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShoppingListItem_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ShoppingListItem" ("amount", "id", "ingredientId", "shoppingListId") SELECT "amount", "id", "ingredientId", "shoppingListId" FROM "ShoppingListItem";
DROP TABLE "ShoppingListItem";
ALTER TABLE "new_ShoppingListItem" RENAME TO "ShoppingListItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
