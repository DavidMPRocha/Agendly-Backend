ALTER TABLE "client" ALTER COLUMN "company_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "client" ALTER COLUMN "location_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "phone2" varchar(20);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "obs1" varchar(255);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "obs2" varchar(255);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "obs3" varchar(255);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "gender" varchar(10);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "cc" varchar(20);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "nif" varchar(20);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "country" varchar(50);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "state" varchar(50);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "city" varchar(50);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "address" varchar(255);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "zip" varchar(20);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "invoce_notes" varchar(255);--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "favorite_collaborator" uuid;--> statement-breakpoint
ALTER TABLE "client" ADD COLUMN "status" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "client" ADD CONSTRAINT "client_favorite_collaborator_user_id_fk" FOREIGN KEY ("favorite_collaborator") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client" DROP COLUMN "notes";