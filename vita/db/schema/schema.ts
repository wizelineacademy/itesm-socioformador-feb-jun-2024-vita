import { pgTable, varchar, timestamp, text, 
	integer,  serial, doublePrecision, date } from "drizzle-orm/pg-core"

//tables

export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const user = pgTable("User", {
	idUser: serial("id_user").primaryKey().notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	email: varchar("email", { length: 50 }).notNull().unique(),
	password: varchar("password", { length: 64 }),
	phoneNumber: varchar("phone_number", { length: 12 }).unique(),
	username: varchar('username', { length: 100 }),
	profilePhoto: text('profile_photo'),
	createdAt: timestamp("created_at", { mode: "string", withTimezone: true }).defaultNow().notNull()
});

export const posts = pgTable('Post', {
	idPost: serial('id_posts').primaryKey().notNull(),
	creatorId: integer('creator_id').references(() => user.idUser).notNull(),
	caption: text('caption').notNull(),
	postPhoto: text('post_photo'),
	tag: varchar('tag', { length: 50 }),
	createdAt: timestamp("created_at", { mode: "string", withTimezone: true }).defaultNow().notNull()
  });

  export const postLikes = pgTable('PostLikes', {
	idLike: serial("id_like").primaryKey().notNull(),
	postId: integer('post_id').references(() => posts.idPost),
	userId: integer('user_id').references(() => user.idUser),
  });

export const followers = pgTable('Followers', {
	idFollowers: serial("id_followers").primaryKey().notNull(),
	userId: integer('user_id').references(() => user.idUser),
	followerId: integer('follower_id').references(() => user.idUser),
  });

  
export const following = pgTable("Following", {
	idFollowing: serial("id_following").primaryKey().notNull(),
    userId: integer("user_id").references(() => user.idUser),
    followingId: integer("following_id").references(() => user.idUser),
});

  export const userPosts = pgTable('UserPosts', {
	idUserPosts: serial("id_user_posts").primaryKey().notNull(),
	userId: integer('user_id').references(() => user.idUser),
	postId: integer('post_id').references(() => posts.idPost),
  });

  export const savedPosts = pgTable("SavedPosts", {
	idSavedPosts: serial("id_saved_posts").primaryKey().notNull(),
    userId: integer("user_id").references(() => user.idUser),
    postId: integer("post_id").references(() => posts.idPost),
});
 
export const portionsNutrition = pgTable("PortionsNutrition", {
	idNutritonPortion: serial("id_nutriton_portion").primaryKey().notNull(),
	idUser: integer("id_user").notNull().unique().references(() => user.idUser, { onDelete: "restrict", onUpdate: "cascade" } ),
	fruits: integer("fruits").notNull(),
	vegetables: integer("vegetables").notNull(),
	milk: integer("milk").notNull(),
	legumes: integer("legumes").notNull(),
	cereals: integer("cereals").notNull(),
	meat: integer("meat").notNull(),
	sugar: integer("sugar").notNull(),
	fat: integer("fat").notNull(),
});

export const userDetail = pgTable("UserDetail", {
	idUserDetail: serial("id_user_detail").primaryKey().notNull(),
	idUser: integer("id_user").notNull().unique().references(() => user.idUser, { onDelete: "restrict", onUpdate: "cascade" } ),
	sex: varchar("sex", { length: 1 }).notNull(),
	weight: doublePrecision("weight").notNull(),
	height: doublePrecision("height").notNull(),
	bodyFat: doublePrecision("body_fat").notNull(),
	birthDate: date("birth_date", {mode: "date"}).notNull(),
	muscularMass: doublePrecision("muscular_mass").notNull(),
});


export const Reminders = pgTable("Reminders", {
	idReminders: serial("id_reminders").primaryKey().notNull(),
	idUser: integer("id_user").notNull().references(() => user.idUser, { onDelete: "restrict", onUpdate: "cascade" } ),
	name: varchar("name", { length: 100 }).notNull(),
	description: text("description").notNull(),
	frequency: integer("frequency").notNull(),
	startTime: timestamp("start_time", {mode: "date"}).notNull(), 
	endTime: timestamp("end_time", {mode: "date"}), 
});

