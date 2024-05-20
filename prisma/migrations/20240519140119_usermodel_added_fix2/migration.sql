/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_tag_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "tag";
