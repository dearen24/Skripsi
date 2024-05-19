/*
  Warnings:

  - Added the required column `snack` to the `Rules` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `konsumsi` on the `Rules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Rules" ADD COLUMN     "snack" INTEGER NOT NULL,
DROP COLUMN "konsumsi",
ADD COLUMN     "konsumsi" INTEGER NOT NULL;
