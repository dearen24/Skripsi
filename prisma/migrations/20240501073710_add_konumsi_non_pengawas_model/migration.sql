-- CreateTable
CREATE TABLE "KonsumsiNonPengawas" (
    "id" TEXT NOT NULL,
    "idSemester" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "tipe" TEXT NOT NULL,
    "snack" INTEGER NOT NULL,
    "lunch" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "KonsumsiNonPengawas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KonsumsiNonPengawas" ADD CONSTRAINT "KonsumsiNonPengawas_idSemester_fkey" FOREIGN KEY ("idSemester") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
