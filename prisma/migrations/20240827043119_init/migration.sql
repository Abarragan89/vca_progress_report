-- CreateTable
CREATE TABLE "TestScore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "testName" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    CONSTRAINT "TestScore_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
