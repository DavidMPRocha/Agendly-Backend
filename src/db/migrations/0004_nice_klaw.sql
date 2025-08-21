ALTER TABLE "service" DROP CONSTRAINT "service_location_id_location_id_fk";
--> statement-breakpoint
ALTER TABLE "appointment" ADD COLUMN "company_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service" DROP COLUMN "location_id";