-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReportingPeriod" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "grade" TEXT NOT NULL
);
INSERT INTO "new_ReportingPeriod" ("date", "grade", "id", "name", "roomNumber") SELECT "date", "grade", "id", "name", "roomNumber" FROM "ReportingPeriod";
DROP TABLE "ReportingPeriod";
ALTER TABLE "new_ReportingPeriod" RENAME TO "ReportingPeriod";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
