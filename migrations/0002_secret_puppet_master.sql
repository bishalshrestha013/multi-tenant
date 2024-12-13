CREATE TABLE "roles" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"applicationId" uuid,
	"permissions" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "roles_name_applicationId_pk" PRIMARY KEY("name","applicationId")
);
--> statement-breakpoint
DROP INDEX "user_id_index";--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_applicationId_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "roles_id_index" ON "roles" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_id_index" ON "users" USING btree ("id");