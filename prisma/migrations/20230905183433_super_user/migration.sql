-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('User', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'User';
