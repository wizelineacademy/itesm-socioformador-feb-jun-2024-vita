import { pgTable, varchar, timestamp, text, 
	integer,  serial, doublePrecision, date , unique, boolean } from "drizzle-orm/pg-core"

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
    profilePhoto: text('profile_photo'),
    membership: text('membership'),
    membershipTime: timestamp("membership_time", {mode: "date"}),
	type: text('type'),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: true }).defaultNow().notNull()
});

export const posts = pgTable('Post', {
	idPost: serial('id_posts').primaryKey().notNull(),
	creatorId: integer('creator_id').references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
	caption: text('caption').notNull(),
	postPhoto: text('post_photo'),
	tag: varchar('tag', { length: 50 }),
	createdAt: timestamp("created_at", { mode: "string", withTimezone: true }).defaultNow().notNull()
  });

  export const postLikes = pgTable('PostLikes', {
	idLike: serial("id_like").primaryKey().notNull(),
	postId: integer('post_id').references(() => posts.idPost, { onDelete: "cascade", onUpdate: "cascade" }),
	userId: integer('user_id').references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" }),
  });

export const followers = pgTable('Followers', {
	idFollowers: serial("id_followers").primaryKey().notNull(),
	userId: integer('user_id').references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" }),
	followerId: integer('follower_id').references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" }),
  });

  
export const following = pgTable("Following", {
	idFollowing: serial("id_following").primaryKey().notNull(),
    userId: integer("user_id").references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" }),
    followingId: integer("following_id").references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" }),
});

  export const userPosts = pgTable('UserPosts', {
	idUserPosts: serial("id_user_posts").primaryKey().notNull(),
	userId: integer('user_id').references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" }),
	postId: integer('post_id').references(() => posts.idPost, { onDelete: "cascade", onUpdate: "cascade" }),
  });

  
  export const comments = pgTable('Comments', {
	idComment: serial('id_comment').primaryKey().notNull(),
	postId: integer('post_id').references(() => posts.idPost).notNull(),
	userId: integer('user_id').references(() => user.idUser).notNull(),
	content: text('content').notNull(),
	createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).defaultNow().notNull(),
  });

export const portionsNutrition = pgTable("PortionsNutrition", {
	idNutritonPortion: serial("id_nutriton_portion").primaryKey().notNull(),
	idUser: integer("id_user").notNull().unique().references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" } ),
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
	idUser: integer("id_user").notNull().unique().references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" } ),
	sex: varchar("sex", { length: 1 }).notNull(),
	weight: doublePrecision("weight").notNull(),
	height: doublePrecision("height").notNull(),
	bodyFat: doublePrecision("body_fat").notNull(),
	birthDate: date("birth_date", {mode: "date"}).notNull(),
	muscularMass: doublePrecision("muscular_mass").notNull(),
});

export const Reminders = pgTable("Reminders", {
	idReminders: serial("id_reminders").primaryKey().notNull(),
	idUser: integer("id_user").notNull().references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" } ),
	name: varchar("name", { length: 100 }).notNull(),
	description: text("description").notNull(),
	frequency: integer("frequency").notNull(),
	startTime: timestamp("start_time", {mode: "date"}).notNull(), 
	dueTime: timestamp("due_time", {mode: "date"}),
	endTime: timestamp("end_time", {mode: "date"}), 
});

export const Goals = pgTable("Goals", {
	idGoal: serial("id_goal").primaryKey().notNull(),
	idUser: integer("id_user").notNull().references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" } ),
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
	idUser: integer("id_user").notNull().unique().references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" } ),
	emergencyName: varchar("emergency_name", {length: 50}),
	emergencyPhone: varchar("emergency_phone", {length: 12}),
	policyUser: varchar("policyUser", {length: 30}),
	insuranceCompany: varchar("insurance_company", {length: 50}),
	bloodType: varchar("bloodType", {length: 30}),
});

export const chronicalDesease = pgTable("ChronicalDesease", {
	idChronicalDesease: serial("id_chronical_desease").primaryKey().notNull(),
	idMedicalProfile: integer("id_medical_profile").notNull().references(() => medicalProfile.idMedicalProfile, { onDelete: "cascade", onUpdate: "cascade" } ),
	name: varchar("name", {length: 100}),
});

export const  medicines = pgTable("Medicines", {
	idMedicines: serial("id_medicines").primaryKey().notNull(),
	idMedicalProfile: integer("id_medical_profile").notNull().references(() => medicalProfile.idMedicalProfile, { onDelete: "cascade", onUpdate: "cascade" } ),
	name: varchar("name", {length: 100}),
	routeAdmin: varchar("route_admin", {length: 100}),
	dose: varchar("dose", {length: 100}),
	duration: varchar("duration", {length: 100}),
});

export const  disability = pgTable("Disability", {
	idDisability : serial("id_disability").primaryKey().notNull(),
	idMedicalProfile: integer("id_medical_profile").notNull().references(() => medicalProfile.idMedicalProfile, { onDelete: "cascade", onUpdate: "cascade" } ),
	name: varchar("name", {length: 100}),
	
});

