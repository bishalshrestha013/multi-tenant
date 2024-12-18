CREATE TABLE "usersToRoles" (
	"applicationId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"roleId" uuid NOT NULL,
	CONSTRAINT "usersToRoles_applicationId_userId_roleId_pk" PRIMARY KEY("applicationId","userId","roleId")
);
--> statement-breakpoint
ALTER TABLE "usersToRoles" ADD CONSTRAINT "usersToRoles_applicationId_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usersToRoles" ADD CONSTRAINT "usersToRoles_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usersToRoles" ADD CONSTRAINT "usersToRoles_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;