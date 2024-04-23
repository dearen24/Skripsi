-- CreateTable
CREATE TABLE "ExamSubject" (
    "idMatkul" TEXT NOT NULL,
    "idSemester" TEXT NOT NULL,
    "idDosen" TEXT NOT NULL,
    "peserta" INTEGER NOT NULL,

    CONSTRAINT "ExamSubject_pkey" PRIMARY KEY ("idMatkul","idSemester","idDosen")
);

-- AddForeignKey
ALTER TABLE "ExamSubject" ADD CONSTRAINT "ExamSubject_idMatkul_fkey" FOREIGN KEY ("idMatkul") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSubject" ADD CONSTRAINT "ExamSubject_idSemester_fkey" FOREIGN KEY ("idSemester") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSubject" ADD CONSTRAINT "ExamSubject_idDosen_fkey" FOREIGN KEY ("idDosen") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
