/*
  Warnings:

  - A unique constraint covering the columns `[userId,courseId]` on the table `UserCourses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserCourses_userId_courseId_key" ON "UserCourses"("userId", "courseId");
