/*
  Warnings:

  - You are about to drop the column `corporal` on the `UserDetail` table. All the data in the column will be lost.
  - Added the required column `muscular_mass` to the `UserDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDetail" DROP COLUMN "corporal",
ADD COLUMN     "muscular_mass" DOUBLE PRECISION NOT NULL;
