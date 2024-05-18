/*
  Warnings:

  - Added the required column `imageName` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "imageName" TEXT NOT NULL;
