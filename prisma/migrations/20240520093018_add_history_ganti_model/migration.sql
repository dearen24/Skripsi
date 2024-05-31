/*
  Warnings:

  - You are about to drop the column `sisa` on the `RekapMengawas` table. All the data in the column will be lost.
  - You are about to drop the column `sisaSebelumnya` on the `RekapMengawas` table. All the data in the column will be lost.
  - Added the required column `kuotaSelanjutnya` to the `RekapMengawas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sisaMengawas` to the `RekapMengawas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RekapMengawas" DROP COLUMN "sisa",
DROP COLUMN "sisaSebelumnya",
ADD COLUMN     "kuotaSelanjutnya" INTEGER NOT NULL,
ADD COLUMN     "sisaMengawas" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "HistoryGanti" (
    "id" TEXT NOT NULL,
    "idUjianRuanganDosen" TEXT NOT NULL,
    "idDosen" TEXT NOT NULL,
    "idSemester" TEXT NOT NULL,

    CONSTRAINT "HistoryGanti_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HistoryGanti" ADD CONSTRAINT "HistoryGanti_idSemester_fkey" FOREIGN KEY ("idSemester") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
