/*
  Warnings:

  - You are about to drop the column `idDosen` on the `ExamRoomLec` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExamRoomLec" DROP CONSTRAINT "ExamRoomLec_idDosen_fkey";

-- AlterTable
ALTER TABLE "ExamRoomLec" DROP COLUMN "idDosen";

-- CreateTable
CREATE TABLE "_ExamRoomLecToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExamRoomLecToUser_AB_unique" ON "_ExamRoomLecToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ExamRoomLecToUser_B_index" ON "_ExamRoomLecToUser"("B");

-- AddForeignKey
ALTER TABLE "_ExamRoomLecToUser" ADD CONSTRAINT "_ExamRoomLecToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ExamRoomLec"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamRoomLecToUser" ADD CONSTRAINT "_ExamRoomLecToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
