/*
  Warnings:

  - You are about to drop the column `idDosen` on the `HistoryGanti` table. All the data in the column will be lost.
  - Added the required column `idDosenDigantikan` to the `HistoryGanti` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idDosenMenggantikan` to the `HistoryGanti` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoryGanti" DROP COLUMN "idDosen",
ADD COLUMN     "idDosenDigantikan" TEXT NOT NULL,
ADD COLUMN     "idDosenMenggantikan" TEXT NOT NULL;
