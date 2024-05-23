ALTER TABLE "Register" RENAME TO "Records";--> statement-breakpoint
ALTER TABLE "Records" RENAME COLUMN "id_register" TO "id_record";--> statement-breakpoint
ALTER TABLE "Records" DROP CONSTRAINT "Register_id_user_User_id_user_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Records" ADD CONSTRAINT "Records_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
