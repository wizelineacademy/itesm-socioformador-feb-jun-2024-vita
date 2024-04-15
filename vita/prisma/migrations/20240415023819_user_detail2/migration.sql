/*
  Warnings:

  - Added the required column `corporal` to the `UserDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDetail" ADD COLUMN     "corporal" DOUBLE PRECISION NOT NULL;
