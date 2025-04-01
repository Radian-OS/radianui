import { boolean, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"

export const emailSubscribers = pgTable("email_subscribers", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	email: varchar("email", { length: 255 }).unique().notNull(),
	isSubscribed: boolean("is_subscribed").notNull(),
	subscribedAt: timestamp("subscribed_at", { withTimezone: true }).defaultNow().notNull(),
	unsubscribeToken: varchar("unsubscribe_token").unique().notNull(),
})

export type Subscriber = typeof emailSubscribers.$inferSelect
export type NewSubscriber = typeof emailSubscribers.$inferInsert