export const Goals = pgTable("Goals", {
	idGoal: serial("id_goal").primaryKey().notNull(),
	idUser: integer("id_user").notNull().references(() => user.idUser, { onDelete: "restrict", onUpdate: "cascade" } ),
	category: varchar("category", {length: 15}).notNull(),
	variable: varchar("variable", {length: 30}),
	name: varchar("name", {length: 50}).notNull(),
	currentValue: doublePrecision("current_value"),
	desiredValue: doublePrecision("desired_value")
});

export const Articles = pgTable("Article", {
	idArticle: serial("id_article").primaryKey().notNull(),
	name: varchar("name", {length: 50}).notNull(),
	description: text("description"),
	imageUrl: text("image_url")
});


export const medicalProfile = pgTable("MedicalProfile", {
	idMedicalProfile: serial("id_medical_profile").primaryKey().notNull(),
	idUser: integer("id_user").notNull().unique().references(() => user.idUser, { onDelete: "restrict", onUpdate: "cascade" } ),
	emergencyName: varchar("emergency_name", {length: 50}),
	emergencyPhone: varchar("emergency_phone", {length: 12}),
	policyUser: varchar("policyUser", {length: 30}),
	insuranceCompany: varchar("insurance_company", {length: 50}),
	bloodType: varchar("bloodType", {length: 30}),
});

export const chronicalDesease = pgTable("ChronicalDesease", {
	idChronicalDesease: serial("id_chronical_desease").primaryKey().notNull(),
	idMedicalProfile: integer("id_medical_profile").notNull().references(() => medicalProfile.idMedicalProfile, { onDelete: "restrict", onUpdate: "cascade" } ),
	name: varchar("name", {length: 100}),
});

export const  medicines = pgTable("Medicines", {
	idMedicines: serial("id_medicines").primaryKey().notNull(),
	idMedicalProfile: integer("id_medical_profile").notNull().references(() => medicalProfile.idMedicalProfile, { onDelete: "restrict", onUpdate: "cascade" } ),
	name: varchar("name", {length: 100}),
	routeAdmin: varchar("route_admin", {length: 100}),
	dose: varchar("dose", {length: 100}),
	duration: varchar("duration", {length: 100}),
});

export const  disability = pgTable("Disability", {
	idDisability : serial("id_disability").primaryKey().notNull(),
	idMedicalProfile: integer("id_medical_profile").notNull().references(() => medicalProfile.idMedicalProfile, { onDelete: "restrict", onUpdate: "cascade" } ),
	name: varchar("name", {length: 100}),
	
});

export const  allergies = pgTable("Allergies", {
	idAllergies : serial("id_allergies").primaryKey().notNull(),
	idMedicalProfile: integer("id_medical_profile").notNull().references(() => medicalProfile.idMedicalProfile, { onDelete: "restrict", onUpdate: "cascade" } ),
	name: varchar("name", {length: 100}),
	reaction: varchar("reaction", {length: 100}),
});

export const goalEvaluation = pgTable("GoalEvaluation", {
	idGoalEvaluation: serial("id_goal_evaluation").primaryKey().notNull(),
	idUser: integer("id_user").notNull().references(() => user.idUser, { onDelete: "restrict", onUpdate: "cascade" } ),
	idGoal: integer("id_goal").notNull().references(() => Goals.idGoal, {onDelete: "cascade", onUpdate: "cascade"}),
	name: varchar("name", {length: 50}).notNull(),
	grade: integer("grade").notNull(),
	updated_at: timestamp("updated_at", {mode: "date"}).notNull().defaultNow()
})

export const featureEvaluation = pgTable("FeatureEvaluation", {
	idFeatureEvaluation: serial("id_feature_evaluation").primaryKey().notNull(),
	idUser: integer("id_user").notNull().references(() => user.idUser, { onDelete: "restrict", onUpdate: "cascade" } ),
	name: varchar("name", {length: 50}).notNull(),
	grade: integer("grade").notNull(),
	updated_at: timestamp("updated_at", {mode: "date"}).notNull().defaultNow()
})

export const register = pgTable("Register", {
	idRegister: serial("id_register").primaryKey().notNull(),
	idUser: integer("id_user").notNull().references(() => user.idUser, { onDelete: "restrict", onUpdate: "cascade" } ),
	category: varchar("category", {length: 15}).notNull(),
	name: varchar("name", {length: 50}).notNull(),
	value: doublePrecision("value"),
	date: timestamp("date", {mode: "date"}).notNull().defaultNow()
})