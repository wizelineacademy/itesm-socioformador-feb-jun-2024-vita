CREATE TABLE IF NOT EXISTS "Article" (
	"id_article" serial PRIMARY KEY NOT NULL,
	"name" varchar(30) NOT NULL,
	"description" text,
	"image_url" text
);