export const  allergies = pgTable("Allergies", {
	idAllergies : serial("id_allergies").primaryKey().notNull(),
	idMedicalProfile: integer("id_medical_profile").notNull().references(() => medicalProfile.idMedicalProfile, { onDelete: "cascade", onUpdate: "cascade" } ),
	name: varchar("name", {length: 100}),
	reaction: varchar("reaction", {length: 100}),
});

export const goalEvaluation = pgTable("GoalEvaluation", {
	idGoalEvaluation: serial("id_goal_evaluation").primaryKey().notNull(),
	idUser: integer("id_user").notNull().references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" } ),
	idGoal: integer("id_goal").notNull().references(() => Goals.idGoal, {onDelete: "cascade", onUpdate: "cascade"}),
	name: varchar("name", {length: 50}).notNull(),
	grade: integer("grade").notNull(),
	updated_at: timestamp("updated_at", {mode: "date"}).notNull().defaultNow()
})

export const featureEvaluation = pgTable("FeatureEvaluation", {
	idFeatureEvaluation: serial("id_feature_evaluation").primaryKey().notNull(),
	idUser: integer("id_user").notNull().references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" } ),
	name: varchar("name", {length: 50}).notNull(),
	grade: integer("grade").notNull(),
	updated_at: timestamp("updated_at", {mode: "date"}).notNull().defaultNow()
})

export const record = pgTable("Records", {
	idRegister: serial("id_record").primaryKey().notNull(),
	idUser: integer("id_user").notNull().references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" } ),
	category: varchar("category", {length: 15}).notNull(),
	name: varchar("name", {length: 50}).notNull(),
	value: doublePrecision("value"),
	date: timestamp("date", {mode: "date"}).notNull().defaultNow()
})

export const featureUsage = pgTable("FeatureUsage", {
	idFeatureUsage: serial("id_feature_usage").primaryKey().notNull(),
	idUser: integer("id_user").notNull().references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" } ),
	name: varchar("name", {length: 50}).notNull(),
	detail: varchar("detail", {length: 50}).notNull(),
	date: timestamp("date", {mode: "date"}).notNull().defaultNow()
})

export const monthlyChallenge = pgTable("MonthlyChallenge", {
	idChallenge: serial("id_challenge").primaryKey().notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	description: text("description").notNull(),
	startDate: date("start_date").notNull(),
	endDate: date("end_date").notNull(),
	createdAt: timestamp("created_at", { mode: "string", withTimezone: true }).defaultNow().notNull()
  });

  export const badges = pgTable("Badges", {
	idBadge: serial("id_badge").primaryKey().notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	description: text("description").notNull(),
  });

  export const userPoints = pgTable("UserPoints", {
	idUserPoint: serial("id_user_point").primaryKey().notNull(),
	idUser: integer("id_user").notNull().references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" }),
	points: integer("points").notNull().default(0),
	updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }).defaultNow().notNull()
  });

  export const userBadges = pgTable('UserBadges', {
	idUserBadges: serial("id_user_badges").primaryKey().notNull(),
	userId: integer('user_id')
		.references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" }),
	badgeId: integer('badge_id')
		.references(() => badges.idBadge, { onDelete: "cascade", onUpdate: "cascade" }),
}, (table) => {
	return {
		unqUserBadge: unique('unique_user_badge').on(table.userId, table.badgeId),
	};
});

export const challengeEvaluations = pgTable('ChallengeEvaluations', {
    idEvaluation: serial('id_evaluation').primaryKey().notNull(),
    idUser: integer('id_user').references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    idChallenge: integer('id_challenge').references(() => monthlyChallenge.idChallenge, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    evaluatorId: integer('evaluator_id').references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    score: integer('score').notNull(),
    evaluatedAt: timestamp('evaluated_at', { mode: 'string', withTimezone: true }).defaultNow().notNull(),
}, (table) => {
    return {
        unqEvaluation: unique('unique_evaluation').on(table.idUser, table.idChallenge, table.evaluatorId),
    };
});

export const userChallengeResults = pgTable('UserChallengeResults', {
    idUserChallengeResult: serial('id_user_challenge_result').primaryKey().notNull(),
    userId: integer('user_id').references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    challengeId: integer('challenge_id').references(() => monthlyChallenge.idChallenge, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    passed: boolean('passed').default(false),
    evaluatedAt: timestamp('evaluated_at', { mode: 'string', withTimezone: true }).defaultNow().notNull(),
});

export const challengeSubmissions = pgTable('ChallengeSubmissions', {
    idSubmission: serial('id_submission').primaryKey().notNull(),
    idUser: integer('id_user').references(() => user.idUser, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    idChallenge: integer('id_challenge').references(() => monthlyChallenge.idChallenge, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    imageUrl: text('image_url').notNull(),
    description: text('description').notNull(),
    submittedAt: timestamp('submitted_at', { mode: 'string', withTimezone: true }).defaultNow().notNull(),
});
