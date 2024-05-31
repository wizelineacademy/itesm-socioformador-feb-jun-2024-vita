ALTER TABLE "Goals" DROP CONSTRAINT "Goals_id_user_User_id_user_fk";
--> statement-breakpoint
ALTER TABLE "Reminders" DROP CONSTRAINT "Reminders_id_user_User_id_user_fk";
--> statement-breakpoint
ALTER TABLE "Allergies" DROP CONSTRAINT "Allergies_id_medical_profile_MedicalProfile_id_medical_profile_fk";
--> statement-breakpoint
ALTER TABLE "ChronicalDesease" DROP CONSTRAINT "ChronicalDesease_id_medical_profile_MedicalProfile_id_medical_profile_fk";
--> statement-breakpoint
ALTER TABLE "Disability" DROP CONSTRAINT "Disability_id_medical_profile_MedicalProfile_id_medical_profile_fk";
--> statement-breakpoint
ALTER TABLE "FeatureEvaluation" DROP CONSTRAINT "FeatureEvaluation_id_user_User_id_user_fk";
--> statement-breakpoint
ALTER TABLE "Followers" DROP CONSTRAINT "Followers_user_id_User_id_user_fk";
--> statement-breakpoint
ALTER TABLE "Following" DROP CONSTRAINT "Following_user_id_User_id_user_fk";
--> statement-breakpoint
ALTER TABLE "GoalEvaluation" DROP CONSTRAINT "GoalEvaluation_id_user_User_id_user_fk";
--> statement-breakpoint
ALTER TABLE "MedicalProfile" DROP CONSTRAINT "MedicalProfile_id_user_User_id_user_fk";
--> statement-breakpoint
ALTER TABLE "Medicines" DROP CONSTRAINT "Medicines_id_medical_profile_MedicalProfile_id_medical_profile_fk";
--> statement-breakpoint
ALTER TABLE "PortionsNutrition" DROP CONSTRAINT "PortionsNutrition_id_user_User_id_user_fk";
--> statement-breakpoint
ALTER TABLE "PostLikes" DROP CONSTRAINT "PostLikes_post_id_Post_id_posts_fk";
--> statement-breakpoint
ALTER TABLE "Post" DROP CONSTRAINT "Post_creator_id_User_id_user_fk";
--> statement-breakpoint
ALTER TABLE "Records" DROP CONSTRAINT "Records_id_user_User_id_user_fk";
--> statement-breakpoint
ALTER TABLE "SavedPosts" DROP CONSTRAINT "SavedPosts_user_id_User_id_user_fk";
--> statement-breakpoint
ALTER TABLE "UserDetail" DROP CONSTRAINT "UserDetail_id_user_User_id_user_fk";
--> statement-breakpoint
ALTER TABLE "UserPosts" DROP CONSTRAINT "UserPosts_user_id_User_id_user_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Goals" ADD CONSTRAINT "Goals_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Reminders" ADD CONSTRAINT "Reminders_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Allergies" ADD CONSTRAINT "Allergies_id_medical_profile_MedicalProfile_id_medical_profile_fk" FOREIGN KEY ("id_medical_profile") REFERENCES "MedicalProfile"("id_medical_profile") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ChronicalDesease" ADD CONSTRAINT "ChronicalDesease_id_medical_profile_MedicalProfile_id_medical_profile_fk" FOREIGN KEY ("id_medical_profile") REFERENCES "MedicalProfile"("id_medical_profile") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Disability" ADD CONSTRAINT "Disability_id_medical_profile_MedicalProfile_id_medical_profile_fk" FOREIGN KEY ("id_medical_profile") REFERENCES "MedicalProfile"("id_medical_profile") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FeatureEvaluation" ADD CONSTRAINT "FeatureEvaluation_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Followers" ADD CONSTRAINT "Followers_user_id_User_id_user_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Following" ADD CONSTRAINT "Following_user_id_User_id_user_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GoalEvaluation" ADD CONSTRAINT "GoalEvaluation_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "MedicalProfile" ADD CONSTRAINT "MedicalProfile_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Medicines" ADD CONSTRAINT "Medicines_id_medical_profile_MedicalProfile_id_medical_profile_fk" FOREIGN KEY ("id_medical_profile") REFERENCES "MedicalProfile"("id_medical_profile") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PortionsNutrition" ADD CONSTRAINT "PortionsNutrition_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostLikes" ADD CONSTRAINT "PostLikes_post_id_Post_id_posts_fk" FOREIGN KEY ("post_id") REFERENCES "Post"("id_posts") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_creator_id_User_id_user_fk" FOREIGN KEY ("creator_id") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Records" ADD CONSTRAINT "Records_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "SavedPosts" ADD CONSTRAINT "SavedPosts_user_id_User_id_user_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserDetail" ADD CONSTRAINT "UserDetail_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserPosts" ADD CONSTRAINT "UserPosts_user_id_User_id_user_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
