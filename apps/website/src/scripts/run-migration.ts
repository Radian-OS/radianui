import dotenv from "dotenv"
import fs from "fs"
import path from "path"
import pg from "pg"
import { fileURLToPath } from "url"

const { Pool } = pg

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, "../../.env") })
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") })

const connectionString = process.env.DATABASE || process.env.DATABASE_URL

if (!connectionString) {
	console.error(
		"Error: No DATABASE or DATABASE_URL found in environment variables."
	)
	process.exit(1)
}

const isSslRequired =
	connectionString.includes("neon.tech") ||
	connectionString.includes("sslmode=require")

const pool = new Pool({
	connectionString,
	ssl: isSslRequired ? { rejectUnauthorized: false } : undefined,
})

async function runMigration() {
	try {
		console.log("Connecting to database...")
		const sqlPath = path.resolve(__dirname, "migrate-sandbox-comments.sql")
		const sql = fs.readFileSync(sqlPath, "utf-8")

		console.log("Executing migration schema...")
		await pool.query(sql)
		console.log(
			"Migration completed successfully! Table 'sandbox_comments' is ready."
		)
	} catch (error) {
		console.error("Migration failed:", error)
	} finally {
		await pool.end()
	}
}

runMigration()
