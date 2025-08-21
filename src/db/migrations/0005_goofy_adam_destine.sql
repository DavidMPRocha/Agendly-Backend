CREATE TABLE "service_location" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_id" uuid NOT NULL,
	"location_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "location" ADD COLUMN "country" varchar(50);--> statement-breakpoint
ALTER TABLE "location" ADD COLUMN "state" varchar(50);--> statement-breakpoint
ALTER TABLE "location" ADD COLUMN "zip" varchar(20);--> statement-breakpoint
ALTER TABLE "service_location" ADD CONSTRAINT "service_location_service_id_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_location" ADD CONSTRAINT "service_location_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "location" DROP COLUMN "postal_code";