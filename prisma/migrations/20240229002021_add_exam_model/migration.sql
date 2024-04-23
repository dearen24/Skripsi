-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "idUjian" TEXT;

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "mulai" TIME NOT NULL,
    "selesai" TIME NOT NULL,
    "tipe" TEXT NOT NULL,
    "shift" INTEGER NOT NULL,
    "metode" TEXT NOT NULL,
    "idSemester" TEXT NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_idUjian_fkey" FOREIGN KEY ("idUjian") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_idSemester_fkey" FOREIGN KEY ("idSemester") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
