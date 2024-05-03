ALTER TABLE "MedicalProfile" RENAME COLUMN "policy" TO "policyUser";--> statement-breakpoint
ALTER TABLE "MedicalProfile" ALTER COLUMN "policyUser" SET DATA TYPE varchar(30);