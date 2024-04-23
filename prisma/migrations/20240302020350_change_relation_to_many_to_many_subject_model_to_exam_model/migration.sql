/*
  Warnings:

  - You are about to drop the column `idUjian` on the `Subject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_idUjian_fkey";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "idUjian";

-- CreateTable
CREATE TABLE "_ExamToSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExamToSubject_AB_unique" ON "_ExamToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_ExamToSubject_B_index" ON "_ExamToSubject"("B");

-- AddForeignKey
ALTER TABLE "_ExamToSubject" ADD CONSTRAINT "_ExamToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamToSubject" ADD CONSTRAINT "_ExamToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
