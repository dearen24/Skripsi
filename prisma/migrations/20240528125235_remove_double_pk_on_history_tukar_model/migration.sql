/*
  Warnings:

  - The primary key for the `HistoryTukar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `HistoryTukar` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "HistoryTukar" DROP CONSTRAINT "HistoryTukar_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "HistoryTukar_pkey" PRIMARY KEY ("id");
