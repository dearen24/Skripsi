-- CreateTable
CREATE TABLE "RekapMengawas" (
    "id" TEXT NOT NULL,
    "idSemester" TEXT NOT NULL,
    "idDosen" TEXT NOT NULL,
    "kuota" INTEGER NOT NULL,
    "sisaSebelumnya" INTEGER NOT NULL,
    "jumlahMengawas" INTEGER NOT NULL,
    "sisa" INTEGER NOT NULL,

    CONSTRAINT "RekapMengawas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RekapMengawas" ADD CONSTRAINT "RekapMengawas_idDosen_fkey" FOREIGN KEY ("idDosen") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RekapMengawas" ADD CONSTRAINT "RekapMengawas_idSemester_fkey" FOREIGN KEY ("idSemester") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
