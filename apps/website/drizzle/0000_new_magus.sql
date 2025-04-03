CREATE TABLE "email_subscribers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "email_subscribers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"is_subscribed" boolean NOT NULL,
	"subscribed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"verification_token" varchar NOT NULL,
	CONSTRAINT "email_subscribers_email_unique" UNIQUE("email"),
	CONSTRAINT "email_subscribers_verification_token_unique" UNIQUE("verification_token")
);
