/*
  Warnings:

  - You are about to drop the column `grade` on the `ReportingPeriod` table. All the data in the column will be lost.
  - Added the required column `gradeLevel` to the `ReportingPeriod` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReportingPeriod" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "gradeLevel" TEXT NOT NULL
);
INSERT INTO "new_ReportingPeriod" ("date", "id", "name", "roomNumber") SELECT "date", "id", "name", "roomNumber" FROM "ReportingPeriod";
DROP TABLE "ReportingPeriod";
ALTER TABLE "new_ReportingPeriod" RENAME TO "ReportingPeriod";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
