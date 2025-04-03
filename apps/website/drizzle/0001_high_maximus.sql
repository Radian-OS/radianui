ALTER TABLE "email_subscribers" RENAME COLUMN "verification_token" TO "unsubscribe_token";--> statement-breakpoint
ALTER TABLE "email_subscribers" DROP CONSTRAINT "email_subscribers_verification_token_unique";--> statement-breakpoint
ALTER TABLE "email_subscribers" ADD CONSTRAINT "email_subscribers_unsubscribe_token_unique" UNIQUE("unsubscribe_token");