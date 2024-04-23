/*
  Warnings:

  - You are about to drop the `_ExamRoomLecToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExamRoomLecToUser" DROP CONSTRAINT "_ExamRoomLecToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExamRoomLecToUser" DROP CONSTRAINT "_ExamRoomLecToUser_B_fkey";

-- AlterTable
ALTER TABLE "ExamRoomLec" ADD COLUMN     "idDosen" TEXT;

-- DropTable
DROP TABLE "_ExamRoomLecToUser";

-- AddForeignKey
ALTER TABLE "ExamRoomLec" ADD CONSTRAINT "ExamRoomLec_idDosen_fkey" FOREIGN KEY ("idDosen") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
