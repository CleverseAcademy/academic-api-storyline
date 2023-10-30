/*
 Warnings:

 - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.
 */
-- AlterTable
ALTER TABLE "Teacher"
  ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "password" CHAR(60) NOT NULL DEFAULT
  /* const bcrypt = require('bcryptjs'); bcrypt.hashSync('frequent-sans-jitters', bcrypt.genSaltSync(12)) */
  '$2a$12$mapco4X1YZ8CQXEBsV8CUOpsm.h9R/MwGFHX1tVChfgixKTmH9mzq';

