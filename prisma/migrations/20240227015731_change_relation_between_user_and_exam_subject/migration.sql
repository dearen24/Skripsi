/*
  Warnings:

  - You are about to drop the column `idDosen` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_idDosen_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "idDosen";

-- CreateTable
CREATE TABLE "_ExamSubjectToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExamSubjectToUser_AB_unique" ON "_ExamSubjectToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ExamSubjectToUser_B_index" ON "_ExamSubjectToUser"("B");

-- AddForeignKey
ALTER TABLE "_ExamSubjectToUser" ADD CONSTRAINT "_ExamSubjectToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ExamSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamSubjectToUser" ADD CONSTRAINT "_ExamSubjectToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
