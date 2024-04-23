-- CreateTable
CREATE TABLE "ExamRoomLec" (
    "id" TEXT NOT NULL,
    "idUjian" TEXT NOT NULL,
    "snack" INTEGER NOT NULL,
    "lunch" INTEGER NOT NULL,

    CONSTRAINT "ExamRoomLec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassroomToExamRoomLec" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ExamRoomLecToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassroomToExamRoomLec_AB_unique" ON "_ClassroomToExamRoomLec"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassroomToExamRoomLec_B_index" ON "_ClassroomToExamRoomLec"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExamRoomLecToUser_AB_unique" ON "_ExamRoomLecToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ExamRoomLecToUser_B_index" ON "_ExamRoomLecToUser"("B");

-- AddForeignKey
ALTER TABLE "ExamRoomLec" ADD CONSTRAINT "ExamRoomLec_idUjian_fkey" FOREIGN KEY ("idUjian") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomToExamRoomLec" ADD CONSTRAINT "_ClassroomToExamRoomLec_A_fkey" FOREIGN KEY ("A") REFERENCES "Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomToExamRoomLec" ADD CONSTRAINT "_ClassroomToExamRoomLec_B_fkey" FOREIGN KEY ("B") REFERENCES "ExamRoomLec"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamRoomLecToUser" ADD CONSTRAINT "_ExamRoomLecToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ExamRoomLec"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamRoomLecToUser" ADD CONSTRAINT "_ExamRoomLecToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
