/*
  Warnings:

  - Added the required column `masaujian` to the `RekapMengawas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RekapMengawas" ADD COLUMN     "masaujian" TEXT NOT NULL;
