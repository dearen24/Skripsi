/*
  Warnings:

  - You are about to drop the column `melewati12` on the `Rules` table. All the data in the column will be lost.
  - You are about to drop the column `sebelum12` on the `Rules` table. All the data in the column will be lost.
  - You are about to drop the column `setelah12` on the `Rules` table. All the data in the column will be lost.
  - Added the required column `delapanSepuluh` to the `Rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duaBelasDua` to the `Rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duaEmpat` to the `Rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sepuluhDuaBelas` to the `Rules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rules" DROP COLUMN "melewati12",
DROP COLUMN "sebelum12",
DROP COLUMN "setelah12",
ADD COLUMN     "delapanSepuluh" BOOLEAN NOT NULL,
ADD COLUMN     "duaBelasDua" BOOLEAN NOT NULL,
ADD COLUMN     "duaEmpat" BOOLEAN NOT NULL,
ADD COLUMN     "sepuluhDuaBelas" BOOLEAN NOT NULL;
