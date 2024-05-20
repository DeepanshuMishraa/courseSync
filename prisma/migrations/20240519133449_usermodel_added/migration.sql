/*
  Warnings:

  - You are about to drop the column `course` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Peer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SharedResource` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tag` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Peer" DROP CONSTRAINT "Peer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_userId_fkey";

-- DropForeignKey
ALTER TABLE "SharedResource" DROP CONSTRAINT "SharedResource_peerId_fkey";

-- DropForeignKey
ALTER TABLE "SharedResource" DROP CONSTRAINT "SharedResource_resourceId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "course",
DROP COLUMN "createdAt",
ADD COLUMN     "tag" TEXT NOT NULL;

-- DropTable
DROP TABLE "Peer";

-- DropTable
DROP TABLE "Resource";

-- DropTable
DROP TABLE "SharedResource";
