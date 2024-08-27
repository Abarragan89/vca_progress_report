/*
  Warnings:

  - Added the required column `grade` to the `ReportingPeriod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNumber` to the `ReportingPeriod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherComments` to the `StudentReport` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReportingPeriod" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL
);
INSERT INTO "new_ReportingPeriod" ("date", "id", "name") SELECT "date", "id", "name" FROM "ReportingPeriod";
DROP TABLE "ReportingPeriod";
ALTER TABLE "new_ReportingPeriod" RENAME TO "ReportingPeriod";
CREATE TABLE "new_StudentReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentName" TEXT NOT NULL,
    "absences" INTEGER NOT NULL,
    "tardies" INTEGER NOT NULL,
    "teacherName" TEXT NOT NULL,
    "otherComments" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "reportingPeriodId" INTEGER,
    CONSTRAINT "StudentReport_reportingPeriodId_fkey" FOREIGN KEY ("reportingPeriodId") REFERENCES "ReportingPeriod" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_StudentReport" ("absences", "date", "id", "reportingPeriodId", "studentName", "tardies", "teacherName") SELECT "absences", "date", "id", "reportingPeriodId", "studentName", "tardies", "teacherName" FROM "StudentReport";
DROP TABLE "StudentReport";
ALTER TABLE "new_StudentReport" RENAME TO "StudentReport";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
