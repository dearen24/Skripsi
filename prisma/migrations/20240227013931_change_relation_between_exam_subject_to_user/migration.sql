/*
  Warnings:

  - You are about to drop the column `idDosen` on the `ExamSubject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExamSubject" DROP CONSTRAINT "ExamSubject_idDosen_fkey";

-- AlterTable
ALTER TABLE "ExamSubject" DROP COLUMN "idDosen";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idDosen" TEXT NOT NULL DEFAULT '1';

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idDosen_fkey" FOREIGN KEY ("idDosen") REFERENCES "ExamSubject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
