/*
  Warnings:

  - Added the required column `notes` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "notes" TEXT NOT NULL;
