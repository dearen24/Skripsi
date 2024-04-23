-- CreateTable
CREATE TABLE "Rules" (
    "id" TEXT NOT NULL,
    "sebelum12" BOOLEAN NOT NULL,
    "melewati12" BOOLEAN NOT NULL,
    "setelah12" BOOLEAN NOT NULL,
    "konsumsi" TEXT NOT NULL,

    CONSTRAINT "Rules_pkey" PRIMARY KEY ("id")
);
