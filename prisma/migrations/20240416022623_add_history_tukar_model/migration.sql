-- CreateTable
CREATE TABLE "HistoryTukar" (
    "idUjianRuanganDosen1" TEXT NOT NULL,
    "idUjianRuanganDosen2" TEXT NOT NULL,
    "statusDosen2" BOOLEAN NOT NULL,
    "statusAdmin" BOOLEAN NOT NULL,
    "idSemester" TEXT NOT NULL,

    CONSTRAINT "HistoryTukar_pkey" PRIMARY KEY ("idUjianRuanganDosen1","idUjianRuanganDosen2")
);

-- AddForeignKey
ALTER TABLE "HistoryTukar" ADD CONSTRAINT "HistoryTukar_idSemester_fkey" FOREIGN KEY ("idSemester") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
