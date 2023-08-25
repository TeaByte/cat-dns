-- CreateTable
CREATE TABLE "SubDomain" (
    "id" TEXT NOT NULL,
    "record" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "SubDomain_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubDomain" ADD CONSTRAINT "SubDomain_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
