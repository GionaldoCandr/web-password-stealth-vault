-- CreateEnum
CREATE TYPE "VaultCategory" AS ENUM ('campus', 'finance', 'work', 'social');

-- CreateTable
CREATE TABLE "VaultCredential" (
    "id" SERIAL NOT NULL,
    "service" TEXT NOT NULL,
    "category" "VaultCategory" NOT NULL,
    "username" TEXT NOT NULL,
    "encryptedSecret" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VaultCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" SERIAL NOT NULL,
    "deviceId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "securityRate" INTEGER NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credentialId" INTEGER NOT NULL,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VaultCredential_service_key" ON "VaultCredential"("service");

-- CreateIndex
CREATE UNIQUE INDEX "AuditLog_credentialId_deviceId_key" ON "AuditLog"("credentialId", "deviceId");

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_credentialId_fkey" 
FOREIGN KEY ("credentialId") REFERENCES "VaultCredential"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;
