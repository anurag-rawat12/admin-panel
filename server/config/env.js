import { config } from "dotenv";

config({ path: ".env" });

export const { PORT, DB_URL, JWT_SECRET, JWT_EXPIRY } = process.env;